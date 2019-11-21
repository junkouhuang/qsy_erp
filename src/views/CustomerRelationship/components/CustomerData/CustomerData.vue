<template>
  <div class="crm">
    <!-- 查询条件 -->
    <div class="CrmRightHead">
      <div class="el-inputs">
        <div class="sou">
          <span>查询条件:</span>
        </div>
        <div class="container">
          <el-select v-model="filterConditions.companyNo" filterable size="mini" class="country"  clearable placeholder="公司编号" @clear="clearCompanyNo" @change="filterCompanyNo"  :filter-method="getCompanyNo">
            <el-option
                    v-for="(item,index) in filteredCustomerData"
                    :key="index"
                    allow-create
                    :label="item.customerCode"
                    :value="item.customerCode"
            ></el-option>
          </el-select>
          <img
                  src="../../../../assets/image/search.png"
                  title="搜索"
                  @click="vagueSearchFun"
          />
        </div>
        <div class="container">
          <el-select v-model="filterConditions.companyName" filterable size="mini" class="country" clearable placeholder="公司名称" @clear="clearCompanyName" @change="filterCompanyName" :filter-method="getCompanyName">
          <el-option
                  v-for="(item,index) in filteredCustomerData"
                  :key="index"
                  allow-create
                  :label="item.customerFullname"
                  :value="item.customerFullname"
          ></el-option>
        </el-select>
        <img
                src="../../../../assets/image/search.png"
                title="搜索"
                @click="vagueSearchFun"
        />
        </div>
        <div class="container">
          <el-select v-model="filterConditions.website" filterable size="mini" class="country" clearable placeholder="公司网址" @clear="clearWebsite" @change="filterWebsite" :filter-method="getWebsite">
            <el-option
                    v-for="(item,index) in filteredCustomerData"
                    :key="index"
                    allow-create
                    :label="item.website1"
                    :value="item.website1"
            ></el-option>
          </el-select>
          <img
                  src="../../../../assets/image/search.png"
                  title="搜索"
                  @click="vagueSearchFun"
          />
        </div>
        <div class="container">
          <el-select v-model="filterConditions.countryName" filterable @change="getCountryCode" size="mini" class="country" clearable placeholder="国家" @clear="clearCountry">
            <el-option
                    v-for="(item,index) in countryList"
                    :key="index"
                    allow-create
                    :label="item.countryName"
                    :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="container">
          <el-select v-model="filterConditions.companyEmail" filterable size="mini" class="country"  clearable placeholder="邮箱" @clear="clearCompanyNo" @change="filterCompanyNo"  :filter-method="getCompanyEmail">
            <!--<el-option ></el-option>-->
          </el-select>
          <img
                  src="../../../../assets/image/search.png"
                  title="搜索"
                  @click="vagueSearchFun"
          />
        </div>
        <div class="hed_limits_btn">
          <span v-for="item in searchList" :key="item.id" >
            <el-button class="buttons_head" @click="preciseSearch" v-show="item.operationCode==='search'" style="float: left;">搜索</el-button>
            <el-button class="buttons_head" @click="clearInputData" v-show="item.operationCode==='empty'">清空</el-button>
            <el-button class="buttons_head  grayBtn_head" @click="checkConflict" v-show="item.operationCode==='thesamecheck'">客户冲突检测</el-button>
          </span>
        </div>
      </div>
    </div>
    <!-- 主表格 -->
    <el-table
            :data="filteredCustomerData"
            style="width: 100%"
            height="500px"
            border
            ref="refTable"
            @expand-change="listByCompany"
            v-loading="loading"
            element-loading-text="拼命加载中"
            @select="isCheck"
            :header-cell-style="{background:'#EEEEEE',color:'#333333'}"
            :stripe=" true ">
      <!-- 内嵌表格 业务人员数据 -->
      <el-table-column type="expand" align="center">
        <template slot-scope="tableRow">
          <el-table
                  :data="concatData"
                  header-row-class-name="business_person_th"
                  v-loading="loading"
                  border
                  element-loading-text="拼命加载中"
                  :header-cell-style="{background:'#FFFAF6',color:'#333333'}"
                  tooltip-effect="dark">
            <el-table-column
                    label="操作"
                    width="243"
                    type="index"
                    align="center">
              <template scope="scope">
                <div class="row-flex-start">
                  <span v-for="item in twoOperation" :key="item.id">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" v-if="item.operationCode==='editRow'" style="float: left;">
                      <img src="../../../../assets/image/img04.png" @click="updateContact(scope.$index)" class="iconmin">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="发邮件" placement="bottom" v-if="item.operationCode==='writemail'">
                      <img src="../../../../assets/image/img03.png" @click="send_email()" class="iconmin">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="发短信" placement="bottom" v-if="item.operationCode==='writemessages'">
                      <img src="../../../../assets/image/img01.png" @click="send_note()" class="iconmin">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="添加互动记录" placement="bottom" v-if="item.operationCode==='addcommunication'">
                      <img src="../../../../assets/image/img05.png" @click="add_record(tableRow.$index,scope.$index)" class="iconmin">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="新增报价单" placement="bottom" v-if="item.operationCode==='addquotation'">
                      <img src="../../../../assets/image/img02.png" @click="AdditionalQuotation(tableRow,scope.$index)" class="iconmin">
                    </el-tooltip>
                  </span>
                </div>
              </template>
            </el-table-column>
            <template v-for="(col) in tHeadDataTwo">
              <el-table-column v-if="col.columnCname == '是否启用'"  :label="col.columnCname"  :prop="col.columnName" :key="col.columnName"  align="center">
                <template slot-scope="scope">
                  {{scope.row.boolEnabled ==1?'启用':'不启用'}}
                </template>
              </el-table-column>
              <el-table-column v-else
                               :show-overflow-tooltip="true"
                               :prop="col.columnName"
                               :label="col.columnCname"
                               :key="col.columnName"
                               width="124px"
                               align="center">
              </el-table-column>
              <!--<el-table-column
                      sortable
                      :show-overflow-tooltip="true"
                      :prop="col.dataItem"
                      :label="col.dataName"
                      :key="col.dataItem"
                      width="124px"
                      align="center">
              </el-table-column>-->
            </template>
          </el-table>
          <p class="pop_up_add_p">
            <span v-for="item in toolsList" :key="item.id" >
              <el-button id="btn" class="buttons buttons_foot" @click="pop_up_add(tableRow)" v-if="item.operationCode==='add_contact'">添加联系人</el-button>
            </span>
          </p>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="45px"></el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <!-- 编辑按钮和订单详情按钮 -->
        <template slot-scope="tableRow">
          <span v-for="item in oneOperation" :key="item.id">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" v-if="item.operationCode==='update'">
              <img src="../../../../assets/image/img04.png" @click="startEdit(tableRow.$index,tableRow)" class="iconmin">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="订单详情" placement="bottom" v-if="item.operationCode==='orderdetails'">
              <img src="../../../../assets/image/img07.png" class="iconmin"><!--  @click="startEdit(tableRow.$index)" -->
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
      <template v-for="(col) in tHeadDataOne">
        <el-table-column v-if="col.columnCname == '是否启用'"  :label="col.columnCname"  :prop="col.columnName" :key="col.columnName" align="center">
          <template slot-scope="scope">
            {{scope.row.boolEnabled ==1?'启用':'不启用'}}
          </template>
        </el-table-column>
        <el-table-column v-else
                :show-overflow-tooltip="true"
                :prop="col.columnName"
                :label="col.columnCname"
                :key="col.columnName"
                width="124px"
                align="center">
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部按钮 -->
    <div class="foot_btn">
       <span v-for="item in toolsList" :key="item.id" >
          <el-button class="buttons buttons_foot f1" @click="AddCompanyInfo" v-show="item.operationCode==='add'">新增客户</el-button>
          <el-button class="buttons buttons_foot f2" @click="adjustPeopleList" v-show="item.operationCode==='adjustcustomer'">客户调整</el-button>
          <el-button class="buttons buttons_foot f3" v-show="item.operationCode==='downloadExcelTemplate'">下载导入模板</el-button>
          <el-button class="buttons buttons_foot f4" v-show="item.operationCode==='importexcel'">导入Excel</el-button>
          <el-button class="buttons buttons_foot f5" v-show="item.operationCode==='exportexcel'">导出Excel</el-button>
      </span>
    </div>
    <div class="crm_page">
      <el-pagination
              @current-change="handleCurrentChange1"
              :current-page.sync="treeData.page"
              :page-size="treeData.pageSize"
              background
              layout="prev, pager, next, jumper"
              :total="11">
      </el-pagination>
    </div>
    <!-- 编辑联系人--有启用按钮 -->
    <el-dialog title="编辑"
            :visible.sync="isShownEdit"
            class="customerEditor"
            v-if="concatData[editCustomerIndex]"
            v-loading="loading"
             width="860px"
            element-loading-text="数据提交中"
            :close-on-click-modal= false>
      <el-form :model="concatData[editCustomerIndex]" ref="editorContactRules" :rules="editorContactRules">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="联系人编号:" >
              <el-input v-model="concatData[editCustomerIndex].contactCode" autocomplete="off" :disabled="true" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名字:"  prop="contactCname">
              <el-input v-model="concatData[editCustomerIndex].contactCname" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="座机:" >
              <el-input v-model="concatData[editCustomerIndex].landline" autocomplete="off" @input='e => concatData[editCustomerIndex].landline = validNum (e)' size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码:" >
              <el-input v-model.number="concatData[editCustomerIndex].contactPhone" autocomplete="off" size="mini" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="邮箱:"  prop="mailAddress">
              <el-input v-model="concatData[editCustomerIndex].mailAddress" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位:"   prop="position">
              <el-input v-model="concatData[editCustomerIndex].position" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生日:" >
              <el-date-picker  v-model="concatData[editCustomerIndex].birthdate" type="date"  :clearable = false clear-icon="el-icon-circle-close" size='mini'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="QQ:" >
              <el-input v-model.number="concatData[editCustomerIndex].qq" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="微信:" >
              <el-input v-model="concatData[editCustomerIndex].wechat" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="skype:" >
              <el-input v-model="concatData[editCustomerIndex].skype" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="whatsapp:" >
              <el-input v-model="concatData[editCustomerIndex].whatsapp" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录密码:"   prop="password">
              <el-input v-model="concatData[editCustomerIndex].password" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="备注:" >
              <el-input v-model="concatData[editCustomerIndex].remarks" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-radio v-model="concatData[editCustomerIndex].boolEnabled" :label="0">启用</el-radio>
            <el-radio v-model="concatData[editCustomerIndex].boolEnabled" :label="1">不启用</el-radio>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <div class="add_clinet_box_suer" @click="holdCustomer">保存</div>
        <div class="add_clinet_box_cancel" @click="isShownEdit = false">取消</div>
      </div>
    </el-dialog>
    <!-- 添加联系人--没有启用按钮 -->
    <el-dialog title="添加"
            id="edit"
            :visible.sync="isShownAdd"
            class="concatAdd"
            v-loading="loading"
             width="860px"
            element-loading-text="数据提交中"
            :close-on-click-modal= false>
      <el-form :model="addContactInfo" ref="addContactInfo" :rules="addContactInfoRules">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="联系人编号:">
              <el-input v-model="addContactInfo.contactNumber" autocomplete="off" :disabled="true"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名字:"  prop="contactCname">
              <el-input v-model="addContactInfo.contactCname" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="座机:"   prop="contactPhone">
              <el-input v-model="addContactInfo.contactPhone" @input='e => addContactInfo.contactPhone = validNum (e)' autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码:"  prop="telephone">
              <el-input v-model.number="addContactInfo.telephone" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="6">
            <el-form-item label="邮箱:"   prop="mailAddress">
              <el-input v-model="addContactInfo.mailAddress" autocomplete="off" width="120"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位:"  prop="position">
              <el-input v-model="addContactInfo.position" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生日:"  class="birthdate" prop="birthdate">
              <el-date-picker  v-model="addContactInfo.birthdate" type="date" :clearable=false clear-icon="el-icon-circle-close" size='mini'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="QQ:"  prop="qq">
              <el-input v-model.number="addContactInfo.qq" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6">
            <el-form-item label="微信:"   prop="wechat">
              <el-input v-model="addContactInfo.wechat" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="skype:"    prop="skype">
              <el-input v-model="addContactInfo.skype" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="whatsapp:"   prop="whatsapp">
              <el-input v-model="addContactInfo.whatsapp" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录密码:"  prop="password">
              <el-input v-model="addContactInfo.password" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="备注:"  prop="remarks" class="bz">
              <el-input v-model="addContactInfo.remarks" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <div class="add_clinet_box_suer" @click="saveContact('addContactInfo') ">保存</div>
        <div class="add_clinet_box_cancel" @click="cancalContact('addContactInfo')">取消</div>
      </div>
    </el-dialog>
    <!-- 互动记录弹窗 -->
    <el-dialog title="互动记录"
               :visible.sync="isShownAddRecord"
               class="recordList"
               :close-on-click-modal= false
               width="1100px">
      <el-form :model="interactionrecord" ref="interactionrecord" :rules="editorContactInfoRules">
        <div class="addCorderHead">
          <div class="el-inputs">
            <div class="sou">
              <span>查询条件:</span>
            </div>
            <el-select v-model="interactionrecord.interactionType" filterable placeholder="互动类型" class="inputnumber" clearable @change="getListByCategory">
              <el-option
                      v-for="item in CategoryCodeinteractionList"
                      :key="item.id"
                      :label="item.cname"
                      :value="item.code">
              </el-option>
            </el-select>
            <el-date-picker
                    v-model="interactionrecord.startdate"
                    type="date"
                    class="inputnumber"
                    placeholder="开始日期" >
            </el-date-picker>
            <i class="el-icon-minus"></i>
            <el-date-picker
                    v-model="interactionrecord.enddate"
                    type="date"
                    clearable
                    class="inputnumber"
                    placeholder="结束日期">
            </el-date-picker>
            <el-button class="buttons_head" @click="listByAction">查询</el-button>
            <el-button class="buttons_head  " @click="clearInteractionrecord">清空</el-button>
            <el-button class="buttons_head" type="primary" @click="add_interactionrecord" >新增互动记录</el-button>
          </div>
        </div>

        <!-- 嵌入互动记录表格 -->
        <el-table
                :data="interactionrecord_tableData"
                border
                height="400px"
                style="width: 100%;overflow: auto">
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <img src="../../../../assets/image/img04.png"  @click="EditRecord(scope.$index)" class="iconmin">
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="interactType" label="互动类型" width="80" align="center"></el-table-column>
          <el-table-column prop="createdTime" label="日期" width="120" align="center">
            <template slot-scope="scope">
              {{scope.row.createdTime  | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="theme" label="互动主题" width="120" align="center"></el-table-column>
          <el-table-column prop="contents" label="互动内容" width="120" align="center"></el-table-column>
          <el-table-column prop="reminderContent" label="提醒内容" width="120" align="center"></el-table-column>
          <el-table-column prop="salesUsercode" label="业务员" width="120" align="center"></el-table-column>
          <el-table-column prop="reminderDate" label="提醒时间" width="120" align="center">
            <template slot-scope="scope">
              {{scope.row.reminderDate  | formatDate}}
            </template>
          </el-table-column>
          <el-table-column
                  prop="customerFeedback"
                  label="客户反馈"
                  width="150"
                  align="center"
          ></el-table-column>
        </el-table>
        <el-form-item>
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange2"
                  :current-page="interactionrecord.page"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="interactionrecord.total">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增互动记录弹窗 -->
    <el-dialog title="新增记录"
          :visible.sync="isShownadd_interactionrecord"
          class="recordAdd"
          width="510px"
          v-loading="loading"
          element-loading-text="数据提交中"
          :close-on-click-modal= false>
      <el-form :model="newAddinteractionrecord" ref="addAddinteractionrecord" :rules="newAddinteractionrecordRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="互动类型:"  prop="interactType">
              <el-select v-model="newAddinteractionrecord.interactType" filterable  placeholder="请选择"  size="mini" >
                <el-option
                        v-for="item in CategoryCodeinteractionList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="互动主题:"   prop="theme">
              <el-input v-model="newAddinteractionrecord.theme" autocomplete="off"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="提醒时间:"  prop="reminderDate">
              <el-date-picker
                      class="el-date-picker"
                      v-model="newAddinteractionrecord.reminderDate"
                      type="datetime"
                      :clearable = false
                      size="mini"
                      placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提醒内容:"   prop="reminderContent">
              <el-input v-model="newAddinteractionrecord.reminderContent" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="互动内容:"   prop="contents">
              <el-input type="textarea"  v-model="newAddinteractionrecord.contents" autocomplete="off" style="width: 378px;height: 48px;"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="客户反馈:"  prop="customerFeedback">
              <el-input type="textarea"  v-model="newAddinteractionrecord.customerFeedback" autocomplete="off" style="width: 378px;height: 48px;"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <div class="add_clinet_box_suer" @click="saveaction()">保存</div>
        <div class="add_clinet_box_cancel" @click="addrecord_cannel">取消</div>
      </div>
    </el-dialog>
    <!-- 修改互动记录弹窗 -->
    <el-dialog title="修改记录"
               :visible.sync="isShowneditor_interactionrecord"
               class="addrecord"
               width="560px"
               :close-on-click-modal= false
               v-if="interactionrecord_tableData[editAddRecordIndex]">
          <el-form :model="interactionrecord_tableData[editAddRecordIndex]" ref="newAddinteractionrecord" :rules="newAddinteractionrecordRules">
             <el-row :gutter="20">
                  <el-col :span="12">
                      <el-form-item label="互动类型:"  prop="interactType">
                          <el-select v-model="interactionrecord_tableData[editAddRecordIndex].interactType" placeholder="请选择" size="mini">
                              <el-option
                                      v-for="item in CategoryCodeinteractionList"
                                      :key="item.id"
                                      :label="item.cname"
                                      :value="item.cname"
                              ></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="互动主题:"   prop="theme">
                          <el-input v-model="interactionrecord_tableData[editAddRecordIndex].theme" autocomplete="off" size="mini"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
            <el-row :gutter="20">
                  <el-col :span="12">
                      <el-form-item label="提醒时间:" >
                          <el-date-picker
                                  class="el-date-picker"
                                  v-model="interactionrecord_tableData[editAddRecordIndex].reminderDate"
                                  type="datetime"
                                  :clearable = false
                                  size="mini"
                                  placeholder="选择日期时间">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="提醒内容:" >
                          <el-input
                                  v-model="interactionrecord_tableData[editAddRecordIndex].reminderContent"
                                  autocomplete="off"
                                  size="mini"
                          ></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="24">
                      <el-form-item label="互动内容:"  prop="contents">
                          <el-input type="textarea"  v-model="interactionrecord_tableData[editAddRecordIndex].contents" autocomplete="off" style="width: 378px;height: 48px;" size="mini"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="24">
                      <el-form-item label="客户反馈:"   prop="customerFeedback">
                          <el-input type="textarea"  v-model="interactionrecord_tableData[editAddRecordIndex].customerFeedback" autocomplete="off" style="width: 378px;height: 48px;" size="mini"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
        <div slot="footer" class="add_clinet_box">
          <div class="add_clinet_box_suer" @click="editoraction()">保存</div>
          <div class="add_clinet_box_cancel" @click="cancelinteractionrecord">取消</div>
        </div>
      </el-dialog>
    <!-- 新增客户信息 -->
    <el-dialog title="新增客户"
            :visible.sync="isShownAddCompanyInfo"
            v-loading="loading"
            :close-on-click-modal= false
            element-loading-text="数据提交中"
            width="1100px"
            class="customerAdd">
      <el-form :model="newCompanyInfo" ref="addCompanyInfo" :rules="companyInfoRules" >
        <img src="../../../../assets/image/border_top1.png" alt="" style="margin-bottom: 20px">
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="公司编号:">
              <el-input v-model="newCompanyInfo.customerCode" autocomplete="off" :disabled="true" size='mini' ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="公司全称:" prop="customerFullname">
              <el-input v-model="newCompanyInfo.customerFullname"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="公司简称:" prop="customerShortname">
              <el-input v-model="newCompanyInfo.customerShortname"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="来源:" prop="sourceName" >
              <el-select v-model="newCompanyInfo.sourceName" filterable  size='mini' @change="selectSourceCode">
                <el-option
                        v-for="item in SourceInfoList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="网址1:" prop="website1">
              <el-input v-model="newCompanyInfo.website1" autocomplete="off"  size='mini'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="网址2:"   prop="website2">
              <el-input size="mini" v-model="newCompanyInfo.website2" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户类别:" prop="categoryCode">
              <el-select v-model="newCompanyInfo.categoryCname" size="mini"  @change="selectCategory" >
                <el-option
                        v-for="item in CategoryCodeList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item"
                        :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="国家:" prop="countryName">
              <el-select v-model="newCompanyInfo.countryName" filterable @change="selectCountry" size="mini">
                <el-option
                        v-for="item in countryList"
                        :key="item.id"
                        :label="item.countryName"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="城市:"  prop="cityName">
              <el-select
                      v-model="newCompanyInfo.cityName"
                      allow-create
                      filterable
                      size="mini"
                      @change="selectCity" >
                <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.cityName"
                        :value="item.cityName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="付款方式:" prop="payment">
              <el-select v-model="newCompanyInfo.paymentName" size="mini" :disabled="true">
                <el-option
                        v-for="item in monthPayList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="收款银行:" prop="bankCname">
              <el-select v-model="newCompanyInfo.bankName" filterable @change="selectBankName" size="mini">
                <el-option
                        v-for="item in BankList"
                        :key="item.id"
                        :label="item.bankCname"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="货币类型:" prop="currencyCode">
              <el-select v-model="newCompanyInfo.currencyCode" @change="selectCurrencyType" size="mini">
                <el-option
                        v-for="item in accountList"
                        :key="item.id"
                        :label="item.currencyCode"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="银行账号:"  prop="account_Code">
              <el-input size="mini" :value="newCompanyInfo.account_Code" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="户主:" prop="account_Name">
              <el-input size="mini" :value="newCompanyInfo.account_Name" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <img src="../../../../assets/image/border_top2.png" alt="" style="margin-bottom: 20px">
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="公司地址:"  prop="companyAddress">
              <el-input v-model="newCompanyInfo.companyAddress" autocomplete="off" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="电话:" prop="companyPhone">
              <el-input v-model="newCompanyInfo.companyPhone" @input='e => newCompanyInfo.companyPhone = validNum (e)' autocomplete="off" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="颜色标识:"   prop="colorCode">
              <el-select v-model="newCompanyInfo.colorCode" size="mini">
                <el-option
                        v-for="item in ColorList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="收货地址:"   prop="shippingAddress">
              <el-input v-model="newCompanyInfo.shippingAddress" size="mini" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="发展日期:"   prop="devDate">
              <el-date-picker  v-model="newCompanyInfo.devDate" :clearable = false type="date"  clear-icon="el-icon-circle-close" class="devDate" :picker-options="pickerOptions" size='mini'></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row class="customerAdd_row">
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="行业:"   prop="industryName">
              <el-select v-model="newCompanyInfo.industryName" filterable size="mini" @change="selectIndustry">
                <el-option
                        v-for="item in industryList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="备注:"   prop="remarks">
              <el-input v-model="newCompanyInfo.remarks" size="mini" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <img src="../../../../assets/image/border_top3.png" alt="" style="margin-bottom: 20px">
        <!-- 联系人表格 -->
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="联系人编号:" >
              <el-input
                      autocomplete="off"
                      size='mini'
                      :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item label="姓名:" prop="contactCname">
              <el-input v-model="newCompanyInfo.contactCname"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="座机:"  prop="contactTel">
              <el-input v-model="newCompanyInfo.contactTel"  @input='e => newCompanyInfo.contactTel = validNum (e)' size='mini' autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机号码:"  prop="contactPhone">
              <el-input v-model.number="newCompanyInfo.contactPhone"  size='mini' autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="邮箱:" prop="mailAddress">
              <el-input v-model="newCompanyInfo.mailAddress"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="职位:" prop="position">
              <el-input v-model="newCompanyInfo.position"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="生日:" class="birthdate"  :clearable = false clearable  prop="birthdate">
              <el-date-picker  v-model="newCompanyInfo.birthdate" type="date" :clearable=false clear-icon="el-icon-circle-close" size='mini'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="QQ:"  prop="qq">
              <el-input v-model.number="newCompanyInfo.qq"  size='mini' autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="微信:"  prop="wechat">
              <el-input v-model="newCompanyInfo.wechat"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Skype:"  prop="Skype">
              <el-input v-model="newCompanyInfo.Skype"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="customerAdd_row">
          <el-col :span="4">
            <el-form-item label="Whatsapp:"  prop="whatsapp">
              <el-input v-model="newCompanyInfo.whatsapp"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="登录密码:" prop="password" >
              <el-input v-model="newCompanyInfo.password"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="备注:" prop="contactRemarks">
              <el-input v-model="newCompanyInfo.contactRemarks"  size='mini' autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <div class="add_clinet_box_suer" @click="saveCompany('newCompanyInfo') ">保存</div>
        <div class="add_clinet_box_cancel" @click="cancela('newCompanyInfo')">取消</div>
      </div>
    </el-dialog>
    <!-- 编辑客户信息编辑客户信息 -->
    <el-dialog title="编辑"
      :visible.sync="isShown"
      ref="customerData"
      v-loading="loading"
      width="900px"
      element-loading-text="数据提交中"
      v-if="customerData[editIndex]"
      :close-on-click-modal= false
      class="customerEditor">
      <el-form :model="customerData[editIndex]" ref="customerDataRuless" :rules="customerDataRuless" ><!--ref="customerDataRuless" :rules="customerDataRuless"-->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="公司编号:" prop="customerCode">
              <el-input v-model="customerData[editIndex].customerCode"  autocomplete="off" :disabled="true" value="companyNumber" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司简称:"  prop="customerShortname">
              <el-input v-model="customerData[editIndex].customerShortname" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司全称:" prop="customerFullname">
              <el-input v-model="customerData[editIndex].customerFullname" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源:"  prop="sourceName">
              <el-select v-model="customerData[editIndex].sourceName" filterable  placeholder="请选择来源" size='mini'>
                <el-option
                        v-for="item in SourceInfoList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.cname"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="网址1:" prop="website1">
              <el-input v-model="customerData[editIndex].website1" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="网址2:" >
              <el-input v-model="customerData[editIndex].website2" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户类别:"  prop="categoryCname">
              <el-select v-model="customerData[editIndex].categoryCname" placeholder="请选择客户类别" size='mini'>
                <el-option
                        v-for="item in CategoryCodeList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行业:" prop="industryList">
              <el-select v-model="customerData[editIndex].industryName" filterable placeholder="请选择行业" size='mini'>
                <el-option
                        v-for="item in industryList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="国家:" prop="countryName">
              <el-select v-model="customerData[editIndex].countryName" filterable @change="selectCountry" size='mini'>
                <el-option
                        v-for="item in countryList"
                        :key="item.id"
                        :label="item.countryName"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市:"  prop="cityName">
              <el-select v-model="customerData[editIndex].cityName" filterable size='mini'>
                <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.cityName"
                        :value="item.cityCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址:" >
              <el-input v-model="customerData[editIndex].companyAddress" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="电话:" >
              <el-input v-model="customerData[editIndex].companyPhone" @input='e => customerData[editIndex].companyPhone = validNum (e)' autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="颜色标识:"  prop="ColorList">
              <el-select v-model="newCompanyInfo.colorCode" placeholder="请选择颜色标识" size='mini'>
                <el-option
                        v-for="item in ColorList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址:" >
              <el-input v-model="customerData[editIndex].shippingAddress" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="发展日期:" >
              <el-date-picker  v-model="customerData[editIndex].devDate" type="date"  :clearable = false clear-icon="el-icon-circle-close" class="devDate" :picker-options="pickerOptions" size='mini'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式:"  prop="region">
              <el-select v-model="customerData[editIndex].paymentName" placeholder="请选择付款方式" disabled size='mini'>
                <el-option
                        v-for="item in monthPayList"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:" >
              <el-input v-model="customerData[editIndex].remarks" autocomplete="off" size='mini'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="收款银行:"  prop="region">
              <el-select v-model="customerData[editIndex].bankName" filterable placeholder="请选择收款银行" @change="selectBankNameEditor" size='mini'>
                <el-option
                        v-for="item in BankList"
                        :key="item.id"
                        :label="item.bankCname"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货币类型:"  prop="region">
              <el-select v-model="customerData[editIndex].currencyCode" filterable @change="selectCurrencyTypeEditor" size="mini">
                <el-option
                        v-for="item in accountList"
                        :key="item.id"
                        :label="item.currencyCode"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行账号:" >
              <el-input
                      v-model="customerData[editIndex].accountCode"
                      autocomplete="off"
                      size='mini'
                      :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户主:" >
              <el-input
                      v-model="customerData[editIndex].accountName"
                      autocomplete="off"
                      :disabled="true"
                      size='mini' >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-radio v-model="customerData[editIndex].boolEnabled" :label="0">启用</el-radio>
          <el-radio v-model="customerData[editIndex].boolEnabled" :label="1">不启用</el-radio>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <el-button class="add_clinet_box_suer"  @click="saveCustomerForEditor()">保存</el-button>
        <el-button class="add_clinet_box_cancel" @click="isShown = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 客户调整 -->
    <el-dialog title="客户调整"
               width="300px"
               :visible.sync="isShowncustomerAdjust"
               class="appMange">
      <el-form v-model="CustomerAdjustData" >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="原业务员:">
              <el-input autocomplete="off" v-model="CustomerAdjustData.OldOriginalSalesman" disabled size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="新业务员:">
              <el-select v-model="CustomerAdjustData.NewOriginalSalesman"  size='mini'>
                <el-option
                        v-for="item in adjustPeopleListData"
                        :key="item.id"
                        :prop="item.employeeCname"
                        :label="item.employeeCname"
                        :value="item.departmentCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="add_clinet_box">
        <div class="add_clinet_box_suer" @click="adjustSave" style="margin-right: 20px;">保存</div>
        <div class="add_clinet_box_cancel" @click="isShowncustomerAdjust=false">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export {default} from '../CustomerData/script'
</script>

<style lang="less">
  @import './style.less';
</style>

