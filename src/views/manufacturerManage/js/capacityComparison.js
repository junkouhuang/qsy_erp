import Cookies from 'js-cookie'
import axios from 'axios'
import { request } from 'https';
let URL=""
export default {
    data () {
        return {
            pageSize:10,
            currentPage:1,
            total:0,
            treeData:[],
            tableHeight: window.innerHeight - 180,
            defaultProps: {
                children: 'children',
                label: 'supplierName'
            },
            isSlide:false,
            ruleForm:{
                dates:'',
                supplierName:'',
                orderType:''
            },
            machineTypeList:[], //类别列表
            tableData:[],
            tableColumn: [
              {
                name: ""
              }
            ],
            tHeadData: [
              {
                name: "dates",
                spanArrIndex: [],
                contactDot: 0,
                label: "日期",
                width: '95'
              },
              {
                name: "supplierName",
                spanArrIndex: [],
                contactDot: 0,
                label: "生厂商",
                width: '130'
              },
              {
                name: "orderType",
                spanArrIndex: [],
                contactDot: 0,
                label: "类别",
                width: '80'
              },
              {
                name: "processName",
                spanArrIndex: [],
                contactDot: 0,
                label: "工序",
                width: '80'
              },
              {
                name: "yestdOrderNumh",
                spanArrIndex: [],
                contactDot: 0,
                label: "昨日下单量",
                width: '100'
              },
              {
                name: "todayOrderNumh",
                spanArrIndex: [],
                contactDot: 0,
                label: "今日存量",
                width: '80'
              },
              {
                name: "startOrderNumh",
                spanArrIndex: [],
                contactDot: 0,
                label: "启动存量",
                width: '80'
              },
              {
                name: "dailyCapacityh",
                spanArrIndex: [],
                contactDot: 0,
                label: "正常单日生产量",
                width: '110'
              },
              {
                name: "othercusOrderNumh",
                spanArrIndex: [],
                contactDot: 0,
                label: "其他客户存量",
                width: '110'
              },
              {
                name: "hlhOrderNumh",
                spanArrIndex: [],
                contactDot: 0,
                label: "HLH存量",
                width: '100'
              },
              {
                name: "hlhOrderNum",
                spanArrIndex: [],
                contactDot: 0,
                label: "余下HLH订单数",
                width: '120'
              },
              {
                name: "hlhOrderCost",
                spanArrIndex: [],
                contactDot: 0,
                label: "余下HLH订单金额",
                width: '120'
              },
              {
                name: "lateDeliveryNum",
                spanArrIndex: [],
                contactDot: 0,
                label: "迟交单数",
                width: '100'
              },
              {
                name: "reworkNum",
                spanArrIndex: [],
                contactDot: 0,
                label: "返工单数",
                width: '100'
              },
              {
                name: "reluctantlyReceiving",
                spanArrIndex: [],
                contactDot: 0,
                label: "勉强收货单数",
                width: '115'
              },
              {
                name: "remarks",
                spanArrIndex: [],
                contactDot: 0,
                label: "备注",
                width: '115'
              }
            ],
            loading: true,//加载
            spanArr:[], //类别合行数
            spanArrSupplierName:[],//生产商合行数
            spanArrDate:[], //日期合行数
            supplierCode:'',
            spanIndex:'',
            day:'', //当天日期
        }
    },
    mounted () {
        setTimeout(() => {
            this.loading = false;
        }, 500); 
        this.getTreeData() 
        this.getList()
    },
    methods: {
         /*----------- 合并行(start)  --------------*/
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            let obj = this.tHeadData[columnIndex];
            if(columnIndex===2||columnIndex===10||columnIndex===11||columnIndex===12||columnIndex===13||columnIndex===14||columnIndex===15){
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                  rowspan: _row,
                  colspan: _col
                };
            }else if(columnIndex===1){
                const _row = this.spanArrSupplierName[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                  rowspan: _row,
                  colspan: _col
                };
            }else if(columnIndex===0){
                const _row = this.spanArrDate[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                  rowspan: _row,
                  colspan: _col
                };
            }
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
            }).catch(e => {
    
            })
        },
        /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

        /*----------- 获取相同编号的数组(start)  --------------*/
        getHeaderData(tableData){
          this.tHeadData.forEach((obj, i) => {
            if(obj.name==='supplierName'){
              this.spanArrSupplierName=[]
              this.spanIndex=0
              for (var i = 0; i <  this.tableData.length; i++) {
                if (i === 0) {
                  this.spanArrSupplierName.push(1);
                  this.spanIndex = 0;
                } else {
                  // 判断当前元素与上一个元素是否相同
                  if (this.tableData[i].supplierName === this.tableData[i - 1].supplierName) {
                    this.spanArrSupplierName[this.spanIndex] += 1; //需要合并的行数
                    this.spanArrSupplierName.push(0); //新增被合并的行
                  } else {
                    this.spanArrSupplierName.push(1);
                    this.spanIndex = i; //新的需要合并的第几行数
                  }
                }
              }
            }else if(obj.name==='dates'){
              this.spanArrDate=[]
              this.spanIndex=0
              for (var i = 0; i <  this.tableData.length; i++) {
                if (i === 0) {
                  this.spanArrDate.push(1);
                  this.spanIndex = 0;
                } else {
                  // 判断当前元素与上一个元素是否相同
                  if (this.tableData[i].dates === this.tableData[i - 1].dates) {
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
              for (var i = 0; i <  this.tableData.length; i++) {
                if (i === 0) {
                  this.spanArr.push(1);
                  this.spanIndex = 0;
                } else {
                  // 判断当前元素与上一个元素是否相同
                  if (this.tableData[i].orderType === this.tableData[i - 1].orderType) {
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
        },
        /*----------- 获取相同编号的数组(start)  --------------*/

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
            this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
                //data 参数
                dates: this.day,
                supplierCode:''
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

        /*----------- 点击全部公司(start)  --------------*/
        onAllMaintain(){
          let that=this
          this.supplierCode=''
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
            let treeItem= document.getElementsByClassName("el-tree-node");
            for (let i = 0; i < treeItem.length; i++) {
                treeItem[i].classList.remove("is-current")      
            }
            document.querySelector(".allEmployee").classList.add("isOntree")
        },
         /*----------- 点击全部公司(end)  --------------*/

        /*----------- 点击左侧树(start)  --------------*/
        handleNodeClick (data) { 
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
            document.querySelector(".allEmployee").classList.remove("isOntree")
            let that=this
            this.supplierCode=data.supplierCode
            this.$request.post(URL+'/supdailyremainingtime/listSupdailyremaining',{
                //data 参数
              dates:this.day,
              supplierCode:data.supplierCode
            },{token: Cookies.get('TOKEN')}).then(data => {
                this.tableData=data.rows
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
        /*----------- 点击左侧树(end)  --------------*/

        /*----------- 获取树形列表数据(start)  --------------*/
        getTreeData(){
            this.$request.post(URL+'/qt/tbpmsupplieroutm/listSupplierM',{
                //data 参数
                token: Cookies.get('TOKEN'),
            }).then(data => {
                this.treeData=data.rows
            }).catch(e => {
      
            })
        },

        /*----------- 点击按钮隐藏左边树形结构(start)  --------------*/ 
        leftSlide(){
            let slideLeft=document.querySelector("#left");
            if(this.isSlide){
            slideLeft.style.display="block";
            }else{
            slideLeft.style.display="none";
            }
            this.isSlide=!this.isSlide
        },
      /*----------- 点击按钮隐藏左边树形结构(end)  --------------*/ 

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
        }).catch(e => {
  
        })
      },
      /*------------  点击搜索(end) --------------*/

      /*------------  选择日期回调(start) --------------*/
      searchDate(val){
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
        }).catch(e => {
  
        })
      },
      /*------------  选择日期回调(start) --------------*/
      
      /*------------  点击清空(start) --------------*/
      resetForm(forname){
        this.$refs[forname].resetFields();
        this.getList()
      },
      /*------------  点击清空(end) --------------*/

      /*------------  导入Excel(start) --------------*/
      downTemplate(){

      },
       /*------------  导入Excel(end) --------------*/

    },
}