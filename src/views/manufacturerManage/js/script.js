import Cookies from 'js-cookie'
import axios from 'axios'
import { request } from 'https';
let URL=""
export const downloadFile = (url) => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";  // 防止影响页面
  iframe.style.height = 0;  // 防止影响页面
  iframe.src = url; 
  document.body.appendChild(iframe);  // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(()=>{ 
    iframe.remove();
  }, 5 * 60 * 1000);
}
export default {
  name: "facilities",
  components: {},
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    var checkMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的邮箱'));
        }
      }
    };
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      attestationCurrentPage:1,
      attestationPageSize:10,
      attestationTotal:0,
      dialogTitle: "",
      innerVisibleTitle:'',
      ruleForm: {
        supplierCode:'',
        supplierName:'',
        contactName:'',
        provinces:'',
        rating:'',
        business:''
      },
      tableData: [],
      currencyList:[], //货币种类列表
      currencyListData:[], //货币维护列表
      loading: true,
      dialog: false,
      tHeadData: [],
      tableHeight: window.innerHeight - 250,
      searchButtons:[], //搜索栏按钮
      listOneTableOperation:[],  //一级表按钮列表
      listToolBarOperation:[],  //工具栏按钮列表
      provs:[ {label:"北京市",value:"北京市"},
              {label:"天津市",value:"天津市"},
              {label:"河北省",value:"河北省"},
              {label:"山西省",value:"山西省"},
              {label:"内蒙古自治区",value:"内蒙古自治区"},
              {label:"辽宁省",value:"辽宁省"},
              {label:"吉林省",value:"吉林省"},
              {label:"黑龙江省",value:"黑龙江省"},
              {label:"上海市",value:"上海市"},
              {label:"江苏省",value:"江苏省"},
              {label:"浙江省",value:"浙江省"},
              {label:"安徽省",value:"安徽省"},
              {label:"福建省",value:"福建省"},
              {label:"江西省",value:"江西省"},
              {label:"山东省",value:"山东省"},
              {label:"河南省",value:"河南省"},
              {label:"湖北省",value:"湖北省"},
              {label:"湖南省",value:"湖南省"},
              {label:"广东省",value:"广东省"},
              {label:"广西壮族自治区",value:"广西壮族自治区"},
              {label:"海南省",value:"海南省"},
              {label:"重庆市",value:"重庆市"},
              {label:"四川省",value:"四川省"},
              {label:"贵州省",value:"贵州省"},
              {label:"云南省",value:"云南省"},
              {label:"西藏自治区",value:"西藏自治区"},
              {label:"陕西省",value:"陕西省"},
              {label:"甘肃省",value:"甘肃省"},
              {label:"青海省",value:"青海省"},
              {label:"宁夏回族自治区",value:"宁夏回族自治区"},
              {label:"新疆维吾尔自治区",value:"新疆维吾尔自治区"},
              {label:"台湾省",value:"台湾省"},
              {label:"香港特别行政区",value:"香港特别行政区"},
              {label:"澳门特别行政区",value:"澳门特别行政区"}] ,
      citys: [],
      isEditActive:-1,
      isAttestation:-1,
      isFacilities:-1,
      isDelActive:-1,
      initDialogForm: {
        supplierCode:'',supplierName:'',shortName:'',provinces:'',city:'',location:'',landlinePhone:'',createDate:'',devDate:'',rating:'',paymentName:'',password:'',
        boolEnabled:'是',contact1Name:'',contact1Phone:'',contact1Mail:'',contact1Position:'',contact2Name:'',contact2Phone:'',contact2Mail:'',contact2Position:'',
        staffqtyTotal:'',staffqtyProgrammer:'',staffqtyCnc:'',staffqtyQuoter:'',staffqtyPm:'',staffqtyHandwork:'',staffqtyElectroplating:'',staffqtyPolishing:'',
        staffqtyPainting:'',staffqtyMold:'',staffqtyOthers:'',business:[]
      },
       dialogForm: {
        supplierCode:'',supplierName:'',shortName:'',provinces:'',city:'',location:'',landlinePhone:'',createDate:'',devDate:'',rating:'',paymentName:'',password:'',
        boolEnabled:'是',contact1Name:'',contact1Phone:'',contact1Mail:'',contact1Position:'',contact2Name:'',contact2Phone:'',contact2Mail:'',contact2Position:'',
        staffqtyTotal:'',staffqtyProgrammer:'',staffqtyCnc:'',staffqtyQuoter:'',staffqtyPm:'',staffqtyHandwork:'',staffqtyElectroplating:'',staffqtyPolishing:'',
        staffqtyPainting:'',staffqtyMold:'',staffqtyOthers:'',business:[]
      },
      rules:{
        supplierName:[
          { required: true, message: '生产商名称不能为空', trigger: 'blur' },
        ],
        shortName:[
          { required: true, message: '简称不能为空', trigger: 'blur' },
        ],
        provinces:[
          { required: true, message: '请选择省份', trigger: 'change' },
        ],
        city:[
          { required: true, message: '请选择城市', trigger: 'change' },
        ],
        location:[
          { required: true, message: '具体地址不能为空', trigger: 'blur' },
        ],
        landlinePhone:[
          { required: true, message: '公司座机不能为空', trigger: 'blur' },
        ],
        createDate:[
          {  required: true, message: '请选择成立日期', trigger: 'change' }
        ],
        rating:[
          {  required: true, message: '请选择等级', trigger: 'change' }
        ],
        paymentName:[
          {  required: true, message: '请选择付款方式', trigger: 'change' }
        ],
        password:[
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
        ],
        boolEnabled:[
          {  required: true, message: '请选择是否开启', trigger: 'change' }
        ],
        contact1Name:[
          { required: true, message: '联系人1不能为空', trigger: 'blur' },
        ],
        contact1Phone:[
          {validator: checkPhone, trigger: 'blur'},
        ],
        contact1Mail:[
          {validator: checkMail, trigger: 'blur'},
        ]
      },
      businessData:[],
      businessGetData:[],
      attestation_dialog:false,
      attestationData:[],
      attestationForm:{
        certificatesName:''
      },
      innerVisible:false,
      innerVisibleForm:{
        certificatesName:'',
        endDate:'',
        filePath:[]
      },
      dialogVisibleForm:{
        certificatesName:'',
        endDate:'',
        filePath:[]
      },
      paymentList:[],
      id:'', //管理商id
      token: Cookies.get('TOKEN'),
      uploadPic:'',
      dialogVisible: false,
      disabled: false,
      innerVisibleFormRules:{
        certificatesName:[
          { required: true, message: '认证名不能为空', trigger: 'blur' },
        ],
        endDate:[
          {  required: true, message: '请选择到期日期', trigger: 'change' }
        ],
      },
      imageUrl: require('../../../assets/image/word.png'),
      imageUrl2:require('../../../assets/image/excel.png'),
      imageUrl3:require('../../../assets/image/pdf.png'),
      supplierCode:'',
      certificatesId:'', //认证id
      certficatesShortName:'', //简称
      fileList:[],
      facilitiesTableData:[],
      facilitiesDialog:false,
      imgDialog:false,
      imgList:[], //设备图片列表
      audit:'', //标识是否审核
      ids:[],
    };
  },
  watch: {
      
  },
  mounted() {
    this.uploadPic=this.$request.defaults.baseURL+'/tbsupoutcertificates/photoupload'  //上传图片ip地址
    this.getList();
    this.getCurrencyList();
    this.getBusinessData();
    this.getPaymentList()
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  created () {
   
  },
  methods: {
     /*----------- 点击上下页获取列表数据(start)  --------------*/
     handleCurrentChange(val) {
      this.getList(val,this.pageSize);
   },
   /*----------- 点击上下页获取列表数据(end)  --------------*/

   /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
   handleSizeChange(val) {
    this.pageSize=val;
    this.getList(this.currentPage,val);
   },
   /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList(currentPage,pageSize){
      let that=this
      this.$request.post(URL+'/qt/tbpmsupplieroutm/listSupplierM',{
          //data 参数
          page:currentPage,
          rows:pageSize,
      }).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          this.tableData.forEach((item, index) => {
            if(item.devDate==""||item.devDate==null){
              item.devDate=""
            }else{
              item.devDate=that.formatData(item.devDate)
            }
            if(item.boolEnabled==0){
              item.boolEnabled="否"
            }else if(item.boolEnabled==1){
              item.boolEnabled="是"
            }
          });
      }).catch(e => {

      })
      this.$request.post(URL+'/sysOperation/listOperationBar',{
          //data 参数
          menuId:'6bf3d97f-18c2-11e9-9c29-1c1b0dafe9b6',
        },{token: Cookies.get('TOKEN')}).then(data => {
          this.tHeadData=data.obj.listOneColumn
          console.log(this.tHeadData)
          this.searchButtons=data.obj.listSearchBarOperation
          this.listOneTableOperation=data.obj.listOneTableOperation
          // this.listOneTableOperation.reverse()
          this.searchButtons.reverse()
          this.listToolBarOperation=data.obj.listToolBarOperation
          this.listToolBarOperation.reverse()
          this.searchButtons.forEach((item,index) => {
            if(item.operationName=="查询"){
              item.icon="el-icon-search"
            }
          });
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

    /*----------- 获取币种下拉框列表(start)  --------------*/
    getCurrencyList(){
        this.$request.post(URL+'/sysbasicinfo/selectMapBasicinfo',{
            //data 参数
            parent_code:"CurType",
            token: Cookies.get('TOKEN'),
        }).then(data => {
           this.currencyList=data.obj
        }).catch(e => {

        })
    },
    /*----------- 获取币种下拉框列表(end)  --------------*/

    /*----------- 获取经营范围列表(start)  --------------*/
    getBusinessData(){
      this.$request.post(URL+'/qt/tech/getTechComboBox',{
          //data 参数
          token: Cookies.get('TOKEN'),
      }).then(data => {
        this.businessGetData=data.obj
        this.businessGetData.forEach((item,index) => {
          this.businessData.push(item.techName)
        });
      }).catch(e => {

      })
    },
    /*----------- 获取经营范围列表(end)  --------------*/
    
    /*----------- 获取付款方式列表(start)  --------------*/
    getPaymentList(){
      this.$request.post(URL+'/sysbasicinfo/getBasInfo',{
          //data 参数
          parentCode:"MonthPay",
          token: Cookies.get('TOKEN'),
      }).then(data => {
        console.log(data)
        this.paymentList=data.obj
      }).catch(e => {

      })
    },
    /*----------- 获取付款方式列表(end)  --------------*/
  

    /*----------- 点击搜索(start)  --------------*/
    search() {
      let that=this
      this.$request.post(URL+'/qt/tbpmsupplieroutm/listSupplierM',{
          //data 参数
          provinces:this.ruleForm.provinces,
          rating:this.ruleForm.rating,
          supplierCode:this.ruleForm.supplierCode,
          supplierName:this.ruleForm.supplierName,
          contactName:this.ruleForm.contactName,
          business:this.ruleForm.business
      }).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          this.tableData.forEach((item, index) => {
            if(item.devDate==""||item.devDate==null){
              item.devDate=""
            }else{
              item.devDate=that.formatData(item.devDate)
            }
            if(item.boolEnabled==0){
              item.boolEnabled="否"
            }else if(item.boolEnabled==1){
              item.boolEnabled="是"
            }
          });
      }).catch(e => {

      })
    },
    /*----------- 点击搜索(end)  --------------*/

    /*----------- 清空表单搜索条件(start)  --------------*/
     resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     /*----------- 清空表单搜索条件(end)  --------------*/

     /*----------- 点击编辑按钮(start)  --------------*/
    edit(index, row) {
     // console.log(index);
      //console.log(row);
      this.initDialogForm = {...row,rowIndex:index}   //表单渲染
      this.dialog = true;
      this.dialogTitle = "修改";
      this.isEditActive=index;
      this.id=row.id;
      this.initDialogForm.business=[];
      if(row.business==''||row.business==null){
        this.initDialogForm.business=[];
      }else{
        this.initDialogForm.business=row.business.split(",")
      }
    },
    /*----------- 点击编辑按钮(end)  --------------*/

    /*----------- 关闭弹框回调(start)  --------------*/
    closed(){
        this.isEditActive=-1
        this.isAttestation=-1
        this.isDelActive=-1
        this.isFacilities=-1
    },
    /*----------- 关闭弹框回调(end)  --------------*/

    /*----------- 认证查看(start)  --------------*/
    checkAttestation(index,row){
      this.attestation_dialog=true;
      this.isAttestation=index;
      this.supplierCode=row.supplierCode;
      this.certficatesShortName=row.shortName;
      this.attestationList(this.attestationCurrentPage,this.attestationPageSize)
    },
    /*----------- 认证查看(end)  --------------*/

    attestationHandleSizeChange(val){
      this.attestationPageSize=val;
      this.attestationList(this.attestationCurrentPage,val);
    },
    attestationHandleCurrentChange(val){
      this.attestationList(val,this.attestationPageSize);
    },
     /*----------- 认证列表(start)  --------------*/
     attestationList(currentPage,pageSize){
      let that=this
      this.$request.post(URL+'/tbsupoutcertificates/listCertificates',{
          //data 参数
          page:currentPage,
          rows:pageSize,
          supplierCode:this.supplierCode
      },{ token: Cookies.get('TOKEN')}).then(data => {
        this.attestationData=data.rows
        this.attestationPageSize=data.pageSize
        this.attestationTotal=data.total
        this.attestationData.forEach((item, index) => {
          if(item.endDate==""||item.endDate==null){
            item.endDate=""
          }else{
            item.endDate=that.formatData(item.endDate)
          }
        });
      }).catch(e => {

      })
     },
     /*----------- 认证列表(end)  --------------*/

    facilitiesMaintenance(index,row){
      this.$router.push({
        path: '/facilities',
        query: {
          supplierCode: row.supplierCode,
          supplierName: row.supplierName
        }
      })
    },

    /*----------- 修改认证(start)  --------------*/
    editAttestation(index,row){
      this.innerVisibleForm={...row,rowIndex:index}   //表单渲染
      this.innerVisible=true;
      this.isEditActive=index;
      this.certificatesId=row.id
      this.innerVisibleForm.filePath=row.attachOssfile
      let fileItem=row.attachOssfile.split(',');
      this.fileList=[]
      let fileName
      fileItem.forEach((item,index) => {
        fileName=item.split('.')
        let val=fileName.length-1
        if(fileName[val]=='docx'||fileName[val]=='doc'){
          this.fileList.push({url:this.imageUrl,path:item})
        }else if(fileName[val]=='xlsx'||fileName[val]=='xls'){
          this.fileList.push({url:this.imageUrl2,path:item})
        }else if(fileName[val]=="pdf"){
          this.fileList.push({url:this.imageUrl3,path:item})
        }else if(fileName[val]=="png"||fileName[val]=='jpg'||fileName[val]=="jpeg"||fileName[val]=='gif'){
          let pic='http://'+item
          this.fileList.push({url:pic,path:item})
        }else{
          this.fileList.push({url:this.imageUrl,path:item})
        }
      });
      //this.fileList=row.attachOssfile
     // console.log(row,this.fileList)
      this.innerVisibleTitle='修改认证'
    },
    /*----------- 修改认证(end)  --------------*/

     /*----------- 取消认证(start)  --------------*/
    innerVisibleCancel(){
      this.isEditActive=-1
      this.isDelActive=-1
      this.innerVisible=false;
    },
    /*----------- 取消认证(end)  --------------*/

    /*----------- 删除认证(start)  --------------*/
    delAttestation (index, row) { 
      this.isDelActive=index 
      let that = this
      this.$confirm('删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '删除中',
          background: 'rgba(255, 255, 255, 0.4)'

        });
        this.$request.post(URL+'/tbsupoutcertificates/deleteCertificates',{
          //data 参数
          id:row.id,
          token: Cookies.get('TOKEN'),
        }).then(data => {
          if(data.msg=="成功"){
             setTimeout(() => {
              loading.close();
              that.attestationData.splice(index,1)
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
  /*----------- 删除认证(end)  --------------*/
  
  /*----------- 认证查看弹框搜索(start)  --------------*/
    attestationSearch(){
      let that=this
      this.$request.post(URL+'/tbsupoutcertificates/listCertificates',{
          //data 参数
          certificatesName:this.attestationForm.certificatesName,
          supplierCode:this.supplierCode
      },{ token: Cookies.get('TOKEN')}).then(data => {
        this.attestationData=data.rows
        this.attestationData.forEach((item, index) => {
          if(item.endDate==""||item.endDate==null){
            item.endDate=""
          }else{
            item.endDate=that.formatData(item.endDate)
          }
        });
      }).catch(e => {

      })
    },
    /*----------- 认证查看弹框搜索(end)  --------------*/

    /*----------- 认证查看弹框清空表单搜索条件(start)  --------------*/
    attestationResetForm(formName){
      let that=this
       this.$refs[formName].resetFields();
       this.$request.post(URL+'/tbsupoutcertificates/listCertificates',{
        //data 参数
          supplierCode:this.supplierCode
      },{ token: Cookies.get('TOKEN')}).then(data => {
        this.attestationData=data.rows
        this.attestationData.forEach((item, index) => {
          if(item.endDate==""||item.endDate==null){
            item.endDate=""
          }else{
            item.endDate=that.formatData(item.endDate)
          }
        });
      }).catch(e => {

      })
     },
     /*----------- 认证查看弹框清空表单搜索条件(end)  --------------*/

     /*----------- 下载(start)  --------------*/
     downTemplate(index,row){
        let fileList=row.attachOssfile.split(',');
        fileList.forEach((item,index) => {
        //let win= window.open()
          const url = "http://"+item;
          let urlSpl=url.split('.')
          let val=urlSpl.length-1
          if(urlSpl[val]=="png"||urlSpl[val]=='jpg'||urlSpl[val]=="jpeg"||urlSpl[val]=='gif'){
            window.open(url)
          }else{
            downloadFile(url);   
          }
        });
     },
    /*----------- 下载(end)  --------------*/

    /*----------- 新增认证(start)  --------------*/
    addAttestation(){
      this.fileList=[]
      this.innerVisibleForm={...this.dialogVisibleForm};
      this.innerVisible=true;
      this.innerVisibleTitle='新增认证'
    },
     /*----------- 新增认证(end)  --------------*/

     /*----------- 上传头像成功的回调(start)  --------------*/
    handleAvatarSuccess(res, file) {
      let fileName=file.name.split('.')
      let val=fileName.length-1
      if(fileName[val]=='docx'||fileName[val]=='doc'){
        this.fileList.push({url:this.imageUrl,path:res})
      }else if(fileName[val]=='xlsx'||fileName[val]=='xls'){
        this.fileList.push({url:this.imageUrl2,path:res})
      }else if(fileName[val]=="pdf"){
        this.fileList.push({url:this.imageUrl3,path:res})
      }else if(fileName[val]=="png"||fileName[val]=='jpg'||fileName[val]=="jpeg"||fileName[val]=='gif'){
        let pic='http://'+res
        this.fileList.push({url:pic,path:res})
      }else{
        this.fileList.push({url:this.imageUrl,path:res})
      }
      if(this.innerVisibleForm.filePath==''||this.innerVisibleForm.filePath==null){
        this.innerVisibleForm.filePath=res
      }else{
        this.innerVisibleForm.filePath=this.innerVisibleForm.filePath+','+res
      }
    },
    /*----------- 上传头像成功的回调(end)  --------------*/

    /*----------- 上传头像之前的回调(start)  --------------*/
    beforeAvatarUpload(file) {
      const imgNum=this.fileList.length
      if(imgNum>4){
        this.$message.warning('最多只能上传5个文件!');
        return false
      }
    },
    /*----------- 上传头像之前的回调(end)  --------------*/
    
     /*----------- 删除图片(start)  --------------*/
    handleRemove(itemList,index) {
      let fileItem=this.innerVisibleForm.filePath.split(',')
      fileItem.forEach((item,index,object) => {
        if(item==itemList.path){
          object.splice(index, 1);
        }
      })
      this.fileList.splice(index, 1);
      this.innerVisibleForm.filePath=fileItem.join(',')
    },
    /*----------- 删除图片(end)  --------------*/

    save() {
      //提交弹框数据
      let that=this
      if(this.innerVisibleForm.filePath==''||this.innerVisibleForm.filePath==null){
        this.$message.error('请先上传附件');
      }else{
        //filePathList=filePathList.join(",")
        this.$refs['innerVisibleForm'].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '提交数据中',
                // spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.4)'
              });
              if(this.innerVisibleTitle =='新增认证'){
                this.$request.post(URL+'/tbsupoutcertificates/saveCertificates',{
                  certificatesName:this.innerVisibleForm.certificatesName,
                  endDate:this.innerVisibleForm.endDate,
                  attachOssfile:this.innerVisibleForm.filePath,
                  shortName:this.certficatesShortName,
                  supplierCode:this.supplierCode
                },{token: Cookies.get('TOKEN')}).then(data => {
                  if(data.msg=="成功"){
                    this.attestationList(this.attestationCurrentPage,this.attestationPageSize)
                    this.$refs['innerVisibleForm'].resetFields();
                    this.innerVisible=false
                    setTimeout(() => {
                      loading.close();
                      this.dialog = false
                      this.$message({
                        type: 'success',
                        message: '新增认证成功!'
                      });
                    }, 1000);
                  }else{
                    loading.close();
                    this.$message({
                        type: 'error',
                        message: '新增认证失败!'
                      });
                  }
                }).catch(e => {
  
                })
              }else if(this.innerVisibleTitle =='修改认证'){
                this.$request.post(URL+'/tbsupoutcertificates/updateCertificates',{
                  certificatesName:this.innerVisibleForm.certificatesName,
                  endDate:this.innerVisibleForm.endDate,
                  attachOssfile:this.innerVisibleForm.filePath,
                  id:this.certificatesId
                },{token: Cookies.get('TOKEN')}).then(data => {
                  if(data.msg=="成功"){
                    this.attestationList(this.attestationCurrentPage,this.attestationPageSize)
                    this.innerVisible=false
                    setTimeout(() => {
                      loading.close();
                      this.dialog = false
                      this.$message({
                        type: 'success',
                        message: '修改认证成功!'
                      });
                    }, 1000);
                  }else{
                    loading.close();
                    this.$message({
                        type: 'error',
                        message: '修改认证失败!'
                      });
                  }
                }).catch(e => {
  
                })
              }
            
            } else {
              return false;
            }
        });
      }
    },

    /*----------- 搜索框按钮点击事件(start)  --------------*/
    clickEven(even){
        if(even=="清空"){
          this.$refs['ruleForm'].resetFields();
          this.getList()
        }else if(even=="查询"){
          this.search()
        }else if(even=="汇率维护"){
          this.apply()
        }
    },
    /*----------- 搜索框按钮点击事件(end)  --------------*/

    /*----------- 工具栏按钮点击事件(start)  --------------*/
    toolBarEven(even){
      if(even=="新增"){
        this.initDialogForm = {...this.dialogForm}   //表单渲染
        this.dialog = true;
        this.dialogTitle = "新增供应商";
      }else if(even=="取消"){
        this.dialog = false
      }else if(even=="设备审核"){
        this.getFacilitiesTableData()
        this.facilitiesDialog=true
      }else if(even=="产能对比"){
        this.$router.push('/capacityComparison')
      }
    },
    /*----------- 工具栏按钮点击事件(end)  --------------*/

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
        this.isEditActive=-1
        this.isFacilities=-1
        this.isAttestation=-1
        this.dialog = false
    },
  /*----------- 取消(end)  --------------*/
    submitDialogData() {
      //提交弹框数据
      this.$refs['initDialogForm'].validate((valid) => {
          let boolEnabled,business
          if(this.initDialogForm.boolEnabled=="是"){
            boolEnabled=1
          }else if(this.initDialogForm.boolEnabled=="否"){
            boolEnabled=0
          }
          business=this.initDialogForm.business.join(",")
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.4)'
            });
            //新增
            if(this.dialogTitle =='新增供应商'){
              this.$request.post(URL+'/qt/tbpmsupplieroutm/saveSupplierM',{
                supplierCode:this.initDialogForm.supplierCode,
                supplierName:this.initDialogForm.supplierName,
                shortName:this.initDialogForm.shortName,
                provinces:this.initDialogForm.provinces,
                city:this.initDialogForm.city,
                location:this.initDialogForm.location,
                landlinePhone:this.initDialogForm.landlinePhone,
                createDate:this.initDialogForm.createDate,
                devDate:this.initDialogForm.devDate,
                rating:this.initDialogForm.rating,
                paymentName:this.initDialogForm.paymentName,
                password:this.initDialogForm.password,
                boolEnabled:boolEnabled,
                contact1Name:this.initDialogForm.contact1Name,
                contact1Phone:this.initDialogForm.contact1Phone,
                contact1Mail:this.initDialogForm.contact1Mail,
                contact1Position:this.initDialogForm.contact1Position,
                contact2Name:this.initDialogForm.contact2Name,
                contact2Phone:this.initDialogForm.contact2Phone,
                contact2Mail:this.initDialogForm.contact2Mail,
                contact2Position:this.initDialogForm.contact2Position,
                staffqtyTotal:this.initDialogForm.staffqtyTotal,
                staffqtyProgrammer:this.initDialogForm.staffqtyProgrammer,
                staffqtyCnc:this.initDialogForm.staffqtyCnc,
                staffqtyQuoter:this.initDialogForm.staffqtyQuoter,
                staffqtyPm:this.initDialogForm.staffqtyPm,
                staffqtyHandwork:this.initDialogForm.staffqtyHandwork,
                staffqtyElectroplating:this.initDialogForm.staffqtyElectroplating,
                staffqtyPolishing:this.initDialogForm.staffqtyPolishing,
                staffqtyPainting:this.initDialogForm.staffqtyPainting,
                staffqtyMold:this.initDialogForm.staffqtyMold,
                staffqtyOthers:this.initDialogForm.staffqtyOthers,
                business:business,
              },{token: Cookies.get('TOKEN')}).then(data => {
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
              //编辑
            }else if(this.dialogTitle =='修改'){
              this.$request.post(URL+'/qt/tbpmsupplieroutm/updateSupplierM',{
                id:this.id,
                supplierCode:this.initDialogForm.supplierCode,
                supplierName:this.initDialogForm.supplierName,
                shortName:this.initDialogForm.shortName,
                provinces:this.initDialogForm.provinces,
                city:this.initDialogForm.city,
                location:this.initDialogForm.location,
                landlinePhone:this.initDialogForm.landlinePhone,
                createDate:this.initDialogForm.createDate,
                devDate:this.initDialogForm.devDate,
                rating:this.initDialogForm.rating,
                paymentName:this.initDialogForm.paymentName,
                password:this.initDialogForm.password,
                boolEnabled:boolEnabled,
                contact1Name:this.initDialogForm.contact1Name,
                contact1Phone:this.initDialogForm.contact1Phone,
                contact1Mail:this.initDialogForm.contact1Mail,
                contact1Position:this.initDialogForm.contact1Position,
                contact2Name:this.initDialogForm.contact2Name,
                contact2Phone:this.initDialogForm.contact2Phone,
                contact2Mail:this.initDialogForm.contact2Mail,
                contact2Position:this.initDialogForm.contact2Position,
                staffqtyTotal:this.initDialogForm.staffqtyTotal,
                staffqtyProgrammer:this.initDialogForm.staffqtyProgrammer,
                staffqtyCnc:this.initDialogForm.staffqtyCnc,
                staffqtyQuoter:this.initDialogForm.staffqtyQuoter,
                staffqtyPm:this.initDialogForm.staffqtyPm,
                staffqtyHandwork:this.initDialogForm.staffqtyHandwork,
                staffqtyElectroplating:this.initDialogForm.staffqtyElectroplating,
                staffqtyPolishing:this.initDialogForm.staffqtyPolishing,
                staffqtyPainting:this.initDialogForm.staffqtyPainting,
                staffqtyMold:this.initDialogForm.staffqtyMold,
                staffqtyOthers:this.initDialogForm.staffqtyOthers,
                business:business      
              },{token: Cookies.get('TOKEN')}).then(data => {
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
            }
          } else {
            return false;
          }
      });
    },
     /*----------- 提交表单数据(end)  --------------*/

     /*----------- 获取设备审核列表(start)  --------------*/
    getFacilitiesTableData(){
      let that=this
      this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachinesBySup',{
          //data 参数
          auditStatus:0
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.facilitiesTableData=data.rows
          this.facilitiesTableData.forEach((item, index) => {
            if(item.updatedTime==""||item.updatedTime==null){
              item.updatedTime=""
            }else{
              item.updatedTime=that.formatData(item.updatedTime)
            }
            if(item.auditStatus==0){
              item.auditStatus="待审核"
            }else if(item.auditStatus==1){
              item.auditStatus="审核通过"
            }else if(item.auditStatus==2){
              item.auditStatus="拒绝审核"
            }
          });
      }).catch(e => {

      })
    },
     /*----------- 获取设备审核列表(end)  --------------*/

      /*----------- 设备审核列表的查看图片(start)  --------------*/
     checkImg(index,row){
      this.imgList=[]
      if(row.ossImage==null||row.ossImage==''||row.ossImage=='0'){
        this.$message('该设备没有上传图片');
      }else{
        this.imgDialog=true;
        let listItem=row.ossImage.split(',')
        listItem.forEach((item,index) => {
          let img='http://'+item
          this.imgList.push(img)
        });
      }
     },
      /*----------- 设备审核列表的查看图片(end)  --------------*/

       /*----------- 同意审核(start)  --------------*/
     agree(){
      if(this.ids.length==0){
        this.$message({
          message: '请先选择要审核的设备',
          type: 'warning'
        });
      }else{
        const loading = this.$loading({
          lock: true,
          text: '提交数据中',
          // spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.4)'
        });
        this.$request.post(URL+'/tbsupoutmachine/auditSupOutMachine',{
            //data 参数
            ids:this.ids,
            status:'1'
        },{token: Cookies.get('TOKEN')}).then(data => {
            console.log(data)
            if(data.msg=="成功"){
              //this.audit=index
              this.getFacilitiesTableData()
              setTimeout(() => {
                loading.close();
                this.dialog = false
                this.$message({
                  type: 'success',
                  message: '审核通过!'
                });
              }, 1000);
            }else{
              loading.close();
              this.$message({
                  type: 'error',
                  message: '审核失败!'
                });
            }
        }).catch(e => {

        })
      }
     },
     //列表中的同意
     agreeItem(index,row){
      let ids =[]
      ids.push(row.id)
      const loading = this.$loading({
        lock: true,
        text: '提交数据中',
        // spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.4)'
      });
      this.$request.post(URL+'/tbsupoutmachine/auditSupOutMachine',{
          //data 参数
          ids:ids,
          status:'1'
      },{token: Cookies.get('TOKEN')}).then(data => {
          console.log(data)
          if(data.msg=="成功"){
            this.audit=index
            this.getFacilitiesTableData()
            setTimeout(() => {
              loading.close();
              this.dialog = false
              this.$message({
                type: 'success',
                message: '审核通过!'
              });
            }, 1000);
          }else{
            loading.close();
            this.$message({
                type: 'error',
                message: '审核失败!'
              });
          }
      }).catch(e => {

      })
     },
     /*----------- 同意审核(end)  --------------*/

     /*----------- 拒绝审核(start)  --------------*/
      refuse(){
        if(this.ids.length==0){
          this.$message({
            message: '请先选择要审核的设备',
            type: 'warning'
          });
        }else{
          const loading = this.$loading({
            lock: true,
            text: '提交数据中',
            // spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.4)'
          });
          this.$request.post(URL+'/tbsupoutmachine/auditSupOutMachine',{
            //data 参数
              ids:this.ids,
              status:'2'
          },{token: Cookies.get('TOKEN')}).then(data => {
              console.log(data)
              if(data.msg=="成功"){
                //this.audit=index
                this.getFacilitiesTableData()
                setTimeout(() => {
                  loading.close();
                  this.dialog = false
                  this.$message({
                    type: 'success',
                    message: '拒绝审核!'
                  });
                }, 1000);
              }else{
                loading.close();
                this.$message({
                    type: 'error',
                    message: '拒绝审核失败!'
                  });
              }
          }).catch(e => {
  
          })
        }
      },
      //列表中的拒绝
      refuseItem(index,row){
        this.ids =[]
        this.ids.push(row.id)
        const loading = this.$loading({
          lock: true,
          text: '提交数据中',
          // spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.4)'
        });
        this.$request.post(URL+'/tbsupoutmachine/auditSupOutMachine',{
            //data 参数
            ids:this.ids,
            status:'2'
        },{token: Cookies.get('TOKEN')}).then(data => {
            console.log(data)
            if(data.msg=="成功"){
              this.audit=index
              this.getFacilitiesTableData()
              setTimeout(() => {
                loading.close();
                this.dialog = false
                this.$message({
                  type: 'success',
                  message: '审核通过!'
                });
              }, 1000);
            }else{
              loading.close();
              this.$message({
                  type: 'error',
                  message: '审核失败!'
                });
            }
        }).catch(e => {
  
        })
      },
    /*----------- 拒绝审核(end)  --------------*/

     /*----------- 表格选择回调(start)  --------------*/
     handleSelectionChange(val){
        //console.log(val)
     },

     //设备审核表格回调
     selectFacilities(val){
      this.ids =[]
      val.forEach((item,index) => {
        this.ids.push(item.id)
      });
     },
     /*----------- 表格选择回调(end)  --------------*/

     /*----------- 省份选择(start)  --------------*/
     getProv(prov){
      let tempCity=[];
      this.citys=[];
      this.initDialogForm.city='';
      let allCity=[
        {
        prov: "北京市",
        label: "北京市"
      }, {
        prov: "天津市",
        label: "天津市"
      }, {
        prov: "河北省",
        label: "石家庄市"
      }, {
        prov: "河北省",
        label: "唐山市"
      }, {
        prov: "河北省",
        label: "秦皇岛市"
      }, {
        prov: "河北省",
        label: "邯郸市"
      }, {
        prov: "河北省",
        label: "邢台市"
      }, {
        prov: "河北省",
        label: "保定市"
      }, {
        prov: "河北省",
        label: "张家口市"
      }, {
        prov: "河北省",
        label: "承德市"
      }, {
        prov: "河北省",
        label: "沧州市"
      }, {
        prov: "河北省",
        label: "廊坊市"
      }, {
        prov: "河北省",
        label: "衡水市"
      }, {
        prov: "山西省",
        label: "太原市"
      }, {
        prov: "山西省",
        label: "大同市"
      }, {
        prov: "山西省",
        label: "阳泉市"
      }, {
        prov: "山西省",
        label: "长治市"
      }, {
        prov: "山西省",
        label: "晋城市"
      }, {
        prov: "山西省",
        label: "朔州市"
      }, {
        prov: "山西省",
        label: "晋中市"
      }, {
        prov: "山西省",
        label: "运城市"
      }, {
        prov: "山西省",
        label: "忻州市"
      }, {
        prov: "山西省",
        label: "临汾市"
      }, {
        prov: "山西省",
        label: "吕梁市"
      }, {
        prov: "内蒙古自治区",
        label: "呼和浩特市"
      }, {
        prov: "内蒙古自治区",
        label: "包头市"
      }, {
        prov: "内蒙古自治区",
        label: "乌海市"
      }, {
        prov: "内蒙古自治区",
        label: "赤峰市"
      }, {
        prov: "内蒙古自治区",
        label: "通辽市"
      }, {
        prov: "内蒙古自治区",
        label: "鄂尔多斯市"
      }, {
        prov: "内蒙古自治区",
        label: "呼伦贝尔市"
      }, {
        prov: "内蒙古自治区",
        label: "巴彦淖尔市"
      }, {
        prov: "内蒙古自治区",
        label: "乌兰察布市"
      }, {
        prov: "内蒙古自治区",
        label: "兴安盟"
      }, {
        prov: "内蒙古自治区",
        label: "锡林郭勒盟"
      }, {
        prov: "内蒙古自治区",
        label: "阿拉善盟"
      }, {
        prov: "辽宁省",
        label: "沈阳市"
      }, {
        prov: "辽宁省",
        label: "大连市"
      }, {
        prov: "辽宁省",
        label: "鞍山市"
      }, {
        prov: "辽宁省",
        label: "抚顺市"
      }, {
        prov: "辽宁省",
        label: "本溪市"
      }, {
        prov: "辽宁省",
        label: "丹东市"
      }, {
        prov: "辽宁省",
        label: "锦州市"
      }, {
        prov: "辽宁省",
        label: "营口市"
      }, {
        prov: "辽宁省",
        label: "阜新市"
      }, {
        prov: "辽宁省",
        label: "辽阳市"
      }, {
        prov: "辽宁省",
        label: "盘锦市"
      }, {
        prov: "辽宁省",
        label: "铁岭市"
      }, {
        prov: "辽宁省",
        label: "朝阳市"
      }, {
        prov: "辽宁省",
        label: "葫芦岛市"
      }, {
        prov: "吉林省",
        label: "长春市"
      }, {
        prov: "吉林省",
        label: "吉林市"
      }, {
        prov: "吉林省",
        label: "四平市"
      }, {
        prov: "吉林省",
        label: "辽源市"
      }, {
        prov: "吉林省",
        label: "通化市"
      }, {
        prov: "吉林省",
        label: "白山市"
      }, {
        prov: "吉林省",
        label: "松原市"
      }, {
        prov: "吉林省",
        label: "白城市"
      }, {
        prov: "吉林省",
        label: "延边朝鲜族自治州"
      }, {
        prov: "黑龙江省",
        label: "哈尔滨市"
      }, {
        prov: "黑龙江省",
        label: "齐齐哈尔市"
      }, {
        prov: "黑龙江省",
        label: "鸡西市"
      }, {
        prov: "黑龙江省",
        label: "鹤岗市"
      }, {
        prov: "黑龙江省",
        label: "双鸭山市"
      }, {
        prov: "黑龙江省",
        label: "大庆市"
      }, {
        prov: "黑龙江省",
        label: "伊春市"
      }, {
        prov: "黑龙江省",
        label: "佳木斯市"
      }, {
        prov: "黑龙江省",
        label: "七台河市"
      }, {
        prov: "黑龙江省",
        label: "牡丹江市"
      }, {
        prov: "黑龙江省",
        label: "黑河市"
      }, {
        prov: "黑龙江省",
        label: "绥化市"
      }, {
        prov: "黑龙江省",
        label: "大兴安岭地区"
      }, {
        prov: "上海市",
        label: "上海市"
      }, {
        prov: "江苏省",
        label: "南京市"
      }, {
        prov: "江苏省",
        label: "无锡市"
      }, {
        prov: "江苏省",
        label: "徐州市"
      }, {
        prov: "江苏省",
        label: "常州市"
      }, {
        prov: "江苏省",
        label: "苏州市"
      }, {
        prov: "江苏省",
        label: "南通市"
      }, {
        prov: "江苏省",
        label: "连云港市"
      }, {
        prov: "江苏省",
        label: "淮安市"
      }, {
        prov: "江苏省",
        label: "盐城市"
      }, {
        prov: "江苏省",
        label: "扬州市"
      }, {
        prov: "江苏省",
        label: "镇江市"
      }, {
        prov: "江苏省",
        label: "泰州市"
      }, {
        prov: "江苏省",
        label: "宿迁市"
      }, {
        prov: "浙江省",
        label: "杭州市"
      }, {
        prov: "浙江省",
        label: "宁波市"
      }, {
        prov: "浙江省",
        label: "温州市"
      }, {
        prov: "浙江省",
        label: "嘉兴市"
      }, {
        prov: "浙江省",
        label: "湖州市"
      }, {
        prov: "浙江省",
        label: "绍兴市"
      }, {
        prov: "浙江省",
        label: "金华市"
      }, {
        prov: "浙江省",
        label: "衢州市"
      }, {
        prov: "浙江省",
        label: "舟山市"
      }, {
        prov: "浙江省",
        label: "台州市"
      }, {
        prov: "浙江省",
        label: "丽水市"
      }, {
        prov: "安徽省",
        label: "合肥市"
      }, {
        prov: "安徽省",
        label: "芜湖市"
      }, {
        prov: "安徽省",
        label: "蚌埠市"
      }, {
        prov: "安徽省",
        label: "淮南市"
      }, {
        prov: "安徽省",
        label: "马鞍山市"
      }, {
        prov: "安徽省",
        label: "淮北市"
      }, {
        prov: "安徽省",
        label: "铜陵市"
      }, {
        prov: "安徽省",
        label: "安庆市"
      }, {
        prov: "安徽省",
        label: "黄山市"
      }, {
        prov: "安徽省",
        label: "滁州市"
      }, {
        prov: "安徽省",
        label: "阜阳市"
      }, {
        prov: "安徽省",
        label: "宿州市"
      }, {
        prov: "安徽省",
        label: "六安市"
      }, {
        prov: "安徽省",
        label: "亳州市"
      }, {
        prov: "安徽省",
        label: "池州市"
      }, {
        prov: "安徽省",
        label: "宣城市"
      }, {
        prov: "福建省",
        label: "福州市"
      }, {
        prov: "福建省",
        label: "厦门市"
      }, {
        prov: "福建省",
        label: "莆田市"
      }, {
        prov: "福建省",
        label: "三明市"
      }, {
        prov: "福建省",
        label: "泉州市"
      }, {
        prov: "福建省",
        label: "漳州市"
      }, {
        prov: "福建省",
        label: "南平市"
      }, {
        prov: "福建省",
        label: "龙岩市"
      }, {
        prov: "福建省",
        label: "宁德市"
      }, {
        prov: "江西省",
        label: "南昌市"
      }, {
        prov: "江西省",
        label: "景德镇市"
      }, {
        prov: "江西省",
        label: "萍乡市"
      }, {
        prov: "江西省",
        label: "九江市"
      }, {
        prov: "江西省",
        label: "新余市"
      }, {
        prov: "江西省",
        label: "鹰潭市"
      }, {
        prov: "江西省",
        label: "赣州市"
      }, {
        prov: "江西省",
        label: "吉安市"
      }, {
        prov: "江西省",
        label: "宜春市"
      }, {
        prov: "江西省",
        label: "抚州市"
      }, {
        prov: "江西省",
        label: "上饶市"
      }, {
        prov: "山东省",
        label: "济南市"
      }, {
        prov: "山东省",
        label: "青岛市"
      }, {
        prov: "山东省",
        label: "淄博市"
      }, {
        prov: "山东省",
        label: "枣庄市"
      }, {
        prov: "山东省",
        label: "东营市"
      }, {
        prov: "山东省",
        label: "烟台市"
      }, {
        prov: "山东省",
        label: "潍坊市"
      }, {
        prov: "山东省",
        label: "济宁市"
      }, {
        prov: "山东省",
        label: "泰安市"
      }, {
        prov: "山东省",
        label: "威海市"
      }, {
        prov: "山东省",
        label: "日照市"
      }, {
        prov: "山东省",
        label: "莱芜市"
      }, {
        prov: "山东省",
        label: "临沂市"
      }, {
        prov: "山东省",
        label: "德州市"
      }, {
        prov: "山东省",
        label: "聊城市"
      }, {
        prov: "山东省",
        label: "滨州市"
      }, {
        prov: "山东省",
        label: "菏泽市"
      }, {
        prov: "河南省",
        label: "郑州市"
      }, {
        prov: "河南省",
        label: "开封市"
      }, {
        prov: "河南省",
        label: "洛阳市"
      }, {
        prov: "河南省",
        label: "平顶山市"
      }, {
        prov: "河南省",
        label: "安阳市"
      }, {
        prov: "河南省",
        label: "鹤壁市"
      }, {
        prov: "河南省",
        label: "新乡市"
      }, {
        prov: "河南省",
        label: "焦作市"
      }, {
        prov: "河南省",
        label: "濮阳市"
      }, {
        prov: "河南省",
        label: "许昌市"
      }, {
        prov: "河南省",
        label: "漯河市"
      }, {
        prov: "河南省",
        label: "三门峡市"
      }, {
        prov: "河南省",
        label: "南阳市"
      }, {
        prov: "河南省",
        label: "商丘市"
      }, {
        prov: "河南省",
        label: "信阳市"
      }, {
        prov: "河南省",
        label: "周口市"
      }, {
        prov: "河南省",
        label: "驻马店市"
      }, {
        prov: "河南省",
        label: "省直辖县级行政区划"
      }, {
        prov: "湖北省",
        label: "武汉市"
      }, {
        prov: "湖北省",
        label: "黄石市"
      }, {
        prov: "湖北省",
        label: "十堰市"
      }, {
        prov: "湖北省",
        label: "宜昌市"
      }, {
        prov: "湖北省",
        label: "襄阳市"
      }, {
        prov: "湖北省",
        label: "鄂州市"
      }, {
        prov: "湖北省",
        label: "荆门市"
      }, {
        prov: "湖北省",
        label: "孝感市"
      }, {
        prov: "湖北省",
        label: "荆州市"
      }, {
        prov: "湖北省",
        label: "黄冈市"
      }, {
        prov: "湖北省",
        label: "咸宁市"
      }, {
        prov: "湖北省",
        label: "随州市"
      }, {
        prov: "湖北省",
        label: "恩施土家族苗族自治州"
      }, {
        prov: "湖北省",
        label: "省直辖县级行政区划"
      }, {
        prov: "湖北省",
        label: "仙桃市"
      }, {
        prov: "湖北省",
        label: "潜江市"
      }, {
        prov: "湖北省",
        label: "天门市"
      }, {
        prov: "湖北省",
        label: "神农架林区"
      }, {
        prov: "湖南省",
        label: "长沙市"
      }, {
        prov: "湖南省",
        label: "株洲市"
      }, {
        prov: "湖南省",
        label: "湘潭市"
      }, {
        prov: "湖南省",
        label: "衡阳市"
      }, {
        prov: "湖南省",
        label: "邵阳市"
      }, {
        prov: "湖南省",
        label: "岳阳市"
      }, {
        prov: "湖南省",
        label: "常德市"
      }, {
        prov: "湖南省",
        label: "张家界市"
      }, {
        prov: "湖南省",
        label: "益阳市"
      }, {
        prov: "湖南省",
        label: "郴州市"
      }, {
        prov: "湖南省",
        label: "永州市"
      }, {
        prov: "湖南省",
        label: "怀化市"
      }, {
        prov: "湖南省",
        label: "娄底市"
      }, {
        prov: "湖南省",
        label: "湘西土家族苗族自治州"
      }, {
        prov: "广东省",
        label: "广州市"
      }, {
        prov: "广东省",
        label: "韶关市"
      }, {
        prov: "广东省",
        label: "深圳市"
      }, {
        prov: "广东省",
        label: "珠海市"
      }, {
        prov: "广东省",
        label: "汕头市"
      }, {
        prov: "广东省",
        label: "佛山市"
      }, {
        prov: "广东省",
        label: "江门市"
      }, {
        prov: "广东省",
        label: "湛江市"
      }, {
        prov: "广东省",
        label: "茂名市"
      }, {
        prov: "广东省",
        label: "肇庆市"
      }, {
        prov: "广东省",
        label: "惠州市"
      }, {
        prov: "广东省",
        label: "梅州市"
      }, {
        prov: "广东省",
        label: "汕尾市"
      }, {
        prov: "广东省",
        label: "河源市"
      }, {
        prov: "广东省",
        label: "阳江市"
      }, {
        prov: "广东省",
        label: "清远市"
      }, {
        prov: "广东省",
        label: "东莞市"
      }, {
        prov: "广东省",
        label: "中山市"
      }, {
        prov: "广东省",
        label: "潮州市"
      }, {
        prov: "广东省",
        label: "揭阳市"
      }, {
        prov: "广东省",
        label: "云浮市"
      }, {
        prov: "广西壮族自治区",
        label: "南宁市"
      }, {
        prov: "广西壮族自治区",
        label: "柳州市"
      }, {
        prov: "广西壮族自治区",
        label: "桂林市"
      }, {
        prov: "广西壮族自治区",
        label: "梧州市"
      }, {
        prov: "广西壮族自治区",
        label: "北海市"
      }, {
        prov: "广西壮族自治区",
        label: "防城港市"
      }, {
        prov: "广西壮族自治区",
        label: "钦州市"
      }, {
        prov: "广西壮族自治区",
        label: "贵港市"
      }, {
        prov: "广西壮族自治区",
        label: "玉林市"
      }, {
        prov: "广西壮族自治区",
        label: "百色市"
      }, {
        prov: "广西壮族自治区",
        label: "贺州市"
      }, {
        prov: "广西壮族自治区",
        label: "河池市"
      }, {
        prov: "广西壮族自治区",
        label: "来宾市"
      }, {
        prov: "广西壮族自治区",
        label: "崇左市"
      }, {
        prov: "海南省",
        label: "海口市"
      }, {
        prov: "海南省",
        label: "三亚市"
      }, {
        prov: "海南省",
        label: "三沙市"
      }, {
        prov: "海南省",
        label: "省直辖县级行政区划"
      }, {
        prov: "海南省",
        label: "五指山市"
      }, {
        prov: "海南省",
        label: "琼海市"
      }, {
        prov: "海南省",
        label: "儋州市"
      }, {
        prov: "海南省",
        label: "文昌市"
      }, {
        prov: "海南省",
        label: "万宁市"
      }, {
        prov: "海南省",
        label: "东方市"
      }, {
        prov: "海南省",
        label: "定安县"
      }, {
        prov: "海南省",
        label: "屯昌县"
      }, {
        prov: "海南省",
        label: "澄迈县"
      }, {
        prov: "海南省",
        label: "临高县"
      }, {
        prov: "海南省",
        label: "白沙黎族自治县"
      }, {
        prov: "海南省",
        label: "昌江黎族自治县"
      }, {
        prov: "海南省",
        label: "乐东黎族自治县"
      }, {
        prov: "海南省",
        label: "陵水黎族自治县"
      }, {
        prov: "海南省",
        label: "保亭黎族苗族自治县"
      }, {
        prov: "海南省",
        label: "琼中黎族苗族自治县"
      }, {
        prov: "重庆市",
        label: "重庆市"
      }, {
        prov: "四川省",
        label: "成都市"
      }, {
        prov: "四川省",
        label: "自贡市"
      }, {
        prov: "四川省",
        label: "攀枝花市"
      }, {
        prov: "四川省",
        label: "泸州市"
      }, {
        prov: "四川省",
        label: "德阳市"
      }, {
        prov: "四川省",
        label: "绵阳市"
      }, {
        prov: "四川省",
        label: "广元市"
      }, {
        prov: "四川省",
        label: "遂宁市"
      }, {
        prov: "四川省",
        label: "内江市"
      }, {
        prov: "四川省",
        label: "乐山市"
      }, {
        prov: "四川省",
        label: "南充市"
      }, {
        prov: "四川省",
        label: "眉山市"
      }, {
        prov: "四川省",
        label: "宜宾市"
      }, {
        prov: "四川省",
        label: "广安市"
      }, {
        prov: "四川省",
        label: "达州市"
      }, {
        prov: "四川省",
        label: "雅安市"
      }, {
        prov: "四川省",
        label: "巴中市"
      }, {
        prov: "四川省",
        label: "资阳市"
      }, {
        prov: "四川省",
        label: "阿坝藏族羌族自治州"
      }, {
        prov: "四川省",
        label: "甘孜藏族自治州"
      }, {
        prov: "四川省",
        label: "凉山彝族自治州"
      }, {
        prov: "贵州省",
        label: "贵阳市"
      }, {
        prov: "贵州省",
        label: "六盘水市"
      }, {
        prov: "贵州省",
        label: "遵义市"
      }, {
        prov: "贵州省",
        label: "安顺市"
      }, {
        prov: "贵州省",
        label: "毕节市"
      }, {
        prov: "贵州省",
        label: "铜仁市"
      }, {
        prov: "贵州省",
        label: "黔西南布依族苗族自治州"
      }, {
        prov: "贵州省",
        label: "黔东南苗族侗族自治州"
      }, {
        prov: "贵州省",
        label: "黔南布依族苗族自治州"
      }, {
        prov: "云南省",
        label: "昆明市"
      }, {
        prov: "云南省",
        label: "曲靖市"
      }, {
        prov: "云南省",
        label: "玉溪市"
      }, {
        prov: "云南省",
        label: "保山市"
      }, {
        prov: "云南省",
        label: "昭通市"
      }, {
        prov: "云南省",
        label: "丽江市"
      }, {
        prov: "云南省",
        label: "普洱市"
      }, {
        prov: "云南省",
        label: "临沧市"
      }, {
        prov: "云南省",
        label: "楚雄彝族自治州"
      }, {
        prov: "云南省",
        label: "红河哈尼族彝族自治州"
      }, {
        prov: "云南省",
        label: "文山壮族苗族自治州"
      }, {
        prov: "云南省",
        label: "西双版纳傣族自治州"
      }, {
        prov: "云南省",
        label: "大理白族自治州"
      }, {
        prov: "云南省",
        label: "德宏傣族景颇族自治州"
      }, {
        prov: "云南省",
        label: "怒江傈僳族自治州"
      }, {
        prov: "云南省",
        label: "迪庆藏族自治州"
      }, {
        prov: "西藏自治区",
        label: "拉萨市"
      }, {
        prov: "西藏自治区",
        label: "昌都地区"
      }, {
        prov: "西藏自治区",
        label: "山南地区"
      }, {
        prov: "西藏自治区",
        label: "日喀则地区"
      }, {
        prov: "西藏自治区",
        label: "那曲地区"
      }, {
        prov: "西藏自治区",
        label: "阿里地区"
      }, {
        prov: "西藏自治区",
        label: "林芝地区"
      }, {
        prov: "陕西省",
        label: "西安市"
      }, {
        prov: "陕西省",
        label: "铜川市"
      }, {
        prov: "陕西省",
        label: "宝鸡市"
      }, {
        prov: "陕西省",
        label: "咸阳市"
      }, {
        prov: "陕西省",
        label: "渭南市"
      }, {
        prov: "陕西省",
        label: "延安市"
      }, {
        prov: "陕西省",
        label: "汉中市"
      }, {
        prov: "陕西省",
        label: "榆林市"
      }, {
        prov: "陕西省",
        label: "安康市"
      }, {
        prov: "陕西省",
        label: "商洛市"
      }, {
        prov: "甘肃省",
        label: "兰州市"
      }, {
        prov: "甘肃省",
        label: "嘉峪关市"
      }, {
        prov: "甘肃省",
        label: "金昌市"
      }, {
        prov: "甘肃省",
        label: "白银市"
      }, {
        prov: "甘肃省",
        label: "天水市"
      }, {
        prov: "甘肃省",
        label: "武威市"
      }, {
        prov: "甘肃省",
        label: "张掖市"
      }, {
        prov: "甘肃省",
        label: "平凉市"
      }, {
        prov: "甘肃省",
        label: "酒泉市"
      }, {
        prov: "甘肃省",
        label: "庆阳市"
      }, {
        prov: "甘肃省",
        label: "定西市"
      }, {
        prov: "甘肃省",
        label: "陇南市"
      }, {
        prov: "甘肃省",
        label: "临夏回族自治州"
      }, {
        prov: "甘肃省",
        label: "甘南藏族自治州"
      }, {
        prov: "青海省",
        label: "西宁市"
      }, {
        prov: "青海省",
        label: "海东市"
      }, {
        prov: "青海省",
        label: "海北藏族自治州"
      }, {
        prov: "青海省",
        label: "黄南藏族自治州"
      }, {
        prov: "青海省",
        label: "海南藏族自治州"
      }, {
        prov: "青海省",
        label: "果洛藏族自治州"
      }, {
        prov: "青海省",
        label: "玉树藏族自治州"
      }, {
        prov: "青海省",
        label: "海西蒙古族藏族自治州"
      }, {
        prov: "宁夏回族自治区",
        label: "银川市"
      }, {
        prov: "宁夏回族自治区",
        label: "石嘴山市"
      }, {
        prov: "宁夏回族自治区",
        label: "吴忠市"
      }, {
        prov: "宁夏回族自治区",
        label: "固原市"
      }, {
        prov: "宁夏回族自治区",
        label: "中卫市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "乌鲁木齐市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "克拉玛依市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "吐鲁番地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "哈密地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "昌吉回族自治州"
      }, {
        prov: "新疆维吾尔自治区",
        label: "博尔塔拉蒙古自治州"
      }, {
        prov: "新疆维吾尔自治区",
        label: "巴音郭楞蒙古自治州"
      }, {
        prov: "新疆维吾尔自治区",
        label: "阿克苏地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "克孜勒苏柯尔克孜自治州"
      }, {
        prov: "新疆维吾尔自治区",
        label: "喀什地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "和田地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "伊犁哈萨克自治州"
      }, {
        prov: "新疆维吾尔自治区",
        label: "塔城地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "阿勒泰地区"
      }, {
        prov: "新疆维吾尔自治区",
        label: "自治区直辖县级行政区划"
      }, {
        prov: "新疆维吾尔自治区",
        label: "石河子市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "阿拉尔市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "图木舒克市"
      }, {
        prov: "新疆维吾尔自治区",
        label: "五家渠市"
      }, {
        prov: "台湾省",
        label: "台北市"
      }, {
        prov: "台湾省",
        label: "高雄市"
      }, {
        prov: "台湾省",
        label: "基隆市"
      }, {
        prov: "台湾省",
        label: "台中市"
      }, {
        prov: "台湾省",
        label: "台南市"
      }, {
        prov: "台湾省",
        label: "新竹市"
      }, {
        prov: "台湾省",
        label: "嘉义市"
      }, {
        prov: "台湾省",
        label: "省直辖"
      }, {
        prov: "香港特别行政区",
        label: "香港岛"
      }, {
        prov: "香港特别行政区",
        label: "九龙"
      }, {
        prov: "香港特别行政区",
        label: "新界"
      }, {
        prov: "澳门特别行政区",
        label: "澳门半岛"
      }, {
        prov: "澳门特别行政区",
        label: "澳门离岛"
      }, {
        prov: "澳门特别行政区",
        label: "无堂区划分区域"
      }];
      for (var val of allCity){
        if (prov == val.prov){
          tempCity.push({label: val.label, value: val.label})
        }
      }
      this.citys = tempCity;
    },
     /*----------- 省份选择(end)  --------------*/

    /*----------- 经营范围选择后回调(start)  --------------*/
    selectBusiness(even){
      this.search()
    },
    /*----------- 经营范围选择后回调(end)  --------------*/

    /*----------- 等级选择后回调(start)  --------------*/
    selectRating(){
      this.search()
    },
    /*----------- 等级选择后回调(end)  --------------*/

    /*----------- 生产商编号的模糊查询(start)  --------------*/
    querySearchAsync(queryString, callback) {
      var list = [{}];
      var codeList=[]
      if (queryString !== '') {
         this.$request.post('/qt/tbpmsupplieroutm/getSupplierCodes', {
          supplierCode:queryString,
         }).then(res => {
           if (res.code == 0) {
             console.log(res)
             if(res.obj.length==0){
               list.push({'value':'未搜索到结果'})
             }
             if(res.obj.length<10){
               res.obj.forEach((item) => {
                 list.push({'value':item})
               });
             }else{
               codeList=res.obj.slice(0,10)
               codeList.forEach((item) => {
                 list.push({'value':item})
               });
             }
             callback(list);
           }
         }).catch(e=>{
             console.log("错误")
         })
     }else{
       if(this.tableData.length<10){
         this.tableData.forEach((item) => {
           list.push({'value':item.supplierCode})
         });
       }else{
        this.tableData=this.tableData.slice(0,10)
        this.tableData.forEach((item) => {
           list.push({'value':item.supplierCode})
         });
       }
     }
     callback(list);
   },
   handleSelect(item) {
      this.searchTypeQuotation(item.value)
   },
    searchTypeQuotation(val){
      this.$request.post(URL+'/qt/tbpmsupplieroutm/listSupplierM',{
          //data 参数
          supplierCode:val,
      }).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          this.tableData.forEach((item, index) => {
            if(item.devDate==""||item.devDate==null){
              item.devDate=""
            }else{
              item.devDate=that.formatData(item.devDate)
            }
            if(item.boolEnabled==0){
              item.boolEnabled="否"
            }else if(item.boolEnabled==1){
              item.boolEnabled="是"
            }
          });
      }).catch(e => {

      })
    },
    /*----------- 生产商编号的模糊查询(end)  --------------*/

     /*----------- 生产商名字的模糊查询(start)  --------------*/
     querySearchSupplierName(queryString, callback){
        var list = [{}];
        var nameList=[]
        if (queryString !== '') {
          this.$request.post('/qt/tbpmsupplieroutm/getSupplierCnames', {
            supplierName:queryString,
          }).then(res => {
            if (res.code == 0) {
              console.log(res)
              if(res.obj.length==0){
                list.push({'value':'未搜索到结果'})
              }
              if(res.obj.length<10){
                res.obj.forEach((item) => {
                  list.push({'value':item})
                });
              }else{
                nameList=res.obj.slice(0,10)
                nameList.forEach((item) => {
                  list.push({'value':item})
                });
              }
              callback(list);
            }
          }).catch(e=>{
              console.log("错误")
          })
      }else{
        if(this.tableData.length<10){
          this.tableData.forEach((item) => {
            list.push({'value':item.supplierName})
          });
        }else{
          this.tableData=this.tableData.slice(0,10)
          this.tableData.forEach((item) => {
            list.push({'value':item.supplierName})
          });
        }
      }
      callback(list);
     },
     handleSelectSupplierName(item){
        this.searchSupplierName(item.value)
     },
     searchSupplierName(val){
        this.$request.post(URL+'/qt/tbpmsupplieroutm/listSupplierM',{
            //data 参数
            supplierName:val,
        }).then(data => {
            this.tableData=data.rows
            this.total=data.total
            this.pageSize=data.pageSize
            this.tableData.forEach((item, index) => {
              if(item.devDate==""||item.devDate==null){
                item.devDate=""
              }else{
                item.devDate=that.formatData(item.devDate)
              }
              if(item.boolEnabled==0){
                item.boolEnabled="否"
              }else if(item.boolEnabled==1){
                item.boolEnabled="是"
              }
            });
        }).catch(e => {

        }) 
     },
     /*----------- 生产商名字的模糊查询(start)  --------------*/
   
    // 选省
    choseProvince(e) {
     this.search()
    },

  }
};