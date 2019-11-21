<template>
    <div id="salesDailywork">
        <div class="left" id="left">
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
                <el-form-item prop="beginDate">
                    <el-date-picker  v-model="ruleForm.beginDate"  type="month"  placeholder="选择年月" value-format="yyyy-MM" @change="searchDate"></el-date-picker>
                </el-form-item>
                <el-form-item prop="Date">
                    <el-date-picker v-model="ruleForm.Date"  type="date" :picker-options="dateCheck" :default-value='defaultDate' value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index"  @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                    <span style="margin-left: 10px;" v-for="(item,index) in listToolBarOperation" :key="'item'+index" v-show='item.operationName=="导出Excel"'>
                        <el-button size="small" v-if='item.operationName=="导出Excel"' @click.stop="downExcel()">{{item.operationName}}</el-button>
                    </span>
                </el-form-item>
                </el-form>
            </div>
             <el-table :data="tableData" border v-loading="loading" style="width: 100%" stripe size="mini" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                <template slot-scope="{row, $index}">
                    <div v-if="item.columnCname == '操作'">
                        <div  class="table_btn" style="margin-right: 0;" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="修改"||btnitem.operationName=="保存"'>
                            <div v-if='row.isEdit'>
                                <span class="hover_selec5" v-if='btnitem.operationName=="保存"' title="保存" @click.stop="save($index, row)"></span>
                            </div>
                            <div v-else>
                                <span class="hover_selec1" v-if='btnitem.operationName=="修改"' title="修改" @click.stop="edit($index, row)"></span>
                            </div>
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '邮件数量'">
                        <div v-if="row.isEdit"><el-input v-model="row.emailCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '电话数量'">
                        <div v-if="row.isEdit"><el-input v-model="row.callCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '找资料数'">
                        <div v-if="row.isEdit"><el-input v-model="row.lookingForInfo"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '客访数'">
                        <div v-if="row.isEdit"><el-input v-model="row.customerVisitCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '访客数'">
                        <div v-if="row.isEdit"><el-input v-model="row.visitCustomerCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '报价单数'">
                        <div v-if="row.isEdit"><el-input v-model="row.quoteCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '报价金额'">
                        <div v-if="row.isEdit"><el-input v-model="row.quoteCost"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '订单数量'">
                        <div v-if="row.isEdit"><el-input v-model="row.orderCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '订单金额'">
                        <div v-if="row.isEdit"><el-input v-model="row.orderCost"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '发货金额'">
                        <div v-if="row.isEdit"><el-input v-model="row.packingListCount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '回款金额'">
                        <div v-if="row.isEdit"><el-input v-model="row.paymentAmount"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
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
</style>
