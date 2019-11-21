import Cookies from 'js-cookie'
export default {
  name: "customerInquiry",
  data() {
    return {
      menuId: '7ecba3c9-c414-11e9-8631-000c290d53bf',
      testC: true,
      pageSize: 15,
      currentPage: 1,
      total: 0,
      ruleForm: {
        quotationNo: '', customerNo: '', statusSearch: '全部', chooses: '报价日期', start: '', end: '',
      },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
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
      statusList: [],    //状态栏
      toolsList: [],     //工具栏
      attachmentList: [],//附件列表
      EditCheck: true,   //是否可编辑
      EmployeeList: [],  //员工
      quotationTypeList: [
        { value: "中文PDF", label: "中文PDF" },
        { value: "英文PDF", label: "英文PDF" },
        { value: "中文Excel", label: "中文Excel" },
        { value: "英文Excel", label: "英文Excel" }
      ],
      quotationDefaultType: '中文PDF',
      dateOptions: [
        { value: "报价日期", label: "报价日期" },
        { value: "订单交货日期", label: "订单交货日期" },
      ],
      statusOptions: [
        { value: "全部", label: "全部" },
        { value: "已发送", label: "已发送" },
        { value: "未发送", label: "未发送" }
      ],
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
      sels: [],//列表选中列
      viewQuotationList: [],//查看报价单
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      qtDetailsId: '',//明细id
      quotationNo: '',//报价单号
      tempFlag: false,//判断是否上传成功
      CustomerList: [],
      technologyList: [],  //工艺列表
      materialList: [],  //材料列表
      technologyId: '',  //工艺id
      materialCode: '',  //材料code
      techCategory: '',//类别
      countData: [],
      expands: [],
      twoTableShow3d: false,
      twoTableShowCncm: false,
      twoTableShowCncp: false,
      twoTableShowVc: false,
      twoTableShowFm: false,
      footShow: false,       //合计
      mainQuoId: '',         //主表id
      detailsQuoId: '',      //明细表id
      splitCountList: [],    //拆件
      faceCountList: [],     //加工面数
      ComplexityFunList: [], //难度系数
      toleranceList: [],     //公差
      moldMaterialList: [],  //硅膜材料
      gateTypeList: [],  //进胶类型
      surFaceList: [],//表面处理
      CaviMaList: [],//膜仁材料
      MoldMaList: [],//膜胚材料
      mouldBaseTypeList: [],//膜胚类型
      lineCountList: [],//行位个数
      pentroofCountList: [],//斜顶个数
      hotCountList: [],//热嘴个数
      dieLifeList: [],//模具寿命
      hillCountList: [],//穴数
      restaurants: [],
      clientHeight: "650", //表格高度
      spanArr:[],       //快速模具合并项
      pos:'',



    };
  },
  mounted() {
    // this.$router.push({ name: ival.item.menuUrl.substr(1), params: { ids: id}});
    this.getStatusList()
    this.getButtonsList()
    this.getOneTableData(this.currentPage, this.pageSize, "1")
    this.getCustomerList();

  },
  methods: {
    getbackNavMenuId(val) {
      console.log(val)
      console.log(val.item.menuUrl)

      this.$router.push({ name: val.item.menuUrl.substr(1), params: { ids: val.item.id } });

    },

    //获取员工
    getHrList() {
      // EmployeeList
      this.$request.post('/hremployeeinfo/getAllEmployee', { deptName1: '跟单部' }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          console.log("获取员工")
          this.EmployeeList = res.obj;
        }
      }).catch(e => {
        console.log("错误")
      })
    },

    handleSizeChange(val) {
      // pageSize:2,
      // currentPage:1,
      console.log(`每页 ${val} 条`);
      console.log("pageSize====：" + this.pageSize)
      console.log("currentPage=====：" + this.currentPage)
      this.pageSize = val;
      this.getOneTableData(this.currentPage, val, "1");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log("pageSize====：" + this.pageSize)
      console.log("currentPage=====：" + this.currentPage)

      this.getOneTableData(val, this.pageSize, "1");
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
      this.ruleForm.chooses = "报价日期";
      this.ruleForm.start = "";
      this.ruleForm.end = "";
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
    //获取状态栏列表
    getStatusList() {
      this.$request.post('/sysOperation/listOperationByPosition', { menuId: '2f9dd12a-09bd-4a54-a234-e55007114a0c' }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          console.log("请求成功方法，data为请求成功返回的数据")
          this.statusList = res.obj;
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //获取按钮列表
    getButtonsList() {
      this.$request.post('/sysOperation/listOperationBar', { menuId: this.menuId }).then(res => {
        console.log("获取按钮列表")
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
          console.log(this.tHeadDataOne)
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //获取一级表数据
    getOneTableData(currentPage, pageSize, searchType) {
      this.$request.post('/salqtmain/listQuotationMain', {
        // "1"：代表精确查询，“2”代表模糊查询
        serachType: searchType,
        page: currentPage,
        rows: pageSize,
        quotationNo: this.ruleForm.quotationNo,
        contactCode: this.ruleForm.customerNo,
        dateType: this.ruleForm.chooses,
        starts: this.ruleForm.start,
        ends: this.ruleForm.end,
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
    //获取二级表数据
    getTwoTableData(mainId) {
      this.twoTableShow3d = false;
      this.twoTableShowCncm = false;
      this.twoTableShowCncp = false;
      this.twoTableShowVc = false;
      this.twoTableShowFm = false;
      this.footShow = true;
      this.$request.post('/salqtdetails/listQuotationDetailsByMainId', {
        page: "1",
        rows: "200",
        mainId: mainId
      }).then(res => {
        console.log("获取二级表数据")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.countData = []
          this.tableDataTwo3d = res.obj.list3DQuotation.rows;
          this.tableDataTwoCncm = res.obj.listCncmQuotation.rows;
          this.tableDataTwoCncp = res.obj.listCncpQuotation.rows;
          this.tableDataTwoVc = res.obj.listVcQuotation.rows;
          this.tableDataTwoFm = res.obj.listFmQuotation.rows;

          console.log("====分界线获取二级表数据=====")
          console.log(this.tableDataTwoCncm)
          for (let i = 0; i < this.tableDataTwoCncm.length; i++) {
            console.info(this.tableDataTwoCncm[i].checkedWireCutting)
            console.info(this.tableDataTwoCncm[i].checkedEdm)
          }

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

          this.getDetailsTotal(mainId);

        }
      }).catch(e => {
        console.log("错误")
      })
    },

    //明细表总合计
    getDetailsTotal(mainId) {
      this.$request.post('/salqtdetails/allTotalQtSummary', { mainId: mainId }).then(res => {
        console.log("明细表总合计")
        console.log(res)
        if (res.code == 0) {
          this.countData = [];
          if(res.obj.weightQuo!=""){
              this.footShow=true;
          }

          this.countData.push({
            counts: "合计",
            weight: "重量：" + res.obj.weightQuo + "g",
            totalQty: "总数量：" + res.obj.totalQtyQuo,
            zhePrice: "折后总价格：" + res.obj.saleCostQuo,
            yuanPrice: "原币总价格：" + res.obj.yuanCostQuo
          })
          
        }
      }).catch(e => {
        console.log("错误")
      })
    },


    //子表
    expandSelect(row, expandedRows) {
      // alert(true)
      console.log("==========我是分界线===========")
      console.log(row.id)
      console.log(expandedRows)
      // alert($(this).parent().attr('class'))
      this.getTwoTableData(row.id);

      // if(this.EditCheck){

      // }else{
      //   this.$message({
      //     type: 'warning',
      //     message: '请先保存!'
      //   });
      // }



      // let $table = this.$refs.tableCus;

      // this.tableDataOne.rows.map((item) => {

      //   if(item.id!=row.id){
      //     $table.toggleRowExpansion(item, false)
      //   }

      // })

      // $table.toggleRowExpansion(row)




      //     var that = this
      //     if (expandedRows.length>1) {
      //         that.expands = []
      //         if (row) {
      //             that.expands.push(row);
      //         }
      //         this.$refs.tableCus.toggleRowExpansion(expandedRows[0]);
      //         // alert("if")
      //     } else {
      //         that.expands = [];
      //       // alert("else")
      //     }


    },

    clickTable(row, column, cell, event) {
      // if(cell.cellIndex!=3 && cell.cellIndex!=10){
      //    this.$refs.tableCus.toggleRowExpansion(row);
      // }
      // this.getTwoTableData(row.id);

    },




    //获取客户列表
    getCustomerList() {
      this.$request.post('/salctcontact/listSalCtContactAll', {}).then(res => {
        console.log("获取客户列表")
        console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
        if (res.code == 0) {
          this.CustomerList = res.obj;
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //获取工艺列表
    getTechnologyList(technology) {
      if (technology == '2') {
        technology = '1'
      }
      this.$request.post('/qt/tech/listTechByWorkType', { workType: technology }).then(res => {
        console.log("获取工艺列表")
        console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
        if (res.code == 0) {
          this.technologyList = res.obj;
          this.getMaterialList(technology);
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //获取材料列表
    getMaterialList(category) {
      console.log("===========获取材料列表=============")
      console.log(this.technologyId)
      if (category == '1' || category == '2') {
        // alert("cnc")
        let boolPlastic = "";
        if (category == '1') {
          boolPlastic = '1'
        } else {
          boolPlastic = '0';
        }
        this.$request.post('/qt/materials/getCncMaterials', { techId: this.technologyId, boolPlastic: boolPlastic }).then(res => {
          console.log("获取材料列表cnc")
          console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
          if (res.code == 0) {
            this.materialList = res.obj;
          }
        }).catch(e => {
          console.log("错误")
        })
      } else {
        // alert("other")
        this.$request.post('/qt/materials/getMaterials', { techId: this.technologyId }).then(res => {
          console.log("获取材料列表other")
          console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
          if (res.code == 0) {
            this.materialList = res.obj;
          }
        }).catch(e => {
          console.log("错误")
        })
      }
    },
    //工艺change事件
    checkTechnology(items) {
      console.log("工艺select中对应值")
      console.log(items)
      this.technologyId = items.id;
    },
    //材料change事件
    checkMaterial(items) {
      console.log("材料select中对应值")
      console.log(items)
      this.materialCode = items.materialCode;
      console.log(this.materialCode)
    },




    //保存一级表数据
    savetable(index, row) {
      console.log(row)
      this.$request.post('/salqtmain/updateSalQtMain', row).then(res => {
        console.log("保存一级表数据")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.getOneTableData(this.currentPage, this.pageSize, "1");
          this.EditCheck = true;
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //修改
    update(index, row) {
      // if(this.EditCheck){
      this.EditCheck = false;
      this.mainQuoId = row.id;
      this.getCustomerList();
      this.getHrList();
      row.checkedColumn = true;




      // }else{
      //   this.$message({
      //     type: 'warning',
      //     message: '请先保存!'
      //   });
      // }
    },
    //取消
    canceltable(index, row) {
      row.checkedColumn = false;
      his.EditCheck = true;
    },
    //添加-----一级表
    addRow(index, row) {
      this.$router.push({ name: 'quotation', params: { quoteRow: row } });
    },
    //复制-----一级表
    copytable(index, row) {
      this.$request.post('/salqtmain/listCopySalQtMainById', {
        ids: row.id,
        quotationNo: row.quotationNo
      }).then(res => {
        console.log("根据id获取quotation信息")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.getOneTableData(this.currentPage, this.pageSize, "1");
          this.$message({
            type: 'success',
            message: '复制成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //发送-----一级表
    sender(index, row) {
      this.$request.post('/salqtmain/listChangeStatus', { ids: row.id }).then(res => {
        console.log("发送功能")
        console.log(res)    //请求成功方法，data为请求成功返回的数据  7ecba3c9-c414-11e9-8631-000c290d53bf 客户询价
        if (res.code == 0) {
          this.getOneTableData(this.currentPage, this.pageSize, "1");
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //生成报价单-----一级表
    producequotationAgain(index, row) {
      let detailsId = this.sels.join(',');
      if (detailsId.length > 0) {
        this.$request.post('/salqtmain/listQuotationSheetAgain', {
          mainId: row.id,
          detailList: detailsId
        }).then(res => {
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '生成报价单成功!'
            });
          }
        }).catch(e => {
          this.$message({
            type: 'error',
            message: '错误!'
          });
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择明细!'
        });
      }
    },

    //生成报价单，无需勾选
    producequotation(index, row) {
      this.$request.post('/salqtmain/listQuotationSheet', {
        mainId: row.id
      }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '生成报价单成功!'
          });
        }
      }).catch(e => {
        this.$message({
          type: 'error',
          message: '错误!'
        });
      })
    },


    //查看报价单-----一级表
    viewquotation(index, row) {
      this.$request.post('/salqtmain/listShowQuotationSheet', {
        quotationNo: row.quotationNo
      }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.loadingView = false;
          this.viewQuotationList = res.obj;
          console.log(this.viewQuotationList)
        }
      }).catch(e => {
        this.$message({
          type: 'error',
          message: '错误!'
        });
      })

      setTimeout(() => {
        this.dialogTitle = '查看报价单'
        this.dialogView = true
      }, 300)

    },
    //附件下载-----一级表
    downloadAttachments(index, row) {
      window.location.href = this.$request.defaults.baseURL + '/salqtdetailsattachment/downloadoss?deId=' + row.id + '&token=' + Cookies.get('TOKEN');
    },




    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '附件下载.zip')

      document.body.appendChild(link)
      link.click()
    },

    //获取附件列表
    getAttachmentsList(detailsId) {
      this.$request.post('/salqtdetailsattachment/listDetailsAtt', {
        ids: detailsId
      }).then(res => {
        console.log("获取附件列表")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.attachmentList = res.obj;
          console.log(this.attachmentList);
        }
      }).catch(e => {
        console.log("错误")
      })
    },

    /**模具合并列
     * 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
     */

    quoteSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ||columnIndex === 5 || columnIndex === 6 || columnIndex === 10 || columnIndex === 11 || columnIndex === 12 || columnIndex === 13 || columnIndex === 14 || columnIndex === 15) {
      // if(column.label=='操作' ||columnIndex == '模具要求' || columnIndex == '其它要求' || columnIndex === '模具数量' || columnIndex === '模具单价' || columnIndex === '模具总价' || columnIndex === '折后总价' || columnIndex === '原币金额' || columnIndex === '交货日期'){
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

    quoteSpanMethodm({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0 ||columnIndex === 5 || columnIndex === 6 || columnIndex === 10 || columnIndex === 11 || columnIndex === 12 || columnIndex === 13 || columnIndex === 14 || columnIndex === 15) {
        if(column.label=='操作'){
        // if(typeof row.mouldMergeId!="null"){
          const _row=this.spanArr[rowIndex];
          const _col=_row>0?1:0;
          return{
            rowspan:_row,
            colspan:_col
          }
        }
    },

    /**合并模具方法 */
    getSpanArr(data){
      for(var i=0;i<data.length;i++){
        if(i==0){
          this.spanArr.push(1);
          this.pos=0;
        }else{
          if(typeof data.mouldMergeId!="null"){
            if(data[i].mouldMergeId==data[i-1].mouldMergeId){
              this.spanArr[this.pos]+=1;
              this.spanArr.push(0);
            }else{
              this.spanArr.push(1);
              this.pos=i;
            }
          }
          
        }
      }
    },

  //上传附件----二级表
    uploadAttachmentsTwo(index, row) {
      this.dialogAtt = true;
      this.dialogTitle = "附件上传"
      this.qtDetailsId = row.id;
      this.quotationNo = row.quotationNo;
      this.getAttachmentsList(row.id);
    },
    //删除----二级表
    deleteRowTwo(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$request.post('/salqtdetails/deleteSalQtDetailsById', {
          id: row.id,
          mergeId:row.mouldMergeId
        }).then(res => {
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          if (res.code == 0) {
            this.getTwoTableData(row.mainId)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // this.tableDataTwo;
            // for(let k in this.tableDataTwo){
            //   if(this.tableDataTwo[k]==row.id){
            //     //删除
            //     this.tableDataTwo.splice(k,1);
            //   }
            // }
          }
        }).catch(e => {
          this.$message({
            type: 'error',
            message: '错误!'
          });
        })
      }).catch(() => {
      });
    },


    //编辑----二级表
    editRowTwo(index, row) {
      // if(this.EditCheck){
      this.EditCheck = false;
      console.log("编辑----二级表")
      console.log(row)
      console.log(row.id)
      this.detailsQuoId = row.id;
      this.techCategory = row.technologyCategory;
      this.technologyId = row.techId;
      this.getTechnologyList(this.techCategory);
      this.getMaterialList(this.techCategory);

      if(this.techCategory=='10'){
          let mouldMergeId=row.mouldMergeId;
          console.log(mouldMergeId)
          if (typeof mouldMergeId!="null")
          {
            this.tableDataTwoFm.forEach(item => {
              if (item.mouldMergeId === row.mouldMergeId) {
                item.checkedColumn = true;
              }
            })
          }else{
            row.checkedColumn = true;
          }

      }else{
        row.checkedColumn = true;
      }


      this.getParamQuo(row.technologyCategory, 'splitCount').then(res => {
        if (res.code === 0) {
          console.log("========拆件=========")
          console.log(res.obj)
          this.splitCountList = res.obj;
        }
      })

      this.getParamQuo(row.technologyCategory, 'faceCount').then(res => {
        if (res.code === 0) {
          console.log("========加工面数=========")
          console.log(res.obj)
          this.faceCountList = res.obj;
        }
      })

      this.getComplexityFun().then(res => {
        if (res.code === 0) {
          console.log("========难度系数=========")
          console.log(res.obj)
          this.ComplexityFunList = res.obj;
        }
      })

      this.getParamQuo(row.technologyCategory, 'tolerance').then(res => {
        if (res.code === 0) {
          console.log("========公差=========")
          console.log(res.obj)
          this.toleranceList = res.obj;
        }
      })

      this.getParamQuo(row.technologyCategory, 'productColour').then(res => {
        if (res.code === 0) {
          console.log("========产品颜色=========")
          console.log(res.obj)
          this.productColourList = res.obj;
        }
      })

      this.getParamQuo(row.technologyCategory, 'gateType').then(res => {
        if (res.code === 0) {
          console.log("========进胶类型=========")
          console.log(res.obj)
          this.gateTypeList = res.obj;
        }
      })

      this.getParamQuo(row.technologyCategory, 'mouldBaseType').then(res => {
        if (res.code === 0) {
          console.log("========膜胚类型=========")
          console.log(res.obj)
          this.mouldBaseTypeList = res.obj;
        }
      })
      this.getParamQuo(row.technologyCategory, 'lineCount').then(res => {
        if (res.code === 0) {
          console.log("========行位个数=========")
          console.log(res.obj)
          this.lineCountList = res.obj;
        }
      })
      this.getParamQuo(row.technologyCategory, 'pentroofCount').then(res => {
        if (res.code === 0) {
          console.log("========斜顶个数=========")
          console.log(res.obj)
          this.pentroofCountList = res.obj;
        }
      })
      this.getParamQuo(row.technologyCategory, 'hotCount').then(res => {
        if (res.code === 0) {
          console.log("========热嘴个数=========")
          console.log(res.obj)
          this.hotCountList = res.obj;
        }
      })
      this.getParamQuo(row.technologyCategory, 'dieLife').then(res => {
        if (res.code === 0) {
          console.log("========模具寿命=========")
          console.log(res.obj)
          this.dieLifeList = res.obj;
        }
      })
      this.getParamQuo(row.technologyCategory, 'hillCount').then(res => {
        if (res.code === 0) {
          console.log("========穴数=========")
          console.log(res.obj)
          this.hillCountList = res.obj;
        }
      })



      this.getModeMaterialListFun('SeetMa').then(res => {
        if (res.code === 0) {
          console.log("========硅膜材料=========")
          console.log(res.obj)
          this.moldMaterialList = res.obj;
        }
      })

      // this.getModeMaterialListFun('pourMa').then(res => {
      //   if (res.code === 0) {
      //     console.log("========灌注材料=========")
      //       console.log(res.obj)
      //       this.moldMaterialList=res.obj;
      //   }
      // })
      this.getModeMaterialListFun('CaviMa').then(res => {
        if (res.code === 0) {
          console.log("========膜仁材料=========")
          console.log(res.obj)
          this.CaviMaList = res.obj;
        }
      })
      this.getModeMaterialListFun('MoldMa').then(res => {
        if (res.code === 0) {
          console.log("========膜胚材料=========")
          console.log(res.obj)
          this.MoldMaList = res.obj;
        }
      })


      this.getSurfaceListFun(row.partMaterialCode).then(res => {
        if (res.code === 0) {
          console.log("========表面处理=========")
          console.log(res.obj)
          this.surFaceList = res.obj;
        }
      })





      // }else{
      //   this.$message({
      //     type: 'warning',
      //     message: '请先保存!'
      //   });
      // }

    },
    //取消----二级表
    canceltableTwo(index, row) {
      row.checkedColumn = false;
      this.EditCheck = true;
    },
    //保存----二级表
    savetableTwo(index, row) {
      console.log(row)
      row.techId = this.technologyId;
      row.partMaterialCode = this.materialCode;
      this.$request.post('/salqtdetails/updateSalQtDetails', row).then(res => {
        console.log("保存二级表数据")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.getTwoTableData(row.mainId);
          this.EditCheck = true;
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //合计
    getSummaries() {
      this.countData.push({
        counts: "合计",
        weight: "重量:100g",
        totalQty: "总数量:20",
        zhePrice: "折后总价格:3600",
        yuanPrice: "原币总价格：2000"
      })
    },


    //勾选明细
    selsChange(sels) {
      // this.sels = sels;
      this.sels = [];
      console.log("勾选明细")
      if (sels.length > 0) {
        for (var i = 0; i < sels.length; i++) {
          this.sels.push(sels[i].id);
        }
      } else {
        this.sels = [];
      }
    },

    //根据客户编号获取公司联系人信息
    getCompanyCustomer(contactCode, customerCode) {
      this.$request.post('/salctcontact/listCompanyContact', {
        contactCode: contactCode,
        customerCode: customerCode
      }).then(res => {
        console.log("公司联系人信息")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.initDialogForm.contactCode = res.obj[0].contactCode;
          this.initDialogForm.contactCname = res.obj[0].contactCname;
          this.initDialogForm.contactPhone = res.obj[0].contactPhone;
          this.initDialogForm.mailAddress = res.obj[0].mailAddress;
          this.initDialogForm.customerCode = res.obj[0].customerCode;
          this.initDialogForm.customerFullname = res.obj[0].customerFullname;
          this.initDialogForm.address = res.obj[0].address;
          this.initDialogForm.paymentCode = res.obj[0].paymentCode;
          console.log(this.initDialogForm)
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //根据id获取quotation信息
    getListQuotation(ids) {
      this.$request.post('/salqtmain/listSalQtMainById', {
        ids: ids
      }).then(res => {
        console.log("根据id获取quotation信息")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          if (res.obj[0].boolMaterialProof == '0') {
            this.boolMaterial = false;
          } else {
            this.boolMaterial = true;
          }
          if (res.obj[0].boolSample == '0') {
            this.boolSample = false;
          } else {
            this.boolSample = true;
          }
          if (res.obj[0].boolDoll == '0') {
            this.boolDoll = false;
          } else {
            this.boolDoll = true;
          }
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //报价单号事件
    getQuotationNo(ids) {
      console.log("报价单号事件：" + ids)
      this.quotationId = ids;
      this.getListQuotation(ids);
      console.log(this.boolMaterial)
      console.log(this.boolSample)
      console.log(this.boolDoll)
      setTimeout(() => {
        this.dialogTitle = '报价单信息'
        this.dialogQuo = true
      }, 300)
    },
    //客户编号
    getcontactCode(ids, customerCode, contactCode) {

      console.log(ids)
      console.log(customerCode)
      console.log(contactCode)
      this.getCompanyCustomer(contactCode, customerCode);
      setTimeout(() => {
        console.log('客户单信息')
        console.log(this.initDialogForm)
        this.dialogTitle = '客户信息'
        this.dialog = true
      }, 300)

    },
    //报价单号弹窗----保存
    submitDialogData() {
      console.log("报价单号弹窗----保存")
      this.$request.post('/salqtmain/listChangeQuotationBool', {
        quotationId: this.quotationId,
        boolMaterial: this.boolMaterial,
        boolSample: this.boolSample,
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
      }).catch(e => {
        console.log("错误")
      })
    },
    //时间格式转换
    formatTime(row, column) {
      var times = row.createdTime;
      var d = new Date(times);
      var dates = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      console.log("时间格式转换")
      console.log(dates)
      return dates;
    },
    //中文PDF
    handleChinese(index, row) {

      this.$request.post('/salqtmainpdf/quotationExportPDFChinese', {
        ids: row.id
      }).then(res => {
        console.log("中文PDF")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          window.open(res.obj);
        }
      }).catch(e => {
        console.log("错误")
      })

    },
    //英文PDF
    handleEnglish(index, row) {
      this.$request.post('/salqtmainpdf/quotationExportPDFEnlish', {
        ids: row.id
      }).then(res => {
        console.log("英文PDF")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          window.open(res.obj);
        }
      }).catch(e => {
        console.log("错误")
      })
    },

    //中文Excel
    handleChineseExcel(index, row) {

      this.$request.post('/salqtmainpdf/quotationExportExcelChinese', {
        ids: row.id
      }).then(res => {
        console.log("中文PDF")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          window.open(res.obj);
        }
      }).catch(e => {
        console.log("错误")
      })

    },
    //英文Excel
    handleEnglishExcel(index, row) {
      this.$request.post('/salqtmainpdf/quotationExportExcelEnlish', {
        ids: row.id
      }).then(res => {
        console.log("英文PDF")
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          window.open(res.obj);
        }
      }).catch(e => {
        console.log("错误")
      })
    },



    //生成报价单各种格式下载
    getQuotationDown(items, row) {
      console.log(items)
      console.log(row)
      console.log(this.quotationDefaultType)
      if (this.quotationDefaultType == '中文PDF') {
        this.handleChinese(1, row);
      } else if (this.quotationDefaultType == '英文PDF') {
        this.handleEnglish(1, row);
      } else if (this.quotationDefaultType == '中文Excel') {
        this.handleChineseExcel(1, row);
      } else if (this.quotationDefaultType == '英文Excel') {
        this.handleEnglishExcel(1, row);
      }

    },







    //附件上传上传
    fileUpload(e) {
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let param = new FormData(); //创建form对象
        param.append('myfile', files[i]);//通过append向form对象添加数据
        param.append('qtDetailsId', this.qtDetailsId);
        param.append('quotationNo', this.quotationNo);
        this.$request.post('/salqtdetails/uploadQuotation', param).then(res => {
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          if (res.code == 0) {
            this.getAttachmentsList(this.qtDetailsId);
          }
        }).catch(e => {
          console.log("错误")
        })
      }
      this.$message({
        type: 'success',
        message: '上传成功!'
      });

    },
    //删除附件
    delAttachment(e, items) {
      console.log(e.target.id)
      this.$request.post('/salqtdetailsattachment/deleteDetailsAttById', { ids: items.id }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.getAttachmentsList(this.qtDetailsId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })
    },
    //删除所有附件
    deleteAttAll() {
      var attrList = [];
      for (let k in this.attachmentList) {
        attrList.push(this.attachmentList[k].id);
      }
      console.log(attrList)
      // console.log(attrList.join(','))

      this.$request.post('/salqtdetailsattachment/deleteDetailsAttById', { ids: attrList.join(',') }).then(res => {
        console.log(res)    //请求成功方法，data为请求成功返回的数据
        if (res.code == 0) {
          this.getAttachmentsList(this.qtDetailsId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(e => {
        console.log("错误")
      })

    },

    //下载所有附件
    downLoadAttAll() {
      window.location.href = this.$request.defaults.baseURL + '/salqtdetailsattachment/downloadossDeta?deId=' + this.qtDetailsId + '&token=' + Cookies.get('TOKEN');
    },

    // 判断文件名字
    getNameFun(name) {
      let arr = name.split('.')
      let num = 7
      if (arr[arr.length - 1] === 'png' || arr[arr.length - 1] === 'PNG' || arr[arr.length - 1] === 'jpg' || arr[arr.length - 1] === 'JPG' || arr[arr.length - 1] === 'jpeg' || arr[arr.length - 1] === 'JPEG') {
        num = 6
      } else if (arr[arr.length - 1] === 'pdf' || arr[arr.length - 1] === 'PDF') {
        num = 2
      } else if (arr[arr.length - 1] === 'cad' || arr[arr.length - 1] === 'CAD') {
        num = 1
      } else if (arr[arr.length - 1] === 'ppt' || arr[arr.length - 1] === 'PPT') {
        num = 3
      } else if (arr[arr.length - 1] === 'excel' || arr[arr.length - 1] === 'EXCEL' || arr[arr.length - 1] === 'xlsx' || arr[arr.length - 1] === 'XLSX') {
        num = 4
      } else if (arr[arr.length - 1] === 'word' || arr[arr.length - 1] === 'WORD' || arr[arr.length - 1] === 'docx' || arr[arr.length - 1] === 'DOCX' || arr[arr.length - 1] === 'doc' || arr[arr.length - 1] === 'DOC') {
        num = 5
      } else {
        num = 7
      }
      return num
    },

    //cnc金属线切割change
    getcncmWire(item) {
      // checkedEdm:true
      // checkedWireCutting:false
      console.log(item)
      if (item.checkedWireCutting) {
        item.wireCutting = '1'
      } else {
        item.wireCutting = '0'
      }

    },
    //cnc金属打火花change
    getcncmEdm(item) {
      console.log(item)
      if (item.checkedEdm) {
        item.edm = '1'
      } else {
        item.edm = '0'
      }
    },

    /**获取参数列有
     * WorkType (10：为快速模具，2：CNC金属； 1：CNC塑料；3：3D打印；4：复模)
     * ParamType(lineCount:行位个数; hillCount:穴数;dieLife:模具寿命;hotCount:热嘴个数;prototype:原型要求;模坯类型:mouldBaseType:模坯类型
     * 加工面数:faceCount;拆件:splitCount;产品结构:prodMix;公差:tolerance;产品颜色:productColour;进胶类型：gateType;斜顶个数:pentroofCount)
     */
    getParamQuo(WorkType, ParamType) {
      return this.$request.post('/qt/paramcontent/getParamList', { workType: WorkType, paramType: ParamType })
    },
    /**获取难度系数
     * 难度系数
     */
    getComplexityFun() {
      return this.$request.post('/qt/facomplexity/getComplexityList')
    },
    /**获取 复模材料接口
     * 灌注材料:pourMa 模仁材料:CaviMa  硅胶材料:SeetMa 模胚材料: MoldMa
     */
    getModeMaterialListFun(type) {
      return this.$request.post('/qt/materials/getMaterialsType', { materialType: type })
    },
    /**获取表面处理
     * (根据材料ID来) materialsCode=材料Code或者为上一级苗冕处理Code
     */
    getSurfaceListFun(materialsCode) {
      return this.$request.post('/qt/materialsfinish/getMaFinish', { materialCode: materialsCode })
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
        } else if (column.property === 'supTaxTotalcost') {
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
        } else if (column.property === 'supTaxTotalcost') {
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
        } else if (column.property === 'supTaxTotalcost') {
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
        } else if (column.property === 'supTaxTotalcost') {
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
          // sums[index] = values.reduce((prev, curr) => {
          //   const value = Number(curr);
          //   if (!isNaN(value)) {
          //     return prev + curr;
          //   } else {
          //     return prev;
          //   }
          // }, 0);

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
        } else if (column.property === 'cusFmouldMoldcost') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else if (column.property === 'cusFmouldMoldTotalcost') {
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
      console.log("====================快速模具==========================")
      console.log(sums)
      return sums;
    },



  watch: {
    tableDataOne: {
      deep: true,
      immediate: true,
      handler(newval, oldval) {
        console.log('此刻的tableDataOne:', this.tableDataOne.rows);
        console.log('此刻的tableDataTwoCncm:', this.tableDataTwoCncm);
        //  $.each(newOneData, function (i, item) {
        //     console.log(item)
        //   });
        for (let k in this.tableDataOne.rows) {
          if (this.tableDataOne.rows[k].id == this.mainQuoId) {
            this.tableDataOne.rows[k].customerCode = this.tableDataOne.rows[k].contactCode.split("-")[0];
            this.$request.post('/sysexchangerate/listRateByCustomerCode', { customerCode: this.tableDataOne.rows[k].customerCode }).then(res => {
              console.log(res)    //请求成功方法，data为请求成功返回的数据
              if (res.code == 0) {
                if (res.obj.length > 0) {
                  this.tableDataOne.rows[k].currencyName = res.obj[0].currency;
                  this.tableDataOne.rows[k].currencyRate = res.obj[0].rate;
                  var orgi = (this.tableDataOne.rows[k].totalCost / res.obj[0].rate).toFixed(2)
                  this.tableDataOne.rows[k].originalCurrency = orgi;
                }
              }
            }).catch(e => {
              // console.log("错误")
            })
          }
        }
      }
    }
  }
  },
}