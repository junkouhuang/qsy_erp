import Cookies from 'js-cookie'
import axios from 'axios'
let URL=''
export default {
  name: "paymentType",
  components: {},
  data() {
      var checkPayAmount=(rule, value, callback) => {
        if (!value) {
          return callback(new Error('实收原币金额不能为空'));
        } else {
          const reg = /^\d+(\.\d{1,2})?$/
          if (reg.test(value)) {
            callback();
          } else { 
            return callback(new Error('请输入正确的金额数'));
          }
        }
      }
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
      ruleForm:{
        tranNo: '',supplierCode:'', supplierName: '', tranStauts:'',
      },
      supplierCodeList:[], //生产商编号列表
      supplierNameList:[], //生产商名称列表
      dateOptions:[],
      initDialogForm:{
        supplierName:'',
        supplierCode:'',
        accountBankname:'',
        payBankname:'',
        payAmount:'',
        tranDate:'',
        boolAdvancePayment:'',
        remarks:''
      },
      rules:{
        supplierName:[
            {  required: true, message: '请选择生产商名称', trigger: 'change' }
        ],
        supplierCode:[
            {  required: true, message: '请选择生产商编码', trigger: 'change' }
        ],
        accountBankname:[
            {  required: true, message: '请选择收款银行', trigger: 'change' }
        ],
        payBankname:[
            {  required: true, message: '请选择打款银行', trigger: 'change' }
        ],
        payAmount:[
            { validator: checkPayAmount, trigger: 'blur' }
        ],
        tranDate:[
            {  required: true, message: '请选择打款日期', trigger: 'change' }
        ]
      },
      bankList:[],//收款银行列表
      waitReconciliation:'', //待核销金额
      payAmount:'', //付款金额
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
        this.$request.post(URL+'/finaccountspay/listfinAccountsPay',{
           //data 参数
           accountCode:this.accountCode,
           page:val,
           rows:this.pageSize,
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
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
         }).catch(e => {
  
         })
     },
     /*----------- 点击上下页获取列表数据(end)  --------------*/
  
     /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
     handleSizeChange(val) {
        let that=this
        this.$request.post(URL+'/finaccountspay/listfinAccountsPay',{
           //data 参数
           rows:val,
           accountCode:this.accountCode
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
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
         }).catch(e => {
  
         })
     },
     /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList(){
      let that=this
      this.$request.post(URL+'/finaccountspay/listfinAccountsPay',{
          //data 参数
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
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
        menuId:'e09b958b-bffd-11e9-8631-000c290d53bf',
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
        this.$request.post(URL+'/finaccountspay/AccountsRushRed',{
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
      }else if(even=="新增"){
        this.dialog=true
        this.dialogTitle="新建流水"
      }
    },

    search(){
      let that=this
      this.$request.post(URL+'/finaccountspay/listfinAccountsPay',{
          //data 参数
          tranNo: this.ruleForm.tranNo,
          supplierCode:this.ruleForm.supplierCode, 
          supplierName: this.ruleForm.supplierName, 
          tranStauts:this.ruleForm.tranStauts,
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
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

      /*------------  获取生产商编号列表(start) --------------*/
      getSupplierCode(val){
        this.$request.post(URL+'/finaccountspay/getSupplierOutMCodes',{
            //data 参数
            code:val,
            token: Cookies.get('TOKEN'),
        }).then(data => {
           this.supplierCodeList=data.obj
        }).catch(e => {

        })
      },
      /*------------  获取生产商编号列表(end) --------------*/

      /*------------  生产商编号选择回调(start) --------------*/
      selectSupplierCode(val){
      
      },

     /*----------- 生产商编号选择回调(start)  --------------*/

     /*------------  获取生产商名字列表(start) --------------*/
     getSupplierName(val){
        this.$request.post(URL+'/finaccountspay/getSupplierOutMNames',{
            //data 参数
            name:val,
            token: Cookies.get('TOKEN'),
        }).then(data => {
           this.supplierNameList=data.obj
        }).catch(e => {

        })
      },
      /*------------  获取生产商名字列表(end) --------------*/

      /*------------  生产商名字选择回调(start) --------------*/
      selectSupplierName(val){
       
      },

     /*----------- 生产商名字选择回调(start)  --------------*/

      /*------------  弹框生产商名字选择回调(start) --------------*/
     formSelectSupplierName(val){

     },
      /*------------  弹框生产商名字选择回调(end) --------------*/

      /*------------  弹框生产商名字选择回调(start) --------------*/
      formSelectSupplierCode(val){

      },
       /*------------  弹框生产商名字选择回调(end) --------------*/
    
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

      dialogEven(even){
        if(even=="确定"){
          this.submitDialog()
        }else if(even=="取消"){
          this.dialog=false
          this.supplierNameList=[]
        }
      },

       /*------------  提交新增流水表单(start) --------------*/
       submitDialog(){
        this.$refs['initDialogForm'].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
              });
              if(this.initDialogForm.boolAdvancePayment==true){
                  this.initDialogForm.boolAdvancePayment=1
              }else if(this.initDialogForm.boolAdvancePayment==false){
                  this.initDialogForm.boolAdvancePayment=0
              }
              this.$request.post(URL+'/finaccountspay/savefinAccountsPay',{
                supplierName:this.initDialogForm.supplierName,
                supplierCode:this.initDialogForm.supplierCode,
                accountBankname:this.initDialogForm.accountBankname,
                payBankname:this.initDialogForm.payBankname,
                payAmount:this.initDialogForm.payAmount,
                tranDate:this.initDialogForm.tranDate,
                boolAdvancePayment: this.initDialogForm.boolAdvancePayment,
                remarks:this.initDialogForm.remarks
              },{ token: Cookies.get('TOKEN'),}).then(data => {
                if(data.msg=="成功"){
                  this.getList()
                  this.supplierNameList=[]
                  setTimeout(() => {
                    loading.close();
                    this.dialog = false
                    this.$message({
                      type: 'success',
                      message: this.dialogTitle + '成功!'
                    });
                  }, 1000);
                }else{
                   loading.close();
                   this.$message({
                      type: 'error',
                      message: this.dialogTitle + '失败!'
                    });
                }
              }).catch(e => {

              })
            } else {
              console.log('error submit!!');
              return false;
            }
        });
      },
      /*------------  提交新增流水表单(end) --------------*/

       /*------------  合计(start) --------------*/
        getTotals(){
            this.$request.post(URL+'/finaccountspay/getAccountsTotals',{
                tranNo: this.ruleForm.tranNo,
                supplierCode:this.ruleForm.supplierCode, 
                supplierName: this.ruleForm.supplierName, 
                tranStauts:this.ruleForm.tranStauts,
            }).then(data => {
                console.log(data)
                this.waitReconciliation=data.obj.waitReconciliation
                this.payAmount=data.obj.payAmount
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
                case "payAmount":
                sums[index] = this.payAmount; 
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
         /*------------  合计(end) --------------*/
  }
};