import Cookies from 'js-cookie'
import axios from 'axios'
let URL=""
import Swiper from '../../../components/swiper.vue'
export default {
  name: "facilities",
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
      supplierCode:'', //生产商编号
      ruleForm:{
        machineTypecode:'',
      },
      initDialogForm:{
        supplierName:'',
        machineTypecode:'',
        qty:'',
        maxX:'',
        maxY:'',
        maxZ:'',
        accuracy:'',
        thickness:'',
        ofAxes:'',
        filePath:[]
      },
      dialogForm:{
        supplierName:'',
        machineTypecode:'',
        qty:'',
        maxX:'',
        maxY:'',
        maxZ:'',
        accuracy:'',
        thickness:'',
        ofAxes:'',
        filePath:[]
      },
      rules:{
        machineTypecode:[
          {  required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        qty:[
          { required: true, message: '数量不能为空', trigger: 'blur' },
        ],
      },
      isEditActive:-1,
      isDelActive:-1,
      machineTypecodeList:[], //设备类型列表
      fileList:[],  //上传附件列表
      imageUrl: require('../../../assets/image/word.png'),
      imageUrl2:require('../../../assets/image/excel.png'),
      imageUrl3:require('../../../assets/image/pdf.png'),
      token: Cookies.get('TOKEN'),
      uploadPic:'',
      code:'',
      id:'',
      imgDialog:false,
      imgList:[],
    };
  },
  components: {
    Swiper
  },
  watch: {
      
  },
  mounted() {
    this.uploadPic=this.$request.defaults.baseURL+'/tbsupoutcertificates/photoupload'  //上传图片ip地址
    this.supplierCode=this.$route.query.supplierCode
    this.getList();
    this.getMachineTypecodeList()
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
           supplierCode:this.supplierCode
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.tableData.forEach((item, index) => {
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
     /*----------- 点击上下页获取列表数据(end)  --------------*/
  
     /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
     handleSizeChange(val) {
        let that=this
        this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachines',{
           //data 参数
           rows:val,
           supplierCode:this.supplierCode,
         },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.tableData.forEach((item, index) => {
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
     /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList(){
      let that=this
      this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachines',{
          //data 参数
        supplierCode:this.supplierCode
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          this.tableData.forEach((item, index) => {
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

    /*----------- 获取设备类型列表(start)  --------------*/
    getMachineTypecodeList(){
      this.$request.post(URL+'/sysbasicinfo/getBasInfo',{
          //data 参数
          parentCode:"MachineType",
          token: Cookies.get('TOKEN'),
      }).then(data => {
        this.machineTypecodeList=data.obj
      }).catch(e => {

      })
    },
    /*----------- 获取设备类型列表(end)  --------------*/

    /*------------  搜索(start)  ----------------*/
    search(){
      let that=this
      this.$request.post(URL+'/tbsupoutmachine/listTbSupOutMachines',{
          //data 参数
        machineTypecode:this.ruleForm.machineTypecode,
        supplierCode:this.supplierCode
      },{token: Cookies.get('TOKEN')}).then(data => {
          this.tableData=data.rows
          this.total=data.total
          this.pageSize=data.pageSize
          this.tableData.forEach((item, index) => {
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
    selectSearch(event){
      this.search()
    },
    /*------------  搜索(end)  ----------------*/

    /*------------  清空(start)  ----------------*/

    /*------------  清空(end)  ----------------*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    /*------------  编辑(start)  ----------------*/
    edit(index,row){
      this.initDialogForm = {...row,rowIndex:index}   //表单渲染
      this.dialog = true;
      this.dialogTitle = "修改设备";
      this.isEditActive=index;
      this.id=row.id;
      this.code=row.machineTypecode      
      this.initDialogForm.filePath=row.ossImage
      this.fileList=[]
      if(row.ossImage==null||row.ossImage==''){
        this.fileList=[]
      }else{
        let fileItem=row.ossImage.split(',');
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
      }
     
    },
    /*------------  编辑(end)  ----------------*/
   
     /*----------- 删除(start)  --------------*/
     del(index, row) { 
        this.isDelActive=index 
        let that = this
        this.$confirm('删除该条数据, 审核通过待审核继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '删除中',
            background: 'rgba(255, 255, 255, 0.4)'

          });
          this.$request.post(URL+'/tbsupoutmachine/deleteSupOutMachine',{
            //data 参数
            id:row.id,
            supplierCode:this.supplierCode
          },{token: Cookies.get('TOKEN')}).then(data => {
            if(data.msg=="成功"){
               setTimeout(() => {
                loading.close();
                that.tableData.splice(index,1)
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
    /*----------- 删除(end)  --------------*/
  
    /*----------- 关闭弹框回调(start)  --------------*/
    closed(){
        this.isEditActive=-1
        this.isDelActive=-1
    },
    /*----------- 关闭弹框回调(end)  --------------*/

    /*----------- 取消(start)  --------------*/
    cancel(){
        this.isEditActive=-1
        this.dialog = false
    },
   /*----------- 取消(end)  --------------*/

   /*----------- 查看图片(start)  --------------*/
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
   /*----------- 查看图片(start)  --------------*/

   /*----------- 新增设备(start)  --------------*/
   addFacilities(){
      this.initDialogForm = {...this.dialogForm}   //表单渲染
      this.dialog = true;
      this.dialogTitle = "新增设备";
      this.fileList=[]
   },
   /*----------- 新增设备(end)  --------------*/

   /*----------- 选择设备类型(start)  --------------*/
   selectMachineTypecode(event, item){
      this.machineTypecodeList.forEach((item,index) => {
        if(item.cname==event){
          this.code=item.code
        }
      });
   },
   /*----------- 选择设备类型(start)  --------------*/
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
      if(this.initDialogForm.filePath==''||this.initDialogForm.filePath==null){
        this.initDialogForm.filePath=res
      }else{
        this.initDialogForm.filePath=this.initDialogForm.filePath+','+res
      }
    },
    /*----------- 上传头像成功的回调(end)  --------------*/

    /*----------- 上传头像之前的回调(start)  --------------*/
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      }
      if (!isLt2M) {
          this.common.errorTip('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    /*----------- 上传头像之前的回调(end)  --------------*/

     /*----------- 删除图片(start)  --------------*/
    handleRemove(itemList,index) {
      let fileItem=this.initDialogForm.filePath.split(',')
      fileItem.forEach((item,index,object) => {
        if(item==itemList.path){
          object.splice(index, 1);
        }
      })
      this.fileList.splice(index, 1);
      this.initDialogForm.filePath=fileItem.join(',')
    },
    /*----------- 删除图片(end)  --------------*/

     /*----------- 提交表单(start)  --------------*/
    save(){
      this.$refs['initDialogForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.4)'
            });
            if(this.dialogTitle =='新增设备'){
              this.$request.post(URL+'/tbsupoutmachine/saveTbSupOutMachine',{
                supplierName:this.initDialogForm.supplierName,
                qty:parseInt(this.initDialogForm.qty),
                ossImage:this.initDialogForm.filePath,
                maxX:parseInt(this.initDialogForm.maxX),
                maxY:parseInt(this.initDialogForm.maxY),
                maxZ:parseInt(this.initDialogForm.maxZ),
                accuracy:this.initDialogForm.accuracy,
                thickness:this.initDialogForm.thickness,
                ofAxes:parseInt(this.initDialogForm.ofAxes),
                machineTypecode:this.code,
                machineName:this.initDialogForm.machineTypecode,
                supplierCode:this.supplierCode
              },{token: Cookies.get('TOKEN')}).then(data => {
                this.getList()
                if(data.msg=="成功"){
                  this.fileList=[]
                  setTimeout(() => {
                    loading.close();
                    this.dialog = false
                    this.$message({
                      type: 'success',
                      message: '新增设备成功!'
                    });
                  }, 1000);
                }else{
                  loading.close();
                  this.$message({
                      type: 'error',
                      message: '新增设备失败!'
                    });
                }
              }).catch(e => {

              })
            }else if(this.dialogTitle =='修改设备'){
              this.$request.post(URL+'/tbsupoutmachine/updateTbSupOutMachine',{
                supplierName:this.initDialogForm.supplierName,
                qty:parseInt(this.initDialogForm.qty),
                ossImage:this.initDialogForm.filePath,
                maxX:parseInt(this.initDialogForm.maxX),
                maxY:parseInt(this.initDialogForm.maxY),
                maxZ:parseInt(this.initDialogForm.maxZ),
                accuracy:this.initDialogForm.accuracy,
                thickness:this.initDialogForm.thickness,
                ofAxes:parseInt(this.initDialogForm.ofAxes),
                machineTypecode:this.code,
                machineName:this.initDialogForm.machineTypecode,
                supplierCode:this.supplierCode,
                id:this.id,
              },{token: Cookies.get('TOKEN')}).then(data => {
                this.getList()
                if(data.msg=="成功"){
                  setTimeout(() => {
                    loading.close();
                    this.dialog = false
                    this.$message({
                      type: 'success',
                      message: '修改设备成功!'
                    });
                  }, 1000);
                }else{
                  loading.close();
                  this.$message({
                      type: 'error',
                      message: '修改设备失败!'
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
     /*----------- 提交表单(end)  --------------*/

     /*----------- 取消提交表单(start)  --------------*/
     innerVisibleCancel(){
      this.dialog=false
     },
      /*----------- 取消提交表单(end)  --------------*/
  }
};