<template>
  <div id="dailyInventoryMaintenance">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="index"></span>搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item prop="dates">
             <el-date-picker v-model="ruleForm.dates" type="date" size="small"  placeholder="日期查询" value-format="yyyy-MM-dd" @change="searchDate">
             </el-date-picker>
          </el-form-item>
          <el-form-item prop="orderType">
            <el-select v-model="ruleForm.orderType" placeholder="全部类别" size="small" @change="changeSelectOrderType">
                 <el-option label="手板" value="1"></el-option>
                 <el-option label="模具" value="2"></el-option>
                 <el-option label="钣金" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button  size="small" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button  plain size="small" @click="resetForm('ruleForm')">清空</el-button>
            <el-button  size="small" @click="downTemplate">导入Excel</el-button>
            <el-button  size="small" @click="$router.back(-1)">返回</el-button> -->
            <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
            <span style="margin-left: 10px;" v-for="(tableItem,index) in listOneTableOperation" :key="'item'+index" v-show='tableItem.operationName=="修改"||tableItem.operationName=="保存"'>
                <el-button size="small" v-if='tableItem.operationName=="修改"' v-show="isSave" @click.stop="edit()">{{tableItem.operationName}}</el-button>
                <el-button size="small" v-else-if='tableItem.operationName=="保存"' v-show="isEdit" @click.stop="save()">{{tableItem.operationName}}</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
       <el-table :data="tableData" border v-loading="loading" :span-method="objectSpanMethod" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
            <el-table-column v-for="(item, i) in tHeadData" :key="i" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
              <template slot-scope="{row, $index}">
                    <div v-if="item.columnCname == '操作'">
                        <div class="table_btn" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="删除"'>
                             <el-button class="hover_selec2" v-if='btnitem.operationName=="删除"' :disabled='isEdit' :class="{actived:isDelActive==$index }" title="删除" @click.stop="del($index, row)"></el-button>
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '昨日下单量'" >
                        <div v-if="isEdit"><el-input v-model="row.yestdOrderNumh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '今日存量'">
                        <div v-if="isEdit"><el-input v-model="row.todayOrderNumh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '启动存量'" >
                        <div v-if="isEdit"><el-input v-model="row.startOrderNumh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '正常单日生产量'">
                        <div v-if="isEdit"><el-input v-model="row.dailyCapacityh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '其他客户存量'" >
                        <div v-if="isEdit"><el-input v-model="row.othercusOrderNumh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == 'HLH存量'">
                        <div v-if="isEdit"><el-input v-model="row.hlhOrderNumh"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '余下HLH订单数'" >
                        <div v-if="isEdit"><el-input v-model="row.hlhOrderNum"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '余下HLH订单金额'">
                        <div v-if="isEdit"><el-input v-model="row.hlhOrderCost"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                     <div v-else-if="item.columnCname == '迟交单数'" >
                        <div v-if="isEdit"><el-input v-model="row.lateDeliveryNum"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '返工单数'">
                        <div v-if="isEdit"><el-input v-model="row.reworkNum"  size="mini"></el-input></div>
                        <div v-else>
                          {{ row[item.columnName] }}
                        </div>
                    </div>
                    <div v-else-if="item.columnCname == '备注'">
                        <div v-if="isEdit"><el-input v-model="row.remarks"  size="mini"></el-input></div>
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
        <el-dialog title="添加工序"  :visible.sync="dialog"    width="800px"  class="dailyInventoryMaintenanceDialog"  >
          <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
            <el-form-item label="工序类别" prop="orderType">
              <el-radio-group v-model="initDialogForm.orderType" @change="selectOrderType">
                <el-radio label="1">手板</el-radio>
                <el-radio label="2">模具</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工序选择:" prop="processName" class="processName">
                <el-checkbox-group v-model="initDialogForm.processName" @change="selectProcessName">
                  <el-checkbox v-for="processNameItem in processNameData" :label="processNameItem.cname" :key="processNameItem.id">{{processNameItem.cname}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-table :data="listData" border >
                  <el-table-column prop="processName" label="工序" min-width="100"  align="center" > 
                  </el-table-column>
                  <el-table-column label="昨日下单量" min-width="100"  align="center" > 
                     <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.yestdOrderNumh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="今日存量" min-width="100"  align="center" > 
                    <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.todayOrderNumh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
                   <el-table-column label="启动存量" min-width="100"  align="center" > 
                    <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.startOrderNumh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
                   <el-table-column label="正常单日生产量" min-width="120"  align="center" > 
                    <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.dailyCapacityh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
                   <el-table-column label="其他客户存量" min-width="120"  align="center" > 
                    <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.othercusOrderNumh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="HLH存量" min-width="100" align="center" > 
                    <template slot-scope="{row}">
                        <div>
                          <el-input v-model="row.hlhOrderNumh"  size="mini"></el-input>
                        </div>
                    </template>
                  </el-table-column>
              </el-table>
          </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button :type="item.type" :class='{confirmBtn:item.operationName=="确定"}' v-for="(item,index) in listToolBarOperation"  :key="index" @click="dialogEven(item.operationName)">
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
