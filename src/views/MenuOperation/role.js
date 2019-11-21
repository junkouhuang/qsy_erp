export default {
  name: "roleSet",
  components: {},
  data() {
    return {
      treeData:[],
      roleData:[],
      menuShow:false,
      defaultProps: {
        children: 'children',
        menuCname: 'menuCname'
      },
      showCheck:true,
      // dataChecked:['018219ea-68c0-4e27-872c-5c33cae905af','03807145-41e3-4b02-b582-73bca757f1eb','b14d8edb-9f93-4ac7-9d9d-163d3927ecb1'],
      dataChecked:[],
      menuId:'',
      menuName:'',
      roleId:'',
      roleName:'',
      defaultPropsRole: {
        children: 'children',
        roleName: 'roleName'
      },
      pageOperation:[],
      searchOperation:[],
      toolOperation:[],
      oneTableOperation:[],
      twoTableOperation:[],
      threeTableOperation:[],
      oneTableColumn:[],
      twoTableColumn:[],
      threeTableColumn:[],
      operTableOneName:'',
      operTableTwoName:'',
      operTableThreeName:'',
      selsOne:[],
      selsTwo:[],
      selsThree:[],
      //页签栏
      pageMinusShow:true,
      pagePlusShow:false,
      pageContent:true,
      pageShow:false,
      //搜索栏
      searchMinusShow:true,
      searchPlusShow:false,
      searchContent:true,
      //工具栏
      toolMinusShow:true,
      toolPlusShow:false,
      toolContent:true,
      //一级表
      oneTableMinusShow:true,
      oneTablePlusShow:false,
      oneTableContent:true,
      //二级表
      twoTableMinusShow:true,
      twoTablePlusShow:false,
      twoTableContent:true,
      //三级表
      threeTableMinusShow:true,
      threeTablePlusShow:false,
      threeTableContent:true,

    };
  },
  mounted () {
    this.getTreeDataList();
    this.getRoleDataList();
  },
  methods: {
    //选择树形菜单
    handleCheckChange(data, checked, indeterminate) {
      console.log("=======分界线=======")
      // console.log(data.id)
      // console.log(data, checked, indeterminate);
      // console.log(this.$refs.tree.getCheckedNodes());
      if(this.roleId!=''){
        console.log(this.$refs.tree.getCheckedKeys())
        let menuIdList=this.$refs.tree.getCheckedKeys().join(',');
        if(menuIdList.length>3){
          const loading = this.$loading({
            lock: true,
            // text: '保存中',
            text:'',
            background: 'rgba(255, 255, 255, 0.4)'
          });
          this.$request.post('/sysroleauthority/saveRoleAndMenu', {roleId:this.roleId, menuIdList:menuIdList,operationId:'c4934471-caee-11e9-8631-000c290d53bf'}).then(res => {
          if (res.code == 0) {
            loading.close();
            console.log("权限保存")
            console.log(res)
          }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '系统错误!'
              });
          })
        }
        
      }else{
        checked=false;
        this.$message({
          type: 'warning',
          message: '请选择角色!'
        });
      }


    },

      //获取树形菜单列表
    getTreeDataList(){
      this.$request.post('/sysMenu/listMenuRole', {}).then(res => {
        if (res.code == 0) {
          console.log("请求菜单列表数据")
          console.log(res)
          this.treeData=res.obj;
        }
      }).catch(e=>{
          this.$message({
            type: 'error',
            message: '系统错误!'
          });
      })
    },
    getTreeDataListFalse(){
      this.$request.post('/sysMenu/listMenuRoleFalse', {}).then(res => {
        if (res.code == 0) {
          console.log("请求菜单列表数据")
          console.log(res)
          this.treeData=res.obj;
        }
      }).catch(e=>{
          this.$message({
            type: 'error',
            message: '系统错误!'
          });
      })
    },  
      //获取角色菜单列表
    getRoleDataList(){
      this.$request.post('/sysRole/listRole', {}).then(res => {
        if (res.code == 0) {
          console.log("请求获取列表数据")
          console.log(res)
          this.roleData=res.obj;
        }
      }).catch(e=>{
          this.$message({
            type: 'error',
            message: '系统错误!'
          });
      })
    },
    //点击左侧角色
    handleRoleClick(data){
       console.log(JSON.parse(JSON.stringify(data)));
        this.roleId=data.id;
        this.roleName=data.roleName;
        this.menuShow=true;
        this.getListMenuByRole();
      setTimeout(() => {
        if(this.menuId!=''){
          this.getAllOperationColumn();
        }
      }, 1000);
    },
      //点击左侧树
    handleNodeClick (data) {  
      console.log(JSON.parse(JSON.stringify(data)));
      if(this.roleId==''){
        this.$message({
          type: 'warning',
          message: '请选择角色!'
        });
      }else{
        this.menuId=data.id;
        this.menuName=data.menuCname;
        this.getAllOperationColumn();
      }
      
    },
    //通过roleId获取选择的菜单
    getListMenuByRole(){
      this.$refs.tree.setCheckedKeys([])
      this.$request.post('/sysroleauthority/listMenuByRole', {roleId:this.roleId}).then(res => {
        // this.dataChecked=[];
          if (res.code == 0) {
            this.dataChecked=[];
            console.log("通过roleId获取选择的菜单")
            console.log(res)
            let datas=res.obj;
            if(datas.length>0){
              for(let i=0;i<datas.length;i++){
                this.dataChecked.push(datas[i].menuId)
              }
            }
            console.log(this.dataChecked)
          }
        }).catch(e=>{
            this.$message({
              type: 'error',
              message: '系统错误!'
            });
        })
    },
    //获取所有按钮
    getAllOperationColumn(){
        this.operTableOneName='';
        this.operTableTwoName='';
        this.operTableThreeName='';
        this.$request.post('/sysMenuOperation/listSysMenuOperationByMenuId', {menuId:this.menuId,roleId:this.roleId}).then(res => {
          if (res.code == 0) {
            console.log(res)    //请求成功方法，data为请求成功返回的数据

            this.pageOperation=res.obj.listPageBarOperation;
            if(this.menuId=='03807145-41e3-4b02-b582-73bca757f1eb'){
              this.pageShow=true;
            }else{
              this.pageShow=false;
            }
            this.searchOperation=res.obj.listSearchBarOperation;
            this.toolOperation=res.obj.listToolBarOperation;
            this.oneTableOperation=res.obj.listOneTableOperation;
            this.twoTableOperation=res.obj.listTwoTableOperation;
            this.threeTableOperation=res.obj.listThreeTableOperation;
            this.oneTableColumn=res.obj.listOneColumn;
            this.twoTableColumn=res.obj.listTwoColumn;
            this.threeTableColumn=res.obj.listThreeColumn;
            this.getDefaultShowOrHide();
            if(this.oneTableOperation.length>0){
              this.operTableOneName="按钮：";
            }
            if(this.twoTableOperation.length>0){
              this.operTableTwoName="按钮：";
            }
            if(this.threeTableOperation.length>0){
              this.operTableThreeName="按钮：";
            }
            console.log(this.oneTableColumn)
          }
        }).catch(e=>{
            console.log("错误")
        })
        .then(()=>{
          if(this.oneTableColumn.length>0){
            for(let i=0;i<this.oneTableColumn.length;i++){
              if(this.oneTableColumn[i].checkedColumn){
                this.$refs.oneTableRef.toggleRowSelection(this.oneTableColumn[i],true);
              }
            }
          }
          if(this.twoTableColumn.length>0){
            for(let i=0;i<this.twoTableColumn.length;i++){
              if(this.twoTableColumn[i].checkedColumn){
                this.$refs.twoTableRef.toggleRowSelection(this.twoTableColumn[i],true);
              }
            }
          }
          if(this.threeTableColumn.length>0){
            for(let i=0;i<this.threeTableColumn.length;i++){
              if(this.threeTableColumn[i].checkedColumn){
                this.$refs.threeTableRef.toggleRowSelection(this.threeTableColumn[i],true);
              }
            }
          }
         
        })
    },
    //全部保存
    saveOperationAll(){
      if(this.roleId!='' && this.menuId!=''){
        const loading = this.$loading({
          lock: true,
          text: '保存中',
          background: 'rgba(255, 255, 255, 0.4)'
        });
        this.$request.post('/sysroleauthority/saveRoleAndColumn',{
          listPageBarOperation:this.pageOperation,
          listSearchBarOperation:this.searchOperation,
          listToolBarOperation:this.toolOperation,
          listOneTableOperation:this.oneTableOperation,
          listTwoTableOperation:this.twoTableOperation,
          listThreeTableOperation:this.threeTableOperation,
          listOneColumn:this.selsOne,
          listTwoColumn:this.selsTwo,
          listThreeColumn:this.selsThree,
          menuId:this.menuId,
          roleId:this.roleId
        }).then(res => {
          if (res.code == 0) {
            console.log("全部保存")
            loading.close();
            console.log(res)
            setTimeout(() => {
               this.$message({
                type: 'success',
                message: '保存成功!'
              });
            }, 500);
           
          }
        }).catch(e=>{
            this.$message({
              type: 'error',
              message: '系统错误!'
            });
        })
      }else{
        this.$message({
          type: 'warning',
          message: '请选择角色和菜单!'
        });
      }


    },
    //勾选明细----一级表
    selsChangeOne(sels) {
      this.selsOne=sels;
      console.log(this.selsOne)
    },
    //勾选明细----二级表
    selsChangeTwo(sels) {
      this.selsTwo=sels;
      console.log(this.selsTwo)
    },
    //勾选明细----三级表
    selsChangeThree(sels) {
      this.selsThree=sels;
      console.log(this.selsThree)
    },
    //设置默认显示或隐藏
    getDefaultShowOrHide(){
      //页签栏
      this.pageMinusShow=true;
      this.pagePlusShow=false;
      this.pageContent=true;
      //搜索栏
      this.searchMinusShow=true;
      this.searchPlusShow=false;
      this.searchContent=true;
      //工具栏
      this.toolMinusShow=true;
      this.toolPlusShow=false;
      this.toolContent=true;
      //一级表
      this.oneTableMinusShow=true;
      this.oneTablePlusShow=false;
      this.oneTableContent=true;
      //二级表
      this.twoTableMinusShow=true;
      this.twoTablePlusShow=false;
      this.twoTableContent=true;
      //三级表
      this.threeTableMinusShow=true;
      this.threeTablePlusShow=false;
      this.threeTableContent=true;

    },
    //是否显示页签栏
    getPageShow(note){
      if(note=='minus'){
        this.pageMinusShow=false;
        this.pagePlusShow=true;
        this.pageContent=false;
      }else{
        this.pageMinusShow=true;
        this.pagePlusShow=false;
        this.pageContent=true;
      }
    },
    //是否显示搜索栏
    getSearchShow(note){
      if(note=='minus'){
        this.searchMinusShow=false;
        this.searchPlusShow=true;
        this.searchContent=false;
      }else{
        this.searchMinusShow=true;
        this.searchPlusShow=false;
        this.searchContent=true;
      }
    },
    //是否显示工具栏
    getToolShow(note){
      if(note=='minus'){
        this.toolMinusShow=false;
        this.toolPlusShow=true;
        this.toolContent=false;
      }else{
        this.toolMinusShow=true;
        this.toolPlusShow=false;
        this.toolContent=true;
      }
    },
    //是否显示一级表
    getOneTableShow(note){
      if(note=='minus'){
        this.oneTableMinusShow=false;
        this.oneTablePlusShow=true;
        this.oneTableContent=false;
      }else{
        this.oneTableMinusShow=true;
        this.oneTablePlusShow=false;
        this.oneTableContent=true;
      }
    },
    //是否显示二级表
    getTwoTableShow(note){
      if(note=='minus'){
        this.twoTableMinusShow=false;
        this.twoTablePlusShow=true;
        this.twoTableContent=false;
      }else{
        this.twoTableMinusShow=true;
        this.twoTablePlusShow=false;
        this.twoTableContent=true;
      }
    },
    //是否显示三级表
    getThreeTableShow(note){
      if(note=='minus'){
        this.threeTableMinusShow=false;
        this.threeTablePlusShow=true;
        this.threeTableContent=false;
      }else{
        this.threeTableMinusShow=true;
        this.threeTablePlusShow=false;
        this.threeTableContent=true;
      }
    }
    



  }
};