import Cookies from 'js-cookie'
import axios from 'axios'
let URL=''
export default {
  name: "creditCheck",
  components: {},
  data() {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      dialogTitle: "",
      loading: true,
      dialog: false,
      tableData:[],
      tableHeight: window.innerHeight - 180,
      searchButtons:[], //搜索栏按钮
      listOneTableOperation:[],  //一级表按钮列表
      listToolBarOperation:[],  //工具栏按钮列表
      tHeadData:[],   //表头数据列表
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      ruleForm:{
        tranNo: '', customerCode: '', gbank: '', dateType: '', start: '', end: '',
      },
      bankList:[],
      dateOptions:[],
      accountCode:'',
      RMBAmount:'', //人民币金额
      receiptsAmount:'', //原币金额
      waitReconciliation:'', //可核销金额
    };
  },
  watch: {
      
  },
  mounted() {
    this.accountCode=this.$route.query.accountCode
    this.getList();
    this.getBankList()
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  created () {

  },
  methods: {
      /*----------- 点击上下页获取列表数据(start)  --------------*/
      handleCurrentChange(val) {
        let that=this
        this.$request.post(URL+'/finbanktransactions/listFinBank',{
           //data 参数
           accountCode:this.accountCode,
           page:val,
           rows:this.pageSize,
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.tableData.forEach((item, index) => {
            if(item.createdTime==""||item.createdTime==null){
              item.createdTime=""
            }else{
              item.createdTime=that.formatData(item.createdTime)
            }
            if(item.tranDate==""||item.tranDate==null){
              item.tranDate=""
            }else{
              item.tranDate=that.formatData(item.tranDate)
            }
          });
         }).catch(e => {
  
         })
     },
     /*----------- 点击上下页获取列表数据(end)  --------------*/
  
     /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
     handleSizeChange(val) {
        let that=this
        this.$request.post(URL+'/finbanktransactions/listFinBank',{
           //data 参数
           rows:val,
           accountCode:this.accountCode
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.tableData.forEach((item, index) => {
            if(item.createdTime==""||item.createdTime==null){
              item.createdTime=""
            }else{
              item.createdTime=that.formatData(item.createdTime)
            }
            if(item.tranDate==""||item.tranDate==null){
              item.tranDate=""
            }else{
              item.tranDate=that.formatData(item.tranDate)
            }
          });
         }).catch(e => {
  
         })
     },
     /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList(){
      let that=this
      this.$request.post(URL+'/finbanktransactions/listFinBank',{
          //data 参数
          accountCode:this.accountCode
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          console.log(data)
          this.getTotals()
          this.tableData.forEach((item, index) => {
            if(item.createdTime==""||item.createdTime==null){
              item.createdTime=""
            }else{
              item.createdTime=that.formatData(item.createdTime)
            }
            if(item.tranDate==""||item.tranDate==null){
              item.tranDate=""
            }else{
              item.tranDate=that.formatData(item.tranDate)
            }
            if(item.tranStauts==""||item.tranStauts==null){
              item.tranStauts=""
            }else if(item.tranStauts==0){
              item.tranStauts="待核销"
            }else if(item.tranStauts==1){
              item.tranStauts="已核销"
            }else if(item.tranStauts==2){
              item.tranStauts="冲红"
            }else if(item.tranStauts==3){
              item.tranStauts="已冲红"
            }
          });
          this.$forceUpdate()
      }).catch(e => {

      })
      this.$request.post('/sysOperation/listOperationBar',{
        //data 参数
        menuId:'ed2ba018-bffd-11e9-8631-000c290d53bf',
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
       // this.swapArr(this.searchButtons,0,1)
      }).catch(e => {

      })
    },
    /*----------- 获取表格列表数据(end)  --------------*/

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

    /*------------  冲红(start) --------------*/
    clickRCW(index,row){
      console.log(row)
      this.$confirm('是否确认冲红流水号'+row.tranNo, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '冲红中',
          background: 'rgba(255, 255, 255, 0.4)'

        });
        this.$request.post(URL+'/finbanktransactions/RushRed',{
          //data 参数
          id:row.id,
        },{token: Cookies.get('TOKEN')}).then(data => {
          if(data.msg=="成功"){
            this.getList()
             setTimeout(() => {
              loading.close();
              this.$message({
                type: 'success',
                message: '已冲红!'
              });
            }, 1000);
          }
        }).catch(e => {

        })
      }).catch(() => {
       
      });
    },
    /*------------  冲红(end) --------------*/
    
    clickEven(even){
      if(even=="查询"){
        this.search()
      }else if(even=="清空"){
        this.$refs['ruleForm'].resetFields();
        this.getList();
      }
    },

    search(){
      let that=this
      this.$request.post(URL+'/finbanktransactions/listFinBank',{
          //data 参数
          accountCode:this.accountCode,
          tranNo:this.ruleForm.tranNo,
          customerCode:this.ruleForm.customerCode,
          dateType:this.ruleForm.dateType,
          startDate:this.ruleForm.start,
          endDate:this.ruleForm.end,
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          console.log(data)
          this.tableData.forEach((item, index) => {
            if(item.createdTime==""||item.createdTime==null){
              item.createdTime=""
            }else{
              item.createdTime=that.formatData(item.createdTime)
            }
            if(item.tranDate==""||item.tranDate==null){
              item.tranDate=""
            }else{
              item.tranDate=that.formatData(item.tranDate)
            }
            if(item.tranStauts==""||item.tranStauts==null){
              item.tranStauts=""
            }else if(item.tranStauts==0){
              item.tranStauts="待核销"
            }else if(item.tranStauts==1){
              item.tranStauts="已核销"
            }else if(item.tranStauts==2){
              item.tranStauts="冲红"
            }else if(item.tranStauts==3){
              item.tranStauts="已冲红"
            }
          });
          this.$forceUpdate()
      }).catch(e => {

      })
    },

      /*------------  获取银行列表(start) --------------*/
      getBankList(){
        this.$request.post(URL+'/sysbasicinfo/getBasInfo',{
            //data 参数
            parentCode:"BankT",
            token: Cookies.get('TOKEN'),
        }).then(data => {
          this.bankList=data.obj
        }).catch(e => {

        })
      },
      /*------------  获取银行列表(end) --------------*/

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
      /*----------- 结束日期(start)  --------------*/

      /*----------- 合计(start)  --------------*/
       getTotals(){
          this.$request.post(URL+'/finbanktransactions/getTransactionsTotals',{
            //data 参数
            accountCode:this.accountCode,
            tranNo:this.ruleForm.tranNo,
            customerCode:this.ruleForm.customerCode,
        }).then(data => {
          this.RMBAmount=data.obj.RMBAmount
          this.receiptsAmount=data.obj.receiptsAmount
          this.waitReconciliation=data.obj.waitReconciliation
        }).catch(e => {

        })
       },
       getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (column.property === "tranNo") {
            sums[index] = '总计';
            return;
          }
          switch(column.property) {
            case "receiptsAmount":
            sums[index] = this.receiptsAmount;  
            break;
            case "rmbAmount":
            sums[index] = this.RMBAmount; 
            break;
            case "waitReconciliation":
            sums[index] = this.waitReconciliation; 
            break;
            default:
            break;
            }
        });

        return sums;
       },
       /*----------- 合计(end)  --------------*/
  }
};