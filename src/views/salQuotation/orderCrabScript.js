import Cookies from 'js-cookie'
export default {
    name: "orderCrab",
    data () {
        return {
            menuId: '7ecbb16b-c414-11e9-8631-000c290d53bf',
            pageSize: 15,
            currentPage:1,
            total:0,
            loading: true,
            tableHeight: window.innerHeight - 250,
           // twoTableHeight:window.innerHeight - 800,
            ruleForm:{
               orderNo:'',start:'',end:''
            },
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
            searchButtons:'',  //搜索框按钮列表
            tableDataOne:[], //一级表数据列表
            oneOperation:[],//一级表操作
            twoOperation:[],//二级表操作
            tHeadDataOne: [],//一级表头
            tHeadDataTwo3d: [],//二级表头---3d打印
            tHeadDataTwoCncm: [],//二级表头---cnc金属
            tHeadDataTwoCncp: [],//二级表头---cnc塑料
            tHeadDataTwoVc: [],//二级表头---复模
            tHeadDataTwoFm: [],//二级表头---快速模具
            tableDataTwo3d: [], //二级表数据---3d打印
            tableDataTwoCncm: [], //二级表数据---cnc金属
            tableDataTwoCncp: [], //二级表数据---cnc塑料
            tableDataTwoVc: [], //二级表数据---复模
            tableDataTwoFm: [], //二级表数据---快速模具
            countData: [],
            twoTableShow3d:false,
            twoTableShowCncm:false,
            twoTableShowCncp:false,
            twoTableShowVc:false,
            twoTableShowFm:false,
            footShow: false,   
            quotationListData:[],
            orderList:'', //订单编号列表
            toolsList:'', //工具栏列表
            dialogQuo:false,
            dialogTitle:'',
            boolDoll: 0,     //公仔
            boolMaterial: false, //材料证明
            boolSample: 0,   //样品申请
            rate:'',  //税率
            totalCost:'', //税率总额
            quotationId:'', //抢单id
        }
    },
    mounted () {
        this.getOneTableData(this.currentPage,this.pageSize)
        this.getListOperationBar()
        setTimeout(() => {
            this.loading = false;
        }, 500);
    },
    // filters:{
    //     filtersalesCname(item){
    //         console.log(item)
    //     }
    // },
    methods: {
         /*----------- 开始时间(start)  --------------*/
        beginDate(){
            let self = this
            return {
            disabledDate(time){
                if(self.ruleForm.end){
                return new Date(self.ruleForm.end).getTime() < time.getTime()
                }
            }
            }
        },
        /*----------- 开始时间(end)  --------------*/
    
        /*----------- 结束日期(start)  --------------*/
        //提出结束时间必须大于提出开始时间
        processDate(){
            let self = this
            return {
            disabledDate(time){
                if(self.ruleForm.start){
                return new Date(self.ruleForm.start).getTime() > time.getTime()
                }
            }
            }
        },
        /*----------- 结束日期(end)  --------------*/

        handleSizeChange(val) {
            this.pageSize=val;
            this.getOneTableData(this.currentPage,val);
          },
          handleCurrentChange(val) {
            this.getOneTableData(val,this.pageSize);
          },
      
        /*----------- 获取一级表数据(start)  --------------*/
        getOneTableData(currentPage,pageSize){
            let that=this
            this.$request.post('/salordmain/listSalOrdMainByOrder', {
                searchType:"1",
                page:currentPage,
                rows:pageSize,
                orderNo:this.ruleForm.orderNo,
                orderDeliveryStartDate :this.ruleForm.start,
                orderDeliveryEndDate :this.ruleForm.end,
                menuId: this.menuId
            }).then(res => {
            console.log("获取一级表数据")
            if (res.code == 0) {
                this.tableDataOne=res.obj.rows;
                this.total=res.obj.total;
                this.tableDataOne.forEach((item) => {
                  item.orderCost="xxx"
                  item.poCost="xxx"
                });
                this.loading=false;
            }
            }).catch(e=>{
                console.log("错误")
            })
        },
        /*----------- 获取一级表数据(end)  --------------*/

        /*----------- 获取二级表数据(start)  --------------*/
        expandSelect(row,expandedRows){
            this.getTwoTableData(row.id);
        },
         //获取二级表数据
        getTwoTableData(mainId){
            let that=this
            this.twoTableShow3d=false;
            this.twoTableShowCncm=false;
            this.twoTableShowCncp=false;
            this.twoTableShowVc=false;
            this.twoTableShowFm=false;
            this.footShow=true;
            this.$request.post('/salorddetails/listSalOrdDetailsByMainId', {
                page:"1",
                rows:"200",
                mainId: mainId
            }).then(res => {
                console.log("获取二级表数据")
             if (res.code == 0) {
                 this.countData = []
                 this.tableDataTwo3d=res.obj.list3Dord;
                 this.tableDataTwoCncm=res.obj.listCncM;
                 this.tableDataTwoCncp=res.obj.listCncP;
                 this.tableDataTwoVc=res.obj.listFast;
                 this.tableDataTwoFm=res.obj.listFm;
                 this.tableDataTwo3d.forEach((item,index) => {
                     if(item.deliveryDate==''||item.deliveryDate==null){
                         item.deliveryDate=''
                     }else{
                         item.deliveryDate=that.formatData(item.deliveryDate)
                     }
                 });
                 this.tableDataTwoCncm.forEach((item,index) => {
                    if(item.deliveryDate==''||item.deliveryDate==null){
                        item.deliveryDate=''
                    }else{
                        item.deliveryDate=that.formatData(item.deliveryDate)
                    }
                });
                this.tableDataTwoCncp.forEach((item,index) => {
                    if(item.deliveryDate==''||item.deliveryDate==null){
                        item.deliveryDate=''
                    }else{
                        item.deliveryDate=that.formatData(item.deliveryDate)
                    }
                });
                this.tableDataTwoFm.forEach((item,index) => {
                    if(item.deliveryDate==''||item.deliveryDate==null){
                        item.deliveryDate=''
                    }else{
                        item.deliveryDate=that.formatData(item.deliveryDate)
                    }
                });
                console.log("====分界线获取二级表数据=====")
                console.log(this.tableDataTwoCncm)
                for(let i=0;i<this.tableDataTwoCncm.length;i++){
                console.info(this.tableDataTwoCncm[i].checkedWireCutting)
                console.info(this.tableDataTwoCncm[i].checkedEdm)
                }
    
                if(this.tableDataTwo3d.length>0){
                 this.twoTableShow3d=true;
                }
                if(this.tableDataTwoCncm.length>0){
                this.twoTableShowCncm=true;
                }
                if(this.tableDataTwoCncp.length>0){
                this.twoTableShowCncp=true;
                }
                if(this.tableDataTwoVc.length>0){
                this.twoTableShowVc=true;
                }
                if(this.tableDataTwoFm.length>0){
                this.twoTableShowFm=true;
                }
                if(this.tableDataTwo3d.length>0||this.tableDataTwoCncm.length>0||this.tableDataTwoCncp.length>0||this.tableDataTwoVc.length>0||this.tableDataTwoFm.length){
                  this.footShow=false
                }
                
    
            }
            }).catch(e=>{
                console.log("错误")
            })
        },
        /*----------- 获取二级表数据(start)  --------------*/
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

         /*----------- 获取表头工具栏按钮列表数据(start)  --------------*/
        getListOperationBar(){
            this.$request.post('/sysOperation/listOperationBar',{
            //data 参数
            menuId:'7ecbb16b-c414-11e9-8631-000c290d53bf',
            token: Cookies.get('TOKEN'),
            }).then(data => {

                this.tHeadDataOne=data.obj.listOneColumn;
                this.searchButtons=data.obj.listSearchBarOperation //搜索按钮列表
                this.oneOperation=data.obj.listOneTableOperation //一级表按钮列表
                this.tHeadDataTwo3d=data.obj.listTwoColumn3d  //二级表头---3d打印
                this.tHeadDataTwoCncm=data.obj.listTwoColumncncm //二级表头---cnc金属
                this.tHeadDataTwoCncp=data.obj.listTwoColumncncp //二级表头---cnc塑料
                this.tHeadDataTwoVc=data.obj.listTwoColumnvc  //二级表头---复模
                this.tHeadDataTwoFm=data.obj.listTwoColumnfm  //二级表头---快速模具
                this.toolsList = data.obj.listToolBarOperation;
            }).catch(e => {
    
            })
        },
         /*----------- 获取表头工具栏按钮列表数据(start)  --------------*/

         /*----------- 快速模具二级表合并(start)  --------------*/
        quoteSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (column.label=='产品材料'||column.label=='型腔数'||column.label=='模坯'||column.label=='浇口方式'||column.label=='膜坯类型'||column.label=='制作周期（天）'||column.label=='模具寿命'||column.label=='模具寿命'||column.label=='模具单价'
            ||column.label=='合计价格'||column.label=='模仁'||column.label=='行位/斜顶') {
            // if(column.label=='操作' ||columnIndex == '模具要求' || columnIndex == '其它要求' || columnIndex === '模具数量' || columnIndex === '模具单价' || columnIndex === '模具总价' || columnIndex === '折后总价' || columnIndex === '原币金额' || columnIndex === '交货日期'){
                if(typeof row.mouldMergeId!="null"){
                let rowNum = 0
                let rowNumNoFlag = 0
                // 索引出需要的合并的个数
                this.tableDataTwoFm.forEach(item => {
                    if (item.mouldMergeId === row.mouldMergeId) {
                    rowNum = rowNum + 1
                    }
                })
        
                // 索引出第一次 合并的参数
                if (rowNum !== 0) {
                    for (let i = 0; i < this.tableDataTwoFm.length; i++) {
                    if (this.tableDataTwoFm[i].mouldMergeId != '' && this.tableDataTwoFm[i].mouldMergeId === row.mouldMergeId) {
                        rowNumNoFlag = i
                        break
                    }
                    }
                }
                // 根据索引的合并个数和 第一次出现的位置 进行合并
                if (rowNum !== 0 && rowNumNoFlag === rowIndex) {
                    return {
                    rowspan: rowNum,
                    colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    }
                }
                }else{
                return {
                    rowspan: 0,
                    colspan: 0
                }
                }
            }
        },
        /*----------- 快速模具二级表合并(end)  --------------*/

        /*----------- 搜索框按钮点击事件(start)  --------------*/
        clickEven(even){
            if(even=="清空"){
                this.$refs['ruleForm'].resetFields();
                this.getOneTableData(this.currentPage,this.pageSize)
            }else if(even=="查询"){
                this.getOneTableData(this.currentPage,this.pageSize)
            }
        },
        /*----------- 搜索框按钮点击事件(end)  --------------*/

         /*----------- 小计(start)  --------------*/
        getTotal3D(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
              if (index === 5) {
                sums[index] = '小计';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (column.property === 'partQty') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'onepartmaterialCost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'cnc3dSinglehours') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'hand_singlehours') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'sup_totalcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }
      
      
              else {
                sums[index] = '';
              }
            });
      
            return sums;
        },
        getTotalVc(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
              if (index === 5) {
                sums[index] = '小计';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (column.property === 'partQty') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'sup_totalmaster_VCcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'cnc3dSinglehours') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'otherSinglehours') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'sup_unitcost') { 
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }else if (column.property === 'sup_totalcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }else if (column.property === 'supTotalmoldVccost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }
      
      
              else {
                sums[index] = '';
              }
            });
      
            return sums;
        },
        getTotalFm(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
              if (index === 13) {
                sums[index] = '小计';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (column.property === 'supFmouldMoldcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'supUnitcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'productPrice') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              } else if (column.property === 'supTotalcost') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }else if (column.property === 'partQty') {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index];
              }
      
      
              else {
                sums[index] = '';
              }
            });
      
            return sums;
        },
         /*----------- 小计(end)  --------------*/

        /*----------- 下载附件(start)  --------------*/
         downFile(index,row){
            console.log(row.id)
            window.location.href =this.$request.defaults.baseURL+'/salorddetailsattachment/ordSalMainDownLoadOss?id='+row.id+'&token='+Cookies.get('TOKEN');
         },
         /*----------- 下载附件(end)  --------------*/

         /*----------- 查看报表(start)  --------------*/
         checkQuotation(index,row){
            this.$request.post('/salordmain/showOrderDetailsById',{
                //data 参数
                ids:row.id
            }).then(res => {
                if(res.code==0){
                   window.location.href=res.obj
                }
            }).catch(e => {
        
            })
         },
         /*----------- 查看报表(end)  --------------*/

         /*----------- 抢单(start)  --------------*/
         grabSingle(index,row){
            const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
            });
            this.$request.post('/salordmain/listSalOrdMainByGrab',{
                //data 参数
                id:row.id,
                statusCode:'OD2'
            }).then(res => {
                if(res.code==0){
                    this.getOneTableData(this.currentPage,this.pageSize)
                    setTimeout(() => {
                        loading.close();
                        this.dialog = false
                        this.$message({
                            type: 'success',
                            message: '抢单成功!'
                        });
                    }, 1000);
                }else{
                   loading.close();
                   this.$message({
                      type: 'error',
                      message: '抢单失败!'
                    });
                }
            }).catch(e => {
        
            })
         },
        /*----------- 抢单(end)  --------------*/

        /*----------- 获取订单编号列表(start)  --------------*/
        // getOrderNo(val){
        //   this.$request.post('/salordmain/listSalOrdMainByOrder', {
        //       searchType:"2",
        //       page:this.currentPage,
        //       rows:this.pageSize,
        //       orderNo:val,
        //       orderDeliveryStartDate :this.ruleForm.start,
        //       orderDeliveryEndDate :this.ruleForm.end,
        //       menuId: this.menuId
        //   }).then(res => {
        //   if (res.code == 0) {
        //     if(res.obj.rows.length<10){
        //       this.orderList=res.obj.rows
        //     }else{
        //       this.orderList=res.obj.rows.slice(0,10)
        //     }
        //   }
        //   }).catch(e=>{
        //       console.log("错误")
        //   })

        // },
       /*----------- 获取订单编号列表(end)  --------------*/

        /*----------- 选择订单编号的回调函数(start)  --------------*/
        //  selectOrderNo(val){
        //     this.getOneTableData(this.currentPage,this.pageSize)
        //     this.orderList=[]
        //  },
         querySearchAsync(queryString, callback) {
           var list = [{}];
           if (queryString !== '') {
              this.$request.post('/salordmain/listSalOrdMainByOrder', {
                  searchType:"2",
                  page:this.currentPage,
                  rows:this.pageSize,
                  orderNo:queryString,
                  orderDeliveryStartDate :this.ruleForm.start,
                  orderDeliveryEndDate :this.ruleForm.end,
                  menuId: this.menuId
              }).then(res => {
                if (res.code == 0) {
                  if(res.obj.rows.length==0){
                    list.push({'value':'未搜索到结果'})
                  }
                  if(res.obj.rows.length<10){
                    this.orderList=res.obj.rows
                    this.orderList.forEach((item) => {
                      list.push({'value':item.orderNo})
                    });
                  }else{
                    this.orderList=res.obj.rows.slice(0,10)
                    this.orderList.forEach((item) => {
                      list.push({'value':item.orderNo})
                    });
                  }
                  callback(list);
                }
              }).catch(e=>{
                  console.log("错误")
              })
          }else{
            if(this.tableDataOne.length<10){
              this.orderList=this.tableDataOne
              this.orderList.forEach((item) => {
                list.push({'value':item.orderNo})
              });
            }else{
              this.orderList=this.tableDataOne.slice(0,10)
              this.orderList.forEach((item) => {
                list.push({'value':item.orderNo})
              });
            }
          }
          callback(list);
        },
        handleSelect(item) {
           this.searchTypeQuotation(item.value)
        },
         /*----------- 选择订单编号的回调函数(end)  --------------*/

         searchTypeQuotation(val){
            this.$request.post('/salordmain/listSalOrdMainByOrder', {
              searchType:"2",
              page:this.currentPage,
              rows:this.pageSize,
              orderNo:val,
              orderDeliveryStartDate :this.ruleForm.start,
              orderDeliveryEndDate :this.ruleForm.end,
              menuId: this.menuId
          }).then(res => {
            if (res.code == 0) {
              this.tableDataOne=res.obj.rows;
              this.total=res.obj.total;
            }
          }).catch(e=>{
              console.log("错误")
          })
         },

        /*----------- 点击订单编号(start)  --------------*/
         editOrderNo(index,row){
            this.dialogQuo=true
            this.dialogTitle='订单信息'
            this.boolDoll=row.boolDoll
            this.boolSample=row.boolSample
            this.boolMaterial=row.boolMaterialProof
            this.quotationId=row.id
            this.rate=row.taxRate
            this.totalCost=row.totalCost
         },
         /*----------- 点击订单编号(end)  --------------*/
          //点击订单编号----保存
        submitDialogData() {
            console.log("报价单号弹窗----保存")
            const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
            });
            this.$request.post('/salordmain/saveOrdMainByOrder', {
              id: this.quotationId,
              boolMaterialProof: parseInt(this.boolMaterial),
              boolSample: parseInt(this.boolSample),
              boolDoll: parseInt(this.boolDoll),
              taxRate: this.rate,
              totalCost: this.totalCost
            }).then(res => {
              console.log(res)    //请求成功方法，data为请求成功返回的数据
              if (res.code == 0) {
                 this.getOneTableData(this.currentPage,this.pageSize)
                 this.dialogQuo = false
                  setTimeout(() => {
                    loading.close();
                    this.dialog = false
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }, 1000);
              }else{
                loading.close();
                this.$message({
                   type: 'error',
                   message: '保存失败!'
                 });
              }
            }).catch(e => {
            console.log("错误")
            })
        },
    },
}