<template>
    <div id="receiptEntry">
        <div class="contentBox">
             <div class="searchBox">
                <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item>
                        <!-- <el-button size="small" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button size="small" @click="resetForm('ruleForm')">清空</el-button>
                        <el-button size="small" @click="$router.back(-1)">返回</el-button> -->
                        <el-button size="small" :icon="item.icon" v-for="(item,index) in listToolBarOperation" :key="index" v-show="item.operationName=='下载导入模板'||item.operationName=='一键导入流水'||item.operationName=='新增收款账号'" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                         <!-- <el-button size="small" @click="addAccount">新增收款账号</el-button>
                         <el-button size="small" @click="addReceiptEntry">新增流水</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
             <el-table :data="tableData" border v-loading="loading" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                    <template slot-scope="{row, $index}">
                        <div v-if="item.columnCname == '操作'">
                            <span v-for="(btnitem,index) in listOneTableOperation" style="margin-right: 3px;" :key="index" v-show='btnitem.operationName=="录入流水"||btnitem.operationName=="查看账套流水"'>
                                <el-button size="mini" round v-if='btnitem.operationName=="录入流水"'  @click.stop="addReceiptEntry($index, row)">{{btnitem.operationName}}</el-button>
                                <el-button size="mini" round v-else-if='btnitem.operationName=="查看账套流水"' @click.stop="checkReceiptEntry($index, row)">{{btnitem.operationName}}</el-button>
                            </span>
                        </div>
                        <div v-else-if="item.columnCname == '增值税'">
                            {{row.addedTax}}%
                        </div>
                        <div v-else>
                            {{ row[item.columnName] }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
             <el-dialog :title="dialogTitle"  :visible.sync="dialog" width="550px"  class="receiptEntryDialog" >
                 <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
                     <el-form-item label="收款账号:" prop="accountCode">
                        <el-input v-model="initDialogForm.accountCode" autocomplete="off" ></el-input>
                    </el-form-item>
                     <el-form-item label="收款银行:" prop="gbank" class="rightMargin">
                        <el-select v-model="initDialogForm.gbank" placeholder="请选择:" >
                            <el-option v-for="item in bankList" :key="item.id"  :label="item.cname" :value="item.cname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="收款支行:" prop="bankCname" >
                        <el-input  v-model="initDialogForm.bankCname" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="收款人名称:" prop="accountCname" class="rightMargin">
                        <el-input v-model="initDialogForm.accountCname" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="增值税:" prop="addedTax" >
                        <el-input type="number" v-model="initDialogForm.addedTax" autocomplete="off" ></el-input>
                    </el-form-item>
                     <el-form-item label="币种:" prop="currencyCode" class="rightMargin">
                        <el-select v-model="initDialogForm.currencyCode" placeholder="请选择:">
                            <el-option v-for="item in currencyCodeList" :key="item.id"  :label="item.rateCname" :value="item.currency">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" class="remarks">
                        <el-input type="textarea" v-model="initDialogForm.remarks"></el-input>
                    </el-form-item>
                 </el-form>
                 <div slot="footer" class="dialog-footer">
                    <el-button  style="margin-left: 13%;" v-show='item.operationName=="确定"||item.operationName=="取消"' v-for="(item,index) in listToolBarOperation" :class='{confirmBtn:item.operationName=="确定"}' :key="index" @click="dialogEven(item.operationName)">
                    {{item.operationName}}
                    </el-button>
                </div>
             </el-dialog>
              <el-dialog :title="addReceiptEntryDialogTitle"  :visible.sync="addReceiptEntryDialog" width="1070px"  class="addReceiptEntryDialog" >
                 <el-form :model="addReceiptEntryDialogForm" :rules="addReceiptEntryDialogRules" ref="addReceiptEntryDialogForm" :inline="true" size="mini">
                     <el-form-item label="收款账号:">
                        <el-input v-model="addReceiptEntryDialogForm.accountCode" autocomplete="off" :disabled='true' ></el-input>
                    </el-form-item>
                    <el-form-item label="收款银行:">
                        <el-input v-model="addReceiptEntryDialogForm.bankCname" autocomplete="off" :disabled='true' ></el-input>
                    </el-form-item>
                    <el-form-item label="收款人名称:">
                        <el-input v-model="addReceiptEntryDialogForm.accountCname" autocomplete="off" :disabled='true' ></el-input>
                    </el-form-item>
                    <el-form-item label="增值税:" class="rightMargin">
                        <el-input v-model="addReceiptEntryDialogForm.addedTax" autocomplete="off" :disabled='true' ></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称:" prop="customerFullname">
                        <el-select v-model="addReceiptEntryDialogForm.customerFullname" filterable :filter-method="getCustomerFullname" placeholder="请选择:"  @change="selectCustomerFullname">
                            <el-option v-for="item in customerFullnameList" :key="item"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户编号:" prop="customerCode">
                        <el-select v-model="addReceiptEntryDialogForm.customerCode" filterable :filter-method="getCustomerCode" placeholder="请选择:"  @change="selectCustomerCode">
                            <el-option v-for="item in customerCodeList" :key="item"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务员:" prop="salesUsercode">
                        <el-input v-model="addReceiptEntryDialogForm.salesUsercode" autocomplete="off" ></el-input>
                        <!-- <el-select v-model="addReceiptEntryDialogForm.salesUsercode"  @change="selectSalesUsercode">
                            <el-option v-for="item in salesUserCodeList" :key="item"  :label="item" :value="item">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="收款日期:" prop="tranDate" class="rightMargin">
                        <el-date-picker v-model="addReceiptEntryDialogForm.tranDate" type="date" :disabled='addReceiptEntryDialogForm.currencyCode==""||addReceiptEntryDialogForm.currencyCode==null' value-format="yyyy-MM-dd" @change="selectTranDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item type="number" label="实收原币金额:" prop="receiptsAmount" >
                        <el-input v-model="addReceiptEntryDialogForm.receiptsAmount" autocomplete="off" ></el-input>
                    </el-form-item>
                     <el-form-item label="币种:" prop="currencyCode">
                        <el-select v-model="addReceiptEntryDialogForm.currencyCode" placeholder="请选择:"  @change="selectCurrencyCode">
                            <el-option v-for="item in currencyCodeList" :key="item.id"  :label="item.rateCname" :value="item.currency">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="汇率:">
                        <el-input v-model="addReceiptEntryDialogForm.rate" autocomplete="off" :disabled='true'></el-input>
                    </el-form-item>
                     <el-form-item label="实收人民币:" class="rightMargin">
                        <el-input v-model="addReceiptEntryDialogForm.rmbAmount" autocomplete="off" :disabled='true'></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remarks" class="remarks">
                        <el-input type="textarea" v-model="addReceiptEntryDialogForm.remarks"></el-input>
                    </el-form-item>
                 </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button  style="margin-left: 13%;" v-show='item.operationName=="确定"||item.operationName=="取消"' v-for="(item,index) in listToolBarOperation" :class='{confirmBtn:item.operationName=="确定"}' :key="index" @click="addReceiptEntryDialogEven(item.operationName)">
                    {{item.operationName}}
                    </el-button>
                </div>
             </el-dialog>
        </div>
    </div>
</template>
<script>
export { default } from './script'
</script>
<style lang="less">
 @import '../../common/css/style.less';
</style>