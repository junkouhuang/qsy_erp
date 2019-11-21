<template>
  <div id="capacityComparison">
    <div class="left" id="left">
      <div class="allEmployee" @click="onAllMaintain" style="border-bottom: 1px solid #eee;"><i class="data_icon"><img src="@/assets/image/companyIcon.png" alt=""></i>全部公司</div>
      <el-tree id="departmentTree" class="companyTree" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node }">
            <span>
                <i class="data_icon"><img src="@/assets/image/companyIcon.png" alt=""></i>
                {{ node.label }}
            </span>              
        </span>
      </el-tree>
    </div>
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="slideBtn" @click="leftSlide"><i :class='isSlide==true?"el-icon-s-unfold":"el-icon-s-fold"'></i></span>搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item prop="dates">
            <el-date-picker v-model="ruleForm.dates" type="date" size="small"  placeholder="日期查询" value-format="yyyy-MM-dd" @change="searchDate">
             </el-date-picker>
          </el-form-item>
          <el-form-item prop="supplierName">
            <el-input placeholder="生产商" v-model="ruleForm.supplierName" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="orderType">
            <el-select v-model="ruleForm.orderType" placeholder="全部类别" size="small">
                 <el-option label="手板" value="1"></el-option>
                 <el-option label="模具" value="2"></el-option>
                 <el-option label="钣金" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  size="small" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button  plain size="small" @click="resetForm('ruleForm')">清空</el-button>
            <el-button  size="small" @click="downTemplate">导入Excel</el-button>
            <el-button  size="small" @click="$router.back(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
       <el-table :data="tableData" border v-loading="loading" :span-method="objectSpanMethod" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
            <el-table-column v-for="(item, i) in tHeadData" :key="i" :prop="item.name" :label="item.label" :min-width="item.width" align="center"></el-table-column>
       </el-table>
    </div>
  </div>
</template>

<script>
export { default } from './js/capacityComparison'
</script>
<style lang="less">
 @import '../../common/css/style.less';
</style>
