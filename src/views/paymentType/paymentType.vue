<template>
    <div id="paymentType">
         <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item prop="tranNo">
                        <el-input placeholder="流水号" v-model="ruleForm.tranNo" suffix-icon="el-icon-search" size="small"></el-input>                    
                    </el-form-item>
                     <el-form-item  prop="supplierCode">
                         <el-select v-model="ruleForm.supplierCode" filterable :filter-method="getSupplierCode" placeholder="生产商编号:"  @change="selectSupplierCode">
                            <el-option v-for="(item,index) in supplierCodeList" :key="index"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="supplierName">
                        <el-select v-model="ruleForm.supplierName" filterable :filter-method="getSupplierName" placeholder="生产商名称:"  @change="selectSupplierName">
                            <el-option v-for="(item,index) in supplierNameList" :key="index"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="tranStauts">
                        <el-select v-model="ruleForm.tranStauts" placeholder="状态" size="small">
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
             <el-table :data="tableData" show-summary :summary-method="getSummaries" border v-loading="loading" :default-sort = "{prop: 'tranNo', order: 'descending'}" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
                <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center" sortable>
                    <template slot-scope="{row, $index}" >
                       <div v-if="item.columnCname == '操作'">
                            <span v-for="(btnitem,index) in listOneTableOperation"  :key="index" v-show='btnitem.operationName=="冲红"' :class='{RushRed:row.payAmount<0}'>
                                <el-button size="mini" round v-if='btnitem.operationName=="冲红"' v-show='row.tranStauts!="已冲红"'  @click.stop="clickRCW($index, row)">{{btnitem.operationName}}</el-button>
                            </span>
                        </div>
                        <div v-else-if="item.columnCname == '状态'" :class='{noTranStauts:row.tranStauts=="待核销",RushRed:row.payAmount<0}'>
                            {{row.tranStauts}}
                        </div>
                        <div v-else-if="item.columnCname == '查看图片'" :class='{RushRed:row.payAmount<0}'>
                            <el-button  size="mini" round @click="checkImg($index, row)">查看图片</el-button>
                        </div>
                        <div v-else :class='{RushRed:row.payAmount<0}'>
                            {{ row[item.columnName] }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
             <el-dialog :title="dialogTitle"  :visible.sync="dialog" width="700px"  class="paymentTypeDialog" >
                  <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
                    <el-form-item label="生产商名称"  prop="supplierName">
                        <el-select v-model="initDialogForm.supplierName" filterable :filter-method="getSupplierName" placeholder="请选择:"  @change="formSelectSupplierName">
                            <el-option v-for="(item,index) in supplierNameList" :key="index"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="生产商编号:" prop="supplierCode">
                         <el-select v-model="initDialogForm.supplierCode" filterable :filter-method="getSupplierCode" placeholder="请选择:"  @change="formSelectSupplierCode">
                            <el-option v-for="(item,index) in supplierCodeList" :key="index"  :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收款银行:" prop="accountBankname" class="rightMargin">
                        <el-select v-model="initDialogForm.accountBankname" placeholder="请选择:" >
                            <el-option v-for="item in bankList" :key="item.id"  :label="item.cname" :value="item.cname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="打款银行:" prop="payBankname" >
                        <el-select v-model="initDialogForm.payBankname" placeholder="请选择:" >
                            <el-option v-for="item in bankList" :key="item.id"  :label="item.cname" :value="item.cname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item type="number" label="金额:" prop="payAmount" >
                        <el-input v-model="initDialogForm.payAmount " autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="收款日期:" prop="tranDate" class="rightMargin">
                        <el-date-picker v-model="initDialogForm.tranDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                     <el-form-item class="boolAdvancePayment">
                        <el-checkbox v-model="initDialogForm.boolAdvancePayment">预付款</el-checkbox>
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