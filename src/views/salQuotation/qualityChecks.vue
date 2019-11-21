<template>
  <div id="qualityCheck">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition">搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item label prop="quotationNo">
            <el-select v-model="ruleForm.poNo" filterable placeholder="外发单号" size="small" :filter-method="setPoNo">
              <el-option
                      v-for="items in tableDataOne.rows"
                      :key="items.id"
                      :label="items.quotationNo"
                      :value="items.quotationNo"
              ></el-option>
            </el-select>
            <img
                    class="searchIcoClass"
                    src="../../assets/image/search.png"
                    title="搜索"
                    @click="searchTypeQuotation('quotationNo')"
            />
          </el-form-item>
          <el-form-item label prop="customerNo">
            <el-select v-model="ruleForm.orderNo" filterable placeholder="订单编号" size="small" :filter-method="setOrderNo">
              <el-option
                      v-for="items in tableDataOne.rows"
                      :key="items.id"
                      :label="items.orderNo"
                      :value="items.orderNo"
              ></el-option>
            </el-select>
            <img
                    class="searchIcoClass"
                    src="../../assets/image/search.png"
                    title="搜索"
                    @click="searchTypeQuotation('contactCode')"
            />
          </el-form-item>
          <div style="display: inline-block;">
            <el-form-item label prop="chooses" style="margin: 0;">
              <el-select v-model="ruleForm.chooses" filterable placeholder="日期" size="small" >
                <el-option label="订单交期" value="0"></el-option>
                <el-option label="生产交期" value="1"></el-option>
                <el-option label="出货完成日期" value="2"></el-option>
                <el-option label="预计收款日期" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="start" style="margin: 0;">
              <el-date-picker
                      v-model="ruleForm.start"
                      type="date"
                      :picker-options="startDatePicker"
                      ref="searchStart"
                      placeholder="起始日期"
                      size="small"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin: 0 5px;">-</el-form-item>
            <el-form-item prop="end" style="margin: 0;">
              <el-date-picker
                      v-model="ruleForm.end"
                      type="date"
                      :picker-options="endDatePicker"
                      ref="searchEnd"
                      placeholder="结束日期"
                      size="small"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item label prop="statusSearch">
            <el-select v-model="ruleForm.rating"  placeholder="状态" >
              <el-option label="生产中" value="生产中"></el-option>
              <el-option label="生产完" value="生产完"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span style="margin-right: 20px;" v-for="item in searchList" :key="item.id">
              <el-button
                      v-if="item.operationCode==='search'"
                      :id="item.operationCode"
                      :title="item.operationName"
                      type="primary"
                      size="small"
                      icon
                      @click="barSearchOperation"
              >{{item.operationName}}</el-button>
              <el-button
                      v-if="item.operationCode==='empty'"
                      :id="item.operationCode"
                      :title="item.operationName"
                      type="primary"
                      size="small"
                      icon
                      @click="barEmptyOperation"
              >{{item.operationName}}</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <el-table
              ref="tableCus"
              stripe
              size="mini"
              height="650px"
              :row-style="{height:'50px'}"
              :cell-style="{padding:'0px'}"
              :max-height="clientHeight"
              @cell-click="clickTable"
              :data="tableDataOne"
              @expand-change="expandSelect"
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              style="width: 100%">
        <el-table-column type="expand">
          <template  scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-table
                      class="tableStyleQuotation"
                      :summary-method="getTotal3D"
                      border
                      v-loading="loading"
                      :data="tableDataTwo"
                      @selection-change="selsChange"
                      style="width: 100%">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-table
                                class="tableStyleQuotation"
                                :summary-method="getTotal3D"
                                border
                                v-loading="loading"
                                :data="tableDataThree"
                                @selection-change="selsChange"
                                style="width: 100%">
                          <el-table-column label="操作" width="120" align="center">
                            <template scope="scope">
                              <span v-for="(oper3,index) in threeOperation" :key="oper3.id">
                                  <button
                                          v-if="oper3.operationCode==='qcreport'"
                                          @click.stop="seeReport"
                                          title="查看品检报告"
                                          :id="oper3.operationCode"
                                          size="mini"
                                          class="el-button el-button--mini">查看品检报告</button>
                                  <button
                                          v-if="oper3.operationCode==='deleteReport'"
                                          @click.stop="savetableTwo(scope.$index, scope.row)"
                                          :title="oper3.operationCode"
                                          :id="oper3.operationCode"
                                          size="mini"
                                          class="el-button el-button--mini">{{oper3.operationName}}</button>
                              </span>
                            </template>
                          </el-table-column>
                          <el-table-column label="其它" width align="center"></el-table-column>
                        </el-table>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                      <template scope="scope">
                          <span v-for="(oper2,index) in twoOperation" :key="oper2.id">
                            <button
                                    v-if="oper2.operationCode==='qcpass'"
                                    @click.stop="editRowTwo(scope.$index, scope.row)"
                                    :title="oper2.operationName"
                                    :id="oper2.operationCode"
                                    size="mini"
                                    class="el-button el-button--mini"
                            >{{oper2.operationName}}</button>
                            <button
                                    v-if="oper2.operationCode==='qcUnqualified'"
                                    @click.stop="deleteRowTwo(scope.$index, scope.row)"
                                    :title="oper2.operationName"
                                    :id="oper2.operationCode"
                                    size="mini"
                                    class="el-button el-button--mini"
                            >{{oper2.operationName}}</button>
                          </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="其它" width align="center"></el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template scope="scope" >
            <span v-for="(oper1,index) in oneOperation" :key="oper1.id">
              <span>
                  <el-button class="operSpan" v-if="oper1.operationCode==='qcallpass'" title="一键合格" :id="oper1.operationCode" size="mini" @click="grabTable(scope.$index, scope.row)">一键合格</el-button>
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="其它" width align="center">
          <template scope="scope">
            <div style="margin-bottom: 5px;" v-for="(oper3,index) in oneOperation" :key="oper3.id">
              <el-button
                      class="operSpanOther"
                      v-if="oper3.operationCode==='viewquotation'"
                      :id="oper3.operationCode"
                      size="small"
                      @click="viewquotation(scope.$index, scope.row)"
              >{{oper3.operationName}}</el-button>
              <el-button
                      class="operSpanOther"
                      v-if="oper3.operationCode==='downloadAttachments'"
                      :id="oper3.operationCode"
                      size="small"
                      @click="downloadAttachments(scope.$index, scope.row)"
              >{{oper3.operationName}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[15, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
      ></el-pagination>
    </div>

    <!--客户编号-->
    <el-dialog :title="dialogTitle" :visible.sync="dialog" width="700px" class="customerDialog">
      <el-form :model="initDialogForm" :inline="true" size="mini">
        <el-form-item label="公司名称">
          <el-input
                  style="width:175px;"
                  v-model="initDialogForm.customerFullname"
                  disabled="disabled"
                  autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input style="width:175px;" v-model="initDialogForm.contactPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司编号">
          <el-input
                  style="width:175px;"
                  v-model="initDialogForm.customerCode"
                  disabled="disabled"
                  autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input style="width:175px;" v-model="initDialogForm.mailAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="initDialogForm.contactCname" disabled="disabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-input style="width:175px;" v-model="initDialogForm.paymentCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人编号">
          <el-input
                  style="width:175px;"
                  v-model="initDialogForm.contactCode"
                  disabled="disabled"
                  autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input style="width:175px;" v-model="initDialogForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="display: none;" class="dialog-footer">
        <el-button type="primary" @click="submitDialogData" size="small">确 定</el-button>
        <el-button @click="dialog = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--报价单号-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogQuo" width="400px" class="customerDialog">
      <el-form :inline="true" size="mini">
        <el-form-item label="公    仔：">
          <el-switch style="width:140px;" v-model="boolDoll" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="材料证明：">
          <el-switch
                  style="width:140px;"
                  v-model="boolMaterial"
                  active-text="需要"
                  inactive-text="不需要"
          ></el-switch>
        </el-form-item>
        <el-form-item label="样品申请：">
          <el-switch style="width:140px;" v-model="boolSample" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
          <el-button type="primary" @click="submitDialogData" size="small">{{item.operationName}}</el-button>
        </span>
        <el-button @click="dialogQuo = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--查看报价单-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogView" width="800px" class="customerDialog">
      <el-form :inline="true" size="mini">
        <el-table :data="viewQuotationList" border v-loading="loadingView">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="quotationNo" label="报价单号" width="120" align="center"></el-table-column>
          <el-table-column prop="customerFullname" label="客户名称" width="180" align="center"></el-table-column>
          <el-table-column
                  prop="createdTime"
                  label="生成时间"
                  width="180"
                  align="center"
                  :formatter="formatTime"
          ></el-table-column>
          <el-table-column label="打印类型" align="center">
            <template scope="scope">
              <el-button
                      style="display:none;"
                      size="small"
                      type="primary"
                      @click="handleChinese(scope.$index, scope.row)"
              >中文</el-button>
              <el-button
                      style="display:none;"
                      size="small"
                      type="primary"
                      @click="handleEnglish(scope.$index, scope.row)"
              >英文</el-button>
              <el-select v-model="quotationDefaultType" filterable placeholder="请选择" size="small">
                <el-option
                        v-for="(items,index) in quotationTypeList"
                        :key="index"
                        @click.native="getQuotationDown(items,scope.row)"
                        :label="items.label"
                        :value="items.label"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>

    <!--上传附件-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAtt" width="800px" class="customerDialog">
      <div class="mode_file_content">
        <span
                v-for="item in attachmentList"
                class="mode_file_content_li"
                :key="item.id"
                :title="item.attachmentOriginalname"
        >
          <!-- <span :id="item.id" class="attachmentClose" title="删除" @click="delAttachment($event)">×</span> -->
          <img
                  @click="delAttachment($event,item)"
                  class="mode_file_content_delete"
                  src="../../assets/image/delete.png"
                  alt
          />
          <img v-if="getNameFun(item.attachmentPath) === 1" src="../../assets/image/cad.png" alt />
          <img v-if="getNameFun(item.attachmentPath) === 2" src="../../assets/image/pdf.png" alt />
          <img v-if="getNameFun(item.attachmentPath) === 3" src="../../assets/image/ppt.png" alt />
          <img v-if="getNameFun(item.attachmentPath) === 4" src="../../assets/image/excel.png" alt />
          <img v-if="getNameFun(item.attachmentPath) === 5" src="../../assets/image/word.png" alt />
          <img
                  v-if="getNameFun(item.attachmentPath) === 6"
                  src="../../assets/image/imgName.png"
                  alt
          />
          <img
                  v-if="getNameFun(item.attachmentPath) === 7"
                  src="../../assets/image/compress.png"
                  alt
          />
          <div class="attachmentName">{{item.attachmentOriginalname}}</div>
        </span>
      </div>

      <div slot="footer">
        <div class="footer_btn_box">
          <div class="delete_btn" @click="deleteAttAll()">一键删除</div>
          <div class="download_btn" @click="downLoadAttAll()">一键下载</div>
          <div class="upload_btn" @click="$refs.inputFile.click()">上传附件</div>
        </div>
      </div>

      <input
              style="display:none;"
              class="file"
              ref="inputFile"
              name="fileAtt"
              type="file"
              multiple="multiple"
              @change="fileUpload"
      />
    </el-dialog>

    <!--转订单-->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogRevisionOrder"
            width="600px"
            class="customerDialog">
      <el-form :model="initDialogForm" :inline="true" size="mini">
        <el-form-item style="float: left;">
          <div>是否确定将该报价单{{quotationNoOrder}}转为成交订单？总金额为￥{{quotationOrderCost}}</div>
        </el-form-item>
        <el-form-item style="float: left;" v-show="projectPmUser">
          <span>项目跟单：</span>
          <el-select v-model="projectPmUserCode" placeholder="请选择" size="small">
            <el-option
                    v-for="items in listProjectPmUser"
                    :key="items.id"
                    :label="items.employeeCname"
                    :value="items.employeeCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialogDataOrder" size="small">确 定</el-button>
        <el-button @click="dialogRevisionOrder = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--转未成交-->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogNoOrder"
            width="600px"
            class="customerDialog">
      <el-form :inline="true" size="mini">
        <el-form-item label="选择原因：" style="float: left;">
          <!-- <span style="margin-right: 12px;"></span> -->
          <el-select v-model="noDealReason" placeholder="请选择" size="small">
            <el-option
                    v-for="items in listNoDealReason"
                    :key="items.id"
                    :label="items.cname"
                    :value="items.cname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="未成交备注：" style="float: left;">
          <textarea cols="60" rows="4" v-model="noDealDetails"></textarea>
        </el-form-item>
        <el-form-item style="float: left;" label="解决方案：">
          <textarea cols="60" rows="4" v-model="noDealSolution"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialogOrder" size="small">确 定</el-button>
        <el-button @click="dialogNoOrder = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--订单信息-->
    <el-dialog
            title="订单信息"
            width="200px"
            height="200px"
            class="orderInfo">
        <el-form>
          <el-form-item>
            <el-form-item label="公仔：" >
              <el-radio-group v-model="initDialogForm.boolEnabled">
                <el-radio-button label="是"></el-radio-button>
                <el-radio-button label="否"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form-item>
        </el-form>
    </el-dialog>

    <!--送货-->
    <el-dialog
            title="送货"
            :visible.sync="dialogSong"
            width="800px"
            height="600px"
            class="songhDialog">
            <el-table
              style="width: 100%"
              border
              :data="deliverGood">
              <el-table-column
                      prop="wfdh"
                      label="外发单号">
              </el-table-column>
              <el-table-column
                      prop="picture"
                      label="图片">
              </el-table-column>
              <el-table-column
                      prop="productName"
                      label="产品名称">
              </el-table-column>
              <el-table-column
                      prop="shnum"
                      label="送货数量">
              </el-table-column>
              <el-table-column
                      prop="shNum"
                      label="送货数量">
              </el-table-column>
              <el-table-column
                      prop="dj"
                      label="单价">
              </el-table-column>
              <el-table-column
                      prop="dj"
                      label="总价">
              </el-table-column>
            </el-table>
            <el-table
              style="width: 100%"
              border
              :data="deliverGood">
        <el-table-column
                prop="wfdh"
                label="外发单号">
        </el-table-column>
        <el-table-column
                prop="manufacturer"
                label="生产商">
        </el-table-column>
        <el-table-column
                prop="gd"
                label="跟单">
        </el-table-column>
        <el-table-column
                prop="bcdate"
                label="本次送货日期">
        </el-table-column>
        <el-table-column
                prop="shNum"
                label="送货数量">
        </el-table-column>
        <el-table-column
                prop="shAmount"
                label="送货金额">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--查看报告-->
    <el-dialog
      title="报告"
      width="1300px"
      class="seeReport"
      :visible.sync="dialogReport">
      <div class="formDiv">
        <el-form  label-position="left" inline="">
          <el-row :gutter="20" class="row0">
            <el-col :span="2">
              <img src="../../assets/image/hlh.png">
            </el-col>
            <el-col :span="18">
              <span class="title">Document Type: Sample Inspection Report文件种类:样板/生产检查报告</span>
            </el-col>
            <el-col :span="4">
              <p>Report No. 报告编号:     </p>
              <el-input value="QC-201903-16-003" size="mini" :disabled="true"/>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="row1_column1">
              <el-form-item label="Client客户：" label-width="200px">
                <el-input value="xxx" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row1_column2">
              <el-form-item label="Quote No.报价单号：" label-width="200px">
                <el-input value="M1924-253-82533" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row1_column3">
              <el-form-item label="Drawing Rev.图纸编号：" label-width="200px">
                <el-input value="sjkfdhasflas-aRod.IGS" disabled></el-input>
              </el-form-item>
            </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="8"  class="row2_column1">
              <el-form-item label="Project Name工程名称：" label-width="200px">
                <el-input value="xxx" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row2_column2">
              <el-form-item label="Project Number工程编号：" label-width="200px">
                <el-input value="M1924-253-82533" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row2_column3">
              <el-form-item label="Tool Job No.模具工作编号：" label-width="200px">
                <el-input value="sjkfdhasflas-aRod.IGS"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"  class="row3_column1">
              <el-form-item label="Material原料名称：" label-width="200px">
                <el-input value="xxx" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row3_column2">
              <el-form-item label="Finsh后处理：" label-width="200px">
                <el-input value="xxx" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row3_column3">
              <el-form-item label="Pilot Date试模日期：" label-width="200px">
                <el-date-picker
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"  class="row4_column1">
              <el-form-item label="No.of Cavity模数：" label-width="200px">
                <el-input value="xxx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row4_column2">
              <el-form-item label="Inspected Qty.检查数量：" label-width="200px">
                <el-input value="xxx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="row4_column3">
              <el-form-item label="Released Date发 出 日 期：" label-width="200px">
                <el-date-picker
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="row5">
              <el-col :span="1">
                <span>a</span>
              </el-col>
              <el-col :span="5">
                <span>Meterial conformance</span>
                <el-radio v-model="radio" label="1">YES</el-radio>
                <el-radio v-model="radio" label="2">NO</el-radio>
              </el-col>
              <el-col :span="1">
                <span>b</span>
              </el-col>
              <el-col :span="5">
                <span>Finish conformance</span>
                <el-radio v-model="radio" label="1">YES</el-radio>
                <el-radio v-model="radio" label="2">NO</el-radio>
              </el-col>
              <el-col :span="1">
                <span>c</span>
              </el-col>
              <el-col :span="5">
                <span>surface treatment</span>
                <el-radio v-model="radio" label="1">YES</el-radio>
                <el-radio v-model="radio" label="2">NO</el-radio>
              </el-col>
              <el-col :span="1">
                <span>d</span>
              </el-col>
              <el-col :span="5">
                <span>color within spec</span>
                <el-radio v-model="radio" label="1">YES</el-radio>
                <el-radio v-model="radio" label="2">NO</el-radio>
              </el-col>
            </el-row>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  prop="date"
                  label="Location on drawing图纸位置">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="Drawing Dimension 图纸尺寸">
          </el-table-column>
          <el-table-column label="Tolerance 公差">
            <el-table-column
                    prop="name"
                    label="Min">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Max">
            </el-table-column>
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="Lower limit 下限">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="Upper limit  上限">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="检具Measure tool">
          </el-table-column>
          <el-table-column label="Measurements 测量值">
            <el-table-column
                    prop="name"
                    label="SAMPLE 1">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="SAMPLE 2">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="SAMPLE 3">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="SAMPLE 4">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="SAMPLE 5">
            </el-table-column>
          </el-table-column>
          <el-table-column label="Discrepancy 相差值">
            <el-table-column
                  prop="name"
                  class="difference"
                  label="SAMPLE 1">
              <template slot-scope="scope">
                <slot :row="scope.row" :$index="scope.$index" >
                  <input class="symbol">
                  <input class="val">
                </slot>
              </template>
          </el-table-column>
            <el-table-column
                    prop="name"
                    class="difference"
                    label="SAMPLE 2">
              <template slot-scope="scope">
                <slot :row="scope.row" :$index="scope.$index" >
                  <input class="symbol">
                  <input class="val">
                </slot>
              </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    class="difference"
                    label="SAMPLE 3">
              <template slot-scope="scope">
                <slot :row="scope.row" :$index="scope.$index" >
                  <input class="symbol">
                  <input class="val">
                </slot>
              </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    class="difference"
                    label="SAMPLE 4">
              <template slot-scope="scope">
                <slot :row="scope.row" :$index="scope.$index" >
                  <input class="symbol">
                  <input class="val">
                </slot>
              </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    class="difference"
                    label="SAMPLE 5">
              <template slot-scope="scope">
                <slot :row="scope.row" :$index="scope.$index" >
                  <input class="symbol">
                  <input class="val">
                </slot>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <div class="foot">
          测量工具Measure tool： A=卡尺caliper  B=针规pulg gauges  C=百分表dialgauge  D=角度尺Angle ruler  E=螺纹塞规 GO - NO GO FIXED GAUGES  F=千分尺microcalliper  G=3坐标CMM   H=二次元影像测量仪 Projectors    I=高度尺Height ruler
        </div>
        <div class="imgContainer">
          图纸Drawning/相片Photo
        </div>
        <div class="imgUpload">
          <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <el-form inline="" class="form2">
          <el-row :gutter="20">
            <el-col :span="8" >
              <el-form-item label="Inspected by 检查人:" label-width="160px">
                <el-input value="xxx" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Checked by 审核人:"  label-width="160px">
                <el-input value="xxx" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Approved by 核准人:"  label-width="160px">
                <el-input value="xxx"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Date 日期:"  label-width="160px">
                <el-input value="xxx" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Date 日期:"  label-width="160px">
                <el-input value="xxx" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Approved by 核准人:"  label-width="160px">
                <el-input value="xxx" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="add_clinet_box">
          <div class="add_clinet_box_suer" @click="saveCompany('newCompanyInfo') ">保存</div>
          <div class="add_clinet_box_cancel" @click="cancela('newCompanyInfo')">导出PDF</div>
          <div class="add_clinet_box_cancel" @click="cancela('newCompanyInfo')">导出EXCEL</div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export { default } from "./qualityCheck";
</script>

<style lang="less">
  @import './qualityCheck.less';
  @import "./css/style.less";
</style>

