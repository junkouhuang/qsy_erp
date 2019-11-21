<template>
    <div id="production">
         <div class="contentBox">
              <div class="searchBox">
                   <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
                    <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                        <el-form-item prop="poNo">
                            <el-input placeholder="外发单号" v-model="ruleForm.poNo" suffix-icon="el-icon-search" size="small"></el-input>                    
                        </el-form-item>
                        <el-form-item  prop="attachmentOriginal3dname">
                            <el-input placeholder="产品名称" v-model="ruleForm.attachmentOriginal3dname" suffix-icon="el-icon-search" size="small"></el-input> 
                            <!-- <el-select v-model="ruleForm.supplierCode" filterable :filter-method="getSupplierCode" placeholder="生产商编号:"  @change="selectSupplierCode">
                                <el-option v-for="(item,index) in supplierCodeList" :key="index"  :label="item" :value="item">
                                </el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item  prop="orderNo">
                            <el-input placeholder="订单编号" v-model="ruleForm.orderNo" suffix-icon="el-icon-search" size="small"></el-input> 
                        </el-form-item>
                        <div style="display: inline-block;">
                            <el-form-item prop="dateType" style="margin: 0;">
                                <el-select v-model="ruleForm.dateType" placeholder="日期" size="small">
                                    <el-option label="订单交期" value="1"></el-option>
                                    <el-option label="生产交期" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="start" style="margin-left: 10px;">
                                <el-date-picker v-model="ruleForm.start" type="date" :picker-options="startDatePicker" ref="searchStart" placeholder="起始日期" size="small" prefix-icon=" "></el-date-picker>
                            </el-form-item>
                            <el-form-item style="margin: 0 5px;">-</el-form-item>
                            <el-form-item prop="end" style="margin: 0;">
                                <el-date-picker v-model="ruleForm.end" type="date" :picker-options="endDatePicker" ref="searchEnd" placeholder="结束日期" size="small" prefix-icon=" "></el-date-picker>
                            </el-form-item>
                        </div>
                        <el-form-item prop="tranStauts">
                            <el-select v-model="ruleForm.dateType" placeholder="状态" size="small">
                                <el-option label="待核销" value="0"></el-option>
                                <el-option label="已核销" value="1"></el-option>
                                <el-option label="已冲红" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                        </el-form-item>
                    </el-form>
              </div>
         </div>
    </div>
</template>
<script>
export { default } from './js/production.js'
</script>
<style lang="less">
 @import './style.less';
</style>