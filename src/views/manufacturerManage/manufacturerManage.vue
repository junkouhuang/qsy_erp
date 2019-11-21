<template>
  <div id="manufacturerManage">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
         <el-form-item prop="supplierCode">
            <!-- <el-input placeholder="生产商编号" v-model="ruleForm.supplierCode" suffix-icon="el-icon-search" size="small"></el-input> -->
             <el-autocomplete
              v-model="ruleForm.supplierCode"
              :fetch-suggestions="querySearchAsync"
              placeholder="生产商编号"
              @select="handleSelect">
              <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer" @click="searchTypeQuotation(ruleForm.supplierCode)"></i>
              </el-autocomplete>
          </el-form-item>
          <el-form-item prop="supplierName">
            <!-- <el-input placeholder="生产商名字" v-model="ruleForm.supplierName" suffix-icon="el-icon-search" size="small"></el-input> -->
            <el-autocomplete
              v-model="ruleForm.supplierName"
              :fetch-suggestions="querySearchSupplierName"
              placeholder="生产商编号"
              @select="handleSelectSupplierName">
              <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer" @click="searchSupplierName(ruleForm.supplierName)"></i>
              </el-autocomplete>
          </el-form-item>
          <el-form-item prop="contactName">
            <el-input placeholder="联系人" v-model="ruleForm.contactName" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="provinces">
            <el-select v-model="ruleForm.provinces" @change="choseProvince"  placeholder="省份">
               <el-option v-for="(item,index) in provs" :key="index" :label="item.label" :value="item.value">
               </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="rating">
            <el-select v-model="ruleForm.rating"  placeholder="等级" @change="selectRating">
              <el-option label="一级" value="一级"></el-option>
                  <el-option label="二级" value="二级"></el-option>
                  <el-option label="三级" value="三级"></el-option>
                  <el-option label="四级" value="四级"></el-option>
                  <el-option label="五级" value="五级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="business">
            <el-select v-model="ruleForm.business"  placeholder="经营范围" @change="selectBusiness">
              <el-option v-for="item in businessGetData" :key="item.id"  :label="item.techName" :value="item.techName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
                <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%" stripe size="mini" :height="tableHeight" :max-height="tableHeight"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" :min-width="55" align="center">
        </el-table-column>
        <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row, $index}">
            <div v-if="item.columnCname == '操作'" class="maufacturDiv">
                <div class="table_btn" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="修改"||btnitem.operationName=="认证查看"||btnitem.operationName=="设备维护"'>
                    <span class="hover_selec1" v-if='btnitem.operationName=="修改"' :class="{actived:isEditActive==$index }" title="修改" @click.stop="edit($index, row)"></span>
                    <span class="hover_selec3" v-else-if='btnitem.operationName=="认证查看"' :class="{actived:isAttestation==$index }" title="认证查看" @click.stop="checkAttestation($index, row)"></span>
                    <span class="hover_selec4" v-else-if='btnitem.operationName=="设备维护"' :class="{actived:isFacilities==$index }" title="设备维护" @click.stop="facilitiesMaintenance($index, row)"></span>
                </div>
            </div>
            <div v-else>
                {{ row[item.columnName] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
       <div class="toolBar_btn">
        <el-button size="mini" round v-show='item.operationName=="新增"||item.operationName=="产能对比"||item.operationName=="设备审核"||item.operationName=="下载导入模板"||item.operationName=="导入Excel"||item.operationName=="导出Excel"' v-for="(item,index) in listToolBarOperation" :key="index" @click="toolBarEven(item.operationName)">
          {{item.operationName}}
        </el-button>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialog"  width="1100px"  :close-on-click-modal= false class="manufacturerManageDialog" @closed="closed">
        <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
          <div class="title">
              <span>基本信息</span>
              <span class="line"></span>
          </div>
          <div class="formDiv">
              <el-form-item label="生产商编号:">
                <el-input v-model="initDialogForm.supplierCode" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
               <el-form-item label="生产商名称:" prop="supplierName">
                <el-input v-model="initDialogForm.supplierName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="简称:" prop="shortName">
                <el-input v-model="initDialogForm.shortName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="省份:" prop="provinces">
                <el-select v-model="initDialogForm.provinces" placeholder="请选择" @change="getProv">
                    <el-option v-for="(item,index) in provs" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="城市:" prop="city">
                <el-select size="small" v-model="initDialogForm.city" placeholder="请选择">
                  <el-option v-for="(item,index) in citys" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="具体地址:" prop="location">
                <el-input v-model="initDialogForm.location" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="公司座机:" prop="landlinePhone">
                <el-input v-model="initDialogForm.landlinePhone" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="成立日期:" prop="createDate">
                <el-date-picker v-model="initDialogForm.createDate" type="date"></el-date-picker>
              </el-form-item>
               <el-form-item label="发展日期:" prop="devDate">
                <el-date-picker v-model="initDialogForm.devDate" type="date" :disabled="true"></el-date-picker>
              </el-form-item>
               <el-form-item label="等级:" prop="rating">
                <el-select v-model="initDialogForm.rating" placeholder="请选择">
                  <el-option label="一级" value="一级"></el-option>
                  <el-option label="二级" value="二级"></el-option>
                  <el-option label="三级" value="三级"></el-option>
                  <el-option label="四级" value="四级"></el-option>
                  <el-option label="五级" value="五级"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="付款方式:" prop="paymentName">
                <el-select size="small" v-model="initDialogForm.paymentName" placeholder="请选择">
                  <el-option v-for="(item,index) in paymentList" :key="index" :label="item.cname" :value="item.cname">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="登录密码:" prop="password">
                <el-input v-model="initDialogForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否启用:" prop="boolEnabled">
                 <el-radio-group v-model="initDialogForm.boolEnabled">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
              </el-form-item>
          </div>
          <div class="formDiv1">
              <el-form-item label="联系人1:" prop="contact1Name">
                <el-input v-model="initDialogForm.contact1Name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:" prop="contact1Phone">
                <el-input v-model="initDialogForm.contact1Phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" prop="contact1Mail">
                <el-input v-model="initDialogForm.contact1Mail" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职务:" prop="contact1Position">
                <el-input v-model="initDialogForm.contact1Position" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人2:" prop="contact2Name">
                <el-input v-model="initDialogForm.contact2Name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:" prop="contact2Phone">
                <el-input v-model="initDialogForm.contact2Phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" prop="contact2Mail">
                <el-input v-model="initDialogForm.contact2Mail" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职务:" prop="contact2Position">
                <el-input v-model="initDialogForm.contact2Position" autocomplete="off"></el-input>
              </el-form-item>
          </div>
           <div class="title">
              <span>公司规模</span>
              <span class="line"></span>
          </div>
          <div class="formDiv">
              <el-form-item label="人员总数:">
                <el-input v-model="initDialogForm.staffqtyTotal" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
               <el-form-item label="编程人员:" prop="staffqtyProgrammer">
                <el-input v-model="initDialogForm.staffqtyProgrammer" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="CNC人员:" prop="staffqtyCnc">
                <el-input v-model="initDialogForm.staffqtyCnc" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="报价人员:" prop="staffqtyQuoter">
                <el-input v-model="initDialogForm.staffqtyQuoter" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="跟单人员:" prop="staffqtyPm">
                <el-input v-model="initDialogForm.staffqtyPm" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="手工人员:" prop="staffqtyHandwork">
                <el-input v-model="initDialogForm.staffqtyHandwork" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="电镀人员:" prop="staffqtyElectroplating">
                <el-input v-model="initDialogForm.staffqtyElectroplating" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="打磨抛光:" prop="staffqtyPolishing">
                <el-input v-model="initDialogForm.staffqtyPolishing" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="喷油人员:" prop="staffqtyPainting">
                <el-input v-model="initDialogForm.staffqtyPainting" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="模房人员:" prop="staffqtyMold">
                <el-input v-model="initDialogForm.staffqtyMold" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="其它人员:" prop="staffqtyOthers">
                <el-input v-model="initDialogForm.staffqtyOthers" autocomplete="off"></el-input>
              </el-form-item>
          </div>
          <div class="finish">
            <el-form-item label="经营范围:" prop="business">
              <el-checkbox-group v-model="initDialogForm.business">
                <el-checkbox v-for="(item,index) in businessData" :label="item" :key="index">{{item}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :type="item.type" v-show='item.operationName=="确定"||item.operationName=="取消"' :class='{confirmBtn:item.operationName=="确定"}' v-for="(item,index) in listToolBarOperation" :key="index" @click="dialogEven(item.operationName)">
            {{item.operationName}}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="认证" :visible.sync="attestation_dialog" width="800px"  :close-on-click-modal= false class="attestationDialog" @closed="closed">
        <div class="searchBox">
          <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
          <el-form class="condition" :model="attestationForm" ref="attestationForm" size="small" :inline="true">
            <el-form-item prop="certificatesName">
              <el-input placeholder="认证名" v-model="attestationForm.certificatesName" suffix-icon="el-icon-search" size="small"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button  size="small" icon="el-icon-search" @click="attestationSearch">搜索</el-button>
                <el-button  size="small" @click="attestationResetForm('attestationForm')">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
       <el-table :data="attestationData" border >
             <el-table-column label="操作" width="118"  align="center" > 
                <template slot-scope="{row, $index}">
                  <div class="table_btn">
                      <span class="hover_selec1"  :class="{actived:isEditActive==$index }" title="编辑" @click.stop="editAttestation($index, row)"></span>
                  </div>
                  <div class="table_btn">
                      <span class="hover_selec2"  :class="{actived:isDelActive==$index }" title="删除" @click.stop="delAttestation($index, row)"></span>
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="shortName" label="生产商" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="certificatesName" label="认证名" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="endDate" label="到期时间" width="160"  align="center" > 
            </el-table-column>
            <el-table-column label="附件"  width="160" align="center" > 
              <template slot-scope="{row, $index}">
                  <div>
                    <el-button  size="mini" round @click="downTemplate($index, row)">下载</el-button>
                  </div>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog width="460px" :title="innerVisibleTitle"  :visible.sync="innerVisible" class="innerDialog" append-to-body @closed="closed">
            <el-form class="innerVisibleForm" :model="innerVisibleForm" :rules="innerVisibleFormRules"  ref="innerVisibleForm" size="small" :inline="true">
               <el-form-item prop="certificatesName" label="认证名:">
                 <el-input placeholder="认证名" v-model="innerVisibleForm.certificatesName" size="small"></el-input>
              </el-form-item>
              <el-form-item prop="endDate" label="到期时间：">
                <el-date-picker v-model="innerVisibleForm.endDate" type="date"></el-date-picker>
              </el-form-item>
               <el-form-item label="附件上传：" class="avatarBox">
                  <!-- <el-upload  class="avatar-uploader" ref="upload" :limit="5" :action="uploadPic" :headers="{token:token}"  :on-remove="handleRemove" list-type="picture-card" :file-list="fileList" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
                   <div class="imgList">
                     <ul>
                       <li v-for="(item,index) in fileList" :key="index"><img :src='item.url' alt=""><span class="del" @click="handleRemove(item,index)"></span></li>
                        <el-upload  class="avatar-uploader" ref="upload" :action="uploadPic" :headers="{token:token}" :show-file-list="false"  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                     </ul>
                   </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class='confirmBtn'  @click="save()">保存</el-button>
              <el-button  @click="innerVisibleCancel()">取消 </el-button>
            </div>
         </el-dialog>
        <div class="toolBar_btn">
          <el-button size="mini" round  @click="addAttestation">新增认证</el-button>
        </div>
      </el-dialog>
      <el-dialog title="设备审核" :visible.sync="facilitiesDialog"  width="1800px"  :close-on-click-modal= false class="manufacturerManageDialog">
          <el-table :data="facilitiesTableData" border v-loading="loading" style="width: 100%" max-height="750" @selection-change="selectFacilities">
              <el-table-column type="selection" :min-width="50" align="center">
              </el-table-column>
              <el-table-column label="操作" width="140"  align="center" > 
                  <template slot-scope="{row, $index}">
                    <div class="facilitiesBtn">
                        <el-button class="agree"  size="mini" :disabled='row.auditStatus=="审核通过"||row.auditStatus=="拒绝审核"' round @click="agreeItem($index, row)">同意</el-button>
                        <el-button class="refuse" size="mini" :disabled='row.auditStatus=="审核通过"||row.auditStatus=="拒绝审核"' round @click="refuseItem($index, row)">拒绝</el-button>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column prop="supplierName" label="生产商" width="160"  align="center" :show-overflow-tooltip="true"> 
              </el-table-column>
              <el-table-column prop="machineTypecode" label="设备类型" width="138"  align="center" :show-overflow-tooltip="true"> 
              </el-table-column>
              <el-table-column prop="ofAxes" label="轴数" width="130"  align="center" > 
              </el-table-column>
              <el-table-column prop="maxX" label="X（最大成型尺寸）mm" width="148"  align="center" > 
              </el-table-column>
              <el-table-column prop="maxY" label="Y（最大成型尺寸）mm" width="148"  align="center" > 
              </el-table-column>
              <el-table-column prop="maxZ" label="Z（最大成型尺寸）mm" width="148"  align="center" > 
              </el-table-column>
              <el-table-column prop="accuracy" label="精度（mm）" width="100"  align="center" > 
              </el-table-column>
              <el-table-column prop="thickness" label="成型层厚度（mm）" width="130"  align="center" > 
              </el-table-column>
              <el-table-column prop="qty" label="数量" width="120"  align="center" > 
              </el-table-column>
              <el-table-column prop="updatedTime" label="更新时间" width="110"  align="center" > 
              </el-table-column>
              <el-table-column label="状态" width="100"  align="center" > 
                  <template slot-scope="{row}">
                      <div :class='{noAuditStatus:row.auditStatus=="待审核"}'>
                          {{row.auditStatus}}
                      </div>
                  </template>
              </el-table-column>
              <el-table-column label="查看图片" width="119" align="center" > 
                  <template slot-scope="{row,$index}">
                  <div>
                      <el-button  size="mini" round @click="checkImg($index, row)">查看图片</el-button>
                  </div>
                  </template>
              </el-table-column>
        </el-table>
         <div slot="footer" class="dialog-footer">
            <el-button  @click="refuse()">拒绝 </el-button>
            <el-button class='confirmBtn' style="margin-left:13%;margin-right:0"  @click="agree()">同意</el-button>
        </div>
      </el-dialog>
      <el-dialog title="设备图片" :visible.sync="imgDialog" width="670px"  :close-on-click-modal= false class="facilitiesDialog" >
          <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in imgList" :key="item">
                 <img :src="item" ref="image" alt="" style="width:100%">
                </el-carousel-item>
            </el-carousel>
      </el-dialog>
      <el-pagination class="pageDiv" :hide-on-single-page="true" align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-sizes="[20, 30, 40,50]" :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" :total="total" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export { default } from './js/script'
</script>
<style lang="less">
 @import '../../common/css/style.less';
</style>
