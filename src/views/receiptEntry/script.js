import Cookies from 'js-cookie'
import axios from 'axios'
let URL=''
export default {
  name: "receiptEntry",
  components: {},
  data() {
    var checkAccountCode=(rule, value, callback) => {
      if (!value) {
        return callback(new Error('收款账号不能为空'));
      } else {
        // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        // console.log(reg.test(value));
        // if (reg.test(value)) {
        //   callback();
        // } else {  "收款账号并不在CRM中"
        //   return callback(new Error('请输入正确的手机号'));
        // }
        this.$request.post(URL+'/finbanktransactions/detectionAccountCode',{
          //data 参数
          accountCode:value
        },{token: Cookies.get('TOKEN')}).then(data => {
          if(data.code==0){
            if(data.obj=="收款账号并不在CRM中"){
              return callback(new Error('收款账号并不在CRM中'));
            }else{
              callback();
            }
          }
        }).catch(e => {
 
        })
      }
    }
    var receiptsAmount=(rule, value, callback) => {
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
       
      },
      initDialogForm:{
        accountCode:'',
        accountCname:'',
        gbank:'',
        bankCname:'',
        addedTax:'',
        currencyCode:'',
        remarks:''
      },
      rules:{
        accountCode:[
          {validator: checkAccountCode, trigger: 'blur'}
        ],
        accountCname:[
            { required: true, message: '收款人名称不能为空', trigger: 'blur' },
        ],
        gbank:[
            {  required: true, message: '请选择收款银行', trigger: 'change' }
        ],
        bankCname:[
          { required: true, message: '收款支行为空', trigger: 'blur' },
        ],
        addedTax:[
          { required: true, message: '增值税不能为空', trigger: 'blur' },
        ],
        currencyCode:[
          {  required: true, message: '请选择币种', trigger: 'change' }
        ]
      },
      bankList:[],
      addReceiptEntryDialog:false,
      addReceiptEntryDialogTitle:'',
      addReceiptEntryDialogForm:{
        accountCode:'',
        bankCname:'',
        accountCname:'',
        addedTax:'',
        customerFullname:'',
        customerCode:'',
        salesUsercode:'',
        tranDate:'',
        receiptsAmount:'',
        currencyCode:'',
        rate:'',
        rmbAmount:'',
        remarks:''
      },
      addReceiptEntryDialogRules:{
        customerFullname:[
          {  required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        customerCode:[
          {  required: true, message: '请选择客户编号', trigger: 'change' }
        ],
        salesUsercode:[
          { required: true, message: '业务员编号不能为空', trigger: 'blur' },
        ],
        tranDate:[
          {  required: true, message: '请选择收款日期', trigger: 'change' }
        ],
        receiptsAmount:[
          { validator: receiptsAmount, trigger: 'blur' }
        ],
        currencyCode:[
          {  required: true, message: '请选择币种', trigger: 'change' }
        ]
      },
      customerFullnameList:[],
      customerCodeList:[],
      currencyCodeList:[],
      gbank:'',
      accountCode:'', //收款账号
      currency:'', //币种编号
    };
  },
  watch: {
      
  },
  mounted() {
    this.getList();
    this.getBankList()
    this.getThisModels()
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
        this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachines',{
           //data 参数
           page:val,
           rows:this.pageSize,
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
         }).catch(e => {
  
         })
     },
     /*----------- 点击上下页获取列表数据(end)  --------------*/
  
     /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
     handleSizeChange(val) {
        let that=this
        this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachines',{
           //data 参数
           rows:val,
           
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.obj
         }).catch(e => {
  
         })
     },
     /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList(){
      let that=this
      this.$request.post(URL+'/finbanktransactions/listVFinBank',{
          //data 参数
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.obj
          this.total=data.total
          this.pageSize=data.pageSize
      }).catch(e => {

      })
      this.$request.post('/sysOperation/listOperationBar',{
        //data 参数
        menuId:'e9a1e69e-bffd-11e9-8631-000c290d53bf',
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.tHeadData=data.obj.listOneColumn
        this.searchButtons=data.obj.listSearchBarOperation
        this.listOneTableOperation=data.obj.listOneTableOperation
        this.listToolBarOperation=data.obj.listToolBarOperation
       // this.listToolBarOperation.reverse()
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

    /*------------  新增收款账号(start) --------------*/
    addAccount(){
        this.dialog = true;
        this.dialogTitle = "新增收款账号";
    },
    /*------------  新增收款账号(end) --------------*/

    /*------------  收款银行选择回调(start) --------------*/
    // selecbankName(even){
    //   this.bankList.forEach((item,index) => {
    //       if(even==item.cname){
    //         this.bankCode=item.code
    //       }
    //   });
    // },
     /*------------  收款银行选择回调(end) --------------*/

     /*------------  客户名称选择回调(start) --------------*/
     selectCustomerFullname(even){
      this.getSalCtCompany()
     },
     /*------------  客户名称选择回调(start) --------------*/

      /*------------  客户编号选择回调(start) --------------*/
      selectCustomerCode(even){
        this.getSalCtCompany()
      },
      /*------------  客户编号选择回调(start) --------------*/
 
      /*------------  币种选择回调(start) --------------*/
      selectCurrencyCode(even){
        this.currency=even
      },
     /*------------  币种选择回调(end) --------------*/

      /*------------  收款日期选择回调(start) --------------*/
     selectTranDate(val){
        this.getRate()
     },
      /*------------  收款日期选择回调(end) --------------*/

     /*------------  新增流水(start) --------------*/
     addReceiptEntry(index,row){
      this.addReceiptEntryDialogForm = {...row,rowIndex:index}   //表单渲染
      this.accountCode=row.accountCode
      this.gbank=row.gbank
      this.addReceiptEntryDialog = true
      this.addReceiptEntryDialogTitle = "新增流水";
     },
      /*------------  新增流水(end) --------------*/

      /*------------  查看该账套流水(start) --------------*/
      checkReceiptEntry(index,row){
       console.log(row)
        this.$router.push({
          path: '/creditCheck',
          query: {
            accountCode: row.accountCode,
          }
        })
      },
      /*------------  查看该账套流水(end) --------------*/

      /*------------  搜索栏按钮点击事件(start) --------------*/
      clickEven(even){
        if(even=="新增收款账号"){
          this.addAccount()
        }
      },
      /*------------  搜索栏按钮点击事件(end) --------------*/

      dialogEven(even){
        if(even=="确定"){
          this.submitDialog()
        }else if(even=="取消"){
          this.dialog=false
        }
      },

      addReceiptEntryDialogEven(even){
        if(even=="确定"){
          this.submitAddReceiptEntryDialog()
        }else if(even=="取消"){
          this.addReceiptEntryDialog=false
        }
      },

      /*------------  提交新增账号表单(start) --------------*/
      submitDialog(){
        this.$refs['initDialogForm'].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
              });
              this.$request.post(URL+'/finbanktransactions/saveBankAccount',{
                accountCode:this.initDialogForm.accountCode,
                accountCname:this.initDialogForm.accountCname,
                bankCname:this.initDialogForm.bankCname,
                gbank:this.initDialogForm.gbank,
                addedTax:this.initDialogForm.addedTax,
                currencyCode:this.initDialogForm.currencyCode,
                remarks:this.initDialogForm.remarks
              },{ token: Cookies.get('TOKEN'),}).then(data => {
                if(data.msg=="成功"){
                  this.getList()
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
      /*------------  提交新增账号表单(end) --------------*/

      /*------------  提交录入流水表单(start) --------------*/
      submitAddReceiptEntryDialog(){
        this.$refs['addReceiptEntryDialogForm'].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
              });
              this.$request.post(URL+'/finbanktransactions/saveBankTransactions',{
                accountCode:this.addReceiptEntryDialogForm.accountCode,
                accountCname:this.addReceiptEntryDialogForm.accountCname,
                bankCname:this.addReceiptEntryDialogForm.bankCname,
                gbank:this.gbank,
                addedTax:this.addReceiptEntryDialogForm.addedTax,
                customerFullname:this.addReceiptEntryDialogForm.customerFullname,
                customerCode:this.addReceiptEntryDialogForm.customerCode,
                salesUsercode:this.addReceiptEntryDialogForm.salesUsercode,
                tranDate:this.addReceiptEntryDialogForm.tranDate,
                currencyCode:this.currency,
                receiptsAmount:this.addReceiptEntryDialogForm.receiptsAmount,
                rate:this.addReceiptEntryDialogForm.rate,
                rmbAmount:this.addReceiptEntryDialogForm.receiptsAmount*this.addReceiptEntryDialogForm.rate,
                remarks:this.addReceiptEntryDialogForm.remarks
              },{ token: Cookies.get('TOKEN'),}).then(data => {
                if(data.msg=="成功"){
                  this.getList()
                  setTimeout(() => {
                    loading.close();
                    this.addReceiptEntryDialog = false
                    this.$message({
                      type: 'success',
                      message: this.addReceiptEntryDialogTitle + '成功!'
                    });
                  }, 1000);
                }else{
                  loading.close();
                  this.$message({
                      type: 'error',
                      message: this.addReceiptEntryDialogTitle + '失败!'
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
      /*------------  提交录入流水表单(end) --------------*/

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

      /*------------  获取币种汇率列表(start) --------------*/
      getThisModels(){
        this.$request.post(URL+'/sysexchangerate/getThisModels',{
            //data 参数
        }).then(data => {
          this.currencyCodeList=data.obj
        }).catch(e => {

        })
      },
      /*------------  获取币种汇率列表(end) --------------*/

      /*------------  通过输入客户名字获取客户名字列表(start) --------------*/
      getCustomerFullname(val){
        this.customerFullnameList=[]
        this.$request.post(URL+'/finbanktransactions/getSalCtCompanyName',{
            //data 参数
            accountCode:this.accountCode,
            name:val
        }).then(data => {
          if(data.msg=="成功"){
            this.customerFullnameList=data.obj
          }
        }).catch(e => {

        })
      },
      /*------------  通过输入客户名字获取客户名字列表(end) --------------*/

      /*------------  通过输入客户编号获取客户编号列表(start) --------------*/
      getCustomerCode(val){
        this.customerCodeList=[]
        this.$request.post(URL+'/finbanktransactions/getSalCtCompanyName',{
          //data 参数
            accountCode:this.accountCode,
            code:val
        }).then(data => {
          if(data.msg=="成功"){
            this.customerCodeList=data.obj
          }
        }).catch(e => {

        })
      },
      /*------------  通过输入客户编号获取客户编号列表(end) --------------*/
      
      /*------------  获取用户信息(start) --------------*/
      getSalCtCompany(){
        this.customerCodeList=[]
        this.customerFullnameList=[]
        this.$request.post(URL+'/finbanktransactions/getSalCtCompany',{
            //data 参数
            name : this.addReceiptEntryDialogForm.customerFullname,
            code:this.addReceiptEntryDialogForm.customerCode,
            token: Cookies.get('TOKEN'),
        }).then(data => {
           if(data.msg=="成功"){
            this.customerCodeList.push(data.obj.customerCode)
            this.customerFullnameList.push(data.obj.customerFullname)
            this.addReceiptEntryDialogForm.customerCode=this.customerCodeList[0]
            this.addReceiptEntryDialogForm.customerFullname= this.customerFullnameList[0]
            this.addReceiptEntryDialogForm.salesUsercode=data.obj.salesUsercode
            this.currency=data.obj.currencyCode
            this.currencyCodeList.forEach((item,index) => {
              if(data.obj.currencyCode==item.currency){
                this.addReceiptEntryDialogForm.currencyCode=item.rateCname
              }
            });
           }
        }).catch(e => {

        })
      },
      /*------------  获取用户信息(end) --------------*/

      /*------------  通过收款日期获取汇率(start) --------------*/
      getRate(){
        this.$request.post(URL+'/finbanktransactions/getExchangeRate',{
          //data 参数
            currencyCode:this.currency,
            yearMonth:this.addReceiptEntryDialogForm.tranDate
        },{token: Cookies.get('TOKEN')}).then(data => {
          this.addReceiptEntryDialogForm.rate=data.obj.rate
        }).catch(e => {

        })
      },
       /*------------  通过收款日期获取汇率(start) --------------*/
  }
};