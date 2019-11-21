<template>
  <div id="personnelFiles">
    <div class="left" id="left">
      <div class="allEmployee" @click="onAllEmployee"><i class="el-icon-s-custom"></i>全部员工</div>
      <el-tree id="departmentTree" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node }">
            <span>
                <!-- <i class="fa fa-list-ul fa-lg" aria-hidden="true"></i> -->
                 <i class="fa fa-lg" :class="icon" aria-hidden="true"></i>
                {{ node.label }}
            </span>              
        </span>
      </el-tree>
    </div>
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"> <span class="slideBtn" @click="leftSlide"><i :class='isSlide==true?"el-icon-s-unfold":"el-icon-s-fold"'></i></span>搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item prop="employeeCode">
             <el-autocomplete class="inline-input mediaInput" size="mini" suffix-icon="el-icon-search" v-model="ruleForm.employeeCode" :fetch-suggestions="querySearch" placeholder="员工编号"  @select="handleSelect"   :trigger-on-focus="false"></el-autocomplete>
          </el-form-item>
          <el-form-item  prop="employeeCname">
            <el-input placeholder="姓名" v-model="ruleForm.employeeCname" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item  prop="quitState">
            <el-select v-model="ruleForm.quitState" placeholder="请选择状态" size="small">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div style="display: inline-block;">
            <el-form-item prop="dateType" style="margin: 0;">
              <el-select v-model="ruleForm.dateType" placeholder="请选择日期类型" size="small">
                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="start" style="margin-left: 10px;">
              <el-date-picker v-model="ruleForm.start" type="date" :disabled='ruleForm.dateType==""' :picker-options="startDatePicker" ref="searchStart" placeholder="起始日期" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item style="margin: 0 5px;">-</el-form-item>
            <el-form-item prop="end" style="margin: 0;">
              <el-date-picker v-model="ruleForm.end" type="date" :disabled='ruleForm.dateType==""' :picker-options="endDatePicker" ref="searchEnd" placeholder="结束日期" size="small"></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
            <el-button size="small" icon="el-icon-plus" @click="addEmployee">新增员工</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%" stripe size="mini" :height="tableHeight" :max-height="tableHeight">
        <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row, $index}">
            <div v-if="item.columnCname == '操作'">
                <div class="table_btn" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="修改"||btnitem.operationName=="删除"'>
                    <span class="hover_selec1" v-if='btnitem.operationName=="修改"' :class="{actived:isEditActive==$index }" title="编辑" @click.stop="edit($index, row)"></span>
                    <span class="hover_selec2" v-else-if='btnitem.operationName=="删除"' :class="{actived:isDelActive==$index }" title="删除" @click.stop="del($index, row)"></span>
                </div>
            </div>
            <div v-else>
                {{ row[item.columnName] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="dialogTitle" :visible.sync="dialog" width="1200px" class="addEmployeeDialog" @closed="closed">
        <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini" >
          <div class="title">
              <span>基本信息</span>
              <span class="line"></span>
          </div>
          <el-form-item label="" class="avatarBox">
            <el-upload class="avatar-uploader" :action="uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-s-custom avatar-uploader-icon" :title="buttonTitle"></i>
            </el-upload>
          </el-form-item>
          <div class="formDiv">
              <el-form-item label="姓名">
                <el-input v-model="initDialogForm.employeeCname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="英文名">
                <el-input v-model="initDialogForm.employeeName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="employeeSex">
                <el-select v-model="initDialogForm.employeeSex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族" prop="employeeNation">
                <el-select v-model="initDialogForm.employeeNation" placeholder="请选择民族">
                  <el-option v-for="item in employeeNationList" :key="item.cname"  :label="item.cname" :value="item.cname">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" prop="idBirth">
                <el-date-picker v-model="initDialogForm.idBirth" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="联系电话" prop="phoneNumber">
                <el-input v-model="initDialogForm.phoneNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idNumber">
                <el-input v-model="initDialogForm.idNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-select v-model="initDialogForm.education" placeholder="请选择学历">
                  <el-option v-for="item in educationList" :key="item.cname"  :label="item.cname" :value="item.cname">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="婚否" prop="boolMarried">
                <el-select v-model="initDialogForm.boolMarried" placeholder="请选择婚姻状况">
                  <el-option label="未婚" value="未婚"></el-option>
                  <el-option label="已婚" value="已婚"></el-option>
                  <el-option label="离异" value="离异"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="initDialogForm.employeeMail" autocomplete="off"></el-input>
              </el-form-item>
          </div>
          <div class="formDiv1">
              <div class="title"></div>
              <el-form-item label="身高">
                <el-input v-model="initDialogForm.employeeHeight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="体重">
                <el-input v-model="initDialogForm.employeeWeight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="户口所在地">
                <el-input v-model="initDialogForm.registResidence" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证地址" class="doubleItem">
                <el-input v-model="initDialogForm.registResidence" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="紧急联系人">
                <el-input v-model="initDialogForm.urgentName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="关系">
                <el-input v-model="initDialogForm.relation" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话">
                <el-input v-model="initDialogForm.urgentPhone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="毕业学校">
                <el-input v-model="initDialogForm.university" autocomplete="off"></el-input>
              </el-form-item>
          </div>
          <div class="formDiv2">
            <div class="title">
                <span>公司信息</span>
                <span class="line"></span>
            </div>
            <el-form-item label="员工编号">
                <el-input v-model="initDialogForm.employeeCode" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="一级部门" prop="deptName1">
              <el-select v-model="initDialogForm.deptName1" placeholder="请选择一级部门" @change="selectOne">
                <el-option v-for="item in deptName1List" :key="item.id"  :label="item.deptName" :value="item.deptName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级部门" prop="deptName2" >
              <el-select v-model="initDialogForm.deptName2" placeholder="请选择二级部门" @change="selectTwo" :disabled="ifCheckDeptName1">
                <el-option v-for="item in deptName2List" :key="item.id"  :label="item.deptName" :value="item.deptName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="三级部门" prop="deptName">
              <el-select v-model="initDialogForm.deptName" placeholder="请选择三级部门" @change="selectThree" :disabled="ifCheckDeptName2">
                <el-option v-for="item in deptName3List" :key="item.id"  :label="item.deptName" :value="item.deptName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="positionName">
              <el-select v-model="initDialogForm.positionName" placeholder="请选择职位" @change="selectPositionName">
                <el-option v-for="item in positionNameList" :key="item.id"  :label="item.positionCname" :value="item.positionCname">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="级别" prop="levelId">
              <el-select v-model="initDialogForm.levelId" placeholder="请选择级别">
                <el-option label="一级" value="一级"></el-option>
                <el-option label="二级" value="二级"></el-option>
                <el-option label="三级" value="三级"></el-option>
                <el-option label="四级" value="四级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职日期" prop="entryDate">
              <el-date-picker v-model="initDialogForm.entryDate" ref="entryDate" type="date" format="yyyy-MM-dd" prefix-icon=" "></el-date-picker>
            </el-form-item>
            <el-form-item label="转正日期" prop="becomestaffDate">
              <el-date-picker v-model="initDialogForm.becomestaffDate" ref="becomestaffDate" type="date" format="yyyy-MM-dd" prefix-icon=" "></el-date-picker>
            </el-form-item>
            <el-form-item label="离职日期">
              <el-date-picker v-model="initDialogForm.quitDate" ref="quitDate" type="date" format="yyyy-MM-dd" prefix-icon=" "></el-date-picker>
            </el-form-item>
            <el-form-item label="状态" >
              <el-input v-model="initDialogForm.quitState" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="formDiv3">
              <div class="title"></div>
              <el-form-item label="银行名称">
                <el-input v-model="initDialogForm.bankName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="银行账号">
                <el-input v-model="initDialogForm.bankAccount" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="薪资">
                <el-input v-model="initDialogForm.employeeSalary" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="社保号">
                <el-input v-model="initDialogForm.socialSecurity" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="考勤号">
                <el-input v-model="initDialogForm.attendNo" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食堂">
                <el-select v-model="initDialogForm.foodRoom" placeholder="请选择食堂">
                  <el-option v-for="item in foodRoomList" :key="item.cname"  :label="item.cname" :value="item.cname">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="宿舍房号">
                <el-input v-model="initDialogForm.roomInfo" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注" class="doubleItem">
                <el-input v-model="initDialogForm.remarks" autocomplete="off"></el-input>
              </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" @click="submitDialogData('initDialogForm')" size="small">确 定</el-button>
          <el-button @click="cancel" size="small">取 消</el-button> -->
           <el-button :type="item.type" :class='{confirmBtn:item.operationName=="确定"}' v-for="(item,index) in listToolBarOperation" :key="index" @click="dialogEven(item.operationName)">
              {{item.operationName}}
            </el-button>
        </div>
      </el-dialog>
      <el-pagination class="pageDiv" :hide-on-single-page="true" align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-sizes="[20, 30, 40,50]" :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" :total="total" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export { default } from './js/personnelFiles'
</script>
<style lang="less">
  @import '../../common/css/style.less';
</style>
