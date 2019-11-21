<template>
    <div id="productionGrab">
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
                            <el-date-picker v-model="ruleForm.start" type="date" value-format="yyyy-MM-dd" :picker-options="startDatePicker" ref="searchStart" placeholder="起始日期" size="small" prefix-icon=" "></el-date-picker>
                        </el-form-item>
                        <el-form-item style="margin: 0 5px;">-</el-form-item>
                        <el-form-item prop="end" style="margin: 0;">
                             <el-date-picker v-model="ruleForm.end" type="date" value-format="yyyy-MM-dd" :picker-options="endDatePicker" ref="searchEnd" placeholder="结束日期" size="small" prefix-icon=" "></el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item prop="statusCode">
                        <el-select v-model="ruleForm.statusCode" placeholder="状态" size="small">
                            <el-option label="待放单" value="0"></el-option>
                            <el-option label="抢单中" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                    </el-form-item>
                </el-form>
             </div>
            <el-table ref="tableCus" :row-style="{height:'50px'}" :cell-style="{padding:'0px'}" stripe size="mini" :height="tableHeight" :max-height="tableHeight" :data="tableDataOne" @expand-change="expandSelect" border v-loading="loading" element-loading-text="拼命加载中" style="width: 100%">
                <el-table-column type="expand" align="center">
                    <template>
                         <el-form label-position="left" inline class="demo-table-expand">
                            <!--3D打印-->
                            <el-table  class="tableStyleQuotation"  show-summary :summary-method="getTotal3D" v-show="twoTableShow3d" border v-loading="loading" :data="tableDataTwo3d" style="width: 100%">
                                <el-table-column v-for="item in tHeadDataTwo3d" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                                    <template slot-scope="{row, $index}" >
                                        <div v-if='item.columnCname=="产品名称"'>
                                            <div class="productionName">{{row.attachmentOriginal3dname}}</div>
                                            <div class="productionType">
                                                <span v-if="row.technologyCategory=='4'">复模</span>
                                                <span v-else-if="row.technologyCategory=='3'">3D打印</span>
                                                <span v-else-if="row.technologyCategory=='10'">快速模具</span>
                                                <span v-else-if="row.technologyCategory=='1'">CNC塑料</span>
                                                <span v-else>CNC金属</span>
                                            </div>
                                            <div class="productionImg">
                                                <img :src="row.imagenamePath" alt="">
                                            </div>
                                        </div>
                                        <div v-else-if='item.columnCname=="规格"' class="specification">
                                            <p><span class="title">尺 寸:</span><span>{{row.dimensionX}}x{{row.dimensionY}}x{{row.dimensionZ}}</span></p>
                                            <p><span class="title">工 艺:</span><span>{{row.technologyCname}}</span></p>
                                            <p><span class="title">材 料:</span><span>{{row.partMaterialCname}}</span></p>
                                            <p><span class="title">后处理:</span><span>{{row.finishqualityName}}</span></p>
                                        </div>
                                         <div v-else-if='item.columnCname=="攻牙"'>
                                             {{row.threadQty>0?'有':'无'}}
                                         </div>
                                        <div v-else>
                                            {{ row[item.columnName] }}
                                        </div>
                                    </template>
                                </el-table-column> 
                            </el-table>
                            <!--CNC金属-->
                            <el-table  class="tableStyleQuotation" show-summary :summary-method="getTotal3D" v-show="twoTableShowCncm" border v-loading="loading"  :data="tableDataTwoCncm" style="width: 100%">
                                <el-table-column v-for="item in tHeadDataTwoCncm" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                                    <template slot-scope="{row, $index}" >
                                       <div v-if='item.columnCname=="产品名称"'>
                                            <div class="productionName">{{row.attachmentOriginal3dname}}</div>
                                            <div class="productionType">
                                                <span v-if="row.technologyCategory=='4'">复模</span>
                                                <span v-else-if="row.technologyCategory=='3'">3D打印</span>
                                                <span v-else-if="row.technologyCategory=='10'">快速模具</span>
                                                <span v-else-if="row.technologyCategory=='1'">CNC塑料</span>
                                                <span v-else>CNC金属</span>
                                            </div>
                                            <div class="productionImg">
                                                <img :src="row.imagenamePath" alt="">
                                            </div>
                                        </div>
                                        <div v-else-if='item.columnCname=="规格"' class="specification">
                                            <p><span class="title">尺 寸:</span><span>{{row.dimensionX}}x{{row.dimensionY}}x{{row.dimensionZ}}</span></p>
                                            <p><span class="title">工 艺:</span><span>{{row.technologyCname}}</span></p>
                                            <p><span class="title">材 料:</span><span>{{row.partMaterialCname}}</span></p>
                                            <p><span class="title">后处理:</span><span>{{row.finishqualityName}}</span></p>
                                        </div>
                                         <div v-else-if='item.columnCname=="攻牙"'>
                                             {{row.threadQty>0?'有':'无'}}
                                         </div>
                                        <div v-else>
                                            {{ row[item.columnName] }}
                                        </div>
                                    </template>
                                </el-table-column> 
                            </el-table>
                            <!--CNC塑料-->
                            <el-table  class="tableStyleQuotation" show-summary :summary-method="getTotal3D" v-show="twoTableShowCncp" border v-loading="loading"  :data="tableDataTwoCncp" style="width: 100%">
                                <el-table-column v-for="item in tHeadDataTwoCncp" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                                    <template slot-scope="{row, $index}" >
                                        <div v-if='item.columnCname=="产品名称"'>
                                            <div class="productionName">{{row.attachmentOriginal3dname}}</div>
                                            <div class="productionType">
                                                <span v-if="row.technologyCategory=='4'">复模</span>
                                                <span v-else-if="row.technologyCategory=='3'">3D打印</span>
                                                <span v-else-if="row.technologyCategory=='10'">快速模具</span>
                                                <span v-else-if="row.technologyCategory=='1'">CNC塑料</span>
                                                <span v-else>CNC金属</span>
                                            </div>
                                            <div class="productionImg">
                                                <img :src="row.imagenamePath" alt="">
                                            </div>
                                        </div>
                                        <div v-else-if='item.columnCname=="规格"' class="specification">
                                            <p><span class="title">尺 寸:</span><span>{{row.dimensionX}}x{{row.dimensionY}}x{{row.dimensionZ}}</span></p>
                                            <p><span class="title">工 艺:</span><span>{{row.technologyCname}}</span></p>
                                            <p><span class="title">材 料:</span><span>{{row.partMaterialCname}}</span></p>
                                            <p><span class="title">后处理:</span><span>{{row.finishqualityName}}</span></p>
                                        </div>
                                         <div v-else-if='item.columnCname=="攻牙"'>
                                             {{row.threadQty>0?'有':'无'}}
                                         </div>
                                        <div v-else>
                                            {{ row[item.columnName] }}
                                        </div>
                                    </template>
                                </el-table-column> 
                            </el-table>
                             <!--复模-->
                            <el-table  class="tableStyleQuotation" show-summary :summary-method="getTotalVc" v-show="twoTableShowVc" border v-loading="loading"  :data="tableDataTwoVc" style="width: 100%">
                                <el-table-column v-for="item in tHeadDataTwoVc" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                                    <template slot-scope="{row, $index}" >
                                        <div v-if='item.columnCname=="产品名称"'>
                                            <div class="productionName">{{row.attachmentOriginal3dname}}</div>
                                            <div class="productionType">
                                                <span v-if="row.technologyCategory=='4'">复模</span>
                                                <span v-else-if="row.technologyCategory=='3'">3D打印</span>
                                                <span v-else-if="row.technologyCategory=='10'">快速模具</span>
                                                <span v-else-if="row.technologyCategory=='1'">CNC塑料</span>
                                                <span v-else>CNC金属</span>
                                            </div>
                                            <div class="productionImg">
                                                <img :src="row.imagenamePath" alt="">
                                            </div>
                                        </div>
                                        <div v-else-if='item.columnCname=="规格"' class="specification">
                                            <p><span class="title">尺 寸:</span><span>{{row.dimensionX}}x{{row.dimensionY}}x{{row.dimensionZ}}</span></p>
                                            <p><span class="title">工 艺:</span><span>{{row.technologyCname}}</span></p>
                                            <p><span class="title">材 料:</span><span>{{row.partMaterialCname}}</span></p>
                                            <p><span class="title">后处理:</span><span>{{row.finishqualityName}}</span></p>
                                        </div>
                                         <div v-else-if='item.columnCname=="攻牙"'>
                                             {{row.threadQty>0?'有':'无'}}
                                         </div>
                                        <div v-else>
                                            {{ row[item.columnName] }}
                                        </div>
                                    </template>
                                </el-table-column> 
                            </el-table>
                             <!--快速模具-->
                            <el-table  class="tableStyleQuotation" show-summary :summary-method="getTotalFm" :span-method="quoteSpanMethod" v-show="twoTableShowFm" border v-loading="loading"  :data="tableDataTwoFm" style="width: 100%">
                                 <template v-for="item in tHeadDataTwoFm">
                                    <el-table-column
                                        v-if='item.columnCname=="产品名称"'
                                        :width="item.columnWidth"
                                        :key="item.id"
                                        :label="item.columnCname"
                                        align="center" >
                                        <template slot-scope="scope">
                                            <div class="productionName">{{scope.row.attachmentOriginal3dname}}</div>
                                            <div class="productionType">
                                                <span v-if="scope.row.technologyCategory=='4'">复模</span>
                                                <span v-else-if="scope.row.technologyCategory=='3'">3D打印</span>
                                                <span v-else-if="scope.row.technologyCategory=='10'">快速模具</span>
                                                <span v-else-if="scope.row.technologyCategory=='1'">CNC塑料</span>
                                                <span v-else>CNC金属</span>
                                            </div>
                                            <div class="productionImg">
                                                <img :src="scope.row.imagenamePath" alt="">
                                            </div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        v-else-if='item.columnCname=="产品尺寸"'
                                        :width="item.columnWidth"
                                        :key="item.id"
                                        :label="item.columnCname"
                                        align="center" >
                                        <template slot-scope="scope">
                                            <div>{{scope.row.dimensionX}}x{{scope.row.dimensionY}}x{{scope.row.dimensionZ}}g</div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                            v-else-if='item.columnCname=="模具钢料"'
                                            :width="item.columnWidth"
                                            :key="item.id"
                                            :label="item.columnCname"
                                            align="center" >
                                            <el-table-column label="模坯" width="100" align="center" >
                                            <template slot-scope="scope">
                                                {{scope.row.mouldBaseType}}
                                            </template>
                                            </el-table-column>
                                            <el-table-column label="模仁" width="100" align="center" >
                                                <template slot-scope="scope">
                                                    {{scope.row.masterMaterialCname}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column  label="行位/斜顶" width="100" align="center" >
                                                <template slot-scope="scope">
                                                    {{scope.row.mouldSlideCount+'/'+scope.row.mouldLifterCount}}
                                                </template>
                                            </el-table-column>
                                      </el-table-column>
                                       <el-table-column
                                            v-else
                                            :width="item.columnWidth"
                                            :key="item.id"
                                            :prop="item.columnName"
                                            :label="item.columnCname"
                                            align="center" >
                                            <template slot-scope="scope">
                                                {{scope.row[item.columnName]}}
                                            </template>
                                        </el-table-column>
                                 </template>
                            </el-table>
                            <ul class="totalAll">
                                <li>合计：</li>
                                <li>重量：g</li>
                                <li>总数量：</li>
                                <li>总价格：</li>
                            </ul>
                         </el-form>
                    </template>
                </el-table-column>
                 <el-table-column label="操作" width="80" align="center">
                     <template scope="scope">
                        <span v-for="(btnitem,index) in oneOperation"  :key="index" v-show='btnitem.operationName=="抢单"||btnitem.operationName=="开始抢单"||btnitem.operationName=="停止抢单"'>
                            <el-button size="mini" round v-if='btnitem.operationName=="抢单"'  @click.stop="clickRCW(scope.$index, scope.row)">{{btnitem.operationName}}</el-button>
                            <el-button size="mini" round v-if='btnitem.operationName=="开始抢单"'  @click.stop="clickRCW(scope.$index, scope.row)">{{btnitem.operationName}}</el-button>
                            <el-button size="mini" round v-if='btnitem.operationName=="停止抢单"'  @click.stop="clickRCW(scope.$index, scope.row)">{{btnitem.operationName}}</el-button>
                        </span>
                     </template>
                 </el-table-column>
                 <template v-for="item in tHeadDataOne">
                    <el-table-column
                        v-if='item.columnCname=="业务员"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center" >
                    </el-table-column>
                     <el-table-column
                        v-else-if='item.columnCname=="跟单员"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center" >
                    </el-table-column>
                     <el-table-column
                        v-else-if='item.columnCname=="品检员"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center" >
                    </el-table-column>
                     <el-table-column
                        v-else-if='item.columnCname=="打包员"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center" >
                    </el-table-column>
                    <el-table-column
                        v-else-if='item.columnCname=="进度"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :label="item.columnCname"
                        align="center" >
                        <template>
                            <el-progress :percentage="0" :text-inside='true'></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-else-if='item.columnCname=="附件"'
                        :width="item.columnWidth"
                        :key="item.id"
                        :label="item.columnCname"
                        align="center" >
                         <template slot-scope="scope">
                           <el-button  size="mini" round @click="downFile(scope.$index, scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-else
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center" >
                        <template slot-scope="scope">
                            {{scope.row[item.columnName]}}
                        </template>
                    </el-table-column>
                 </template>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[15, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export { default } from './js/productionGrab'
</script>
<style lang="less">
 @import './style.less';
</style>