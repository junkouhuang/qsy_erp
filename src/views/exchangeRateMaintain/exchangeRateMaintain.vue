<template>
  <div id="exchangeRateMaintain">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <div style="display: inline-block;">
            <el-form-item prop="YearMonth">
              <el-date-picker
                v-model="ruleForm.YearMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择年月">
             </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item prop="rateCname">
            <el-select v-model="ruleForm.rateCname"  placeholder="选择币种">
              <el-option v-for="item in currencyList" :key="item.id"  :label="item.cname" :value="item.cname">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
                <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border  :span-method="listSpanMethod"  v-loading="loading" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
        <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
          <template slot-scope="{row, $index}">
            <div v-if="item.columnCname == '操作'">
                <div v-for="(btnitem,index) in listOneTableOperation" :key="index">
                    <el-button size="mini" v-if='btnitem.operationName=="修改"' round @click.stop="edit($index, row)">{{btnitem.operationName}}</el-button>
                </div>
            </div>
            <div v-else>
                {{ row[item.columnName] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialog"
        width="815px"
        class="exchangeRateMaintainDialog"
      >
       <el-table :data="currencyListData" border >
            <el-table-column prop="rateCname" label="币种名称" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="currency" label="币种" width="160"  align="center" > 
            </el-table-column>
            <el-table-column label="汇率" width="180"  align="center" > 
                <template slot-scope="{row}">
                <div>
                   <el-input v-model="row.rate"  size="mini"></el-input>
                </div>
            </template>
            </el-table-column>
            <el-table-column label="备注"  align="center" > 
              <template slot-scope="{row}">
                <div>
                   <el-input v-model="row.remarks"  size="mini"></el-input>
                </div>
              </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button :type="item.type" :class='{confirmBtn:item.operationName=="确定"}' v-for="(item,index) in listToolBarOperation"  :key="index" @click="dialogEven(item.operationName)">
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
