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
                salesUsercode:'',
                customerCode:'',
                industryName: '',
                countryName: '',
                sourceName:''
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
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
        }
    },
    mounted () {
        setTimeout(() => {
            this.loading = false;
        }, 500); 
        this.getHeaderData()
        this.getList()
    },
    created () {
        // this.dateCheck = this.pickerOptions()
    },
    watch: {
        
    },
    methods: {
      
         
        /*----------- 获取头部数据(start)  --------------*/
        getHeaderData(){
            this.$request.post(URL+'/sysOperation/listOperationBar',{
                //data 参数
                menuId:'55c192ed-ce82-4799-8146-124bc1cefe29',
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
            this.$request.post(URL+'/customeranalysis/listCustomerAnalysis',{
                //data 参数
                salesUsercode:this.ruleForm.salesUsercode,
                customerCode:this.ruleForm.customerCode,
                industryName: this.ruleForm.industryName,
                countryName: this.ruleForm.countryName,
                sourceName: this.ruleForm.sourceName,
            }).then(data => {
               // console.log(data)
                //this.total=data.total
                // this.pageSize=data.pageSize
                 this.tableData=data.obj
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

            this.$request.post(URL+'/customeranalysis/listCustomerAnalysis',{
                //data 参数
                salesUsercode:this.ruleForm.salesUsercode,
                customerCode:this.ruleForm.customerCode,
                industryName: this.ruleForm.industryName,
                countryName: this.ruleForm.countryName,
                sourceName: this.ruleForm.sourceName,
            }).then(data => {
                // console.log(data)
                this.tableData=data.obj
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
        clickEven(even){
            if(even=="清空"){
              this.$refs['ruleForm'].resetFields();
              this.getList()
            }else if(even=="查询"){
              this.search()
            }
        },

        /*------------  选择日期回调(start) --------------*/
        searchDate(val){
            this.defaultDate=val
            
        },
        /*------------  选择日期回调(start) --------------*/
        
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
        /*----------- 搜索框按钮点击事件(start)  --------------*/
     
        /*----------- 搜索框按钮点击事件(end)  --------------*/

        /*----------- 点击左侧树(start)  --------------*/

        /*----------- 点击左侧树(end)  --------------*/

        /*----------- 获取左侧树形列表(start)  --------------*/
       
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


         arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
              if (columnIndex === 0) {
                return [1, 2];
              } else if (columnIndex === 1) {
                return [0, 0];
              }
            }
          },
    
          objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 ||columnIndex === 1||columnIndex === 2||columnIndex === 3||columnIndex === 4) {
              if (rowIndex % 3 === 0) {
                return {
                  rowspan: 3,
                  colspan: 1
                };
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
           
          }
    },
}