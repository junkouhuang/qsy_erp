import Cookies from 'js-cookie'
export default {
  name: "supplierInquiry",
  data() {
    return {
      menuId: 'bc866e7a-a92c-4884-87d6-62fb01e4599d',
      testC: true,
      pageSize: 15,
      currentPage: 1,
      total: 0,
      ruleForm: {
        quotationNo: '', customerNo: '', statusSearch: '全部', chooses: '下单日期', start: '', end: '',
      },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      dateOptions: [
        { value: "下单日期", label: "下单日期" },
        { value: "订单交货日期", label: "订单交货日期" },
      ],
      statusOptions: [
        { value: "全部", label: "全部" },
        { value: "IQ1", label: "待回复" },
        { value: "IQ2", label: "已回复" }
      ],

      searchList: [],  //查找栏
      oneOperation: [],//一级表操作
      twoOperation: [],//二级表操作
      tHeadDataOne: [],//一级表头
      tHeadDataTwo3d: [],//二级表头---3d打印
      tHeadDataTwoCncm: [],//二级表头---cnc金属
      tHeadDataTwoCncp: [],//二级表头---cnc塑料
      tHeadDataTwoVc: [],//二级表头---复模
      tHeadDataTwoFm: [],//二级表头---快速模具
      tableDataOne: [], //一级表数据
      tableDataTwo3d: [], //二级表数据---3d打印
      tableDataTwoCncm: [], //二级表数据---cnc金属
      tableDataTwoCncp: [], //二级表数据---cnc塑料
      tableDataTwoVc: [], //二级表数据---复模
      tableDataTwoFm: [], //二级表数据---快速模具
      toolsList: [],     //工具栏
      twoTableShow3d: false,
      twoTableShowCncm: false,
      twoTableShowCncp: false,
      twoTableShowVc: false,
      twoTableShowFm: false,
      footShow: false,       //合计
      countData: [],        //明细合计列表
      dialogViewInquirySheet3D:false,   //手板对话框
      supInquiry3DList:[],      //手板List
      inquiryDetailsId:'',      //明细ID
      dialogViewInquirySheetMold:false,   //快速模具对话框
      supInquiryMoldList:[],      //快速模具List
      inquiryNoSup:'',            //询价单号
      supTotalcostSup:'',         //总金额
      totalLeadtimeSup:'',          //预估天数
      dialogViewInquirySheetMoldSup:false,//询价发送
      inquiryMainId:'',       //主表id

      loading: true,
      loadingView: true,
      dialog: false,
      dialogTitle: '',
      initDialogForm: {
        contactCode: '', contactCname: '', contactPhone: '', mailAddress: '', customerCode: '', customerFullname: '', address: '', paymentCode: ''
      },
      dialogQuo: false,
      dialogView: false,
      dialogAtt: false,
      boolDoll: false,     //公仔
      boolMaterial: false, //材料证明
      boolSample: false,   //样品申请
      quotationId: '',
      clientHeight: "650", //表格高度











      // attachmentList: [],//附件列表
      // EditCheck: true,   //是否可编辑
      // EmployeeList: [],  //员工
      // quotationTypeList: [
      //   { value: "中文PDF", label: "中文PDF" },
      //   { value: "英文PDF", label: "英文PDF" },
      //   { value: "中文Excel", label: "中文Excel" },
      //   { value: "英文Excel", label: "英文Excel" }
      // ],
      // quotationDefaultType: '中文PDF',
  
      // // loading: true,
      // // loadingView: true,
      // // dialog: false,
      // // dialogTitle: '',
      // // initDialogForm: {
      // //   contactCode: '', contactCname: '', contactPhone: '', mailAddress: '', customerCode: '', customerFullname: '', address: '', paymentCode: ''
      // // },
      // // dialogQuo: false,
      // // dialogView: false,
      // // dialogAtt: false,
      // // boolDoll: false,     //公仔
      // // boolMaterial: false, //材料证明
      // // boolSample: false,   //样品申请
      // // quotationId: '',


      // sels: [],//列表选中列
      // viewQuotationList: [],//查看报价单
      // imageUrl: '',
      // dialogImageUrl: '',
      // dialogVisible: false,
      // disabled: false,
      // qtDetailsId: '',//明细id
      // quotationNo: '',//报价单号
      // tempFlag: false,//判断是否上传成功
      // CustomerList: [],
      // technologyList: [],  //工艺列表
      // materialList: [],  //材料列表
      // technologyId: '',  //工艺id
      // materialCode: '',  //材料code
      // techCategory: '',//类别
      
      // expands: [],
     
      // mainQuoId: '',         //主表id
      // detailsQuoId: '',      //明细表id
      // splitCountList: [],    //拆件
      // faceCountList: [],     //加工面数
      // ComplexityFunList: [], //难度系数
      // toleranceList: [],     //公差
      // moldMaterialList: [],  //硅膜材料
      // gateTypeList: [],  //进胶类型
      // surFaceList: [],//表面处理
      // CaviMaList: [],//膜仁材料
      // MoldMaList: [],//膜胚材料
      // mouldBaseTypeList: [],//膜胚类型
      // lineCountList: [],//行位个数
      // pentroofCountList: [],//斜顶个数
      // hotCountList: [],//热嘴个数
      // dieLifeList: [],//模具寿命
      // hillCountList: [],//穴数
      // restaurants: [],
     
      // spanArr:[],       //快速模具合并项
      // pos:'',



    };
  },
  mounted() {
    this.getButtonsList()
    this.getOneTableData(this.currentPage, this.pageSize, "1")
    // this.getCustomerList();
  },
  methods: {

     
    //获取按钮列表
    getButtonsList() {
      this.$request.post('/sysOperation/listOperationBar', { menuId: this.menuId }).then(res => {
        console.log("====获取按钮列表=====")
        console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
        if (res.code == 0) {
          this.tHeadDataOne = res.obj.listOneColumn;
          this.tHeadDataTwo3d = res.obj.listTwoColumn3d;
          this.tHeadDataTwoCncm = res.obj.listTwoColumncncm;
          this.tHeadDataTwoCncp = res.obj.listTwoColumncncp;
          this.tHeadDataTwoVc = res.obj.listTwoColumnvc;
          this.tHeadDataTwoFm = res.obj.listTwoColumnfm;

          this.oneOperation = res.obj.listOneTableOperation;
          this.searchList = res.obj.listSearchBarOperation;
          this.twoOperation = res.obj.listTwoTableOperation;
          this.toolsList = res.obj.listToolBarOperation;
          console.log(this.toolsList)
        }
      }).catch(e => {
        console.log("错误")
      })
    },

    //获取一级表数据
    getOneTableData(currentPage, pageSize, searchType) {
      this.$request.post('/supinquirymain/listSupInquiryMainByMain', {
        // "1"：代表精确查询，“2”代表模糊查询
        // serachType: searchType,
        page: currentPage,
        rows: pageSize,
        quoteNo: this.ruleForm.quotationNo,
        pmUserCode: this.ruleForm.customerNo,
        dateType: this.ruleForm.chooses,
        dateStart: this.ruleForm.start,
        dateEnd: this.ruleForm.end,
        statusCode: this.ruleForm.statusSearch
      }).then(res => {
        console.log("获取一级表数据")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.tableDataOne = res.obj;
          this.total = res.obj.total;

          this.loading = false;
          console.log(this.tableDataOne);
        }
      }).catch(e => {
        console.log("错误")
      })
    },

    //获取二级表数据
    getTwoTableData(mainId) {
      this.twoTableShow3d = false;
      this.twoTableShowCncm = false;
      this.twoTableShowCncp = false;
      this.twoTableShowVc = false;
      this.twoTableShowFm = false;
      this.footShow = true;
      this.$request.post('/supinquirydetails/listSupInquiryDetailsByMainIds', {
        page:1,
        rows:100,
        mainId: mainId
      }).then(res => {
        console.log("获取二级表数据")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.countData = []
          this.tableDataTwo3d = res.obj.listInquiry3d;
          this.tableDataTwoCncm = res.obj.listInquiryCncm;
          this.tableDataTwoCncp = res.obj.listInquiryCncp;
          this.tableDataTwoVc = res.obj.listInquiryVc;
          this.tableDataTwoFm = res.obj.listInquiryFm;

          if (this.tableDataTwo3d.length > 0) {
            this.twoTableShow3d = true;
          }
          if (this.tableDataTwoCncm.length > 0) {
            this.twoTableShowCncm = true;
          }
          if (this.tableDataTwoCncp.length > 0) {
            this.twoTableShowCncp = true;
          }
          if (this.tableDataTwoVc.length > 0) {
            this.twoTableShowVc = true;
          }
          if (this.tableDataTwoFm.length > 0) {
            this.twoTableShowFm = true;
          }

          this.getDetailsTotalInqurity(mainId);

        }
      }).catch(e => {
        console.log("错误")
      })
    },

    //明细表总合计
    getDetailsTotalInqurity(mainId){
      this.$request.post('/supinquirydetails/listSupInquiryMainAllTotal', {mainId:mainId}).then(res => {
        console.log("明细表总合计")
        console.log(res)    
        if (res.code == 0) {
          this.countData=[];
          this.countData.push({
            counts:"合计",
            weight:"重量："+res.obj.weightQuo+"g",
            totalQty:"总数量："+res.obj.totalQtyQuo,
            zhePrice:"总价格："+res.obj.saleCostQuo,
            yuanPrice:"原币总价格："+res.obj.yuanCostQuo
          })
        }
      }).catch(e=>{
          console.log("错误")
      })
    },

    //展开子表
    expandSelect(row, expandedRows) {
      console.log("==========我是分界线(展开子表)===========")
      this.getTwoTableData(row.id);
    },

    /**一级表下载附件*/
    downloadAttaEvent(indexs,row){
      window.location.href =this.$request.defaults.baseURL+'/salqtdetailsattachment/downloadossInquiry?deId='+row.id+'&token='+Cookies.get('TOKEN');
    },

    /**询价发送*/
    inquirySentEvent(indexs,row){
      console.log(row)
      this.inquiryMainId=row.id
      this.inquiryNoSup=row.inquiryNo;
      this.supTotalcostSup=row.totalCost;
      this.totalLeadtimeSup=row.manufacturingTime;

      setTimeout(() => {
        this.dialogTitle = '询价结果确定'
        this.dialogViewInquirySheetMoldSup = true
      },300)

    },

    /****询价发送-----保存**** */
    submitDialogDataSendInquiry(){
      this.$request.post('/supinquirymain/saveQuoteInquirySendList', {ids:this.inquiryMainId,leadTime:this.totalLeadtimeSup}).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dialogViewInquirySheetMoldSup = false
        }
      }).catch(e=>{
          console.log("错误")
      })
    },

    /***编辑----二级表----手板***/
    editRowTwo(index, row) {
      console.log(row)
      this.inquiryDetailsId=row.id
      this.getInquiry3DDataList(row.id);
      setTimeout(() => {
        this.dialogTitle = '询价'
        this.dialogViewInquirySheet3D = true
      },300)
    },

     /***编辑----二级表----模具***/
    editRowTwoMold(index, row) {
      console.log(row)
      this.inquiryDetailsId=row.id
      this.getInquiryMoldDataList(row.id);
      setTimeout(() => {
        this.dialogTitle = '询价'
        this.dialogViewInquirySheetMold = true
      },300)
    },

    /*****保存-----模具******* */
    submitDialogInquirySheetMold(){
      let sendRow=[];
      for(let k in this.supInquiryMoldList){
        if(this.supInquiryMoldList[k].id==this.inquiryDetailsId){
          sendRow=this.supInquiryMoldList[k];
          console.log(sendRow)
        }
      }
      this.$request.post('/supinquirydetails/saveSupInquiryDetailsByIdM', sendRow).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dialogViewInquirySheetMold = false
        }
      }).catch(e=>{
          console.log("错误")
      })
    },

    /***获取手板明细数据****/
    getInquiry3DDataList(ids){
      this.$request.post('/salqtmain/listInquiryReByQuote', {quoteDetailsId:'',id:ids}).then(res => {
        if (res.code == 0) {
          this.supInquiry3DList=res.obj;
        }
      }).catch(e=>{
          console.log("错误")
      })
    },

     /***获取模具明细数据****/
    getInquiryMoldDataList(ids){
      this.$request.post('/supinquirymain/listQuoteInquiryMoldDetails', {ids:ids}).then(res => {
        if (res.code == 0) {
          this.supInquiryMoldList=res.obj;
          console.log("获取模具明细数据")
          console.log(this.supInquiryMoldList)
        }
      }).catch(e=>{
          console.log("错误")
      })
    },

    /****保存----手板**** */
    submitDialogInquirySheet3D(){
      let sendRow=[];
      for(let k in this.supInquiry3DList){
        if(this.supInquiry3DList[k].id==this.inquiryDetailsId){
          sendRow=this.supInquiry3DList[k];
          console.log(sendRow)
        }
      }
      this.$request.post('/supinquirydetails/saveQuoteInquiryPriceList', sendRow).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dialogViewInquirySheet3D = false
        }
      }).catch(e=>{
          console.log("错误")
      })

    },

     //二级表----下载附件
    downLoadAttTwo(indexs,rows) {
      console.log(rows)
      window.location.href =this.$request.defaults.baseURL+'/salqtdetailsattachment/downloadossDeta?deId='+rows.relatedDetailsid+'&token='+Cookies.get('TOKEN');
      // window.location.href =this.$request.defaults.baseURL+'/salqtdetailsattachment/downloadossDeta?deId='+this.qtDetailsId+'&token='+Cookies.get('TOKEN');
    },

     /*****模具合并-----供应商询价单----明细****
     * 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex**/
    quoteSpanMethodInquiry({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0|| columnIndex === 1 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8 ||  columnIndex === 9 || columnIndex === 10 ||columnIndex === 13 || columnIndex === 14 || columnIndex === 15 || columnIndex === 19) {
      // if(column.label=='操作' ||columnIndex === '模具要求' || columnIndex === '其它要求' || columnIndex === '模具数量' || columnIndex === '模具单价' || columnIndex === '模具总价' || columnIndex === '折后总价' || columnIndex === '原币金额' || columnIndex === '交货日期'){
        if(typeof row.mouldMergeId!="null"){
          let rowNum = 0
          let rowNumNoFlag = 0
          // 索引出需要的合并的个数
          this.tableDataTwoFm.forEach(item => {
            if (item.mouldMergeId === row.mouldMergeId) {
              rowNum = rowNum + 1
            }
          })

          // 索引出第一次 合并的参数
          if (rowNum !== 0) {
            for (let i = 0; i < this.tableDataTwoFm.length; i++) {
              if (this.tableDataTwoFm[i].mouldMergeId != '' && this.tableDataTwoFm[i].mouldMergeId === row.mouldMergeId) {
                rowNumNoFlag = i
                break
              }
            }
          }
          // 根据索引的合并个数和 第一次出现的位置 进行合并
          if (rowNum !== 0 && rowNumNoFlag === rowIndex) {
            return {
              rowspan: rowNum,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }else{
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },

      /*****模具合并-----供应商询价单---编辑****
     * 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex**/
    quoteSpanMethodInquiryMold({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4|| columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8 ||  columnIndex === 9 || columnIndex === 10 || columnIndex === 11 || columnIndex === 12 ||columnIndex === 13 || columnIndex === 14 || columnIndex === 15 ) {
      // if(column.label=='操作' ||columnIndex === '模具要求' || columnIndex === '其它要求' || columnIndex === '模具数量' || columnIndex === '模具单价' || columnIndex === '模具总价' || columnIndex === '折后总价' || columnIndex === '原币金额' || columnIndex === '交货日期'){
        if(typeof row.mouldMergeId!="null"){
          let rowNum = 0
          let rowNumNoFlag = 0
          // 索引出需要的合并的个数
          this.supInquiryMoldList.forEach(item => {
            if (item.mouldMergeId === row.mouldMergeId) {
              rowNum = rowNum + 1
            }
          })

          // 索引出第一次 合并的参数
          if (rowNum !== 0) {
            for (let i = 0; i < this.supInquiryMoldList.length; i++) {
              if (this.supInquiryMoldList[i].mouldMergeId != '' && this.supInquiryMoldList[i].mouldMergeId === row.mouldMergeId) {
                rowNumNoFlag = i
                break
              }
            }
          }
          // 根据索引的合并个数和 第一次出现的位置 进行合并
          if (rowNum !== 0 && rowNumNoFlag === rowIndex) {
            return {
              rowspan: rowNum,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }else{
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },

      //报价单号事件
      getQuotationNo(ids){
        console.log("报价单号事件："+ids)
          this.quotationId=ids;
          this.getListQuotation(ids);
          console.log(this.boolMaterial)
            console.log(this.boolSample)
            console.log(this.boolDoll)
        setTimeout(() => {
          this.dialogTitle = '订单信息'
          this.dialogQuo = true
        },300)
      },

      //根据id获取quotation信息
      getListQuotation(ids){

        this.tableDataOne.rows.forEach(item => {
            if(item.id==ids){
              if(item.boolMaterialProof=='0'){
                this.boolMaterial=false;
              }else{
                this.boolMaterial=true;
              }
              if(item.boolSample=='0'){
                this.boolSample=false;
              }else{
                this.boolSample=true;
              }
              if(item.boolDoll=='0'){
                this.boolDoll=false;
              }else{
                this.boolDoll=true;
              }
            }
        });

      },

       //报价单号弹窗----保存
      submitDialogData(){
        console.log("报价单号弹窗----保存")
        this.$request.post('/salqtmain/listChangeQuotationBool', {
          quotationId:this.quotationId,
          boolMaterial: this.boolMaterial,
          boolSample:this.boolSample,
          boolDoll: this.boolDoll
        }).then(res => {
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          if (res.code == 0) {
            this.dialogQuo = false
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
          }
        }).catch(e=>{
            console.log("错误")
        })
      },




        //查询--精确
        barSearchOperation() {
          console.log("查找")
          if (this.ruleForm.start != '') {
            var startDate = new Date(this.ruleForm.start);
            var monthStart = startDate.getMonth() + 1;
            if (monthStart < 10) {
              monthStart = "0" + monthStart;
            }
            var dateStart = startDate.getDate();
            if (dateStart < 10) {
              dateStart = "0" + dateStart;
            }
            this.ruleForm.start = startDate.getFullYear() + '-' + monthStart + "-" + dateStart;
          }
          if (this.ruleForm.end != '') {
            var endDate = new Date(this.ruleForm.end);
            var monthEnd = endDate.getMonth() + 1;
            if (monthEnd < 10) {
              monthEnd = "0" + monthEnd;
            }
            var dateEnd = endDate.getDate();
            if (dateEnd < 10) {
              dateEnd = "0" + dateEnd;
            }
            this.ruleForm.end = endDate.getFullYear() + '-' + monthEnd + "-" + dateEnd;
          }

          this.getOneTableData(this.currentPage, this.pageSize, "1");

        },
        //查询---模糊
        searchTypeQuotation(types) {
          let quotationNos = "", customerNos = "";
          if (types == "quotationNo") {
            quotationNos = this.ruleForm.quotationNo;
            customerNos = "";
          } else {
            quotationNos = "";
            customerNos = this.ruleForm.customerNo;
          }
          this.$request.post('/salqtmain/listQuotationMain', {
            // "1"：代表精确查询，“2”代表模糊查询
            serachType: "2",
            page: this.currentPage,
            rows: this.pageSize,
            quotationNo: quotationNos,
            contactCode: customerNos,
            dateType: "",
            starts: "",
            ends: "",
            menuId: this.menuId
          }).then(res => {
            console.log("获取一级表数据")
            console.log(res)    //请求成功方法，data为请求成功返回的数据
            if (res.code == 0) {
              this.tableDataOne = res.obj;
              this.total = res.obj.total;

              this.loading = false;
              console.log(this.tableDataOne);
            }
          }).catch(e => {
            console.log("错误")
          })

        },

        //清空
        barEmptyOperation() {
          console.log("清空")
          this.ruleForm.quotationNo = "";
          this.ruleForm.customerNo = "";
          this.ruleForm.chooses = "下单日期";
          this.ruleForm.start = "";
          this.ruleForm.end = "";
          this.ruleForm.statusSearch = "全部";
          this.getOneTableData(this.currentPage, this.pageSize, "1")
        },
        //开始日期
        beginDate() {
          let self = this
          return {
            disabledDate(time) {
              if (self.ruleForm.end) {
                return new Date(self.ruleForm.end).getTime() < time.getTime()
              }
            }
          }
        },
        //提出结束时间必须大于提出开始时间
        processDate() {
          let self = this
          return {
            disabledDate(time) {
              if (self.ruleForm.start) {
                return new Date(self.ruleForm.start).getTime() > time.getTime()
              }
            }
          }
        },
  

        //3d打印合计
        getTotal3D(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'partQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusUnitcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalmasterVccost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            }
    
    
            else {
              sums[index] = '';
            }
          });
    
          return sums;
        },
    
        //cnc金属合计
        getTotalCncm(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'partQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusUnitcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalmasterVccost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            }
    
    
            else {
              sums[index] = '';
            }
          });
    
          return sums;
        },
    
        //cnc塑料合计
        getTotalCncp(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'partQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusUnitcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalmasterVccost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            }
    
    
            else {
              sums[index] = '';
            }
          });
    
          return sums;
        },
    
        //复模合计
        getTotalVc(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'masterTotal') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'moldTotal') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'partQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'guanTotal') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalmasterVccost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            }
    
    
            else {
              sums[index] = '';
            }
          });
    
          return sums;
        },
    
        //快速模具合计
        getTotalFm(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (column.property === 'partQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supUnitcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalcost') {
              let totalCosts=values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
              sums[index]=totalCosts.toFixed(2);
              sums[index];
            } else if (column.property === 'moldQty') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supUnitcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'cusTotalcost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            } else if (column.property === 'supTotalmasterVccost') {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index];
            }
    
    
            else {
              sums[index] = '';
            }
          });
          console.log(sums)
          return sums;
        },




















  watch: {
    tableDataOne: {
      deep: true,
      immediate: true,
      handler(newval, oldval) {
        
      }
    }
  }
  },
}