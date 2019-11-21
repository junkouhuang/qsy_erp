export default {
  name: "formSet",
  components: {},
  data() {
    return {
      treeData:[],
      defaultProps: {
        children: 'children',
        menuCname: 'menuCname'
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
      tableOper:{menuId:'',tableNum:"oneTable"},
      operMenuName:'',
      oneTableSearchName:'',
      twoTableSearchName:'',
      threeTableSearchName:'',
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
    this.getAllOperation();
  },
  methods: {
      //获取树形菜单列表
    getTreeDataList(){
      this.$request.post('/sysMenu/listMenuRole', {}).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          console.log("请求菜单列表数据")
          this.treeData=res.obj;
        }
      }).catch(e=>{
          // console.log("错误")
          this.$message({
            type: 'error',
            message: '系统错误!'
          });
      })
    },
      //点击左侧树
    handleNodeClick (data) {  
      console.log(JSON.parse(JSON.stringify(data)));
      this.operMenuName=data.menuCname;
      this.AgainGetAllOper(data.id);
      setTimeout(() => {
        this.tableOper.menuId=data.id;
        this.getTableList(data.id,1);
        this.getTableList(data.id,2);
        this.getTableList(data.id,3);
      }, 1000);
      
    },
    //获取所有类型的操作按钮
    getAllOperation(){
      this.$request.post('/sysMenu/listShowMenuOper', {}).then(res => {
        if (res.code == 0) {
          console.log("获取所有类型的操作按钮")
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          this.pageOperation=res.obj.listPageBarOperation;
          // if(this.pageOperation.length>0){
          //   this.pageShow=true;
          // }else{
          //   this.pageShow=false;
          // }
          this.searchOperation=res.obj.listSearchBarOperation;
          this.toolOperation=res.obj.listToolBarOperation;
          this.oneTableOperation=res.obj.listOneTableOperation;
          this.twoTableOperation=res.obj.listTwoTableOperation;
          this.threeTableOperation=res.obj.listThreeTableOperation;
        }
      }).catch(e=>{
          console.log("错误")
      })
    },
    //重新获取所有操作按钮
    AgainGetAllOper(menuId){
      this.$request.post('/sysMenu/listAgainShowMenuOper', {menuId:menuId}).then(res => {
          if (res.code == 0) {
            console.log(res)    //请求成功方法，data为请求成功返回的数据
            this.pageOperation=res.obj.listPageBarOperation;
            if(menuId=='03807145-41e3-4b02-b582-73bca757f1eb'){
            // if(this.pageOperation.length>0){
              this.pageShow=true;
            }else{
              this.pageShow=false;
            }
            this.searchOperation=res.obj.listSearchBarOperation;
            this.toolOperation=res.obj.listToolBarOperation;
            this.oneTableOperation=res.obj.listOneTableOperation;
            this.twoTableOperation=res.obj.listTwoTableOperation;
            this.threeTableOperation=res.obj.listThreeTableOperation;
            this.getDefaultShowOrHide();
          }
        }).catch(e=>{
            console.log("错误")
        })
    },
    //获取操作table
    getTableNum(num){
      this.tableOper.tableNum=num;
      console.log(this.tableOper)
    },
      //上移----一级表
    upMoveOne(index,row){
      if(index>0){
        this.oneTableColumn[index]=this.oneTableColumn[index-1];
        this.oneTableColumn[index-1]=row;
        var tempColumn=[];
        for(let k in this.oneTableColumn){
          tempColumn.push({
            columnChecked:this.oneTableColumn[k].columnChecked,
            columnCname:this.oneTableColumn[k].columnCname,
            columnName:this.oneTableColumn[k].columnName,
            columnWidth:this.oneTableColumn[k].columnWidth,
            id:this.oneTableColumn[k].id,
            sortNumber:this.oneTableColumn[k].sortNumber
          })
        }
        this.oneTableColumn=tempColumn;
      }
      // for(let i=0;i<this.oneTableColumn.length;i++){
      //   if(this.oneTableColumn[i].columnChecked=="true"){
      //     this.$refs.oneTableRef.toggleRowSelection(this.oneTableColumn[i],true);
      //   }
      // }

      
    },
      //下移----一级表
    downMoveOne(index,row){
      if(index<this.oneTableColumn.length-1){
        this.oneTableColumn[index]=this.oneTableColumn[index+1];
        this.oneTableColumn[index+1]=row;
        var tempColumn=[];
        for(let k in this.oneTableColumn){
          tempColumn.push({
            columnChecked:this.oneTableColumn[k].columnChecked,
            columnCname:this.oneTableColumn[k].columnCname,
            columnName:this.oneTableColumn[k].columnName,
            columnWidth:this.oneTableColumn[k].columnWidth,
            id:this.oneTableColumn[k].id,
            sortNumber:this.oneTableColumn[k].sortNumber
          })
        }
        this.oneTableColumn=tempColumn;
      }
    },
    //勾选明细----一级表
    selsChangeOne(sels) {
      console.log(sels)
      this.selsOne=[];
      // console.log("勾选明细")
      // if(sels.length>0){
      //   for(var i=0;i<sels.length;i++){
      //     this.selsOne.push(sels[i].id);
      //   }
      // }else{
      //   this.selsOne=[];
      // }
      this.selsOne=sels;
      // console.log(this.selsOne)
    },
     //上移----二级表
     upMoveTwo(index,row){
       if(index>0){
        this.twoTableColumn[index]=this.twoTableColumn[index-1];
        this.twoTableColumn[index-1]=row;
        var tempColumn=[];
        for(let k in this.twoTableColumn){
          tempColumn.push({
            columnChecked:this.twoTableColumn[k].columnChecked,
            columnCname:this.twoTableColumn[k].columnCname,
            columnName:this.twoTableColumn[k].columnName,
            columnWidth:this.twoTableColumn[k].columnWidth,
            id:this.twoTableColumn[k].id,
            sortNumber:this.twoTableColumn[k].sortNumber
          })
        }
        this.twoTableColumn=tempColumn;
       }
      
     },
     //下移----二级表
    downMoveTwo(index,row){
      if(index<this.twoTableColumn.length-1){
        this.twoTableColumn[index]=this.twoTableColumn[index+1];
        this.twoTableColumn[index+1]=row;
        var tempColumn=[];
        for(let k in this.twoTableColumn){
          tempColumn.push({
            columnChecked:this.twoTableColumn[k].columnChecked,
            columnCname:this.twoTableColumn[k].columnCname,
            columnName:this.twoTableColumn[k].columnName,
            columnWidth:this.twoTableColumn[k].columnWidth,
            id:this.twoTableColumn[k].id,
            sortNumber:this.twoTableColumn[k].sortNumber
          })
        }
        this.twoTableColumn=tempColumn;
      }
    },
    //勾选明细----二级表
    selsChangeTwo(sels) {
      this.selsTwo=sels;
    },
      //上移----三级表
      upMoveThree(index,row){
        if(index>0){
          this.threeTableColumn[index]=this.threeTableColumn[index-1];
          this.threeTableColumn[index-1]=row;
          var tempColumn=[];
          for(let k in this.threeTableColumn){
            tempColumn.push({
              columnChecked:this.threeTableColumn[k].columnChecked,
              columnCname:this.threeTableColumn[k].columnCname,
              columnName:this.threeTableColumn[k].columnName,
              columnWidth:this.threeTableColumn[k].columnWidth,
              id:this.threeTableColumn[k].id,
              sortNumber:this.threeTableColumn[k].sortNumber
            })
          }
          this.threeTableColumn=tempColumn;
        }
        
      },
        //下移----三级表
      downMoveThree(index,row){
        if(index<this.threeTableColumn.length-1){
          this.threeTableColumn[index]=this.threeTableColumn[index+1];
          this.threeTableColumn[index+1]=row;
          var tempColumn=[];
          for(let k in this.threeTableColumn){
            tempColumn.push({
              columnChecked:this.threeTableColumn[k].columnChecked,
              columnCname:this.threeTableColumn[k].columnCname,
              columnName:this.threeTableColumn[k].columnName,
              columnWidth:this.threeTableColumn[k].columnWidth,
              id:this.threeTableColumn[k].id,
              sortNumber:this.threeTableColumn[k].sortNumber
            })
          }
          this.threeTableColumn=tempColumn;
        }
      },
      //勾选明细----三级表
      selsChangeThree(sels) {
        this.selsThree=sels;
      },
      //生成数据列
      createTableCol(nums){
          let tableName='';
          console.log(nums)
            if(nums=='1'){
              tableName=this.oneTableSearchName;
            }else if(nums=='2'){
              tableName=this.twoTableSearchName;
            }else{
              tableName=this.threeTableSearchName;
            }
          console.log("表名："+this.oneTableSearchName)
          console.log(tableName)
          if(this.tableOper.menuId==''){
            this.$message({
              type: 'warning',
              message: '请选择左侧菜单!'
            });
          }else{
            if(tableName==''){
            this.$message({
              type: 'warning',
              message: '请输入表名!'
            });
          }else{
            this.$request.post('/sysMenu/listProductTableHead', {tableName:tableName}).then(res => {
              console.log("生成数据列")
              console.log(res)    
              if (res.code == 0) {
                if(nums=='1'){
                  var newdata = this.oneTableColumn.concat(res.obj);
                  this.oneTableColumn=newdata;
                }else if(nums=='2'){
                  var newdata = this.twoTableColumn.concat(res.obj);
                  this.twoTableColumn=newdata;
                }else{
                  var newdata = this.threeTableColumn.concat(res.obj);
                  this.threeTableColumn=newdata;
                }
              }else{
                this.$message({
                  type: 'error',
                  message: res.msg
                });
              }
            }).catch(e=>{
                this.$message({
                  type: 'error',
                  message: '系统错误!'
                });
            })
            .then(()=>{
              // this.$refs.oneTableRef.toggleRowSelection(this.oneTableColumn[2],true);
              if(nums=='1'){
                for(let i=0;i<this.oneTableColumn.length;i++){
                  if(this.oneTableColumn[i].columnChecked=="true"){
                  console.log(this.oneTableColumn)
                    this.$refs.oneTableRef.toggleRowSelection(this.oneTableColumn[i],true);
                  }
                }
              }else if(nums=='2'){
                for(let i=0;i<this.twoTableColumn.length;i++){
                  if(this.twoTableColumn[i].columnChecked=="true"){
                    this.$refs.twoTableRef.toggleRowSelection(this.twoTableColumn[i],true);
                  }
                }
              }else{
                for(let i=0;i<this.threeTableColumn.length;i++){
                  if(this.threeTableColumn[i].columnChecked=="true"){
                    this.$refs.threeTableRef.toggleRowSelection(this.threeTableColumn[i],true);
                  }
                }
              }
            })

          }
        }
      },
      //获取原有表数据列
      getTableList(menuId,tableLevel){
        this.oneTableColumn=[];
        this.twoTableColumn=[];
        this.threeTableColumn=[];
        this.$request.post('/sysmenucolumn/listSysMenuColumnByMenuId', {menuId:menuId,tableLevel:tableLevel}).then(res => {
          console.log("获取原有表数据列")
          if (res.code == 0) {
            if(tableLevel=='1'){
              this.oneTableColumn=res.obj;
            }else if(tableLevel=='2'){
              this.twoTableColumn=res.obj;
            }else{
              this.threeTableColumn=res.obj;
            }
          }
        }).catch(e=>{
            this.$message({
              type: 'error',
              message: '系统错误!'
            });
        })
        .then(()=>{
          if(tableLevel=='1'){
            for(let i=0;i<this.oneTableColumn.length;i++){
              if(this.oneTableColumn[i].columnChecked=="true"){
                this.$refs.oneTableRef.toggleRowSelection(this.oneTableColumn[i],true);
              }
            }
          }else if(tableLevel=='2'){
            for(let i=0;i<this.twoTableColumn.length;i++){
              if(this.twoTableColumn[i].columnChecked=="true"){
                this.$refs.twoTableRef.toggleRowSelection(this.twoTableColumn[i],true);
              }
            }
          }else{
            for(let i=0;i<this.threeTableColumn.length;i++){
              if(this.threeTableColumn[i].columnChecked=="true"){
                this.$refs.threeTableRef.toggleRowSelection(this.threeTableColumn[i],true);
              }
            }
          }
         
        })

      },
      //分类保存操作按钮
      saveOperationBar(operationTpye){
        console.log(this.searchOperation)
        var temOperation=[];
        if(operationTpye=='搜索栏'){
          temOperation=this.searchOperation;
        }else if(operationTpye=='工具栏'){
          temOperation=this.toolOperation;
        }else if(operationTpye=='一级表'){
          temOperation=this.oneTableOperation;
        }else if(operationTpye=='二级表'){
          temOperation=this.twoTableOperation;
        }else if(operationTpye=='页签栏'){
          temOperation=this.pageOperation;
        }else{
          temOperation=this.threeTableOperation;
        }
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          this.$request.post('/sysMenuOperation/saveSysMenuColumnByPosition',{listSysOperation:temOperation,menuId:this.tableOper.menuId,operationPosition:operationTpye}).then(res => {
            console.log("分类保存操作按钮")
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '系统错误!'
              });
          })
        }
        

      },
      saveOperationBarCopy(operationTpye){
        console.log(this.searchOperation)
        var temOperation=[];
        if(operationTpye=='搜索栏'){
          temOperation=this.searchOperation;
        }else if(operationTpye=='工具栏'){
          temOperation=this.toolOperation;
        }else if(operationTpye=='一级表'){
          temOperation=this.oneTableOperation;
        }else if(operationTpye=='二级表'){
          temOperation=this.twoTableOperation;
        }else{
          temOperation=this.threeTableOperation;
        }
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          this.$request.post('/sysMenuOperation/saveSysMenuColumnByPosition',{listSysOperation:temOperation,menuId:this.tableOper.menuId,operationPosition:operationTpye}).then(res => {
            console.log("分类保存操作按钮")
            if (res.code == 0) {
              
            }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '系统错误!'
              });
          })
        }
        

      },

      //添加数据列
      addTableCol(nums){
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          if(nums=='1'){
            let j = { id: this.guid(), "columnName": "", "columnCname": "", "columnWidth": "", "sortNumber": "" };
            this.oneTableColumn.push({j})
          }else if(nums=='2'){
            let j = { id: this.guid(), "columnName": "", "columnCname": "", "columnWidth": "", "sortNumber": "" };
            this.twoTableColumn.push({j})
          }else{
            let j = { id: this.guid(), "columnName": "", "columnCname": "", "columnWidth": "", "sortNumber": "" };
            this.threeTableColumn.push({j})
          }
        }
        
      },
      //生成唯一GUID码
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
      },

      //保存数据列
      saveTableCol(tableLevel){
        var tableColumns=[];
        if(tableLevel=='1'){
          tableColumns=this.selsOne
        }else if(tableLevel=='2'){
          tableColumns=this.selsTwo
        }else{
          tableColumns=this.selsThree
        }
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          this.$request.post('/sysmenucolumn/saveSysMenuColumnByType',{listSysMenuColumn:tableColumns,menuId:this.tableOper.menuId,tableLevel:tableLevel}).then(res => {
            console.log("保存数据列")
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '系统错误!'
              });
          })
        }


      },
      saveTableColCopy(tableLevel){
        var tableColumns=[];
        if(tableLevel=='1'){
          tableColumns=this.selsOne
        }else if(tableLevel=='2'){
          tableColumns=this.selsTwo
        }else{
          tableColumns=this.selsThree
        }
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          this.$request.post('/sysmenucolumn/saveSysMenuColumnByType',{listSysMenuColumn:tableColumns,menuId:this.tableOper.menuId,tableLevel:tableLevel}).then(res => {
            console.log("保存数据列")
            if (res.code == 0) {
              // this.$message({
              //   type: 'success',
              //   message: '保存成功!'
              // });
            }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '系统错误!'
              });
          })
        }


      },
      //保存所有
      saveOperationAll(){
        if(this.tableOper.menuId==''){
          this.$message({
            type: 'warning',
            message: '请选择左侧菜单!'
          });
        }else{
          this.saveOperationBarCopy('搜索栏')
          this.saveOperationBarCopy('工具栏')
          this.saveOperationBarCopy('一级表')
          this.saveOperationBarCopy('二级表')
          this.saveOperationBarCopy('三级表')
          this.saveTableColCopy('1');
          this.saveTableColCopy('2');
          this.saveTableColCopy('3');
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }
        
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