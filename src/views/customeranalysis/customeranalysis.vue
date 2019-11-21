<template>
    <div id="customeranalysis">
        <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition"><span class="index"></span>搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item  prop="salesUsercode">
                        <el-input placeholder="业务员" v-model="ruleForm.salesUsercode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>

                    <el-form-item  prop="customerCode">
                        <el-input placeholder="客户编号" v-model="ruleForm.customerCode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="industryName">
                        <el-input placeholder="行业" v-model="ruleForm.industryName" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="sourceName">
                        <el-input placeholder="来源" v-model="ruleForm.sourceName" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="countryName">
                        <el-input placeholder="国家" v-model="ruleForm.countryName" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
  
                    <el-form-item>
                        <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
             <el-table :data="tableData" :span-method="objectSpanMethod" border v-loading="loading" style="width: 100%" stripe size="mini" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                <template slot-scope="{row, $index}">
             
                     <div v-if="item.columnCname == '1月'" class="divBox">
                        <span class="palm"> {{ row['jan'] }} </span>
                        <span class="molds"> {{ row['janM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '2月'" class="divBox">
                        <span class="palm"> {{ row['feb'] }} </span>
                        <span class="molds"> {{ row['febM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '3月'" class="divBox">
                        <span class="palm"> {{ row['mar'] }} </span>
                        <span class="molds"> {{ row['marM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '4月'" class="divBox">
                        <span class="palm"> {{ row['apr'] }} </span>
                        <span class="molds"> {{ row['aprM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '5月'" class="divBox">
                        <span class="palm"> {{ row['may'] }} </span>
                        <span class="molds"> {{ row['mayM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '6月'" class="divBox">
                        <span class="palm"> {{ row['jun'] }} </span>
                        <span class="molds"> {{ row['junM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '7月'" class="divBox">
                        <span class="palm"> {{ row['jul'] }} </span>
                        <span class="molds"> {{ row['julM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '8月'" class="divBox">
                        <span class="palm"> {{ row['aug'] }} </span>
                        <span class="molds"> {{ row['augM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '9月'" class="divBox">
                        <span class="palm"> {{ row['sep'] }} </span>
                        <span class="molds"> {{ row['sepM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '10月'" class="divBox">
                        <span class="palm"> {{ row['oct'] }} </span>
                        <span class="molds"> {{ row['octM'] }} </span>
                     </div>
                     <div v-else-if="item.columnCname == '11月'" class="divBox">
                        <span class="palm"> {{ row['nov'] }} </span>
                        <span class="molds"> {{ row['novM'] }} </span>
                     </div>                     
                     <div v-else-if="item.columnCname == '12月'" class="divBox">
                        <span class="palm"> {{ row['dec'] }} </span>
                        <span class="molds"> {{ row['decM'] }} </span>
                     </div>                     
                     <div v-else-if="item.columnCname == '总计'" class="divBox">
                        <span class="palm"> {{ row['total'] }} </span>
                        <span class="molds"> {{ row['totalM'] }} </span>
                     </div>           
                    <div v-else>
                        {{ row[item.columnName] }}
                    </div>
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
@import './customeranalysis.less';
</style>