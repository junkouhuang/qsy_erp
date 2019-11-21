import Cookies from 'js-cookie'
export default {
  name: "exchangeRateMaintain",
  components: {},
  data() {
    return {
      dialogTitle: "",
      ruleForm: {
        YearMonth:'',
        rateCname:''
      },
      tableHeight: window.innerHeight - 180,
      tableData: [],
      currencyList:[], //货币种类列表
      currencyListData:[], //货币维护列表
      loading: true,
      dialog: false,
      tHeadData: [],
      searchButtons:[], //搜索栏按钮
      listOneTableOperation:[],  //一级表按钮列表
      listToolBarOperation:[],  //工具栏按钮列表
      clientHeight:'750',
      OrderIndexArr:[]
    };
  },
  // watch: {
  //     tableData:{
  //         handler (newData) {
  //           if (newData.length) {
  //               let mergeStartRow = newData[0]
  //               mergeStartRow.isStartMerge = true
  //               mergeStartRow.rowspan = 1
  //               mergeStartRow.startIndex = 0
  //               for (let i = 1; i <= newData.length; i++) {
  //                   if ((newData[i] && 
  //                       mergeStartRow.yearMonth !== newData[i].yearMonth) || 
  //                       i === newData.length) {
  //                       mergeStartRow.endIndex = i
  //                       mergeStartRow.rowspan = mergeStartRow.endIndex - mergeStartRow.startIndex
  //                       mergeStartRow = newData[i]
  //                       if (mergeStartRow) {
  //                           mergeStartRow.isStartMerge = true
  //                           mergeStartRow.rowspan = 1
  //                           mergeStartRow.startIndex = i
  //                       }
  //                   }
  //               }
  //           }
  //       },
  //       immediate: true
  //   }
  // },
  mounted() {
    this.getList();
    this.getCurrencyList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    /*----------- 获取表格列表数据(start)  --------------*/
    getList(){
        this.$request.post('/sysexchangerate/listSysExchangeRate',{
            //data 参数
            token: Cookies.get('TOKEN'),
        }).then(data => {
            this.tableData=data.rows
            this.tableData.forEach((item, index) => {
                item.month=item.yearMonth.substr(item.yearMonth.length-1,1)+"月"
            });
            this.getOrderNumber()
        }).catch(e => {

        })
        this.$request.post('/sysOperation/listOperationBar',{
            //data 参数
            menuId:'eadc53f5-bffd-11e9-8631-000c290d53bf',
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
    },
    /*----------- 获取表格列表数据(end)  --------------*/

    /*----------- 获取币种下拉框列表(start)  --------------*/
    getCurrencyList(){
        this.$request.post('/sysbasicinfo/selectMapBasicinfo',{
            //data 参数
            parent_code:"CurType",
            token: Cookies.get('TOKEN'),
        }).then(data => {
           this.currencyList=data.obj
        }).catch(e => {

        })
    },
    /*----------- 获取币种下拉框列表(end)  --------------*/

    /*----------- 点击搜索(start)  --------------*/
    search() {
      var YearMonth = this.ruleForm.YearMonth.replace(/-/g,'');
      this.$request.post('/sysexchangerate/listSysExchangeRate',{
            //data 参数
            yearMonth:YearMonth,
            rateCname:this.ruleForm.rateCname,
            token: Cookies.get('TOKEN'),
        }).then(data => {
            this.tableData=data.rows
            this.tableData.forEach((item, index) => {
                item.month=item.yearMonth.substr(item.yearMonth.length-1,1)+"月"
            });
        }).catch(e => {

        })
    },
    /*----------- 点击搜索(end)  --------------*/

     /*----------- 点击编辑按钮(start)  --------------*/
    edit(index, row) {
      console.log(index);
      console.log(row);
      this.dialog = true;
      this.dialogTitle = "修改汇率";
      this.$request.post('/sysexchangerate/getModels',{
            //data 参数
        YearMonth:row.yearMonth,
        token: Cookies.get('TOKEN'),
        }).then(data => {
            this.currencyListData=data.obj
        }).catch(e => {

        })
    },
    /*----------- 点击编辑按钮(end)  --------------*/

    /*----------- 清空表单搜索条件(start)  --------------*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     /*----------- 清空表单搜索条件(end)  --------------*/

     /*----------- 点击汇率维护按钮(start)  --------------*/
    apply () {
      this.dialogTitle = '汇率维护'
      this.dialog = true
      var myDate = new Date();
      var M=myDate.getMonth()+1;
      M=M>10?M:"0"+M;
      var YM=myDate.getFullYear()+""+M;
      this.$request.post('/sysexchangerate/getModels',{
            //data 参数
        YearMonth:YM,
        token: Cookies.get('TOKEN'),
        }).then(data => {
            this.currencyListData=data.obj
        }).catch(e => {

        })
    },
    /*----------- 点击汇率维护按钮(end)  --------------*/
    /*----------- 搜索框按钮点击事件(start)  --------------*/
    clickEven(even){
        if(even=="清空"){
          this.$refs['ruleForm'].resetFields();
          this.getList();
        }else if(even=="查询"){
          this.search()
        }else if(even=="汇率维护"){
          this.apply()
        }
    },

    /*----------- 提交表单数据(start)  --------------*/
    dialogEven(even){
        if(even=="确定"){
          this.submitDialogData()
        }else if(even=="取消"){
          this.dialog = false
        }
    },
    submitDialogData() {
      //提交弹框数据
     const loading = this.$loading({
        lock: true,
        text: "提交数据中",
        // spinner: 'el-icon-loading',
        background: "rgba(255, 255, 255, 0.4)"
     });
      this.$request.post('/sysexchangerate/saveSysExchangeRate',{
        //data 参数
        list:this.currencyListData
        },{token: Cookies.get('TOKEN')}).then(data => {
            if(data.code==0){
            this.getList()
            setTimeout(() => {
                    loading.close();
                    this.dialog=false
                    this.$message({
                    type: "success",
                    message: this.dialogTitle + "成功!"
                    });
                }, 1000);
            }
        }).catch(e => {

      })
    },
     /*----------- 提交表单数据(end)  --------------*/

     /*----------- 合并单元格(start)  --------------*/
       // 获取相同编号的数组
      getOrderNumber() {
        let OrderObj = {}
        this.tableData.forEach((element, index) => {
            element.rowIndex = index
            if (OrderObj[element.yearMonth]) {
            OrderObj[element.yearMonth].push(index)
            } else {
            OrderObj[element.yearMonth] = []
            OrderObj[element.yearMonth].push(index)
            }
        })

        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
            if (OrderObj[k].length > 1) {
                this.OrderIndexArr.push(OrderObj[k])
            }
        }
        //console.log(OrderObj)
    },
    listSpanMethod({ row, column, rowIndex, columnIndex }){
        // if (columnIndex === 0) {
        //     if (row.isStartMerge) {
        //         return {
        //             rowspan: row.rowspan,
        //             colspan: 1
        //         }
        //         } else {
        //         return {
        //             rowspan: 0,
        //             colspan: 0
        //         }
        //     }
        // }else if(columnIndex === 5) {
        //     if (row.isStartMerge) {
        //         return {
        //             rowspan: row.rowspan,
        //             colspan: 1
        //         }
        //         } else {
        //         return {
        //             rowspan: 0,
        //             colspan: 0
        //         }
        //     }
        // }
        if (columnIndex === 0 || columnIndex === 5) {
          for (let i = 0; i < this.OrderIndexArr.length; i++) {
            let element = this.OrderIndexArr[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
    },
    /*----------- 合并单元格(end)  --------------*/
  }
};