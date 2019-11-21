import Cookies from 'js-cookie'
export default {
  name: "materialMaintain",
  components: {},
  data() {
    return {
      labelPosition:"left",
      pageSize:10,
      currentPage:1,
      total:0,
      dialogTitle: '',
      ruleForm: {
        materialCode: '', materialCname: '', techId: ''
      },
      tableHeight: window.innerHeight - 320,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      tableData: [],
      loading: true,
      dialog: false,
      initDialogForm: {
        materialCode: '', techName: '', materialCname: '', density: '', materialProperty: '', materialTypeCname: '', materialPrice: '', materialSupprice: '',boolEnabled:'1',
        finish:[]
      },
       dialogForm: {
        materialCode: '', techName: '', materialCname: '', density: '', materialProperty: '', materialTypeCname: '', materialPrice: '', materialSupprice: '',boolEnabled:'1',
        finish:[]
      },
      rules:{
        materialCname:[
          { required: true, message: '材料名称不能为空', trigger: 'blur' },
        ],
        density:[
          { required: true, message: '密度不能为空', trigger: 'blur' },
        ],
        materialProperty:[
          { required: true, message: '请选择材料属性', trigger: 'change' },
        ],
        materialTypeCname:[
          { required: true, message: '请选择材料类型', trigger: 'change' },
        ],
        materialPrice:[
          { required: true, message: '客户价格不能为空', trigger: 'blur'}
        ],
        materialSupprice:[
          { required: true, message: '供应商价格不能为空', trigger: 'blur'}
        ],
        boolEnabled:[
          { required: true, message: '请选择是否开启', trigger: 'change' },
        ],
        finish: [
          { type: 'array', required: true, message: '请至少选择一种处理', trigger: 'change' }
        ],
      },
      materialPropertyList:[], //材料属性列表
      materialTypeList:[],  //材料类型
      noEdit:false,
      isEditActive:-1,
      uploadPic:"", //物性表上传路径
      searchButtons:[], //搜索栏按钮
      listOneTableOperation:[],  //一级表按钮列表
      listToolBarOperation:[],  //工具栏按钮列表
      tHeadData:[],   //表头数据列表
      getFinshList:[], //后处理数据
      finishData:[],  //后台返回的处理数据列表
      techNameList:[], //工艺列表
      techId:"",   //工艺ID
      token: Cookies.get('TOKEN'),
      id:'',
      materialType:'',
      boolPlastic:'',
      isSlide:false,
      clientHeight:'750',
    };
  },
  mounted () {
    this.uploadPic=this.$request.defaults.baseURL+'/qt/materials/physicalLoad'
    this.getList()
    this.getSearchTechList()
    setTimeout(() => {
        this.loading = false
      }, 500);
      this.getTreeHrOrgDept()
  },
  methods: {
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

    /*----------- 点击上下页获取列表数据(start)  --------------*/ 
    handleCurrentChange(val) {
       let that=this
       this.$request.post('/qt/materials/listMaterials',{
          //data 参数
          page:val,
          rows:this.pageSize,
          token: Cookies.get('TOKEN'),
        }).then(data => {
          this.tableData=data.rows;
          this.tableData.forEach((item, index) => {
            if(item.boolEnabled==0){
                item.boolEnabled="否"
            }else if(item.boolEnabled==1){
                item.boolEnabled="是"
            }
            if(item.updatedTime==""||item.updatedTime==null){
                item.updatedTime=""
            }else{
                item.updatedTime=that.formatData(item.updatedTime)
            }
          });
        }).catch(e => {

        })
    },
    /*----------- 点击上下页获取列表数据(end)  --------------*/

    /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
    handleSizeChange(val) {
       let that=this
       this.$request.post('/qt/materials/listMaterials',{
          //data 参数
          rows:val,
          token: Cookies.get('TOKEN'),
        }).then(data => {
          this.tableData=data.rows;
          this.tableData.forEach((item, index) => {
            if(item.boolEnabled==0){
                item.boolEnabled="否"
            }else if(item.boolEnabled==1){
                item.boolEnabled="是"
            }
            if(item.updatedTime==""||item.updatedTime==null){
                item.updatedTime=""
            }else{
                item.updatedTime=that.formatData(item.updatedTime)
            }
          });
        }).catch(e => {

        })
    },
     /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 获取表格列表数据(start)  --------------*/
    getList () {
      let that=this
      this.$request.post('/qt/materials/listMaterials',{
        //data 参数
        token: Cookies.get('TOKEN'),
        contentType: "application/json",
      }).then(data => {
        this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.boolEnabled=='0'){
            item.boolEnabled="否"
          }else if(item.boolEnabled=='1'){
            item.boolEnabled="是"
          }
          if(item.updatedTime==""||item.updatedTime==null){
            item.updatedTime=""
          }else{
            item.updatedTime=that.formatData(item.updatedTime)
          }
        });
      }).catch(e => {

      })
      this.$request.post('/sysOperation/listOperationBar',{
        //data 参数
        menuId:'6c53fb63-4781-429f-b37c-15c3f3d2950a',
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
        this.swapArr(this.searchButtons,0,1)
      }).catch(e => {

      })
       //获取材料属性列表
      this.$request.post('/sysbasicinfo/getBasInfo',{
        //data 参数
        parentCode:"property"
      },{token: Cookies.get('TOKEN')}).then(data => {
        this.materialPropertyList=data.obj
      }).catch(e => {

      })
      this.$request.post('/sysbasicinfo/getBasInfo',{
        //data 参数
        parentCode:"MaterialType"
      },{token: Cookies.get('TOKEN')}).then(data => {
        this.materialTypeList=data.obj
      }).catch(e => {

      })
      // 获取后处理数据
      this.$request.post('/sysbasicinfo/getBasInfo',{
        //data 参数
        parentCode:"Finish"
      },{token: Cookies.get('TOKEN')}).then(data => {
        this.getFinshList=data.obj
        this.finishData=[]
        this.getFinshList.forEach((item,index) => {
          this.finishData.push(item.cname)
        });
      }).catch(e => {

      })
    },
    /*----------- 获取表格列表数据(end)  --------------*/
    onAllMaintain(){
      this.getList();
      let treeItem= document.getElementsByClassName("el-tree-node");
      for (let i = 0; i < treeItem.length; i++) {
        treeItem[i].classList.remove("is-current")      
      }
      document.querySelector(".allEmployee").classList.add("isOntree")
    },
    /*----------- 改变数组顺序(start)  --------------*/
    swapArr(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },
    /*----------- 改变数组顺序(end)  --------------*/

    /*----------- 上传头像成功的回调(start)  --------------*/
    handleAvatarSuccess(res, file) {
       let resAall =res.split('.')
       if(resAall[0]=="hlh-erp"){
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
       }else{
        this.$message({
          type: 'error',
          message: '上传失败!'
        });
       }
    },
    /*----------- 上传头像成功的回调(end)  --------------*/

    /*----------- 上传头像之前的回调(start)  --------------*/
    beforeAvatarUpload(file) {
      const extension = file.type === 'application/vnd.ms-excel'
      const extension2 = file.type=== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
          this.$message({
              message: '上传模板只能是xls、xlsx格式!',
              type: 'warning'
          });
      }
      if (!isLt2M) {
          this.$message({
              message: '上传模板大小不能超过 10MB!',
              type: 'warning'
          });
      }
    },
    /*----------- 上传头像之前的回调(end)  --------------*/

    /*----------- 获取工艺下拉框列表(start)  --------------*/
     getTechList(){
       this.$request.post('/qt/tech/getTechSaveComboBox',{
        //data 参数
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.techNameList=data.obj
      }).catch(e => {

      })
    },
    /*----------- 获取工艺下拉框列表(end)  --------------*/

     /*----------- 获取工艺下拉框列表(start)  --------------*/
     getSearchTechList(){
      this.$request.post('/qt/tech/getTechComboBox',{
       //data 参数
       token: Cookies.get('TOKEN'),
     }).then(data => {
       this.techNameList=data.obj
     }).catch(e => {

     })
   },
   /*----------- 获取工艺下拉框列表(end)  --------------*/

    selectTechName(event, item){
        this.techNameList.forEach((item,index) => {
          if(item.techName==event){
            this.techId=item.id
          }
        });
    },
    selectMaterialType(event, item){
      this.materialTypeList.forEach((item,index) => {
        if(item.cname==event){
          this.materialType=item.name
        }
      });
    },
    selectMaterialProperty(event, item){
      this.materialPropertyList.forEach((item,index) => {
        if(item.cname==event){
          this.boolPlastic=item.valueDecimal
        }
      });
    },
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
    search () {   
      let that=this
      console.log(this.ruleForm.materialCode,this.ruleForm.materialCname,this.ruleForm.techId)
      this.$request.post('/qt/materials/listMaterials',{
        //data 参数
       materialCode:this.ruleForm.materialCode,
       materialCname :this.ruleForm.materialCname,
       techId:this.ruleForm.techId,
      },{token: Cookies.get('TOKEN')}).then(data => {
        this.tableData=data.rows;
        this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.boolEnabled=='0'){
            item.boolEnabled="否"
          }else if(item.boolEnabled=='1'){
              item.boolEnabled="是"
          }
          if(item.updatedTime==""||item.updatedTime==null){
              item.updatedTime=""
          }else{
              item.updatedTime=that.formatData(item.updatedTime)
          }
        });
      }).catch(e => {

      })

    },
    /*------------  点击搜索(end) --------------*/

     /*----------- 点击列表编辑(start)  --------------*/
    edit (index, row) {  
        this.initDialogForm = {...row,rowIndex:index}   //表单渲染
        this.dialog = true
        this.dialogTitle = '编辑'
        this.noEdit=true
        this.isEditActive=index
        this.initDialogForm.finish=[]
        this.id=row.id
        this.techId=row.techId
        this.boolPlastic=row.boolPlastic
        console.log(row)
        row.finish.forEach((item,index) => {
          this.initDialogForm.finish.push(item.finishCname)
        });
        this.getTechList()
        if(row.boolEnabled=='否'){
          this.initDialogForm.boolEnabled='0'
        }else if(row.boolEnabled=='是'){
          this.initDialogForm.boolEnabled='1'
        }
    },
    /*----------- 点击列表编辑(end)  --------------*/

    /*----------- 点击左侧树(start)  --------------*/
    handleNodeClick (data) {  
      document.querySelector(".allEmployee").classList.remove("isOntree")
      let that=this
      this.$request.post('/qt/materials/listMaterials',{
        //data 参数
        techParentId:data.id,
        token: Cookies.get('TOKEN'),
      }).then(data => {
         this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.boolEnabled=='0'){
            item.boolEnabled="否"
          }else if(item.boolEnabled=='1'){
            item.boolEnabled="是"
          }
          if(item.updatedTime==""||item.updatedTime==null){
            item.updatedTime=""
          }else{
            item.updatedTime=that.formatData(item.updatedTime)
          }
        })
      }).catch(e => {

      })
    },
    /*----------- 点击左侧树(end)  --------------*/

    /*----------- 搜索框按钮点击事件(start)  --------------*/
    clickEven(even){
        if(even=="清空"){
          this.$refs['ruleForm'].resetFields();
          this.getList();
        }else if(even=="查询"){
          this.search()
        }else if(even=="添加材料"){
          this.apply()
        }
    },
    /*----------- 搜索框按钮点击事件(end)  --------------*/

    /*----------- 点击添加材料(start)  --------------*/
    apply(){
        this.initDialogForm = {...this.dialogForm}   //表单渲染
        this.dialogTitle = '添加材料'
        this.dialog = true
        this.noEdit=false
        this.getTechList()
    },
    /*----------- 点击添加材料(end)  --------------*/

    /*----------- 列表下载(start)  --------------*/
    downTemplate(index, row){
        window.open("http://"+row.physicalOsspath)
    },
    /*----------- 列表下载(end)  --------------*/

     /*----------- 提交弹框数据(start)  --------------*/
     dialogEven(even){
        if(even=="确定"){
          this.submitDialogData()
        }else if(even=="取消"){
          this.dialog = false
        }
    },
    submitDialogData () {   //提交弹框数据
       let listFinish=[]
       this.isEditActive=-1
       this.getFinshList.forEach((item,index) => {
          this.initDialogForm.finish.forEach((val,index) => {
            if(val==item.cname){
              listFinish.push({
                finishCode:item.code,
                finishCname:item.cname
              })
            }
          });
       });
       this.$refs['initDialogForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.4)'
            });
            if(this.dialogTitle =='添加材料'){
              this.$request.post('/qt/materials/saveMaterials',{
                listFinish:listFinish,
                materials:{
                  techId:this.techId,
                  techName:this.initDialogForm.techName,
                  boolEnabled:this.initDialogForm.boolEnabled,
                  density:this.initDialogForm.density,
                  materialCname:this.initDialogForm.materialCname,
                  materialPrice:this.initDialogForm.materialPrice,
                  materialSupprice:this.initDialogForm.materialSupprice,
                  materialCode:this.initDialogForm.materialCode,
                  materialProperty:this.initDialogForm.materialProperty,
                  materialType:this.materialType,
                  materialTypeCname:this.initDialogForm.materialTypeCname,
                  boolPlastic:this.boolPlastic
                }
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
            }else if(this.dialogTitle =='编辑'){
              this.$request.post('/qt/materials/updateMaterials',{
                listFinish:listFinish,
                materials:{
                  id:this.id,
                  techId:this.techId,
                  techName:this.techName,
                  boolEnabled:this.initDialogForm.boolEnabled,
                  density:this.initDialogForm.density,
                  materialCname:this.initDialogForm.materialCname,
                  materialPrice:this.initDialogForm.materialPrice,
                  materialSupprice:this.initDialogForm.materialSupprice,
                  materialCode:this.initDialogForm.materialCode,
                  materialProperty:this.initDialogForm.materialProperty,
                  materialType:this.materialType,
                  materialTypeCname:this.initDialogForm.materialTypeCname,
                  boolPlastic:this.boolPlastic
                }
              },{token: Cookies.get('TOKEN')}).then(data => {
                 if(data.msg=="成功"){
                  this.search()
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
            console.log('error submit!!');
            return false;
          }
      });
      
    },
    /*----------- 提交弹框数据(end)  --------------*/

     /*----------- 取消(start)  --------------*/
    cancel(){
      this.isEditActive=-1
      this.dialog = false
    },
    /*----------- 取消(end)  --------------*/

    /*----------- 关闭弹框回调(start)  --------------*/
     closed(){
        this.isEditActive=-1
    },
    /*----------- 关闭弹框回调(end)  --------------*/
  
    /*----------- 获取左侧树形列表(start)  --------------*/
    getTreeHrOrgDept(){
      this.$request.post('/qt/tech/getTechTree',{
        //data 参数
        token: Cookies.get('TOKEN'),
      }).then(data => {
         this.treeData=data.children
      }).catch(e => {

      })
    },
    /*----------- 获取左侧树形列表(end)  --------------*/
  }
};