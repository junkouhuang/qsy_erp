import CustomerAdd from "./template/CustomerAdd";
import CustomerEditor from "./template/CustomerEditor";

export default {
  props:["customerData","treeData"],
  data() {
    return {
      menuId: '25f90deb-a38b-4aa8-a0b5-37af81f17320',
      radio:1,
      dimCompanyNo:[],//用于储存模糊查询的公司编号
      dimCompanyName:[],//用于储存模糊查询的公司名称
      dimCompanyWebsite:[],//用于储存模糊查询的公司网址
      customerType:'公共客户池',//客户类型
      isPassConflict:false,
      restaurants:[],
      searchList: [],  //查找栏
      toolsList: [],     //工具栏
      oneOperation: [],//一级表操作
      twoOperation: [],//二级表操作
      tHeadDataOne: [],//一级表头
      tHeadDataTwo:[],//二级表头
      restaurantsCompanyCode:[],//公司编号输入建议
      restaurantsCompanyName:[],//公司名称输入建议
      restaurantsWebsite1:[],//公司网址输入建议
      restaurantsCountryName:[],//国家输入建议
      restaurantsCompanyEmail:[],//邮箱输入建议
      loading: true,
      hasCheck:false,//表格是否选中
      companyIdArray:[], //客户id数组
      adjustPeopleListData:[],//业务员列表
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      filterConditions: {
        companyNo: "",
        companyName: "",
        website: "",
        countryName: "",
        countryCode:'',
        companyEmail: ""
      },
      editIndex: 0,
      editCustomerIndex: 0,
      editAddRecordIndex: 0,
      isShown: false,
      isShownEdit: false,
      isShownAdd: false,
      isShownAddCompanyInfo: false,
      isShowncustomerAdjust: false,
      isShownAddRecord: false,
      isShownadd_interactionrecord: false,
      isShowneditor_interactionrecord:false,
      formlable: "80px",
      formitemWidth: "120px",
      formitemdate: "80px",
      enabled: "1",
      account_Name: "",
      account_Code: "",
      BankList: [], //银行列表
      currencyTypeList: [], //货币类型列表
      SourceInfoList: [], //来源列表
      CategoryCodeList: [], //客户类别列表
      CategoryCodeinteractionList: [], //互动类别列表
      industryList: [], //行业列表
      ColorList: [], //颜色列表
      monthPayList: [], //月结列表
      add_monthPayList: [], //新增付款方式
      currencyList: [], //货币列表
      accountList: [], //根据银行获取账户
      countryList: [], //国家列表
      cityList: [], //城市列表
      // input
      // inputs: ["公司编号:", "公司名称:"],

      // 编辑弹窗form
      editICompangInfo: {
        customerCode:"",
        companyNumber: "qq", //公司编号
        // customerName:"",
        customerShortname: "", //公司简称
        customerFullname: "", //公司全称
        source: "", //来源
        companyAddress: "",
        customerServiceCategory: "",
        sourceName:'',//客户来源
        categoryCname:'',//客户类别
        industryName:'',
        devDate:'',
        paymentName:'',
        remarks:'',
        website1:'',
        website2:'',
        account_Code: "", //银行账号
        account_Name: "", //银行账号名称
        industry: "",
        countryName: "",
        bankName:'',
        currencyCode:'',
        accountName:'',
        cityName: "",
        shippingAddress: "", //收货地址
        // companyAddress: "",
        companyPhone: "",
        color: "", //颜色标识
        developmentTime: "",
        payment: "",
        note: "",
        collectingBank: "",
        currencyType: "",
        bankAccount: "",
        householder: ""
      },
      // 新增公司信息
      newCompanyInfo: {
        customerCode: "", //公司编号
        customerShortname: "", //公司简称
        customerFullname: "", //公司全称
        sourceCode: "", //客户来源编号
        sourceName: "", //客户来源名称
        website1: "", //网址1
        website2: "", //网址2
        categoryCode: "", //客户分类编号
        categoryCname: "潜在客户", //客户分类名称
        remarks:'',//备注
        industryCode: "", //行业代码
        industryName: "", //行业名称
        countryCname:'',//国家名
        countryCode: "", //国家编号
        countryName: "CHINA", //国家英文名称
        cityName: "", //城市英文名称
        chinaProvinceName: "", //中国省份名称
        chinaCityName: "", //中国城市名称
        chinaCountyName: "", //中国县区名称
        companyAddress: "", //公司地址
        companyPhone: "", //公司电话
        colorCode: "黑色", //颜色代码
        shippingAddress: "", //快递地址
        devDate: "", //发展日期
        paymentName: "现结", //付款方式
        contactRemarks: "", //备注
        bankId: "", //银行ID
        bankName: "", //银行名称
        currencyCode: "", //货币编号
        currencyName: "", //货币名称
        account_Code: "", //银行账号
        account_Name: "", //银行账号名称
        contactCname:'',//姓名
        contactTel:'',//座机
        mailAddress:'',//邮编
        qq:"",
        contactPhone:'',//手机号码
        password:'',//登录密码
        levelName:'普通'
      },
      // 新增公司信息验证规则
      companyInfoRules: {
        customerFullname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        sourceCode: [
          { required: true, message: "请选择来源！", trigger: "change" }
        ],
        contactCname: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
        ],
        website1: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern:  /www\.\w|w/, message:'请输入正确网址！', trigger: 'blur' }
        ],
        website2: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /www\.\w+\.com/, message:'请输入正确网址！', trigger: 'blur' }
        ],
        mailAddress: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'请输入正确邮箱！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { min:6, max:12, message:'请输入不少于6位数字', trigger: 'blur' }
        ],
      },
      // 编辑公司信息
      editorCompanyInfo: {
        customerCode: "", //公司编号
        customerShortname: "", //公司简称
        customerFullname: "", //公司全称
        sourceCode: "", //客户来源编号
        sourceName: "", //客户来源名称
        website1: "", //网址1
        website2: "", //网址2
        categoryCode: "", //客户分类编号
        categoryCname: "潜在客户", //客户分类名称
        remarks:'',//备注
        industryCode: "", //行业代码
        industryName: "", //行业名称
        countryCname:'',//国家名
        countryCode: "", //国家编号
        countryName: "CHINA", //国家英文名称
        cityName: "", //城市英文名称
        chinaProvinceName: "", //中国省份名称
        chinaCityName: "", //中国城市名称
        chinaCountyName: "", //中国县区名称
        companyAddress: "", //公司地址
        companyPhone: "", //公司电话
        colorCode: "黑色", //颜色代码
        shippingAddress: "", //快递地址
        devDate: "", //发展日期
        paymentName: "现结", //付款方式
        contactRemarks: "", //备注
        bankId: "", //银行ID
        bankName: "", //银行名称
        currencyCode: "", //货币编号
        currencyName: "", //货币名称
        account_Code: "", //银行账号
        account_Name: "", //银行账号名称
        contactCname:'',//姓名
        contactTel:'',//座机
        mailAddress:'',//邮编
        qq:"",
        contactPhone:'',//手机号码
        password:'',//登录密码
        levelName:'普通'
      },
      // 添加联系人
      addContactInfo: {
        companyId:'',
        contactNumber: "",
        contactCname:'',
        contactPhone:'',
        contactEname:'',
        customerFullname: "",
        sourceCode: "",
        sourceName: "",
        industryCode: "",
        industryName: "",
        landline: "",
        telephone: "",
        contactEmail: "",
        mailAddress:'',
        position: "",
        skype: "",
        birthdate: "",
        qq: "",
        wechat: "",
        whatsapp: "",
        password: "",
        remarks: "",
        enable: ""
      },
      addContactInfoRules: {
        contactCname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        position: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        mailAddress: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'请输入正确邮箱！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { min:6, max:12, message:'请输入不少于6位数字', trigger: 'blur' }
        ],
      },

      customerForm: {
        companyId:'',
        contactNumber: "",
        contactCname:'',
        contactPhone:'',
        contactEname:'',
        customerFullname: "",
        sourceCode: "",
        sourceName: "",
        industryCode: "",
        industryName: "",
        landline: "",
        telephone: "",
        contactEmail: "",
        mailAddress:'',
        position: "",
        skype: "",
        birthdate: "",
        qq: "",
        wechat: "",
        whatsapp: "",
        password: "",
        remark: "",
        enable: ""
      },

      // 编辑联系人
      editorContactInfo: {
        contactNumber: "",
        customerFullname: "",
        sourceCode: "",
        sourceName: "",
        industryCode: "",
        industryName: "",
        landline: "",
        telephone: "",
        contactEmail: "",
        position: "",
        skype: "",
        birthday: "",
        qq: "",
        weixing: "",
        whatsapp: "",
        loginPwd: "",
        remark: ""
      },
      editorContactInfoRules: {
        contactCname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        position: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        mailAddress: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'请输入正确邮箱！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { min:6, max:12, message:'请输入不少于6位数字', trigger: 'blur' }
        ],
      },

      // 客户调整
      CustomerAdjustData: {
        OldOriginalSalesman: "",
        NewOriginalSalesman: ""
      },
      CustomerAdjustDataRules: {
        NewOriginalSalesman: [
          {required: true, message: "必填字段不能为空！", trigger: "blur"}
        ]
      },
      // 互动记录
      interactionrecord: {
        interactionType: "",
        startdate: "",
        enddate: "",
        pageSize:10,//每页显示多少条
        page:1,//第几页
        total:0//总条数
      },
      // 互动记录中嵌入表格
      interactionrecord_tableData:[],
      // 新增互动记录
      newAddinteractionrecord: {
        customerCode: "",//客户编号customerCode
        customerFullname:'',//客户全称
        contactCode : "",//联系人编号
        contactName:'',//联系人英文名
        contactCname:'',//联系人中文名
        interactType:'',//互动类型（电话，来访等）
        interactDate:'',//互动日期
        salesUsercode:'',//业务员
        contents: "",//互动内容
        theme:'',//互动主题
        reminderDate:'',//提醒时间
        reminderContent: "",//提醒内容
        customerFeedback: "",//客户反馈
        fileName:'',//文件名
        interactionDef1:'',//备用1
      },
      newAddinteractionrecordRules: {
        interactType: [
          { required: true, message: "必选字段不能为空！", trigger: "blur" }
        ],
        theme: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        contents: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' }
        ],
        customerFeedback: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' }
        ],
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      
      // 公司数据：列数据
      tableData: [
        {
          dataItem: "customerCode",
          dataName: "公司编号"
        },
        {
          dataItem: "customerFullname",
          dataName: "公司名称"
        },
        {
          dataItem: "website1",
          dataName: "网址"
        },
        {
          dataItem: "companyPhone",
          dataName: "电话"
        },
        {
          dataItem: "countryName",
          dataName: "国家"
        },
        {
          dataItem: "cityName",
          dataName: "城市"
        },
        {
          dataItem: "categoryCname",
          dataName: "类别"
        },
        {
          dataItem: "industryName",
          dataName: "行业"
        },
        {
          dataItem: "sourceName",
          dataName: "来源"
        },
        {
          dataItem: "devDate",
          dataName: "发展日期"
        },
        {
          dataItem: "levelName",
          dataName: "等级"
        },
        {
          dataItem: "paymentName",
          dataName: "付款方式"
        },
        {
          dataItem: "boolEnabled",
          dataName: "是否启用"
        }
      ],

      // 业务人员数据
      customerCols: [
        {
          dataItem: "contactCode",
          dataName: "联系人编号"
        },
        {
          dataItem: "contactCname",
          dataName: "联系人姓名"
        },
        {
          dataItem: "landline",
          dataName: "座机"
        },
        {
          dataItem: "contactPhone",
          dataName: "手机号码"
        },
        {
          dataItem: "mailAddress",
          dataName: "联系人邮箱"
        },
        {
          dataItem: "position",
          dataName: "职位"
        },
        {
          dataItem: "skype",
          dataName: "skype"
        },
        {
          dataItem: "qq",
          dataName: "QQ"
        },
        {
          dataItem: "wechat",
          dataName: "微信"
        },
        {
          dataItem: "whatsapp",
          dataName: "whatsapp"
        },
        {
          dataItem: "boolEnabled",
          dataName: "是否启用"
        }
      ],
      filteredCustomerData: [],
      concatData:[],
      editorContactRules: {
        customerFullname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        contactCname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        position: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
        mailAddress: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'请输入正确邮箱！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { min:6, max:12, message:'请输入不少于6位数字', trigger: 'blur' }
        ],
      },
      customerDataRuless:{
        customerFullname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
            sourceName: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
            website1: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
            categoryCname: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
            countryName: [
          { required: true, message: "必填字段不能为空！", trigger: "blur" }
        ],
            mailAddress: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'请输入正确邮箱！', trigger: 'blur' }
        ],
            loginPwd: [
          { required: true, message: '必填字段不能为空!', trigger: 'blur' },
          { min:6, max:12, message:'请输入不少于6位数字', trigger: 'blur' }
        ],
      }
    };
  },
  name: "CustomerData",
  components: {CustomerAdd,CustomerEditor},
  watch: {
    customerData(newName) {
      this.customerData = newName;
      //初始化表格数据
      this.filterCustomerData();
    },
    treeData(newName) {
      this.treeData = newName;
    }
  },
  mounted() {
    this.getButtonsList();
  },
  methods: {
    //主表选中客户编号下拉框获取数据
    filterCompanyNo(){
      this.preciseSearch();
    },
    //主表选中公司名下拉框获取数据
    filterCompanyName(){
      this.preciseSearch();
    },
    //主表选中公司网站下拉框获取数据
    filterWebsite(){
      this.preciseSearch();
    },
    vagueSearchFun(){
      this.vagueSearch();
    },
    //主表点击邮箱放大镜获取数据
    filterCompanyEmail(){
      this.preciseSearch();
    },
    //获取输入的公司编号
    getCompanyNo(val){
      this.filterConditions.companyNo =val.trim();
      console.log("去除空格处理");
      console.log( this.filterConditions.companyNo);
      //this.preciseSearch();
    },
    //获取输入的公司名称
    getCompanyName(val){
      this.filterConditions.companyName =val.trim();
      //this.preciseSearch();
    },
    //获取公司的网址
    getWebsite(val){
      this.filterConditions.website =val.trim();
      //this.preciseSearch();
    },
    //获取公司的邮箱
    getCompanyEmail(val){
      this.filterConditions.companyEmail =val.trim();
      //this.preciseSearch();
    },
    //只允许输入纯数字，其余字符自动去除
    validNum(val){
      return val.replace(/[^\d.]/g, "");
    },
    //获取按钮列表
    getButtonsList() {
      this.$request.post('/sysOperation/listOperationBar', { menuId: this.menuId }).then(res => {
        console.log("获取按钮列表")
        console.log(res)    //请求成功方法，data为请求成功返回的数据  25f90deb-a38b-4aa8-a0b5-37af81f17320 客户关系管理系统
        if (res.code == 0) {
        /*  this.tHeadDataOne = res.obj.listOneColumn;

          this.tHeadDataTwo3d = res.obj.listTwoColumn3d;
          this.tHeadDataTwoCncm = res.obj.listTwoColumncncm;
          this.tHeadDataTwoCncp = res.obj.listTwoColumncncp;
          this.tHeadDataTwoVc = res.obj.listTwoColumnvc;
          this.tHeadDataTwoFm = res.obj.listTwoColumnfm;
          */
          this.tHeadDataOne = res.obj.listOneColumn;
          this.tHeadDataTwo = res.obj.listTwoColumn;
          this.searchList = res.obj.listSearchBarOperation;
          this.toolsList = res.obj.listToolBarOperation;
          this.oneOperation = res.obj.listOneTableOperation;
          this.twoOperation = res.obj.listTwoTableOperation;

          //对工具栏按钮进行处理

        }
      }).catch(e => {
        console.log("错误")
      })
    },

    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）" ,'title':'sasasa'},
      ];
    },
      querySearch(queryString, cb) {
          var restaurants = this.restaurantsCompanyCode;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : this.restaurantsCompanyCode;
          // 调用 callback 返回建议列表的数据
          cb(results);
      },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleCurrentChange1(currentPage){
      this.treeData.page = currentPage;
      this.$parent.listByParam(this.treeData);
    },
    handleSizeChange(pageSize){
      this.interactionrecord.pageSize = pageSize;
      this.listByAction();
    },
    handleCurrentChange2(currentPage){
      this.interactionrecord.page = currentPage;
      this.listByAction();
    },
    // 新增弹窗取消按钮
    cancel () {
      this.isShownAddCompanyInfo = false;
    },
    expandChange(row) {
      console.log(row);
      console.log("===");
    },
    //表格行复选框点击事件
    isCheck(row){
       let arr =new Array();
       for(let i = 0;i<row.length;i++){
         arr.push(row[i].id);
       }
      this.companyIdArray = arr.join(',')
      this.hasCheck = row.length>0?true:false;
    },
    //取消
    cancela(form){
      this.$parent.handleNodeClick(this.treeData);
      this.isShownAddCompanyInfo = false;
      this.$refs[form].resetFields();
    },
    //编辑联系人--有启用按钮
    holdCustomer(){
      //客户冲突检测规则：A：公司全称+国家，B：公司网站+国家，C：联系人邮箱
      this.$refs["customerDataRuless"].validate((valid)=> {
        if (valid) {
          let flag = false;
          if (this.concatData[this.editCustomerIndex].mailAddress != "") {
            flag = true;
          }
          if (flag) {
            this.checkCustomerConflict(4)
          }
        }
      })
    },
    updateContactFun(){
      this.$request.post('/salctcontact/updateContact', this.concatData[this.editCustomerIndex]).then(res => {
        this.loading = false
        if (Object.is(res.code, 0)) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.isShownEdit = false;
          this.$parent.handleNodeClick(this.treeData);
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    // 客户信息保存按钮
    saveCompany  () {
      //客户冲突检测规则：A：公司全称+国家，B：公司网站+国家，C：联系人邮箱
      this.$refs["addCompanyInfo"].validate((valid)=> {
        console.log("------ ------");
        console.log(this.newCompanyInfo.customerFullname);
        console.log(this.newCompanyInfo.countryCode);
        console.log(this.newCompanyInfo.website1);
        console.log(this.newCompanyInfo.mailAddress);
      if(valid){
        let flag =false;
        if(this.newCompanyInfo.customerFullname != "" && this.newCompanyInfo.countryCode!=""){
          flag =true;
        }
        if(this.newCompanyInfo.website1 != "" && this.newCompanyInfo.countryCode!=""){
          flag =true;
        }
        if(this.newCompanyInfo.mailAddress != ""){
          flag =true;
        }
        if(flag){
          this.checkCustomerConflict(0)
        }
      }
    })
    },
    //客户信息新增保存
    saveCompanyFun(){
          this.loading = true;
          this.$request.post('/salctcompany/saveCompany', this.newCompanyInfo).then(res => {
            this.loading = false
            this.$message({
              message: '恭喜你，保存成功！',
              type: 'success'
            });
            this.isShownAddCompanyInfo = false;
            this.$refs["addCompanyInfo"].resetFields();
            this.$parent.handleNodeClick(this.treeData);
          })
    },
    //根据条件搜索列表(模糊搜索)
    vagueSearch(){
      console.log("------");
      this.loading = true
      this.$request.post('/salctcompany/vagueSearch',{ //salctcompany/preciseSearch   salctcompany/ vagueSearch
        customerCode:this.filterConditions.companyNo,
        fullName:this.filterConditions.companyName,
        countryCode:this.filterConditions.countryCode,
        website:this.filterConditions.website,
        email:this.filterConditions.companyEmail}).then(res => {
        this.loading = false
        this.filteredCustomerData=res.obj;
        if(res.obj.length>10){
          this.dimCompanyNo =res.obj.slice(0,10);
          this.dimCompanyName=res.obj.slice(0,10);
          this.dimCompanyWebsite=res.obj.slice(0,10);
        }else{
          this.dimCompanyNo =res.obj;
          this.dimCompanyName=res.obj;
          this.dimCompanyWebsite=res.obj;
        }
      })
    },
    //根据条件搜索列表(精确查询)
    preciseSearch(){
      console.log("------");
      this.loading = true
      this.$request.post('/salctcompany/preciseSearch',{ //salctcompany/preciseSearch   salctcompany/ vagueSearch
        customerCode:this.filterConditions.companyNo,
        fullName:this.filterConditions.companyName,
        countryCode:this.filterConditions.countryCode,
        website:this.filterConditions.website,
        email:this.filterConditions.companyEmail}).then(res => {
          this.loading = false
          this.filteredCustomerData=res.obj;
          if(res.obj.length>10){
            this.dimCompanyNo =res.obj.slice(0,10);
            this.dimCompanyName=res.obj.slice(0,10);
            this.dimCompanyWebsite=res.obj.slice(0,10);
          }else{
            this.dimCompanyNo =res.obj;
            this.dimCompanyName=res.obj;
            this.dimCompanyWebsite=res.obj;
          }
      })
    },
    filterCustomerData: function() {
      this.filteredCustomerData = [];
        for (var i = 0; i < this.customerData.length; i++) {
        if (
          !this.filterConditions.companyNo ||
          this.customerData[i].companyNumber === this.filterConditions.companyNo
        )
        if (
          !this.filterConditions.companyName ||
          this.customerData[i].customerShortname ===
            this.filterConditions.companyName
        )
        if (
          !this.filterConditions.companyAdress ||
          this.customerData[i].website1 ===
            this.filterConditions.companyAddress
        )
        if (
          !this.filterConditions.companyCountry ||
          this.customerData[i].countryName ===
            this.filterConditions.companyCountry
        ) {

          this.filteredCustomerData.push(this.customerData[i]);
          for(let i =0;i<this.filteredCustomerData.length;i++){
            this.restaurantsCompanyCode.push({value:this.filteredCustomerData[i].customerCode})
            this.restaurantsCompanyName.push({value:this.filteredCustomerData[i].customerFullname})
            this.restaurantsWebsite1.push({value:this.filteredCustomerData[i].website1})
            this.restaurantsCountryName.push({value:this.filteredCustomerData[i].countryName})
            //this.restaurantsCompanyEmail.push({value:this.filteredCustomerData[i].customerCode})
          }
          console.log( this.restaurantsCompanyCode);
        }
      }
        this.loading = false;
    },
    //客户信息编辑保存
    saveCustomerForEditor(){
      //客户冲突检测规则：A：公司全称+国家，B：公司网站+国家，C：联系人邮箱(编辑客户信息界面没有邮箱，故邮箱传空)
      this.$refs["customerDataRuless"].validate((valid)=> {
        if (valid) {
          let flag = false;
          if (this.customerData[this.editIndex].customerFullname != "" && this.customerData[this.editIndex].countryCode != "") {
            flag = true;
          }
          if (this.customerData[this.editIndex].website1 != "" && this.customerData[this.editIndex].countryCode != "") {
            flag = true;
          }
          /*if (this.customerData[this.editIndex].mailAddress != "") {
            flag = true;
          }*/
          if (flag) {
            this.checkCustomerConflict(1)
          }
        }
      })
    },
    saveCustomerForEditorFun(){

          this.loading = true
          this.$request.post('/salctcompany/updateCompany', this.customerData[this.editIndex]).then(res => {
            this.isShown = false;
            this.loading = false
            this.$parent.handleNodeClick(this.treeData);
            this.$message({
              message: '保存成功!',
              type: 'success'
            });
          })

    },
    //
    updateCompanyFun(){
      this.$request.post('/salctcompany/updateCompany', this.customerData[this.editIndex]).then(res => {
        this.isShown = false;
        this.loading = false
        this.$parent.handleNodeClick(this.treeData);
        this.$message({
          message: '保存成功!',
          type: 'success'
        });
      })
    },
    //清除查询条件
    clearInputData(){
      this.filterConditions.companyNo = "";
      this.filterConditions.companyName = "";
      this.filterConditions.website = "";
      this.filterConditions.countryCode = ""
      this.filterConditions.countryName = "";
      this.filterConditions.companyEmail = "";
      console.log("清空");
      console.log(this.customerData);
      this.filteredCustomerData= this.customerData;
    },
    //获取国家code
    selectCountry1(row){
      this.filterConditions.countryCode = row.countryCode;
    },
    //客户冲突检测
    checkConflict(){
      //客户冲突检测规则：A：公司全称+国家，B：公司网站+国家，C：联系人邮箱 (不会去拿业务员你的潜在客户进行比较)
      let companyName = this.filterConditions.companyName;//公司全称
      let website = this.filterConditions.website;//公司网站
      let countryCode = this.filterConditions.countryCode;//国家code
      let companyEmail = this.filterConditions.companyEmail;//联系人邮箱
      let flag = false;
      if(companyName != "" && countryCode!=""){
        flag = true;
      }
      if(website != "" && countryCode!=""){
        flag = true;
      }
      if(companyEmail != ""){
        flag = true;
      }
      if(flag){
        let arr = {fullName:companyName,countryCode:countryCode,website:website,email:companyEmail}
        this.checkCustomer(arr);
      }else{
        this.$message({
          dangerouslyUseHTMLString: true,
          message:  `<table>
                <tr><td>客户冲突检测原则</td></tr>
                <tr><td>A：公司全称+国家，B：公司网站+国家，C：联系人邮箱</td></tr>
                </table>`
        });
      }
    },
    //客户冲突检测方法
    checkCustomer(arr){
      this.$request.post('/salctcompany/checkCustomer', arr).then(res => {
        if(Object.is(0)) {
          this.$message({
            message:  '本次检测结果无冲突，可以新增',
            type: 'success'
          });
          this.isPassConflict =true;
        }else{
          this.$message({
            message: '本次检测结果有冲突，不可新增',
            type: 'error'
          });
          this.isPassConflict =false;
        }
      })
    },
    checkCustomerConflict(i){
      let data = new Array();
      //客户
        if(Object.is(i,0)){
          data = {
            'fullName':this.newCompanyInfo.customerFullname,
            'countryCode':this.newCompanyInfo.countryCode,
            'website':this.newCompanyInfo.website1,
            'email':this.newCompanyInfo.mailAddress
          }
        }
      if(Object.is(i,1)){
        data = {
          'fullName':this.customerData[this.editIndex].customerFullname,
          'countryCode':this.customerData[this.editIndex].countryCode,
          'website':this.customerData[this.editIndex].website1,
          'email':''
        }
      }
        //联系人
      if(Object.is(i,3)){
        data = {
          'fullName':'',
          'countryCode':'',
          'website':'',
          'email':this.addContactInfo.mailAddress
        }
      }
      if(Object.is(i,4)){
        data = {
          'fullName':'',
          'countryCode':'',
          'website':'',
          'email':this.concatData[this.editCustomerIndex].mailAddress
        }
      }

      this.$request.post('/salctcompany/checkCustomer', data).then(res => {
        if(Object.is(res.code,0)) {
          if(Object.is(i,0)){
            this.saveCompanyFun();//客户新增信息保存
          }
          if(Object.is(i,1)){
            this.saveCustomerForEditorFun();//客户编辑信息保存
          }
          if(Object.is(i,3)){
            this.addContactInfoFun();//联系人新增信息保存
          }
          if(Object.is(i,4)){
            this.updateContactFun();//联系人修改信息保存
          }
        }else{
          this.$message({
            message: '本次检测结果有冲突，不可新增',
            type: 'error'
          });
        }
      })
    },
    //组合表展开获取子表数据
    listByCompany(row){
     this.listByCompanyId(row.id);
  },
    listByCompanyId(companyId){
    //  this.$refs.refTable.toggleRowExpansion(row)
      this.loading = true;
      this.$request.post('/salctcontact/listByCompanyId', {companyId :companyId}).then(res => {
        this.concatData=res.obj;
        this.loading = false;
      })
    },
    getMeunList() {},
    // 增加联系人弹窗
    pop_up_add: function(row) {
      this.isShownAdd = true;
      this.addContactInfo.companyId=row.row.id;
    },
    fold_add: function() {
      this.isShownAdd = false;
    },
    // 编辑弹窗
    startEdit: function(index) {
      this.isShown = true;
      this.editIndex = index;
    },
    pop_up_edit: function() {
      // this.isShown = !this.isShown;
      this.isShown = true;
    },
    fold_edit: function() {
      this.isShown = false;
    },
    // 跳转订单详情页面
    pop_up_order() {
      this.$router.push({
        path: "/OrderDetails"
      });
    },
    // 跳转发送邮件页面
    send_email() {
      this.$router.push({ path: "/SendEmails" });
    },
    // 跳转发送短信页面
    send_note() {
      this.$router.push({ path: "/SendNote" });
    },
    //新增报价
    AdditionalQuotation(row,index){
     this.$router.push({ path: "/quotation" ,query:{dataType:'crm',customerCode:row.row.customerCode,contactCode:this.concatData[index].contactCode}});
    },
    // 跳转到添加互动记录弹窗
    add_record(inx,index) {
      this.isShownAddRecord = true;
      this.editIndex = inx;
      this.editCustomerIndex = index;
      this.getBasInfo();
      this.listByAction();
    },
    //分页点击事件
    getByPage(index){
      console.log(index);
    },
    //点击互动类型下拉列搜索数据
    getListByCategory(){
      this.listByAction();
    },
    //互动记录列表
    listByAction(){
      this.$request.post('/sal/ctinteraction/listByAction', {
        rows:this.interactionrecord.pageSize,
        page:this.interactionrecord.page,
        interactType:this.interactionrecord.interactionType,
        beginDate:this.interactionrecord.startdate,
        endDate:this.interactionrecord.enddate
      }).then(res => {
        this.interactionrecord_tableData = res.rows;
        this.interactionrecord.total=res.total;
      })
    },
    //互动类型
    getBasInfo(){
      this.$request.post('/sysbasicinfo/getBasInfo', {parentCode:'CIT'}).then(res => {
        console.log(res);
        if(Object.is(res.code,0)){
          this.CategoryCodeinteractionList = res.obj;
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    // 编辑互动弹窗
    EditRecord(index) {
      this.isShowneditor_interactionrecord = true;
      this.editAddRecordIndex = index;
    },
    //清除互动记录条件
    clearInteractionrecord(){
      this.interactionrecord.interactionType = "";
      this.interactionrecord.startdate = "";
      this.interactionrecord.enddate = "";
    },


    /*----------- 新增互动记录(start)  --------------*/

    //点击弹出互动记录新增界面
    add_interactionrecord() {
      this.isShownadd_interactionrecord = true;
    },

    //新增互动记录点击确定按钮事件
    saveaction(){
      this.newAddinteractionrecord.customerFullname = this.filteredCustomerData[this.editIndex].customerFullname;
      this.newAddinteractionrecord.customerCode = this.filteredCustomerData[this.editIndex].customerCode;
      this.newAddinteractionrecord.contactCode = this.concatData[this.editCustomerIndex].contactCode;
      this.newAddinteractionrecord.contactName = this.filteredCustomerData[this.editIndex].contactCname;
      this.$refs["addAddinteractionrecord"].validate((valid)=> {
        if(valid){
          this.loading = true;
          this.$request.post('/sal/ctinteraction/saveAction ', this.newAddinteractionrecord).then(res => {
            if(Object.is(res.code,0)){
              this.$message({
                message: '恭喜你，保存成功！',
                type: 'success'
              });
              this.listByAction();
              this.$refs["addAddinteractionrecord"].resetFields();
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.isShownadd_interactionrecord = false;
            this.loading = false;
          })
        }
      })
    },

    /*----------- 新增互动记录(end)  --------------*/


    //修改互动记录点击确定按钮事件
    editoraction(){
      this.$refs["newAddinteractionrecord"].validate((valid)=> {
        if(valid){
          this.$request.post('/sal/ctinteraction/updateAction', this.interactionrecord_tableData[this.editAddRecordIndex]).then(res => {
            if(Object.is(res.code,0)){
              this.$message({
                message: '恭喜你，保存成功！',
                type: 'success'
              });
              this.listByAction();
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.isShowneditor_interactionrecord = false;
          })
        }
      })
    },
    //修改记录取消
    cancelinteractionrecord(){
      this.listByAction();
      this.isShowneditor_interactionrecord = false;
    },
    // 新增互动记录点击取消按钮事件
    addrecord_cannel() {
      this.isShownadd_interactionrecord = false;
      this.$refs["addAddinteractionrecord"].resetFields();
    },
    // 编辑联系人
    updateContact: function(index) {
      this.isShownEdit = true;
      this.editCustomerIndex = index;
    },
      //取消
    cancalContact(form){
      this.isShownAdd = false;
      this.$refs[form].resetFields();
    },
    //添加联系人
    saveContact: function() {
      //客户冲突检测规则：A：公司全称+国家，B：公司网站+国家，C：联系人邮箱
      let flag =false;
      this.$refs["addContactInfo"].validate((valid)=> {
        if (valid) {
          if(this.addContactInfo.mailAddress != ""){
            flag =true;
          }
          if(flag){
            this.checkCustomerConflict(3)
          }
        }
      })
    },
    addContactInfoFun(){
        this.$request.post('/salctcontact/saveContact', this.addContactInfo).then(res => {
          if(Object.is(res.code,0)){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.isShownAdd = false;
            this.$refs["addContactInfo"].resetFields();
            this.$parent.handleNodeClick(this.treeData);
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
    },
    // 新增客户信息
    AddCompanyInfo() {
      this.isShownAddCompanyInfo = true;
      this.newCompanyInfo.categoryCname = this.treeData.text == "公共客户池"?'公共客户池':'潜在客户';
      for(let i =0;i<this.CategoryCodeList.length;i++){
        if(this.CategoryCodeList[i].cname == this.newCompanyInfo.categoryCname){
          this.newCompanyInfo.categoryCode = this.CategoryCodeList[i].code
        }
      }
      //this.newCompanyInfo.categoryCode = this.treeData.text == "公共客户池"?'公共客户池':'潜在客户';
    },
    //获取新业务员列表
    adjustPeopleList(){
      if(this.hasCheck){
        this.isShowncustomerAdjust = true;
        this.CustomerAdjustData.OldOriginalSalesman = this.treeData.text == "公共客户池"?"":this.treeData.text;
        this.$request.post("/salctcompany/adjustPeopleList", {})
            .then(data => {
              this.adjustPeopleListData= data.obj;
            })
            .catch(e => {
              console.log("error", e);
            });
      }else{
        this.$message.error('请先点击要调整的客户！');
      }
    },
    //客户调整保存
    adjustSave(){
      this.$request.post("/salctcompany/adjustSave", {"id": this.companyIdArray,"userCode":this.CustomerAdjustData.NewOriginalSalesman})
          .then(data => {
            if(Object.is(data.code,0)){
              this.$message.success(data.msg);
              this.isShowncustomerAdjust =false;
            }else{
              this.$message.error(data.msg);
            }
          })
          .catch(e => {
            console.log("error", e);
          });
    },
    //导出Excel
    exportExcel(){
      if(this.hasCheck){
        this.isShowncustomerAdjust = true;
      }else{
        this.$message.error('请先点击要导出的客户！');
      }
    },
    //选中一项获取来源名称和来源编码
    selectSourceCode(row){
      this.newCompanyInfo.sourceName = row.cname;
      this.newCompanyInfo.sourceCode = row.code;
    },
    //选中一项获取客户类别和客户编号
    selectCategory(row){
      this.newCompanyInfo.categoryCname = row.cname;
      this.newCompanyInfo.categoryCode = row.code;
    },
    //主表格获取国家编号
    getCountryCode(row){
      this.filterConditions.countryName =  row.countryName;
      this.filterConditions.countryCode = row.countryCode;
    },
    //点击el-select自带的清除图标
    clearCompanyNo(){
      this.filterConditions.companyNo = "";
    },
    //点击el-select自带的清除图标
    clearCompanyName(){
      this.filterConditions.companyName = "";
    },
    //点击el-select自带的清除图标
    clearWebsite(){
      this.filterConditions.website = "";
    },
    //点击el-select自带的清除图标
    clearCountry(){
      this.filterConditions.countryName = "";
      this.filterConditions.countryCode = "";
    },
    // 根据国家获取城市cityName
    selectCountry: function(row) {
      //城市会根据国家的修改参数更新，不用默认
      this.newCompanyInfo.countryCname = row.countryCname;
      this.newCompanyInfo.countryCode = row.countryCode;
      this.newCompanyInfo.countryName = row.countryName;
      this.$request.post("/sys/countrycity/getCityByCode", {countryCode: row.countryCode})
        .then(data => {
          this.cityList= data.obj;
        })
        .catch(e => {
          console.log("error", e);
        });
    },
    //获取城市
    selectCity(row){
      this.newCompanyInfo.bankName = row.bankCname;
    },
    // 点击银行选中事件
    selectBankName (bankId) {
      this.newCompanyInfo.bankId = bankId; //收款银行
      this.newCompanyInfo.currencyCode = '';
      this.newCompanyInfo.account_Code = '';
      this.newCompanyInfo.account_Name = '';

      // 获取币种
      this.$request.post("/sys/bankaccount/getAccountById", {bankId: bankId}).then(data => {
        this.accountList = data.obj;
      })
      .catch(e => {
        console.log("item", e);
      });
    },
    // 编辑客户点击银行选中事件
    selectBankNameEditor (bankId) {
      this.customerData[this.editIndex].bankId = bankId; //收款银行
      this.customerData[this.editIndex].currencyCode = '';
      this.customerData[this.editIndex].accountCode = '';
      this.customerData[this.editIndex].accountName = '';
      // 获取币种
      this.$request.post("/sys/bankaccount/getAccountById", {bankId: bankId}).then(data => {
        this.accountList = data.obj;
      })
          .catch(e => {
            console.log("item", e);
          });
    },
    // 点击选择货币类型
    selectCurrencyType (row) {
      this.newCompanyInfo.currencyCode = row.currencyCode;
      this.newCompanyInfo.currencyName = row.currencyName;
      this.newCompanyInfo.account_Code = '';
      this.newCompanyInfo.account_Name = '';
      this.getAccountByCurrency();
    },

    //客户编辑，点击选择货币类型
    selectCurrencyTypeEditor (row) {
      this.customerData[this.editIndex].currencyCode = row.currencyCode;
      this.customerData[this.editIndex].currencyName = row.currencyName;
      this.customerData[this.editIndex].accountCode = '';
      this.customerData[this.editIndex].accountName = '';
      this.getAccountByCurrencyEdiitor();
    },

    //获取银行银行账户和户主
    getAccountByCurrency(currencyCode){
       this.$request.post('/sys/bankaccount/getAccountByCurrency', {currencyCode :this.newCompanyInfo.currencyCode,bankId :this.newCompanyInfo.bankId}).then(res => {
         this.newCompanyInfo.account_Code = res.obj[0].accountCode;
         this.newCompanyInfo.account_Name = res.obj[0].accountCname;
         this.customerData[this.editIndex].accountCode = res.obj[0].accountCode;
         this.customerData[this.editIndex].accountName = res.obj[0].accountCname;
       })
    },

    //获取银行银行账户和户主
    getAccountByCurrencyEdiitor(){
      this.$request.post('/sys/bankaccount/getAccountByCurrency', {currencyCode : this.customerData[this.editIndex].currencyCode,bankId : this.customerData[this.editIndex].bankId }).then(res => {
        this.newCompanyInfo.account_Code = res.obj[0].accountCode;
        this.newCompanyInfo.account_Name = res.obj[0].accountCname;
        this.customerData[this.editIndex].accountCode = res.obj[0].accountCode;
        this.customerData[this.editIndex].accountName = res.obj[0].accountCname;
      })
    },
    //选中一项获取来源名称和来源编码
    selectIndustry(row){
      this.newCompanyInfo.industryName = row.cname;
      this.newCompanyInfo.industryCode = row.code;
    },

    // 新增公司信息接口--保存
    add_newContactInfo: function() {
      // if(this.newContactInfo.customerShortname &&  this.newContactInfo.)
      this.$refs.newCompanyInfoForm.validate(valid => {
        if (valid) {
          this.$request
            .post(
              "http://192.168.10.14:9259/salctcompany/saveCompany",
              this.newCompanyInfo
            )
            .then(
              response => {
                this.someData = response.body;
                this.isShownAddCompanyInfo = false;
              },
              response => {
                console.log("error", response);
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  filters:{//filters指向window而不是vue，所以要将vue作为参数传进来才能调用methods中的方法
    formatDate(value){//value需要过滤的数据
      if(value!=null){
      let dt = new Date(value);
      let y = dt.getFullYear() //得到年份
      let m = dt.getMonth() + 1 //得到月份
      let d = dt.getDate() //得到日期
     /* let y = dt.getFullYear() //得到年份
      let m = dt.getMonth() + 1 //得到月份
      let d = dt.getDate() //得到日期*/
      return y+"-"+m+"-"+d;
      }
    }

  },
  created() {

    // this.getMenu();
    // this.getMeunList();

    // 获取下拉来源数据
    // 客户来源
    this.$request
      .post("/sysbasicinfo/getBasInfo", {
        //data 参数
        parentCode: "CS"
      })
      .then(res => {
        this.SourceInfoList = res.obj;
        this.newCompanyInfo.categoryCode = res.obj[0].code
      })
    // 客户类别
    this.$request.post("/sysbasicinfo/getBasInfo", { parentCode: "CC"}).then(res => {
        for (let i =0;i<res.obj.length;i++) {
         if(res.obj[i].cname == "成交客户"){
           //res.obj[i]["disabled"] = true
           res.obj.splice(i,1);
         }
         if(res.obj[i].cname == "报价客户"){
            //res.obj[i]["disabled"] = true
             res.obj.splice(i,1);
         }

        }
        this.CategoryCodeList = res.obj;
      })
    // 行业
    this.$request
      .post("/sysbasicinfo/getBasInfo", {
        //data 参数
        parentCode: "CI"
      })
      .then(res => {
        this.industryList = res.obj;
      })
    // 颜色列表
    this.$request
      .post("/sysbasicinfo/getBasInfo", {
        //data 参数
        parentCode: "Color"
      })
      .then(res => {
        this.ColorList = res.obj;
      })
    // 编辑付款方式
    this.$request.post("/sysbasicinfo/getBasInfo", {parentCode: "MonthPay"}).then(res => {
        this.monthPayList = res.obj;
    })
    // 新增付款方式
    // this.$request
    //   .get("http://192.168.10.14:9259/sys/bank/getBankList")
    //   .then(res => {
    //     this.add_monthPayList = res.obj;
    //   })
    //   .catch(e => {});
    // 收款银行
    this.$request.get("/sys/bank/getBankList").then(res => {
        this.BankList = res.obj;
      })
    // 国家列表
    this.$request
      .get("/sys/country/getCountryList", {
      })
      .then(data => {
        this.countryList = data.obj;
        this.newCompanyInfo.countryCode = data.obj[0].countryCode
        this.newCompanyInfo.countryCname = data.obj[0].countryCname
        //this.newCompanyInfo.countryName = data.obj[0].countryName
      })
    // 城市列表
    // this.$request
    //   .post("http://192.168.10.14:9259/sys/countrycity/getCityByCode", {
    //     //data 参数
    //     id: "cityCode"
    //   })
    //   .then(res => {
    //     this.cityList= res.obj;
    //   })
    //   .catch(e => {});
  }

};