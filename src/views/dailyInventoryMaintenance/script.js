import Cookies from 'js-cookie'
import axios from 'axios'
import { request } from 'https';
let URL=''
export default {
    data () {
        return {
            pageSize:10,
            currentPage:1,
            total:0,
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'supplierName'
            },
            isSlide:false,
            ruleForm:{
                dates:'',
                orderType:''
            },
            machineTypeList:[], //类别列表
            tableData:[],
            tableHeight: window.innerHeight - 180,
            tableColumn: [
              {
                name: ""
              }
            ],
            tHeadData: [],
            loading: true,//加载
            spanArr:[], //类别合行数
            spanArrSupplierName:[],//生产商合行数
            spanArrDate:[], //日期合行数
            supplierCode:'',
            spanIndex:'',
            day:'', //当天日期
            searchButtons:[], //搜索栏按钮
            listOneTableOperation:[],  //一级表按钮列表
            listToolBarOperation:[],  //工具栏按钮列表
            isDelActive:-1, //选中第几列的删除
            dialog:false,
            listData:[],
            initDialogForm:{
              orderType:'1',
              processName:[]
            },
            rules:{
              orderType: [
                { required: true, message: '请选择工序类别', trigger: 'change' }
              ],
              processName:[
                { type: 'array', required: true, message: '请至少选择一种工序', trigger: 'change' }
              ]
            },
            processNameData:[],
            checkedProcessName:[],
            processNamelist:[],
            supplierName:'', //生产商名称
            supplierCode:'', //生产商编号
            shortName:'', //生产商简称
            isEdit:false,
            isSave:true,
            isSupplier:'', //是否是供应商
        }
    },
    mounted () {
        setTimeout(() => {
            this.loading = false;
        }, 500); 
        this.getSupplierInfo()
        this.getList()
    },
    methods: {
         /*----------- 获取生产商名称(start)  --------------*/
         getSupplierInfo(){
          this.$request.post(URL+'/qt/tbpmsupplieroutm/getSupplierMByCode',{
          },{ token: Cookies.get('TOKEN')}).then(data => {
              this.supplierName=data.obj.supplierName
              this.supplierCode=data.obj.supplierCode
              this.shortName=data.obj.shortName
              this.isSupplier=data.obj
          }).catch(e => {
    
          })
         },
         /*----------- 获取生产商名称(end)  --------------*/

         /*----------- 合并行(start)  --------------*/
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          //  console.log(column, '1111')
          //  console.log(this.tHeadData[this.tHeadData.length -2], '2222')
            let obj = this.tHeadData[columnIndex];
            if(obj.columnName==='orderType'||obj.columnName==='hlhOrderNum'||obj.columnName==='hlhOrderCost'||obj.columnName==='lateDeliveryNum'||obj.columnName==='reworkNum'||obj.columnName==='reluctantlyReceiving'||obj.columnName==='remarks'){
              const _row = this.spanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                rowspan: _row,
                colspan: _col
              };
            }
            if(obj.columnName==='shortName'){
              const _row = this.spanArrSupplierName[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                rowspan: _row,
                colspan: _col
              };
            }
            if(obj.columnName==='dates'){
                const _row = this.spanArrDate[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                  rowspan: _row,
                  colspan: _col
                };
            }
            this.$forceUpdate()
          },
        /*----------- 合并行(end)  --------------*/

         /*----------- 点击上下页获取列表数据(start)  --------------*/
        handleCurrentChange(val) {
            let that=this
            this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
            //data 参数
            page:val,
            rows:this.pageSize,
            token: Cookies.get('TOKEN'),
            }).then(data => {
            this.tableData=data.rows
            this.tableData.forEach((item, index) => {
                if(item.dates==""||item.dates==null){
                item.dates=""
                }else{
                item.dates=that.formatData(item.dates)
                }
                if(item.orderType==1){
                    item.orderType="手板"
                }else if(item.orderType==2){
                    item.orderType="模具"
                }else if(item.orderType==3){
                    item.orderType="钣金"
                }
            });
             /*----------- 获取相同编号的数组(start)  --------------*/
             this.getHeaderData(this.tableData)
             /*----------- 获取相同编号的数组(end)  --------------*/
            }).catch(e => {
    
            })
        },
        /*----------- 点击上下页获取列表数据(end)  --------------*/
    
        /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
        handleSizeChange(val) {
            let that=this
            this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
            //data 参数
            rows:val,
            token: Cookies.get('TOKEN'),
            }).then(data => {
            this.tableData=data.rows
            this.tableData.forEach((item, index) => {
                if(item.dates==""||item.dates==null){
                    item.dates=""
                }else{
                    item.dates=that.formatData(item.dates)
                }
                if(item.orderType==1){
                    item.orderType="手板"
                }else if(item.orderType==2){
                    item.orderType="模具"
                }else if(item.orderType==3){
                    item.orderType="钣金"
                }
            });
             /*----------- 获取相同编号的数组(start)  --------------*/
             this.getHeaderData(this.tableData)
             /*----------- 获取相同编号的数组(end)  --------------*/
            }).catch(e => {
    
            })
        },
        /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

        /*----------- 获取头部数据(start)  --------------*/
        getHeaderData(tableData){
            this.$request.post(URL+'/sysOperation/listOperationBar',{
                //data 参数
                menuId:'c91521ce-3838-4d57-b7b1-866ec839bf8f',
                token: Cookies.get('TOKEN'),
                }).then(data => {
                this.tHeadData=data.obj.listOneColumn
                this.searchButtons=data.obj.listSearchBarOperation
                this.listOneTableOperation=data.obj.listOneTableOperation
                this.listToolBarOperation=data.obj.listToolBarOperation
                this.listToolBarOperation.reverse()
                this.searchButtons.forEach((item,index) => {
                    if(item.operationName=="查询"){
                    item.icon="el-icon-search"
                    }
                });
                this.searchButtons.reverse()
                /*----------- 获取相同编号的数组(start)  --------------*/
                this.tHeadData.forEach((obj, i) => {
                    if(obj.columnName==='shortName'){
                       this.spanArrSupplierName = []
                        this.spanIndex=0
                        for (var i = 0; i <  tableData.length; i++) {
                        if (i === 0) {
                            this.spanArrSupplierName.push(1);
                            this.spanIndex = 0;
                        } else {
                            // 判断当前元素与上一个元素是否相同
                            if (tableData[i].supplierName === tableData[i - 1].supplierName) {
                              this.spanArrSupplierName[this.spanIndex] += 1; //需要合并的行数
                              this.spanArrSupplierName.push(0); //新增被合并的行
                            } else {
                              this.spanArrSupplierName.push(1);
                              this.spanIndex = i; //新的需要合并的第几行数
                            }
                        }
                        }
                    }else if(obj.columnName==='dates'){
                        this.spanArrDate=[]
                        this.spanIndex=0
                        for (var i = 0; i < tableData.length; i++) {
                        if (i === 0) {
                            this.spanArrDate.push(1);
                            this.spanIndex = 0;
                        } else {
                            // 判断当前元素与上一个元素是否相同
                            if (tableData[i].dates === tableData[i - 1].dates) {
                            this.spanArrDate[this.spanIndex] += 1; //需要合并的行数
                            this.spanArrDate.push(0); //新增被合并的行
                            } else {
                            this.spanArrDate.push(1);
                            this.spanIndex = i; //新的需要合并的第几行数
                            }
                        }
                        }
                    }else{
                        this.spanArr=[]
                        this.spanIndex=0
                        for (var i = 0; i <  tableData.length; i++) {
                        if (i === 0) {
                            this.spanArr.push(1);
                            this.spanIndex = 0;
                        } else {
                            // 判断当前元素与上一个元素是否相同
                            if (tableData[i].orderType === tableData[i - 1].orderType) {
                            this.spanArr[this.spanIndex] += 1; //需要合并的行数
                            this.spanArr.push(0); //新增被合并的行
                            } else {
                            this.spanArr.push(1);
                            this.spanIndex = i; //新的需要合并的第几行数
                            }
                        }
                        }
                    }
                    });
                    /*----------- 获取相同编号的数组(end)  --------------*/
                // this.swapArr(this.searchButtons,0,1)
                }).catch(e => {
        
            })
        },
        /*----------- 获取头部数据(end)  --------------*/

        /*----------- 获取列表数据(start)  --------------*/
        getList () {
            let that=this
            this.day = new Date();
            let year=this.day.getFullYear()
            let  month=this.day.getMonth()+1
            let date=this.day.getDate()
            if(month<10){
                month='0'+month
            }
            if(date<10){
                date='0'+date
            }
            this.day = year+"-" + month + "-" + date;
            if(this.ruleForm.dates==''||this.ruleForm.dates==null){
              this.day=this.day
            }else{
              this.day=this.ruleForm.dates
            }
            this.$request.post(URL+'/supdailyremainingtime/listSupdailyremainingSup',{
                //data 参数
                dates: this.day,
                //dates:'2019-10-07',
                supplierCode: this.supplierCode,
                supplierName: this.supplierName
            },{ token: Cookies.get('TOKEN')}).then(data => {
                console.log(data)
                this.tableData=data.rows
              //  this.getSpanArrOne(this.tableData)
                this.total=data.total
                this.pageSize=data.pageSize
                this.tableData.forEach((item, index) => {
                  if(item.dates==""||item.dates==null){
                    item.dates=""
                  }else{
                    item.dates=that.formatData(item.dates)
                  }
                  if(item.orderType==1){
                     item.orderType="手板"
                  }else if(item.orderType==2){
                     item.orderType="模具"
                  }else if(item.orderType==3){
                     item.orderType="钣金"
                  }
                });
               /*----------- 获取相同编号的数组(start)  --------------*/
               this.getHeaderData(this.tableData)
               this.$forceUpdate()
               /*----------- 获取相同编号的数组(end)  --------------*/
               this.getProcessNameData()  //
            }).catch(e => {
      
            })
        },
        /*----------- 获取列表数据(end)  --------------*/

         /*------------  时间格式化(start) --------------*/
        formatData(value) {
            var year = value.substring(0, 4);
            var month = value.substring(5, 7);
            var day = value.substring(8, 10);
            return (
            year + "-" + month + "-" + day 
            );
         },
      /*------------  时间格式化(end) --------------*/

      /*------------  点击搜索(start) --------------*/
      search(){
        let that=this
        this.day = new Date();
        let year=this.day.getFullYear()
        let  month=this.day.getMonth()+1
        let date=this.day.getDate()
        if(month<10){
            month='0'+month
        }
        if(date<10){
            date='0'+date
        }
        this.day = year+"-" + month + "-" + date;
        if(this.ruleForm.dates==''||this.ruleForm.dates==null){
          this.day=this.day
        }else{
          this.day=this.ruleForm.dates
        }
        this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
            //data 参数
            dates:this.day,
            supplierName:this.supplierName,
            orderType:this.ruleForm.orderType,
            supplierCode:this.supplierCode
        },{ token: Cookies.get('TOKEN')}).then(data => {
            this.tableData=data.rows
          //  this.getSpanArrOne(this.tableData)
            this.total=data.total
            this.pageSize=data.pageSize
            this.tableData.forEach((item, index) => {
              if(item.dates==""||item.dates==null){
                item.dates=""
              }else{
                item.dates=that.formatData(item.dates)
              }
              if(item.orderType==1){
                 item.orderType="手板"
              }else if(item.orderType==2){
                 item.orderType="模具"
              }else if(item.orderType==3){
                 item.orderType="钣金"
              }
            });
              /*----------- 获取相同编号的数组(start)  --------------*/
              this.getHeaderData(this.tableData)
             /*----------- 获取相同编号的数组(end)  --------------*/
        }).catch(e => {
  
        })
      },
      /*------------  点击搜索(end) --------------*/

      /*------------  选择日期回调(start) --------------*/
      searchDate(val){
        console.log(val)
        let that = this
        this.day = new Date();
        let year=this.day.getFullYear()
        let  month=this.day.getMonth()+1
        let date=this.day.getDate()
        if(month<10){
            month='0'+month
        }
        if(date<10){
            date='0'+date
        }
        this.day = year+"-" + month + "-" + date;
        if(val==''||val==null){
          this.day=this.day
        }else{
          this.day=val
        }
        this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
            //data 参数
            dates:this.day,
            supplierName:this.ruleForm.supplierName,
            orderType:this.ruleForm.orderType,
            supplierCode:this.supplierCode
        },{ token: Cookies.get('TOKEN')}).then(data => {
            this.tableData=data.rows
          //  this.getSpanArrOne(this.tableData)
            this.total=data.total
            this.pageSize=data.pageSize
            this.tableData.forEach((item, index) => {
              if(item.dates==""||item.dates==null){
                item.dates=""
              }else{
                item.dates=that.formatData(item.dates)
              }
              if(item.orderType==1){
                item.orderType="手板"
              }else if(item.orderType==2){
                item.orderType="模具"
              }else if(item.orderType==3){
                item.orderType="钣金"
              }
            });
              /*----------- 获取相同编号的数组(start)  --------------*/
              this.getHeaderData(this.tableData)
            /*----------- 获取相同编号的数组(end)  --------------*/
            this.getProcessNameData()
        }).catch(e => {

        })
      },
      /*------------  选择日期回调(start) --------------*/

      changeSelectOrderType(val){
        this.search()
      },
      
      /*----------- 搜索框按钮点击事件(start)  --------------*/
      clickEven(even){
            if(even=="清空"){
            this.$refs['ruleForm'].resetFields();
            this.getList()
            }else if(even=="查询"){
            this.search()
            }else if(even=="新增"){
              if(this.isSupplier=='登录用户不是此供应商'){
                this.$message({
                  type: 'error',
                  message: '登录用户不是此供应商!'
                });
              }else{
                this.dialog=true
              }
              //this.dialog=true
            }
        },
     /*----------- 搜索框按钮点击事件(end)  --------------*/

      /*----------- 编辑(start)  --------------*/
      edit(){
        if(this.tableData.length>0){
          this.isEdit=true;
          this.isSave=false;
        }else{
          this.$message({
            type: 'error',
            message: '暂时没有数据可修改!'
          });
        }
      },
      /*----------- 编辑(end)  --------------*/

      /*----------- 编辑(start)  --------------*/
      del(index,row){
        this.isDelActive=index 
        let that = this
        this.$confirm('删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '删除中',
            background: 'rgba(255, 255, 255, 0.4)'

          });
          this.$request.post(URL+'/supdailyremainingtime/deleteSupdailyremaining',{
            //data 参数
            id:row.id,
            supplierCode:row.supplierCode,
            supplierName:row.supplierName
          },{token: Cookies.get('TOKEN')}).then(data => {
            if(data.msg=="成功"){
               setTimeout(() => {
                loading.close();
                that.tableData.splice(index,1)
                that.isEditActive=-1
                this.isDelActive=-1
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }, 1000);
            }
          }).catch(e => {

          })
        }).catch(() => {
          this.isDelActive=-1  
        });
      },
     /*----------- 编辑(end)  --------------*/

     save(){
        let that=this
        this.day = new Date();
        let year=this.day.getFullYear()
        let  month=this.day.getMonth()+1
        let date=this.day.getDate()
        if(month<10){
            month='0'+month
        }
        if(date<10){
            date='0'+date
        }
        this.day = year+"-" + month + "-" + date;
        if(this.ruleForm.dates==''||this.ruleForm.dates==null){
          this.day=this.day
        }else{
          this.day=this.ruleForm.dates
        }
        this.tableData.forEach((item, index) => {
          if(item.dates==""||item.dates==null){
            item.dates=""
          }else{
            item.dates=that.formatData(item.dates)
          }
          if(item.orderType=="手板"){
             item.orderType="1"
          }else if(item.orderType=="模具"){
             item.orderType="2"
          }else if(item.orderType=='钣金'){
             item.orderType="3"
          }
        });
       const loading = this.$loading({
        lock: true,
        text: '提交数据中',
        // spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.4)'
      });
       this.$request.post(URL+'/supdailyremainingtime/updateSupdailyremaining',{
          list:this.tableData,
          dates:this.day
        },{ token: Cookies.get('TOKEN')}).then(data => {
            console.log(data)
            if(data.msg=="成功"){
              this.isEdit=false;
              this.isSave=true;
              this.getList()
              setTimeout(() => {
                loading.close();
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
              }, 1000);
            }else{
              loading.close();
              this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
            }
        }).catch(e => {

       })
     },
      /*------------  获取工序列表(start) --------------*/
      getProcessNameData(){
        let that=this
        this.day = new Date();
        let year=this.day.getFullYear()
        let  month=this.day.getMonth()+1
        let date=this.day.getDate()
        if(month<10){
            month='0'+month
        }
        if(date<10){
            date='0'+date
        }
        this.day = year+"-" + month + "-" + date;
        if(this.ruleForm.dates==''||this.ruleForm.dates==null){
          this.day=this.day
        }else{
          this.day=this.ruleForm.dates
        }
        this.$request.post(URL+'/supdailyremainingtime/getProcessNames',{
          dates: this.day,
          orderType:this.initDialogForm.orderType
        },{ token: Cookies.get('TOKEN')}).then(data => {
           this.processNameData=data.obj
        }).catch(e => {

        })
      },
       /*------------  获取工序列表(end) --------------*/

        /*------------  选择工序的回调(start) --------------*/
       selectProcessName(val){
          this.listData=[]
          this.checkedProcessName=val
          if(this.checkedProcessName.length==0){
            this.listData=[]
          }else{
            this.checkedProcessName.forEach((item,index) => {
              this.listData.push({
                processName:item,
                yestdOrderNumh:0,
                todayOrderNumh:0,
                startOrderNumh:0,
                dailyCapacityh:0,
                othercusOrderNumh:0,
                hlhOrderNumh:0
              })
            });
          }
       },
        /*------------  选择工序的回调(end) --------------*/

       /*------------  选择工序类别的回调(start) --------------*/
      selectOrderType(){
        this.listData=[]
        this.initDialogForm.processName=[]
        this.getProcessNameData()
      },
      /*------------  选择工序类别的回调(end) --------------*/

      /*----------- 提交表单数据(start)  --------------*/
        dialogEven(even){
          if(even=="确定"){
            this.submitDialogData()
          }else if(even=="取消"){
            this.cancel()
          }
      },
      /*----------- 取消(start)  --------------*/
      cancel(){
          this.dialog = false
      },
     /*----------- 取消(end)  --------------*/
     submitDialogData() {
      //提交弹框数据
      let that=this
      this.day = new Date();
      let year=this.day.getFullYear()
      let  month=this.day.getMonth()+1
      let date=this.day.getDate()
      if(month<10){
          month='0'+month
      }
      if(date<10){
          date='0'+date
      }
      this.day = year+"-" + month + "-" + date;
      if(this.ruleForm.dates==''||this.ruleForm.dates==null){
        this.day=this.day
      }else{
        this.day=this.ruleForm.dates
      }
      console.log(this.supplierName)
      this.$refs['initDialogForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.4)'
            });
            //新增
            this.$request.post(URL+'/supdailyremainingtime/saveSupdailyremaining',{
              list:this.listData,
              orderType:this.initDialogForm.orderType,
              supplierCode: this.supplierCode,
              supplierName: this.supplierName,
              shortName:this.shortName,
              dates:this.day
            },{token: Cookies.get('TOKEN')}).then(data => {
              if(data.msg=="成功"){
                this.getList()
                this.listData=[]
                this.$refs['initDialogForm'].resetFields();
                setTimeout(() => {
                  loading.close();
                  this.dialog = false
                  this.$message({
                    type: 'success',
                    message: '新增工序成功!'
                  });
                }, 1000);
              }else{
                loading.close();
                this.$message({
                    type: 'error',
                    message: '新增工序失败!'
                  });
              }
            }).catch(e => {

           })
          }else {
          return false;
        }
      });
    },
     /*----------- 提交表单数据(end)  --------------*/
    },
}