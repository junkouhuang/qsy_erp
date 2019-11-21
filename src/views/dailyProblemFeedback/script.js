import Cookies from 'js-cookie'
import axios from 'axios'
import Swiper from '../../components/swiper.vue'
let URL=''
export default{
    name: "dailyProblemFeedback",
    data () {
        return {
            pageSize:10,
            currentPage:1,
            total:0,
            dialogTitle: "",
            loading: true,
            dialog: false,
            tableData:[],
            tHeadData:[],
            tableHeight: window.innerHeight - 180,
            ruleForm:{
                orderNo:'',
                salesUsercode:'',
                qcUsercode:'',
                pmUsercode:'',
            },
            searchButtons:[], //搜索栏按钮
            listOneTableOperation:[],  //一级表按钮列表
            listToolBarOperation:[],  //工具栏按钮列表
            initDialogForm:{
                orderNo:'',
                poNo:'',
                partName:'',
                quotationDetails:'',
                reasons:'',
                solution:'',
                advEffects:'',
                loseAmount:'',
                remarks:'',
                osspath:''
            },
            dialogForm:{
                orderNo:'',
                poNo:'',
                partName:'',
                quotationDetails:'',
                reasons:'',
                solution:'',
                advEffects:'',
                loseAmount:'',
                remarks:'',
                osspath:''
            },
            rules:{
                orderNo:[
                    {  required: true, message: '请选择订单编号', trigger: 'change' }
                ],
                partName:[
                    {  required: true, message: '请选择产品', trigger: 'change' }
                ]
            },
            orderNoList:[], //订单编号列表
            poNoList:[],  //po单号列表
            partNameList:[], //产品列表
            fileList:[],
            token: Cookies.get('TOKEN'),
            uploadPic:'',
            id:'',
            isEditActive:-1,
            isDelActive:-1,
            imgList:[],
            imgDialog:false
        }
    },
    components: {
        Swiper
      },
    mounted() {
       // this.uploadPic=this.$request.defaults.baseURL+'/pubdqf/physicalLoad'  //上传图片ip地址
        this.uploadPic=this.$request.defaults.baseURL+'/pubdqf/physicalLoad'  //上传图片ip地址
        this.getList();
        this.getHeaderData()
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
    methods: {
         /*----------- 点击上下页获取列表数据(start)  --------------*/
         handleCurrentChange(val) {
            let that=this
            this.$request.post(URL+'/pubdqf/listPubDqf',{
            //data 参数
            page:val,
            rows:this.pageSize,
            token: Cookies.get('TOKEN'),
            }).then(data => {
                this.tableData=data.rows
                this.total=data.total
                this.pageSize=data.pageSize
                this.tableData.forEach((item, index) => {
                  if(item.dates==""||item.dates==null){
                    item.dates=""
                  }else{
                    item.dates=that.formatData(item.dates)
                  }
                  if(item.qcTime==""||item.qcTime==null){
                      item.qcTime=""
                  }else{
                      item.qcTime=that.formatData(item.qcTime)
                  }
                });
            }).catch(e => {
    
            })
        },
        /*----------- 点击上下页获取列表数据(end)  --------------*/
    
        /*----------- 选择每页显示多少条获取列表数据(start)  --------------*/
        handleSizeChange(val) {
            let that=this
            this.$request.post(URL+'/pubdqf/listPubDqf',{
            //data 参数
            rows:val,
            token: Cookies.get('TOKEN'),
            }).then(data => {
                this.tableData=data.rows
                this.total=data.total
                this.pageSize=data.pageSize
                this.tableData.forEach((item, index) => {
                  if(item.dates==""||item.dates==null){
                    item.dates=""
                  }else{
                    item.dates=that.formatData(item.dates)
                  }
                  if(item.qcTime==""||item.qcTime==null){
                      item.qcTime=""
                  }else{
                      item.qcTime=that.formatData(item.qcTime)
                  }
                });
            }).catch(e => {
    
            })
        },
        /*----------- 选择每页显示多少条获取列表数据(end)  --------------*/

        /*----------- 获取头部数据(start)  --------------*/
        getHeaderData(){
            this.$request.post(URL+'/sysOperation/listOperationBar',{
                //data 参数
                menuId:'34482bd5-1e8c-40cd-aa98-d922fbd78cb2',
                }).then(data => {
                this.tHeadData=data.obj.listOneColumn
                this.searchButtons=data.obj.listSearchBarOperation
                this.listOneTableOperation=data.obj.listOneTableOperation
                this.listToolBarOperation=data.obj.listToolBarOperation
                this.searchButtons.forEach((item,index) => {
                    if(item.operationName=="查询"){
                    item.icon="el-icon-search"
                    }
                });
                }).catch(e => {
        
            })
        },
        /*----------- 获取头部数据(end)  --------------*/

        /*----------- 获取列表数据(start)  --------------*/
        getList () {
            let that=this
            this.$request.post(URL+'/pubdqf/listPubDqf',{
                //data 参数
            }).then(data => {
                this.tableData=data.rows
                this.total=data.total
                this.pageSize=data.pageSize
                this.tableData.forEach((item, index) => {
                  if(item.dates==""||item.dates==null){
                    item.dates=""
                  }else{
                    item.dates=that.formatData(item.dates)
                  }
                  if(item.qcTime==""||item.qcTime==null){
                      item.qcTime=""
                  }else{
                      item.qcTime=that.formatData(item.qcTime)
                  }
                });
            }).catch(e => {
      
            })
        },
        /*----------- 获取列表数据(end)  --------------*/

        /*------------  点击搜索(start) --------------*/
        search(){
            let that=this
            this.$request.post(URL+'/pubdqf/listPubDqf',{
                //data 参数
                orderNo:this.ruleForm.orderNo,
                pmUsercode:this.ruleForm.pmUsercode,
                qcUsercode:this.ruleForm.qcUsercode,
                salesUsercode:this.ruleForm.salesUsercode
            }).then(data => {
                this.tableData=data.rows
                this.total=data.total
                this.pageSize=data.pageSize
                this.tableData.forEach((item, index) => {
                  if(item.dates==""||item.dates==null){
                    item.dates=""
                  }else{
                    item.dates=that.formatData(item.dates)
                  }
                  if(item.qcTime==""||item.qcTime==null){
                      item.qcTime=""
                  }else{
                      item.qcTime=that.formatData(item.qcTime)
                  }
                });
            }).catch(e => {
      
            })
        },
        /*------------  点击搜索(end) --------------*/

        /*------------  选择日期回调(start) --------------*/
        searchDate(val){
            console.log(val)
            
        },
        /*------------  选择日期回调(start) --------------*/
        
        /*----------- 搜索框按钮点击事件(start)  --------------*/
        clickEven(even){
                if(even=="清空"){
                    this.$refs['ruleForm'].resetFields();
                    this.getList()
                }else if(even=="查询"){
                 this.search()
                }else if(even=="新增"){
                  this.addFeedback()
                }
            },
        /*----------- 搜索框按钮点击事件(end)  --------------*/

        /*----------- 新增反馈(start)  --------------*/
        addFeedback(){
            this.initDialogForm = {...this.dialogForm}   //表单渲染
            this.fileList=[]
            this.poNoList=[]
            this.partNameList=[]
            this.dialog = true;
            this.dialogTitle = "新增反馈";
        },
        /*----------- 新增反馈(end)  --------------*/

        /*------------  编辑(start)  ----------------*/
        edit(index,row){
            this.initDialogForm = {...row,rowIndex:index}   //表单渲染
            this.dialog = true;
            this.dialogTitle = "修改反馈";
            this.isEditActive=index;
            this.getPoDetailsName()
            this.id=row.id;
            this.fileList=[]
            let imgPath=[]
            this.$request.post(URL+'/pubdqf/getPubDqfImages',{
                //data 参数
                id:this.id
            }).then(data => {
                if(data.msg=="成功"){
                    if(data.obj.length==0){
                        this.fileList=[]
                    }else{
                        data.obj.forEach((item,index) => {
                            let pic='http://'+item.imgOsspath
                            this.fileList.push({url:pic,path:item.imgOsspath})
                            imgPath.push(item.imgOsspath)
                        });
                        this.initDialogForm.osspath=imgPath.join(',')
                    }
                }
            }).catch(e => {
      
            })
        },
        /*------------  编辑(end)  ----------------*/

        /*----------- 选择回调(start)  --------------*/
        selectOrderCode(even){
            console.log(this.initDialogForm.orderNo)
            this.getPoDetailsName()
        },
        selectPoNo(even){

        },
        selectPartName(even){

        },
        /*----------- 选择回调(end)  --------------*/

        getPoDetailsName(){
            this.$request.post(URL+'/pubdqf/getDetailsName',{
                //data 参数
                orderNo:this.initDialogForm.orderNo
            }).then(data => {
                if(data.msg=="成功"){
                    this.partNameList=data.obj
                }
            }).catch(e => {
      
            })
            this.$request.post(URL+'/pubdqf/getPoByOrderNo',{
                //data 参数
                orderNo:this.initDialogForm.orderNo
            }).then(data => {
                if(data.msg=="成功"){
                    this.poNoList=data.obj
                    if(this.initDialogForm.poNo==''||this.initDialogForm.poNo==null){
                        this.initDialogForm.poNo=data.obj[0].poNo
                    }
                }
            }).catch(e => {
      
            })
        },

         /*----------- 订单编号选择回调(start)  --------------*/
        getOrderCode(even){
            this.$request.post(URL+'/pubdqf/getOrderNo',{
                //data 参数
                orderNo:even
            }).then(data => {
                if(data.msg=="成功"){
                    this.orderNoList=data.obj
                }
            }).catch(e => {
      
            })
        },
       
        /*----------- 订单编号选择回调(end)  --------------*/

        /*----------- 上传头像成功的回调(start)  --------------*/
        handleAvatarSuccess(res, file) {
            console.log(res)
            let pic='http://'+res
            this.fileList.push({url:pic,path:res})
            if(this.initDialogForm.osspath==''||this.initDialogForm.osspath==null){
                this.initDialogForm.osspath=res
            }else{
             this.initDialogForm.osspath=this.initDialogForm.osspath+','+res
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
            let fileItem=this.initDialogForm.osspath.split(',')
            fileItem.forEach((item,index,object) => {
            if(item==itemList.path){
                object.splice(index, 1);
            }
            })
            this.fileList.splice(index, 1);
            this.initDialogForm.osspath=fileItem.join(',')
        },
        /*----------- 删除图片(end)  --------------*/

        dialogEven(even){
            if(even=="保存"){
              this.save()
            }else if(even=="取消"){
              this.innerVisibleCancel()
            }
        },
        /*----------- 取消提交表单(start)  --------------*/
        innerVisibleCancel(){
            this.dialog=false
            this.isEditActive=-1
         },
        /*----------- 取消提交表单(end)  --------------*/

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
                    if(this.dialogTitle =='新增反馈'){
                        this.$request.post(URL+'/pubdqf/savePubDqf',{
                            orderNo:this.initDialogForm.orderNo,
                            poNo:this.initDialogForm.poNo,
                            partName:this.initDialogForm.partName,
                            quotationDetails:this.initDialogForm.quotationDetails,
                            reasons:this.initDialogForm.reasons,
                            solution:this.initDialogForm.solution,
                            advEffects:this.initDialogForm.advEffects,
                            loseAmount:this.initDialogForm.loseAmount,
                            remarks:this.initDialogForm.remarks,
                            osspath:this.initDialogForm.osspath
                        }).then(data => {
                        this.getList()
                        if(data.msg=="成功"){
                            this.fileList=[]
                            setTimeout(() => {
                            loading.close();
                            this.dialog = false
                            this.$message({
                                type: 'success',
                                message: '新增反馈成功!'
                            });
                            }, 1000);
                        }else{
                            loading.close();
                            this.$message({
                                type: 'error',
                                message: '新增反馈失败!'
                            });
                        }
                        }).catch(e => {
        
                        })
                    }else if(this.dialogTitle =='修改反馈'){
                        this.$request.post(URL+'/pubdqf/updatePubDqf',{
                            id:this.id,
                            orderNo:this.initDialogForm.orderNo,
                            poNo:this.initDialogForm.poNo,
                            partName:this.initDialogForm.partName,
                            quotationDetails:this.initDialogForm.quotationDetails,
                            reasons:this.initDialogForm.reasons,
                            solution:this.initDialogForm.solution,
                            advEffects:this.initDialogForm.advEffects,
                            loseAmount:this.initDialogForm.loseAmount,
                            remarks:this.initDialogForm.remarks,
                            osspath:this.initDialogForm.osspath
                        }).then(data => {
                        this.getList()
                        if(data.msg=="成功"){
                            setTimeout(() => {
                            loading.close();
                            this.dialog = false
                            this.$message({
                                type: 'success',
                                message: '修改反馈成功!'
                            });
                            }, 1000);
                        }else{
                            loading.close();
                            this.$message({
                                type: 'error',
                                message: '修改反馈失败!'
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

       /*----------- 关闭弹框回调(start)  --------------*/
        closed(){
            this.isEditActive=-1
            this.isDelActive=-1
        },
        /*----------- 关闭弹框回调(end)  --------------*/
         /*----------- 删除(start)  --------------*/
        del(index, row) { 
            this.isDelActive=index 
            let that = this
            this.$confirm('删除该条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            const loading = this.$loading({
                lock: true,
                text: '删除中',
                background: 'rgba(255, 255, 255, 0.4)'

            });
            this.$request.post(URL+'/pubdqf/deletePubDqf',{
                //data 参数
                id:row.id,
                
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

        /*----------- 查看图片(start)  --------------*/
        checkImg(index,row){
            this.$request.post(URL+'/pubdqf/getPubDqfImages',{
                //data 参数
                id:row.id
            }).then(data => {
                if(data.msg=="成功"){
                    if(data.obj.length==0){
                        this.$message('暂没图片');
                    }else{
                        this.imgList=[]
                        data.obj.forEach((item,index) => {
                            let pic='http://'+item.imgOsspath
                            this.imgList.push(pic)
                        });
                        this.imgDialog=true;
                    }
                }
            }).catch(e => {
      
            })
        },
        /*----------- 查看图片(start)  --------------*/
    },
}