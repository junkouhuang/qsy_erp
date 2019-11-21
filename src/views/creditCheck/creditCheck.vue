<template>
    <div id="creditCheck">
         <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item prop="tranNo">
                        <el-input placeholder="流水号" v-model="ruleForm.tranNo" suffix-icon="el-icon-search" size="small"></el-input>                    </el-form-item>
                    <el-form-item  prop="customerCode">
                        <el-input placeholder="客户编号" v-model="ruleForm.customerCode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item  prop="gbank">
                        <el-select v-model="ruleForm.gbank" placeholder="收款银行" size="small">
                            <el-option v-for="item in bankList" :key="item.id" :label="item.cname" :value="item.cname"></el-option>
                        </el-select>
                    </el-form-item>
                    <div style="display: inline-block;">
                        <el-form-item prop="dateType" style="margin: 0;">
                        <el-select v-model="ruleForm.dateType" placeholder="日期类型" size="small">
                            <el-option label="收款日期" value="1"></el-option>
                            <el-option label="录入日期" value="2"></el-option>
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
                    </el-form-item>
                </el-form>
            </div>
             <el-table :data="tableData" show-summary :summary-method="getSummaries" border v-loading="loading" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                    <template slot-scope="{row, $index}" >
                       <div v-if="item.columnCname == '操作'">
                            <span v-for="(btnitem,index) in listOneTableOperation"  :key="index" v-show='btnitem.operationName=="冲红"' :class='{RushRed:row.rmbAmount<0}'>
                                <el-button size="mini" round v-if='btnitem.operationName=="冲红"' v-show='row.tranStauts!="已冲红"'  @click.stop="clickRCW($index, row)">{{btnitem.operationName}}</el-button>
                            </span>
                        </div>
                        <div v-else-if="item.columnCname == '状态'" :class='{noTranStauts:row.tranStauts=="待核销",RushRed:row.rmbAmount<0}'>
                            {{row.tranStauts}}
                        </div>
                        <div v-else-if="item.columnCname == '查看图片'" :class='{RushRed:row.rmbAmount<0}'>
                            <el-button  size="mini" round @click="checkImg($index, row)">查看图片</el-button>
                        </div>
                        <div v-else :class='{RushRed:row.rmbAmount<0}'>
                            {{ row[item.columnName] }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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