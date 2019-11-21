import Cookies from 'js-cookie'
export default {
    name: "productionGrab",
    data () {
        return {
            menuId: '7ecba3c9-c414-11e9-8631-000c290d53bf',
            pageSize: 15,
            currentPage:1,
            total:0,
            loading: true,
            tableHeight: window.innerHeight - 250,
           // twoTableHeight:window.innerHeight - 800,
            ruleForm:{
                poNo:'',attachmentOriginal3dname:'',orderNo:'',statusCode:'',dateType:'',start:'',end:''
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
            expands:[],
            twoTableShow3d:false,
            twoTableShowCncm:false,
            twoTableShowCncp:false,
            twoTableShowVc:false,
            twoTableShowFm:false,
            quotationListData:[],
            seconds_timeout : 90,
            time : '',
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
            this.$request.post('/pmpomain/listPoMain', {
                serachType:"2",
                page:currentPage,
                rows:pageSize,
                attachmentOriginal3dname:this.ruleForm.attachmentOriginal3dname,
                poNo:this.ruleForm.poNo,
                statusCode:this.ruleForm.statusCode,
                dateType:this.ruleForm.dateType,
                starts:this.ruleForm.start,
                ends:this.ruleForm.end,
                menuId: this.menuId
            }).then(res => {
            console.log("获取一级表数据")
            if (res.code == 0) {
                this.tableDataOne=res.obj.rows;
                this.total=res.obj.total;
                this.loading=false;
                this.tableDataOne.forEach((item,index) => {
                    that.getsalesCname(item.salesCname,'salesCname')
                    that.getsalesCname(item.pmUsercode,'pmUsercode')
                    that.getsalesCname(item.qcUsercode,'qcUsercode')
                    that.getsalesCname(item.packUsercode,'packUsercode')
                });
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
            this.$request.post('/pmpodetails/listPoDetails', {
                page:"1",
                rows:"200",
                mainId: mainId
            }).then(res => {
                console.log("获取二级表数据")
                console.log(res)    //请求成功方法，data为请求成功返回的数据
             if (res.code == 0) {
                 this.tableDataTwo3d=res.obj.list3DPmPo;
                 this.tableDataTwoCncm=res.obj.listCncmPmPo;
                 this.tableDataTwoCncp=res.obj.listCncpPmPo;
                 this.tableDataTwoVc=res.obj.listVcPmPo;
                 this.tableDataTwoFm=res.obj.listFmPmPo;
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
            menuId:'7ecbb315-c414-11e9-8631-000c290d53bf',
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
            }).catch(e => {
    
            })
        },
         /*----------- 获取表头工具栏按钮列表数据(start)  --------------*/

         /*----------- 通过code获取名字(start)  --------------*/
         getsalesCname(code,type){
            this.$request.post('/hremployeeinfo/userCodeByName',{
                //data 参数
                userCode:code
            }).then(res => {
                if(res.code==0){
                    // row.pmUsercode=res.obj
                    this.tableDataOne.forEach((item,index) => {
                        if(type=='salesCname'){
                            item.salesCname=res.obj
                        }
                        if(type=='pmUsercode'){
                            item.pmUsercode=res.obj
                        }
                        if(type=='qcUsercode'){
                            item.qcUsercode=res.obj
                        }
                        if(type=='packUsercode'){
                            item.packUsercode=res.obj
                        }
                    });
                }
            }).catch(e => {
      
            })
         },
          /*----------- 通过code获取名字(end)  --------------*/

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

          /*----------- 小计(下载附件)  --------------*/
         downFile(index,row){
            console.log(row)
            this.$request.get('/pmpomain/orderDown',{
                //data 参数
                mainId:row.id
            }).then(res => {
                if(res.code==0){
                   console.log(res)
                }
            }).catch(e => {
        
            })
         }
    },
}