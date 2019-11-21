<template>
  <div id="materialMaintain">
    <div class="left" id="left">
      <div class="allEmployee" @click="onAllMaintain"><i class="data_icon"><img src="@/assets/image/left_icon.png" alt=""></i>全部材料</div>
      <el-tree id="departmentTree" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node }">
            <span>
                <i class="data_icon"><img src="@/assets/image/left_icon.png" alt=""></i>
                {{ node.label }}
            </span>              
        </span>
      </el-tree>
    </div>
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="slideBtn" @click="leftSlide"><i :class='isSlide==true?"el-icon-s-unfold":"el-icon-s-fold"'></i></span>搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item prop="materialCode">
            <el-input placeholder="材料编号" v-model="ruleForm.materialCode" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="materialCname">
            <el-input placeholder="材料名称" v-model="ruleForm.materialCname" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="techId">
            <el-select v-model="ruleForm.techId" placeholder="全部工艺" size="small">
                 <el-option v-for="item in techNameList" :key="item.techName"  :label="item.techName" :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="success" plain size="small" @click="resetForm('ruleForm')">清空</el-button>
            <el-button type="warning" size="small" @click="apply">添加材料</el-button>
            <el-button type="primary" size="small" @click="downTemplate">下载导入模板</el-button>
            <el-button type="primary" size="small" @click="downTemplate">导入Excel</el-button> -->
            <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index"  @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
          </el-form-item>
        </el-form>
      </div>
       <el-table :data="tableData" border  v-loading="loading" style="width: 100%" stripe size="mini" height="750px"  :max-height="clientHeight">
          <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center" :show-overflow-tooltip="true">
            <template slot-scope="{row, $index}">
               <div v-if="item.columnCname == '操作'">
                  <div class="table_btn" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="修改"'>
                      <span class="hover_selec1" v-if='btnitem.operationName=="修改"' :class="{actived:isEditActive==$index }" title="编辑" @click.stop="edit($index, row)"></span>
                  </div>
              </div>
              <div v-if="item.columnCname == '物性表'" style="display:flex">
                  <span v-for="(btnitem,index) in listOneTableOperation" :key="index" style="width:50%;margin-right: 5px;" v-show='btnitem.operationName=="上传"||btnitem.operationName=="下载"'>
                    <el-upload class="avatar-uploader"  v-if='btnitem.operationName=="上传"' :action="uploadPic" :headers="{token:token}" :data="{id:row.id}" :show-file-list="false" :limit="1" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
                        <el-button size="mini" round>{{btnitem.operationName}}</el-button>
                    </el-upload>
                    <el-button size="mini" v-else-if='btnitem.operationName=="下载"' :disabled='row.physicalOsspath==""||row.physicalOsspath==null' round @click.stop="downTemplate($index, row)">{{btnitem.operationName}}</el-button>
                  </span>
              </div>
              <div v-if="item.columnCname == '后处理'">
                  <span v-for="(finishitem,index) in row.finish" :key="index">
                    {{finishitem.finishCname}}、
                  </span>
              </div>
              <div v-else>
                  {{ row[item.columnName] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      <el-dialog :title="dialogTitle" :visible.sync="dialog" width="750px" class="materialMaintainDialog" @closed="closed">
        <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
          <el-form-item label="材料编号:">
            <el-input v-model="initDialogForm.materialCode" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="工艺:">
            <el-select v-model="initDialogForm.techName" placeholder="请选择工艺:" :disabled="noEdit" @change="selectTechName">
                <el-option v-for="item in techNameList" :key="item.techName"  :label="item.techName" :value="item.techName">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料名称:" prop="materialCname">
            <el-input v-model="initDialogForm.materialCname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密度:" prop="density">
            <el-input v-model="initDialogForm.density" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="材料属性:" prop="materialProperty">
            <el-select v-model="initDialogForm.materialProperty" placeholder="请选择材料属性" @change="selectMaterialProperty">
              <el-option v-for="item in materialPropertyList" :key="item.cname"  :label="item.cname" :value="item.cname">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料类型:" prop="materialTypeCname">
            <el-select v-model="initDialogForm.materialTypeCname" placeholder="请选择材料类型:" @change="selectMaterialType">
                <el-option v-for="item in materialTypeList" :key="item.cname"  :label="item.cname" :value="item.cname">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户价格:" prop="materialPrice">
            <el-input v-model="initDialogForm.materialPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商价格:" prop="materialSupprice" class="labelWidth">
            <el-input v-model="initDialogForm.materialSupprice" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="是否启用:" prop="boolEnabled">
            <el-radio-group v-model="initDialogForm.boolEnabled" size="mini">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="后处理:" prop="finish" class="finish">
              <el-checkbox-group v-model="initDialogForm.finish">
                <el-checkbox v-for="finishitem in finishData" :label="finishitem" :key="finishitem">{{finishitem}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button :type="item.type" v-for="(item,index) in listToolBarOperation" :class='{confirmBtn:item.operationName=="确定"}' :key="index" @click="dialogEven(item.operationName)">
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
export { default } from './script'
</script>
<style lang="less">
 @import '../../common/css/style.less';
</style>
