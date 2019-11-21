<template>
    <div id="ClientTobeExplored">
        <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition"><span class="index"></span>搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item  prop="salesUsercode">
                        <el-input placeholder="业务员" v-model="ruleForm.salesUsercode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="customerFullname">
                        <el-input placeholder="客户" v-model="ruleForm.customerFullname" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="customerCode">
                        <el-input placeholder="客户编号" v-model="ruleForm.customerCode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="industryName">
                        <el-input placeholder="行业" v-model="ruleForm.industryName" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="countryName">
                        <el-input placeholder="国家" v-model="ruleForm.countryName" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <div style="display: inline-block;">
                        <el-form-item prop="start" style="margin-left: 10px;">
                            <el-date-picker v-model="ruleForm.start" type="date" :picker-options="startDatePicker" value-format="yyyy-MM-dd" prefix-icon=" " ref="searchStart" placeholder="发展起始日期" size="small"></el-date-picker>
                        </el-form-item>
                        <el-form-item style="margin: 0 5px;">-</el-form-item>
                        <el-form-item prop="end" style="margin: 0;">
                            <el-date-picker v-model="ruleForm.end" type="date" :picker-options="endDatePicker" value-format="yyyy-MM-dd" prefix-icon=" " ref="searchEnd" placeholder="发展结束日期" size="small"></el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
             <el-table :data="tableData" border v-loading="loading" style="width: 100%" stripe size="mini" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                <template slot-scope="{row, $index}">
                        {{ row[item.columnName] }}
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export { default } from './script'
</script>
<style lang="less">
 @import '../../common/css/style';
</style>
