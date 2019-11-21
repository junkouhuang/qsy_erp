
import Cookies from 'js-cookie'
export default {
  name: "personnelFiles",
  components: {},
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      dialogTitle: '',
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      ruleForm: {
        employeeCode: '', employeeCname: '', quitState: '', dateType: '', start: '', end: '',
      },
      tableHeight: window.innerHeight - 180,
      dateOptions: [
        { value: "1", label: "入职时间" },
        { value: "2", label: "生日新历" },
        { value: "3", label: "生日农历" }
      ],
      statusOptions: [
        { value: "0", label: "在职" },
        { value: "1", label: "离职" },
      ],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      tHeadData: [],
      tableData: [],
      loading: true,
      dialog: false,
      initDialogForm: {
        employeeCode: '', employeeCname: '', employeeName: '', employeeSex: '', idNumber: '', employeeHeight: '', employeeWeight: '', idBirth: '',
        registResidence: '', university: '', phoneNumber: '', employeeNation: '', education: '', boolMarried: '', employeeSalary: '', foodRoom: '',
        urgentName: '', relation: '', urgentPhone: '', deptName1: '', deptName2: '', deptName: '',levelId: '', positionName: '', attendNo: '', bankName: '',
        bankAccount: '', employeeMail: '',roomInfo: '', quitDate: '',quitState:'',
        socialSecurity: '', entryDate: '', becomestaffDate: '', remarks: ''
      },
       dialogForm: {
        employeeCode: '', employeeCname: '', employeeName: '', employeeSex: '', idNumber: '', employeeHeight: '', employeeWeight: '', idBirth: '',
        registResidence: '', university: '', phoneNumber: '', employeeNation: '', education: '', boolMarried: '', employeeSalary: '', foodRoom: '',
        urgentName: '', relation: '', urgentPhone: '', deptName1: '', deptName2: '', deptName: '',levelId: '', positionName: '', attendNo: '', bankName: '',
        bankAccount: '', employeeMail: '',roomInfo: '', quitDate: '',quitState:'',
        socialSecurity: '', entryDate: '', becomestaffDate: '', remarks: ''
      },
      rules:{
        employeeSex:[
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        idNumber:[
          { required: true, message: '身份证不能为空', trigger: 'blur' },
        ],
        idBirth:[
          {  required: true, message: '请选择生日日期', trigger: 'change' }
        ],
        phoneNumber:[
          {validator: checkPhone, trigger: 'blur'}
        ],
        employeeNation:[
          { required: true, message: '请选择民族', trigger: 'change' },
        ],
        education:[
          { required: true, message: '请选择学历', trigger: 'change' },
        ],
        boolMarried:[
          { required: true, message: '请选择是否结婚', trigger: 'change' },
        ],
        urgentPhone:[
          {validator: checkPhone, trigger: 'blur'}
        ],
        deptName1:[
          { required: true, message: '请选择一级部门', trigger: 'change' },
        ],
        deptName2:[
          { required: true, message: '请选择二级部门', trigger: 'change' },
        ],
        deptName:[
          { required: true, message: '请选择三级部门', trigger: 'change' },
        ],
        positionName:[
          { required: true, message: '请选择职位', trigger: 'change' },
        ],
        entryDate:[
          {  required: true, message: '请选择入职日期', trigger: 'change' }
        ],
        levelId:[
          { required: true, message: '请选择级别', trigger: 'change' },
        ]
      },
      imageUrl: '',
      employeeNationList:[], //名族列表
      educationList:[], //学历列表
      deptName1List:[], //一级部门列表
      deptName2List:[], //二级部门列表
      deptName3List:[], //三级部门列表
      ifCheckDeptName1:false,
      ifCheckDeptName2:false,
      parentCode:"",
      parentCode2:"",
      deptName1:"",
      deptName2:"",
      uploadPic:'',
      resImageUrl:"",
      buttonTitle:"上传图片",
      employeeId:'', //用户id
      positionNameList:[], //职位列表
      positionCode:"", 
      departmentCode:"",
      isEditActive:-1,
      isDelActive:-1,
      searchButtons:[], //搜索栏按钮
      listOneTableOperation:[],  //一级表按钮列表
      listToolBarOperation:[],  //工具栏按钮列表
      foodRoomList:[], //食堂列表
      isSlide:false,
      clientHeight:'750',
      icon:'fa-user-o'
    };
  },
  mounted () {
    this.getList()
    this.uploadPic=this.$request.defaults.baseURL+'hremployeeinfo/photoupload'  //上传图片ip地址
    setTimeout(() => {
        this.loading = false
      }, 500);
    this.getTreeHrOrgDept()
  },
  watch: {
      'initDialogForm.deptName1':function(newVal,oldVal){
          if(newVal){
            this.ifCheckDeptName1=false
          }else{
            this.ifCheckDeptName1=true
          }
      },
      'initDialogForm.deptName2':function(newVal,oldVal){
          if(newVal){
            this.ifCheckDeptName2=false
          }else{
            this.ifCheckDeptName2=true
          }
      }
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
       this.$request.post('/hremployeeinfo/listHr',{
          //data 参数
          page:val,
          rows:this.pageSize,
          token: Cookies.get('TOKEN'),
        }).then(data => {
          this.tableData=data.rows;
          this.tableData.forEach((item, index) => {
            if(item.entryDate==""||item.entryDate==null){
              item.entryDate=""
            }else{
             item.entryDate=that.formatData(item.entryDate)
            }
            if(item.idBirth==""||item.idBirth==null){
              item.idBirth=""
            }else{
              item.idBirth=that.formatData(item.idBirth)
            }
            if(item.employeeBirth==""||item.employeeBirth==null){
              item.employeeBirth=""
            }else{
              item.employeeBirth=that.formatData(item.employeeBirth)
            }
            if(item.employeeSex==0){
              item.employeeSex="女"
            }else if(item.employeeSex==1){
              item.employeeSex="男"
            }

            if(item.quitDate==""||item.quitDate==null){
              item.quitState="在职"
            }else{
              item.quitState="离职"
            }

            if(item.boolMarried==0){
              item.boolMarried="未婚"
            }else if(item.boolMarried==1){
              item.boolMarried="已婚"
            }else if(item.boolMarried==2){
              item.boolMarried="离异"
            }
          });
        }).catch(e => {

        })
    },
    /*----------- 点击上下页获取列表数据(end)  --------------*/

    /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
    handleSizeChange(val) {
       let that=this
       this.$request.post('/hremployeeinfo/listHr',{
          //data 参数
          rows:val,
          token: Cookies.get('TOKEN'),
        }).then(data => {
          this.tableData=data.rows;
          this.tableData.forEach((item, index) => {
            if(item.entryDate==""||item.entryDate==null){
              item.entryDate=""
            }else{
             item.entryDate=that.formatData(item.entryDate)
            }
            if(item.idBirth==""||item.idBirth==null){
              item.idBirth=""
            }else{
              item.idBirth=that.formatData(item.idBirth)
            }
            if(item.employeeBirth==""||item.employeeBirth==null){
              item.employeeBirth=""
            }else{
              item.employeeBirth=that.formatData(item.employeeBirth)
            }
            if(item.employeeSex==0){
              item.employeeSex="女"
            }else if(item.employeeSex==1){
              item.employeeSex="男"
            }

            if(item.quitDate==""||item.quitDate==null){
              item.quitState="在职"
            }else{
              item.quitState="离职"
            }

            if(item.boolMarried==0){
              item.boolMarried="未婚"
            }else if(item.boolMarried==1){
              item.boolMarried="已婚"
            }else if(item.boolMarried==2){
              item.boolMarried="离异"
            }
          });
        }).catch(e => {

        })
    },
    /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

    /*----------- 点击全部员工获取列表数据(start)  --------------*/
    onAllEmployee(){
      this.getList();
      let treeItem= document.getElementsByClassName("el-tree-node");
      for (let i = 0; i < treeItem.length; i++) {
        treeItem[i].classList.remove("is-current")      
      }
      document.querySelector(".allEmployee").classList.add("isOntree")
    },
    /*----------- 点击全部员工获取列表数据(end)  --------------*/

    /*----------- 关闭弹框回调(start)  --------------*/
    closed(){
        this.isEditActive=-1
        this.isDelActive=-1
    },
    /*----------- 关闭弹框回调(end)  --------------*/
    
    /*----------- 人事档案--获取列表(start)  --------------*/
    getList () {
      let that=this
      this.$request.post('/hremployeeinfo/listHr',{
        //data 参数
        token: Cookies.get('TOKEN'),
        contentType: "application/json",
      }).then(data => {
        this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.entryDate==""||item.entryDate==null){
            item.entryDate=""
          }else{
            item.entryDate=that.formatData(item.entryDate)
          }
          if(item.idBirth==""||item.idBirth==null){
            item.idBirth=""
          }else{
            item.idBirth=that.formatData(item.idBirth)
          }
          if(item.employeeBirth==""||item.employeeBirth==null){
            item.employeeBirth=""
          }else{
            item.employeeBirth=that.formatData(item.employeeBirth)
          }
          if(item.employeeSex==0){
            item.employeeSex="女"
          }else if(item.employeeSex==1){
            item.employeeSex="男"
          }

          if(item.quitDate==""||item.quitDate==null){
            item.quitState="在职"
          }else{
            item.quitState="离职"
          }

          if(item.boolMarried==0){
            item.boolMarried="未婚"
          }else if(item.boolMarried==1){
            item.boolMarried="已婚"
          }else if(item.boolMarried==2){
            item.boolMarried="离异"
          }
        });
      }).catch(e => {

      })
      //获取表头
      this.$request.post('/sysOperation/listOperationBar',{
        //data 参数
        menuId:'f80a1601-886e-4378-a058-63c4f819ba95',
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.tHeadData=data.obj.listOneColumn
        this.searchButtons=data.obj.listSearchBarOperation
        this.listOneTableOperation=data.obj.listOneTableOperation
        this.listOneTableOperation.reverse()
        this.listToolBarOperation=data.obj.listToolBarOperation
        this.searchButtons.forEach((item,index) => {
          if(item.operationName=="查询"){
            item.icon="el-icon-search"
          }
        });
        this.searchButtons.reverse()
      }).catch(e => {

      })
       //获取名族列表
      this.$request.post('/sysbasicinfo/selectMapBasicinfo',{
        //data 参数
        parent_code:"EG",
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.employeeNationList=data.obj
      }).catch(e => {

      })
      //获取学历列表
      this.$request.post('/sysbasicinfo/selectMapBasicinfo',{
        //data 参数
        parent_code:"Education",
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.educationList=data.obj
      }).catch(e => {

      })

      //获取食堂列表
      this.$request.post('/sysbasicinfo/getBasInfo',{
        //data 参数
        parentCode:"FoodRoom",
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.foodRoomList=data.obj
      }).catch(e => {

      })
    },
    /*----------- 人事档案--获取列表(end)  --------------*/

    /*----------- 获取一级部门列表(start)  --------------*/
    selectHrOrgDept1(){
       this.$request.post('/hrorgdept/selectHrOrgDept',{
        //data 参数
        deptLevel:"1",
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.deptName1List=data.obj
        this.deptName1List.forEach((item,index) => {
          if(item.deptName==this.deptName1){
            this.parentCode=item.deptCode
          }
        });
        this.selectHrOrgDept2()
      }).catch(e => {

      })
    },
    /*----------- 获取一级部门列表(end)  --------------*/

    /*----------- 获取二级部门列表(start)  --------------*/
    selectHrOrgDept2(){
      this.$request.post('/hrorgdept/selectHrOrgDept',{
        //data 参数
        deptLevel:"2",
        parentCode:this.parentCode,
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.deptName2List=data.obj
        this.deptName2List.forEach((item,index) => {
          if(item.deptName==this.deptName2){
            this.parentCode2=item.deptCode
          }
        });
        this.selectHrOrgDept3()
      }).catch(e => {

      })
    },
    /*----------- 获取二级部门列表(end)  --------------*/

     /*----------- 获取三级部门列表(start)  --------------*/
    selectHrOrgDept3(){
      this.$request.post('/hrorgdept/selectHrOrgDept',{
        //data 参数
        deptLevel:"3",
        parentCode:this.parentCode2,
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.deptName3List=data.obj
      }).catch(e => {

      })
    },
    /*----------- 获取三级部门列表(end)  --------------*/

    /*----------- 选中一级部门(start)  --------------*/
    selectOne(event, item) { 
       this.deptName1List.forEach((item,index) => {
          if(item.deptName==event){
            this.parentCode=item.deptCode
          }
        });
       this.selectHrOrgDept2();
       setTimeout(() => {
         this.initDialogForm.deptName2=this.deptName2List[0].deptName
         this.deptName2List.forEach((item,index) => {
          if(item.deptName==this.initDialogForm.deptName2){
            this.parentCode2=item.deptCode
          }
        });
        this.selectHrOrgDept3()
       }, 500);
       setTimeout(() => {
         this.initDialogForm.deptName=this.deptName3List[0].deptName
         this.departmentCode=this.deptName3List[0].deptCode
       }, 1000);
    },
    /*----------- 选中一级部门(end)  --------------*/

    /*----------- 选中二级部门(start)  --------------*/
    selectTwo(event, item){
       this.deptName2List.forEach((item,index) => {
          if(event==item.deptName){
            this.parentCode2=item.deptCode
          }
        });
       this.selectHrOrgDept3();
       setTimeout(() => {
         this.initDialogForm.deptName=this.deptName3List[0].deptName
         this.departmentCode=this.deptName3List[0].deptCode
       }, 500);
    },
    /*----------- 选中二级部门(end)  --------------*/

    /*----------- 选中三级部门(start)  --------------*/
    selectThree(event, item){
       this.deptName3List.forEach((item,index) => {
          if(event==item.deptName){
            this.departmentCode=item.deptCode
          }
          console.log(this.departmentCode)
        });
       this.selectHrOrgDept3();
       setTimeout(() => {
         this.initDialogForm.deptName=this.deptName3List[0].deptName
       }, 500);
    },
    /*----------- 选中三级部门(end)  --------------*/

    /*----------- 选中职位(start)  --------------*/
    selectPositionName(event, item){
      console.log(event)
      this.positionNameList.forEach((item,index) => {
          if(event==item.positionCname){
              this.positionCode=item.positionCode
          }
        });
    },
    /*----------- 选中职位(end)  --------------*/

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

    /*----------- 点击搜索(start)  --------------*/
    search () {   
      let that=this
      this.ruleForm.start = this.$refs.searchStart.displayValue
      this.ruleForm.end = this.$refs.searchEnd.displayValue
      this.$request.post('/hremployeeinfo/listHr',{
        //data 参数
       dateType:this.ruleForm.dateType,
       employeeCode:this.ruleForm.employeeCode,
       employeeCname:this.ruleForm.employeeCname,
       quitState: this.ruleForm.quitState,
       startDate: this.ruleForm.start,
       endDate:this.ruleForm.end,
       token: Cookies.get('TOKEN'),
      }).then(data => {
        this.tableData=data.rows;
        this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.entryDate==""||item.entryDate==null){
            item.entryDate=""
          }else{
            item.entryDate=that.formatData(item.entryDate)
          }
          if(item.idBirth==""||item.idBirth==null){
            item.idBirth=""
          }else{
            item.idBirth=that.formatData(item.idBirth)
          }
          if(item.employeeBirth==""||item.employeeBirth==null){
            item.employeeBirth=""
          }else{
            item.employeeBirth=that.formatData(item.employeeBirth)
          }
          if(item.employeeSex==0){
            item.employeeSex="女"
          }else if(item.employeeSex==1){
            item.employeeSex="男"
          }

          if(item.quitDate==""||item.quitDate==null){
            item.quitState="在职"
          }else{
            item.quitState="离职"
          }

          if(item.boolMarried==0){
            item.boolMarried="未婚"
          }else if(item.boolMarried==1){
            item.boolMarried="已婚"
          }else if(item.boolMarried==2){
            item.boolMarried="离异"
          }
        });
      }).catch(e => {

      })

    },
     /*----------- 点击搜索(end)  --------------*/

     /*----------- 点击列表编辑(start)  --------------*/
    edit (index, row) {  
        this.initDialogForm = {...row,rowIndex:index}   //表单渲染
        this.deptName1=row.deptName1
        this.deptName2=row.deptName2
        this.selectHrOrgDept1()
        this.getPositionNameList()
        this.dialog = true
        this.dialogTitle = '编辑'
        this.employeeId=row.id
        this.positionCode=row.positionCode
        this.departmentCode=row.departmentCode
        this.isEditActive=index
    },
    /*----------- 点击列表编辑(end)  --------------*/

    /*----------- 点击列表删除(start)  --------------*/
    del (index, row) { 
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
          this.$request.post('/hremployeeinfo/deleteHr',{
            //data 参数
            id:row.id,
            token: Cookies.get('TOKEN'),
          }).then(data => {
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
    /*----------- 点击列表删除(end)  --------------*/

    /*----------- 获取职位列表(start)  --------------*/
    getPositionNameList(){
      this.$request.post('/hrposition/selectMapPosition',{
        //data 参数
        token: Cookies.get('TOKEN'),
      }).then(data => {
         this.positionNameList=data.obj
      }).catch(e => {

      })
    },
    /*----------- 获取职位列表(end)  --------------*/

    /*----------- 点击左侧树(start)  --------------*/
    handleNodeClick (data) {  
      document.querySelector(".allEmployee").classList.remove("isOntree")
      let that=this
      this.$request.post('/hremployeeinfo/listHr',{
        //data 参数
        departmentCode:data.id,
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.tableData=data.rows;
        this.total=data.total
        this.pageSize=data.pageSize
        this.tableData.forEach((item, index) => {
          if(item.entryDate==""||item.entryDate==null){
            item.entryDate=""
          }else{
            item.entryDate=that.formatData(item.entryDate)
          }
          if(item.idBirth==""||item.idBirth==null){
            item.idBirth=""
          }else{
            item.idBirth=that.formatData(item.idBirth)
          }
          if(item.employeeBirth==""||item.employeeBirth==null){
            item.employeeBirth=""
          }else{
            item.employeeBirth=that.formatData(item.employeeBirth)
          }
          if(item.employeeSex==0){
            item.employeeSex="女"
          }else if(item.employeeSex==1){
            item.employeeSex="男"
          }

          if(item.quitDate==""||item.quitDate==null){
            item.quitState="在职"
          }else{
            item.quitState="离职"
          }

          if(item.boolMarried==0){
            item.boolMarried="未婚"
          }else if(item.boolMarried==1){
            item.boolMarried="已婚"
          }else if(item.boolMarried==2){
            item.boolMarried="离异"
          }
        });
      }).catch(e => {

      })
    },
    /*----------- 点击左侧树(end)  --------------*/

    /*----------- 点击新增员工(start)  --------------*/
    addEmployee () {  
      this.initDialogForm = {...this.dialogForm}   //表单渲染
      this.selectHrOrgDept1()
      this.getPositionNameList()
      this.dialogTitle = '新增'
      this.dialog = true
    },
    /*----------- 点击新增员工(end)  --------------*/

    /*----------- 上传头像成功的回调(start)  --------------*/
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.resImageUrl=res;
      this.buttonTitle="重新上传"
    },
    /*----------- 上传头像成功的回调(end)  --------------*/

    /*----------- 上传头像之前的回调(start)  --------------*/
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    /*----------- 上传头像之前的回调(end)  --------------*/

    /*----------- 搜索框按钮点击事件(start)  --------------*/
    clickEven(even){
        if(even=="清空"){
          this.$refs['ruleForm'].resetFields();
          this.getList()
        }else if(even=="查询"){
          this.search()
        }
    },
    /*----------- 搜索框按钮点击事件(end)  --------------*/

    /*----------- 提交弹框数据(start)  --------------*/
    dialogEven(even){
        if(even=="确定"){
          this.submitDialogData()
        }else if(even=="取消"){
          this.dialog = false
        }
    },
    submitDialogData () { 
       this.isEditActive=-1  
       this.isDelActive=-1      
       this.$refs['initDialogForm'].validate((valid) => {
          let employeeSex,boolMarried,quitState
          if(this.initDialogForm.employeeSex=="女"){
            employeeSex=0
          }else if(this.initDialogForm.employeeSex=="男"){
            employeeSex=1
          }
          if(this.initDialogForm.boolMarried=="未婚"){
            boolMarried=0
          }else if(this.initDialogForm.boolMarried=="已婚"){
            boolMarried=1
          }else if(this.initDialogForm.boolMarried=="离异"){
            boolMarried=2
          }
          if(this.initDialogForm.quitState=="在职"){
            quitState="0"
          }else if(this.initDialogForm.quitState=="离职"){
            quitState="1"
          }
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.4)'
            });
            //新增
            if(this.dialogTitle =='新增'){
              this.$request.post('/hremployeeinfo/saveHr',{
                attendNo:this.initDialogForm.attendNo,
                photo:this.resImageUrl,
                employeeCode:this.initDialogForm.employeeCode,
                employeeCname:this.initDialogForm.employeeCname,
                employeeName:this.initDialogForm.employeeName,
                employeeSex:employeeSex,
                idNumber:this.initDialogForm.idNumber,
                employeeHeight:this.initDialogForm.employeeHeight,
                employeeWeight:this.initDialogForm.employeeWeight,
                idBirth: this.initDialogForm.idBirth,
                registResidence:this.initDialogForm.registResidence,
                university:this.initDialogForm.university,
                phoneNumber:this.initDialogForm.phoneNumber,
                employeeNation:this.initDialogForm.employeeNation,
                education:this.initDialogForm.education,
                boolMarried:boolMarried,
                employeeSalary:this.initDialogForm.employeeSalary,
                foodRoom:this.initDialogForm.foodRoom,
                urgentName:this.initDialogForm.urgentName,
                relation:this.initDialogForm.relation,
                urgentPhone:this.initDialogForm.urgentPhone,
                deptName1:this.initDialogForm.deptName1,
                deptName2:this.initDialogForm.deptName2,
                departmentCode:this.departmentCode,
                deptName:this.initDialogForm.deptName,
                levelId:this.initDialogForm.levelId,
                positionName:this.initDialogForm.positionName,
                positionCode:this.positionCode,
                bankName:this.initDialogForm.bankName,
                bankAccount:this.initDialogForm.bankAccount,    
                employeeMail:this.initDialogForm.employeeMail,
                roomInfo:this.initDialogForm.roomInfo,
                quitDate:this.initDialogForm.quitDate,
                quitState:quitState,
                socialSecurity:this.initDialogForm.socialSecurity,
                entryDate:this.initDialogForm.entryDate,
                becomestaffDate:this.initDialogForm.becomestaffDate,
                remarks:this.initDialogForm.remarks,
                boolBirthlunar: 1,	
                boolContract:1,
                boolShowsaleslist:0,        
                token: Cookies.get('TOKEN'),
              }).then(data => {
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
            }else if(this.dialogTitle =='编辑'){
              this.$request.post('/hremployeeinfo/updateHr',{
                attendNo:this.initDialogForm.attendNo,
                photo:this.resImageUrl,
                employeeCode:this.initDialogForm.employeeCode,
                employeeCname:this.initDialogForm.employeeCname,
                employeeName:this.initDialogForm.employeeName,
                employeeSex:employeeSex,
                idNumber:this.initDialogForm.idNumber,
                employeeHeight:this.initDialogForm.employeeHeight,
                employeeWeight:this.initDialogForm.employeeWeight,
                idBirth: this.initDialogForm.idBirth,
                registResidence:this.initDialogForm.registResidence,
                university:this.initDialogForm.university,
                phoneNumber:this.initDialogForm.phoneNumber,
                employeeNation:this.initDialogForm.employeeNation,
                education:this.initDialogForm.education,
                boolMarried:boolMarried,
                employeeSalary:this.initDialogForm.employeeSalary,
                foodRoom:this.initDialogForm.foodRoom,
                urgentName:this.initDialogForm.urgentName,
                relation:this.initDialogForm.relation,
                urgentPhone:this.initDialogForm.urgentPhone,
                deptName1:this.initDialogForm.deptName1,
                deptName2:this.initDialogForm.deptName2,
                deptName:this.initDialogForm.deptName,
                departmentCode:this.departmentCode,
                levelId:this.initDialogForm.levelId,
                positionName:this.initDialogForm.positionName,
                positionCode:this.positionCode,
                bankName:this.initDialogForm.bankName,
                bankAccount:this.initDialogForm.bankAccount,    
                employeeMail:this.initDialogForm.employeeMail,
                roomInfo:this.initDialogForm.roomInfo,
                quitDate:this.initDialogForm.quitDate,
                quitState:quitState,
                socialSecurity:this.initDialogForm.socialSecurity,
                entryDate:this.initDialogForm.entryDate,
                becomestaffDate:this.initDialogForm.becomestaffDate,
                remarks:this.initDialogForm.remarks,
                id:this.employeeId, 
                boolBirthlunar: 1,	
                boolContract:1,
                boolShowsaleslist:0,        
                token: Cookies.get('TOKEN'),
              }).then(data => {
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
      // console.log('索引'+this.initDialogForm.rowIndex)
    },
    /*----------- 提交弹框数据(end)  --------------*/

    /*----------- 取消(start)  --------------*/
    cancel(){
        this.isEditActive=-1
        this.isDelActive=-1
        this.dialog = false
    },
    /*----------- 取消(end)  --------------*/

    /*----------- 获取树形节点列表(start)  --------------*/
    getTreeHrOrgDept(){
      this.$request.post('/hrorgdept/treeHrOrgDept',{
        //data 参数
        token: Cookies.get('TOKEN'),
      }).then(data => {
        this.treeData=data.obj.children
      }).catch(e => {

      })
    },
    /*----------- 获取树形节点列表(end)  --------------*/

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
    querySearch(queryString, cb) {
      if(queryString != ''){
        this.getPlanTypeData(queryString,(data) => {
          let results = '';
          if(queryString && !data[0].noId){  //输入框有值且有匹配数据时
            results = data.filter(this.createFilter(queryString))
          }else {   //没有匹配数据时显示自定义的字段
            results = data
          }
          cb(results);
        });
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        // return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase())> -1);
        //后台已做筛选,不需再过滤
        return (restaurant.value)
      };
    },
    //获取机型数据
    getPlanTypeData(val,fun) {
      let dataArr = [];
      let para = {
        employeeCode: val,
      };
      //console.log(para)
      // baseDataPlaneTypeList(para).then(res => {    //发送请求
      //   console.log(res)
      //   if (!res) return false;
      //   let dataList = res.data.pageInfo.list;
      //   if(dataList.length>0){
      //     dataList.forEach((item,index) => {
      //       dataArr.push({
      //         value:item.icaocode,
      //         name:item.cnfullname
      //       })
      //     });
      //   }else {
      //     dataArr.push({
      //       value:'无搜索结果',
      //       noId:'无搜索结果',
      //     })
      //   }
      //   fun(dataArr);
      // });
    },
    //搜索选中
    handleSelect(item) {
      console.log(item)
      // if(item.name){
      //   this.$set(this.ruleForm,'jxdescribe',item.name);
      // }
    },
  }
};