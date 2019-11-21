import Cookies from 'js-cookie'
import axios from 'axios'
import { request } from 'https';
import dayjs from 'dayjs'
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
                label: 'text'
            },
            isSlide:false,
            ruleForm:{
                beginDate:'',
                Date:'',
            },
            tableData:[],
            tHeadData: [],
            tableHeight: window.innerHeight - 180,
            loading: true,//加载
            searchButtons:[], //搜索栏按钮
            listOneTableOperation:[],  //一级表按钮列表
            listToolBarOperation:[],  //工具栏按钮列表
            isEditActive:-1,
            dateCheck: {},
            defaultDate:Date.now(),
            day:'',
            nowMoth:'',
            hrCode:'',
            code:'',
        }
    },
    mounted () {
        setTimeout(() => {
            this.loading = false;
        }, 500); 
        this.getHeaderData()
        this.getTreeHrOrgDept()
    },
    created () {
        this.dateCheck = this.pickerOptions()
    },
    watch: {
        
    },
    methods: {
         /*----------- 限制选择日期(start)  --------------*/ 
        pickerOptions(){
            let seft=this
            return{
                disabledDate(time){
                    // console.log(time)
                    if(seft.ruleForm.beginDate==''||seft.ruleForm.beginDate==null){
                        let _now = dayjs().format('YYYY-MM-DD') //获取当天的日期
                        let dayOne = dayjs(_now).startOf('month').format('YYYY-MM-DD') //获取当月份的第一天
                        let sc = dayjs(_now).valueOf() //当前时间的时间戳
                        let disff = sc - (sc - dayjs(dayOne).valueOf())  //sc - dayjs(dayOne).valueOf()  当月份的第一天到当前时间的时间戳差  disff得到的是当月份的第一天的时间戳
                        return time.getTime() < disff || time.getTime() > sc
                    }else{
                         let _now = dayjs().format('YYYY-MM')
                         if(_now==seft.ruleForm.beginDate){
                            let _now = dayjs().format('YYYY-MM-DD')
                            let dayOne = dayjs(_now).startOf('month').format('YYYY-MM-DD')
                            let sc = dayjs(_now).valueOf()
                            let disff = sc - (sc - dayjs(dayOne).valueOf())
                            return time.getTime() < disff || time.getTime() > sc
                         }else{
                            let dayOne = dayjs(seft.ruleForm.beginDate).startOf('month').format('YYYY-MM-DD')
                            let dayEnd=dayjs(seft.ruleForm.beginDate).endOf('month').format('YYYY-MM-DD')
                            let sc = dayjs(dayEnd).valueOf()
                            let disff = sc - (sc - dayjs(dayOne).valueOf())
                            return time.getTime() < disff || time.getTime() > sc
                         }　　　　　
                    }
                }
            }
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

        /*----------- 获取头部数据(start)  --------------*/
        getHeaderData(){
            this.$request.post(URL+'/sysOperation/listOperationBar',{
                //data 参数
                menuId:'3034a0c6-18c2-11e9-9c29-1c1b0dafe9b6',
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
            if(this.ruleForm.beginDate==''||this.ruleForm.beginDate==null){
                this.nowMoth= year+"-" + month
                if(this.ruleForm.Date==''||this.ruleForm.Date==null){
                    this.day=this.day
                  }else{
                    this.day=this.ruleForm.Date
                  }
            }else{
                this.day=this.ruleForm.Date
                this.nowMoth=this.ruleForm.beginDate
            }
            if(this.hrCode==''||this.hrCode==null){
                this.hrCode="0"
            }
            if(this.code==''||this.code==null){
                this.code="全部人员"
            }
            this.$request.post(URL+'/salesdailywork/listSalesDailyWorks',{
                //data 参数
                hrCode:this.hrCode,
                code:this.code,
                beginDate:this.nowMoth,
                Date:this.day
            }).then(data => {
               // console.log(data)
                this.tableData=data
                this.tableData.forEach((item, index) => {
                  if(item.d==""||item.d==null){
                    item.d=""
                  }else{
                    item.d=that.formatData(item.d)
                  }
                });
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
            if(this.ruleForm.beginDate==''||this.ruleForm.beginDate==null){
                this.nowMoth= year+"-" + month
                if(this.ruleForm.Date==''||this.ruleForm.Date==null){
                    this.day=this.day
                  }else{
                    this.day=this.ruleForm.Date
                  }
            }else{
                this.nowMoth=this.ruleForm.beginDate
                this.day=this.ruleForm.Date
            }
            this.$request.post(URL+'/salesdailywork/listSalesDailyWorks',{
                //data 参数
                hrCode:this.hrCode,
                code:this.code,
                beginDate:this.nowMoth,
                Date:this.day
            }).then(data => {
                this.tableData=data
                this.tableData.forEach((item, index) => {
                  if(item.d==""||item.d==null){
                    item.d=""
                  }else{
                    item.d=that.formatData(item.d)
                  }
                });
            }).catch(e => {
      
            })
        },
        /*------------  点击搜索(end) --------------*/

        /*------------  选择日期回调(start) --------------*/
        searchDate(val){
            this.defaultDate=val
            
        },
        /*------------  选择日期回调(start) --------------*/
        
        /*----------- 搜索框按钮点击事件(start)  --------------*/
        clickEven(even){
                if(even=="清空"){
                this.$refs['ruleForm'].resetFields();
                }else if(even=="查询"){
                this.search()
                }else if(even=="新增"){
                this.dialog=true
                }
            },
        /*----------- 搜索框按钮点击事件(end)  --------------*/

        /*----------- 编辑(start)  --------------*/
        edit(index,row){
            row.isEdit=true;
        },
        /*----------- 编辑(end)  --------------*/

        save(index,row){
            console.log(row)
            let Date=row.d.split('-')
            let dwCode=''
            Date.forEach(element => {
                dwCode=dwCode+element
            });
            const loading = this.$loading({
             lock: true,
             text: '提交数据中',
             // spinner: 'el-icon-loading',
             background: 'rgba(255, 255, 255, 0.4)'
           });
            this.$request.post(URL+'/salesdailywork/saveSalesDailyWork',{
                dwDate:row.d,
                emailCount:row.emailCount,
                dwCode:row.salesNo+dwCode,
                salesCode:row.salesNo,
                salesCname:row.salesCname,
                callCount:row.callCount,
                lookingForInfo:row.lookingForInfo,
                visitCustomerCount:row.visitCustomerCount,
                customerVisitCount:row.customerVisitCount,
                quoteCount:row.quoteCount,
                quoteCost:row.quoteCost,
                orderCount:row.orderCount,
                orderCost:row.orderCost,
                plCount:row.packingListCount,
                payCost:row.paymentAmount,
                deptName:row.deptName,
                statusNo:row.statusNo
             }).then(data => {
                 if(data.msg=="成功"){
                   row.isEdit=false;
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

        /*----------- 点击左侧树(start)  --------------*/
        handleNodeClick (val) {  
            console.log(val)
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
            if(this.ruleForm.beginDate==''||this.ruleForm.beginDate==null){
                this.nowMoth= year+"-" + month
                if(this.ruleForm.Date==''||this.ruleForm.Date==null){
                    this.day=this.day
                  }else{
                    this.day=this.ruleForm.Date
                  }
            }else{
                this.day=this.ruleForm.Date
                this.nowMoth=this.ruleForm.beginDate
            }
            this.$request.post(URL+'/salesdailywork/listSalesDailyWorks',{
                //data 参数
                beginDate:this.nowMoth,
                Date:this.day,
                hrCode:val.id,
                code:val.value
            }).then(data => {
                this.tableData=data
                this.hrCode=val.id
                this.code=val.value
                this.tableData.forEach((item, index) => {
                  if(item.d==""||item.d==null){
                    item.d=""
                  }else{
                    item.d=that.formatData(item.d)
                  }
                });
            }).catch(e => {
      
            })
        },
        /*----------- 点击左侧树(end)  --------------*/
        /*----------- 获取左侧树形列表(start)  --------------*/
        getTreeHrOrgDept(){
            this.$request.post(URL+'/salesdailywork/getEmployeeTree',{
            //data 参数
            token: Cookies.get('TOKEN'),
            }).then(data => {
                if(data.code==0){
                    this.treeData=data.obj.children
                    this.treeData.forEach((item,index) => {
                        if(item.checked==true){
                            this.hrCode=item.id
                            this.code=item.value
                        }else{
                            item.children.forEach((elem,i) => {
                                if(elem.checked==true){
                                    this.hrCode=item.id
                                    this.code=item.value
                                }
                            });
                        }
                    });
                    this.getList()
                }
            }).catch(e => {
    
            })
        },
        /*----------- 获取左侧树形列表(end)  --------------*/

        /*----------- 导出Excel(start)  --------------*/
        downExcel(){
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
            if(this.ruleForm.beginDate==''||this.ruleForm.beginDate==null){
                this.nowMoth= year+"-" + month
                if(this.ruleForm.Date==''||this.ruleForm.Date==null){
                    this.day=this.day
                  }else{
                    this.day=this.ruleForm.Date
                  }
            }else{
                this.nowMoth=this.ruleForm.beginDate
                this.day=this.ruleForm.Date
            }
            const loading = this.$loading({
            lock: true,
            text: '导出Excel中',
            // spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.4)'
            });
            this.$request.post(URL+'/salesdailywork/getExcel',{
                hrCode:this.hrCode,
                code:this.code,
                beginDate:this.nowMoth,
                Date:this.day
            },{ token: Cookies.get('TOKEN')}).then(data => {
                if(data.msg=="成功"){
                    window.open(data.obj)
                    setTimeout(() => {
                    loading.close();
                    this.$message({
                        type: 'success',
                        message: '导出Excel成功!'
                    });
                    }, 1000);
                }else{
                    loading.close();
                    this.$message({
                        type: 'error',
                        message: '导出Excel失败!'
                    });
                }
            }).catch(e => {
    
            })
        },
         /*----------- 导出Excel(end)  --------------*/
    },
}