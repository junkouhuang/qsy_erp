<template>
    <div id="supplierInquiry">
        <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition">搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item label="" prop="quotationNo">
                        <!-- <span>订单编号：</span> -->
                        <el-input v-model="ruleForm.quotationNo" autocomplete="off" placeholder="订单编号"></el-input>
                        <!-- <el-select v-model="ruleForm.quotationNo"  filterable placeholder="请选择" size="small">
                                <el-option v-for="items in tableDataOne.rows" :key="items.id" :label="items.quotationNo" :value="items.quotationNo"></el-option>
                        </el-select>
                        <img class="searchIcoClass" src="../../assets/image/search.png" title="搜索" @click="searchTypeQuotation('quotationNo')"> -->
                    </el-form-item>
                    <el-form-item label="" prop="customerNo">
                        <!-- <span>跟单：</span> -->
                        <el-input v-model="ruleForm.customerNo" autocomplete="off" placeholder="跟单"></el-input>
                        <!-- <el-select v-model="ruleForm.customerNo"  filterable placeholder="请选择" size="small">
                            <el-option v-for="items in CustomerList" :key="items.id" :label="items.contactCode" :value="items.contactCode"></el-option>
                        </el-select>
                        <img class="searchIcoClass" src="../../assets/image/search.png" title="搜索" @click="searchTypeQuotation('contactCode')"> -->
                    </el-form-item>
                    <div style="display: inline-block;">
                        <el-form-item label="" prop="chooses" style="margin: 0;">
                        <el-select v-model="ruleForm.chooses" filterable placeholder="请选择" size="small">
                            <el-option v-for="item in dateOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item prop="start" style="margin: 0;">
                        <el-date-picker v-model="ruleForm.start" type="date" :picker-options="startDatePicker" ref="searchStart" placeholder="起始日期" size="small"></el-date-picker>
                        </el-form-item>
                        <el-form-item style="margin: 0 5px;">-</el-form-item>
                        <el-form-item prop="end" style="margin: 0;">
                        <el-date-picker v-model="ruleForm.end" type="date" :picker-options="endDatePicker" ref="searchEnd" placeholder="结束日期" size="small"></el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item label="" prop="statusSearch">
                        <span>状态查询：</span>
                        <el-select v-model="ruleForm.statusSearch" filterable placeholder="请选择" size="small">
                            <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span style="margin-right: 20px;" v-for="item in searchList" :key="item.id">
                            <el-button v-if="item.operationCode==='search'" :id="item.operationCode" :title="item.operationName" type="primary" size="small" icon="" @click="barSearchOperation">{{item.operationName}}</el-button>
                            <el-button v-if="item.operationCode==='empty'" :id="item.operationCode" :title="item.operationName" type="primary" size="small" icon="" @click="barEmptyOperation" >{{item.operationName}}</el-button>
                        </span>
                    </el-form-item>
                </el-form>
            </div>
            <el-table ref="tableCus" stripe size="mini" :row-style="{height:'50px'}" :cell-style="{padding:'0px'}" height="650px" :max-height="clientHeight" :data="tableDataOne.rows" @expand-change="expandSelect" border v-loading="loading" element-loading-text="拼命加载中" style="width: 100%">
                
                <el-table-column type="expand">
                    <template slot-scope="">
                       <el-form label-position="left" inline class="demo-table-expand">
                            <!--3D打印-->
                            <el-table class="tableStyleQuotation" v-show="twoTableShow3d" show-summary :summary-method="getTotal3D" border v-loading="loading" :data="tableDataTwo3d" style="width: 100%">
                                <template v-for="item in tHeadDataTwo3d">

                                    <el-table-column v-if="item.columnName==='operName'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <button  v-if="oper11.operationCode==='editRow'" @click.stop="editRowTwo(scope.$index, scope.row)" :title="oper11.operationName" :id="oper11.operationCode" class="quoEdit" >{{oper11.operationName}}</button>
                                            </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productName'" :width="item.columnWidth" :key="item.id"  :label="item.columnCname"  align="center">
                                        <template slot-scope="scope">
                                            <div :title="scope.row.attachmentOriginal3dname" class="attachmentName" >{{scope.row.attachmentOriginal3dname}}</div>
                                            <div>
                                                <span>3D打印</span>
                                            </div>
                                            <div>
                                                <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productRule'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                        <span>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">尺寸：</span>
                                                <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">工艺：</span>
                                                <span>{{ scope.row.technologyCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="divSpan">材料：</span>
                                                <span>{{ scope.row.partMaterialCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span>后处理：</span>
                                                <span>{{ scope.row.finishqualityName}}</span>
                                            </div>
                                        </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='attachmentOper'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <el-button v-if="oper11.operationCode==='downloadM'" class="operSpanOther" :title="oper11.operationName" @click="downLoadAttTwo(scope.$index, scope.row)" :id="oper11.operationCode">{{oper11.operationName}}</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>  

                                    <el-table-column v-else :width="item.columnWidth" :key="item.id" :prop="item.columnName" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.checkedColumn">
                                                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                                                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                                            </span>
                                            <span v-else>{{scope.row[item.columnName]}}</span>
                                        </template>
                                    </el-table-column>

                                </template>
                            </el-table>

                            <!--CNC金属-->
                            <el-table class="tableStyleQuotation" v-show="twoTableShowCncm" show-summary :summary-method="getTotalCncm" border v-loading="loading" :data="tableDataTwoCncm" style="width: 100%">
                                <template v-for="item in tHeadDataTwoCncm">

                                    <el-table-column v-if="item.columnName==='operName'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <button  v-if="oper11.operationCode==='editRow'" @click.stop="editRowTwo(scope.$index, scope.row)" :title="oper11.operationName" :id="oper11.operationCode" class="quoEdit" >{{oper11.operationName}}</button>
                                            </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productName'" :width="item.columnWidth" :key="item.id"  :label="item.columnCname"  align="center">
                                        <template slot-scope="scope">
                                            <div :title="scope.row.attachmentOriginal3dname" class="attachmentName" >{{scope.row.attachmentOriginal3dname}}</div>
                                            <div>
                                                <span>CNC金属</span>
                                            </div>
                                            <div>
                                                <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productRule'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                        <span>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">尺寸：</span>
                                                <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">工艺：</span>
                                                <span>{{ scope.row.technologyCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="divSpan">材料：</span>
                                                <span>{{ scope.row.partMaterialCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span>后处理：</span>
                                                <span>{{ scope.row.finishqualityName}}</span>
                                            </div>
                                        </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='attachmentOper'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <el-button v-if="oper11.operationCode==='downloadM'" class="operSpanOther" :title="oper11.operationName" @click="downLoadAttTwo(scope.$index, scope.row)" :id="oper11.operationCode">{{oper11.operationName}}</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>  

                                    <el-table-column v-else :width="item.columnWidth" :key="item.id" :prop="item.columnName" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.checkedColumn">
                                                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                                                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                                            </span>
                                            <span v-else>{{scope.row[item.columnName]}}</span>
                                        </template>
                                    </el-table-column>      

                                </template>
                            </el-table>

                            <!--CNC塑料-->
                            <el-table class="tableStyleQuotation" v-show="twoTableShowCncp" show-summary :summary-method="getTotalCncp" border v-loading="loading" :data="tableDataTwoCncp" style="width: 100%">
                                <template v-for="item in tHeadDataTwoCncp">

                                    <el-table-column v-if="item.columnName==='operName'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <button  v-if="oper11.operationCode==='editRow'" @click.stop="editRowTwo(scope.$index, scope.row)" :title="oper11.operationName" :id="oper11.operationCode" class="quoEdit" >{{oper11.operationName}}</button>
                                            </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productName'" :width="item.columnWidth" :key="item.id"  :label="item.columnCname"  align="center">
                                        <template slot-scope="scope">
                                            <div :title="scope.row.attachmentOriginal3dname" class="attachmentName" >{{scope.row.attachmentOriginal3dname}}</div>
                                            <div>
                                                <span>CNC塑料</span>
                                            </div>
                                            <div>
                                                <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productRule'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                        <span>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">尺寸：</span>
                                                <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">工艺：</span>
                                                <span>{{ scope.row.technologyCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="divSpan">材料：</span>
                                                <span>{{ scope.row.partMaterialCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span>后处理：</span>
                                                <span>{{ scope.row.finishqualityName}}</span>
                                            </div>
                                        </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='attachmentOper'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <el-button v-if="oper11.operationCode==='downloadM'" class="operSpanOther" :title="oper11.operationName" @click="downLoadAttTwo(scope.$index, scope.row)" :id="oper11.operationCode">{{oper11.operationName}}</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>  

                                    <el-table-column v-else :width="item.columnWidth" :key="item.id" :prop="item.columnName" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.checkedColumn">
                                                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                                                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                                            </span>
                                            <span v-else>{{scope.row[item.columnName]}}</span>
                                        </template>
                                    </el-table-column>

                                </template>
                            </el-table>

                            <!--复模-->
                            <el-table class="tableStyleQuotation" v-show="twoTableShowVc" show-summary :summary-method="getTotalVc" border v-loading="loading" :data="tableDataTwoVc" style="width: 100%">
                                <template v-for="item in tHeadDataTwoVc">

                                    <el-table-column v-if="item.columnName==='operName'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <button  v-if="oper11.operationCode==='editRow'" @click.stop="editRowTwo(scope.$index, scope.row)" :title="oper11.operationName" :id="oper11.operationCode" class="quoEdit" >{{oper11.operationName}}</button>
                                            </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productName'" :width="item.columnWidth" :key="item.id"  :label="item.columnCname"  align="center">
                                        <template slot-scope="scope">
                                            <div :title="scope.row.attachmentOriginal3dname" class="attachmentName" >{{scope.row.attachmentOriginal3dname}}</div>
                                            <div>
                                                <span>复模</span>
                                            </div>
                                            <div>
                                                <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productRule'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                        <span>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">尺寸：</span>
                                                <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="spanTitle">工艺：</span>
                                                <span>{{ scope.row.technologyCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span class="divSpan">材料：</span>
                                                <span>{{ scope.row.partMaterialCname}}</span>
                                            </div>
                                            <div class="trimmedSize">
                                                <span>后处理：</span>
                                                <span>{{ scope.row.finishqualityName}}</span>
                                            </div>
                                        </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='attachmentOper'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <el-button v-if="oper11.operationCode==='downloadM'" class="operSpanOther" :title="oper11.operationName" @click="downLoadAttTwo(scope.$index, scope.row)" :id="oper11.operationCode">{{oper11.operationName}}</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>  

                                    <el-table-column v-else :width="item.columnWidth" :key="item.id" :prop="item.columnName" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.checkedColumn">
                                                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                                                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                                            </span>
                                            <span v-else>{{scope.row[item.columnName]}}</span>
                                        </template>
                                    </el-table-column>      

                                </template>
                            </el-table>

                            <!--快速模具-->
                            <el-table class="tableStyleQuotation"  :span-method="quoteSpanMethodInquiry" v-show="twoTableShowFm" show-summary :summary-method="getTotalFm" border v-loading="loading" :data="tableDataTwoFm" style="width: 100%">
                                <template v-for="item in tHeadDataTwoFm">

                                    <el-table-column v-if="item.columnName==='operName'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <button  v-if="oper11.operationCode==='editRow'" @click.stop="editRowTwoMold(scope.$index, scope.row)" :title="oper11.operationName" :id="oper11.operationCode" class="quoEdit" >{{oper11.operationName}}</button>
                                            </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productName'" :width="item.columnWidth" :key="item.id"  :label="item.columnCname"  align="center">
                                        <template slot-scope="scope">
                                            <div :title="scope.row.attachmentOriginal3dname" class="attachmentName" >{{scope.row.attachmentOriginal3dname}}</div>
                                            <div>
                                                <span>快速模具</span>
                                            </div>
                                            <div>
                                                <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='productSize'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                        <span>
                                            <div class="trimmedSize">
                                                <span>({{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}})mm</span>
                                            </div>
                                        </span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='moldSteel'" :key="item.id" :label="item.columnCname" align="center">
                                        <el-table-column prop="moldMaterialCname" label="模胚">
                                        </el-table-column>
                                        <el-table-column prop="masterMaterialCname" label="模仁">
                                        </el-table-column>
                                        <el-table-column prop="" label="行位/斜顶">
                                        <template slot-scope="scope">
                                            <span>
                                            <div class="trimmedSize">
                                                <span>{{ scope.row.mouldSlideCount}}/{{ scope.row.mouldLifterCount}}</span>
                                            </div>
                                            </span>
                                        </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column v-else-if="item.columnName==='attachmentOper'" :width="item.columnWidth" :key="item.id" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="oper11 in twoOperation" :key="oper11.id">
                                                <el-button v-if="oper11.operationCode==='downloadM'" class="operSpanOther" :title="oper11.operationName" @click="downLoadAttTwo(scope.$index, scope.row)" :id="oper11.operationCode">{{oper11.operationName}}</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>  

                                    <el-table-column v-else :width="item.columnWidth" :key="item.id" :prop="item.columnName" :label="item.columnCname" align="center">
                                        <template slot-scope="scope">
                                            <span>{{scope.row[item.columnName]}}</span>
                                        </template>
                                    </el-table-column>      

                                </template>
                            </el-table>

                            <el-table v-show="footShow" border v-loading="loading" :show-header = "false" :data="countData" style="width: 100%; margin-bottom: 5px; margin-top:5px;">
                                <el-table-column prop="counts" align="center">
                                    <template slot-scope="scope">
                                        <div class="footerCount">{{scope.row.counts}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="weight" align="center">
                                    <template slot-scope="scope">
                                        <div class="footerCount">{{scope.row.weight}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="totalQty" align="center">
                                    <template slot-scope="scope">
                                        <div class="footerCount">{{scope.row.totalQty}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="zhePrice" align="center">
                                    <template slot-scope="scope">
                                        <div class="footerCount">{{scope.row.zhePrice}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>

                       </el-form>

                    </template>
                       
                </el-table-column>

                <template v-for="item in tHeadDataOne">

                    <el-table-column
                        v-if="item.columnName==='operName'"
                        :width="item.columnWidth"
                        :key="item.id"
                        :label="item.columnCname"
                        align="center">
                        <template slot-scope="scope">
                            <span v-for="oper1 in oneOperation" :key="oper1.id">
                                <el-button v-if="oper1.operationCode==='inquirySent' & scope.row.statusCode=='IQ1'" class="operSpanOther" :title="oper1.operationName" @click="inquirySentEvent(scope.$index, scope.row)" :id="oper1.operationCode">{{oper1.operationName}}</el-button>
                                <el-button v-if="oper1.operationCode==='downloadAttachments'" class="operSpanOther" :title="oper1.operationName" @click="downloadAttaEvent(scope.$index, scope.row)" :id="oper1.operationCode">{{oper1.operationName}}</el-button>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-else-if="item.columnName==='relatedNo'"
                        :width="item.columnWidth"
                        :key="item.id"
                        :label="item.columnCname"
                        align="center">
                        <template slot-scope="scope">
                            <span>
                                <span>
                                    <p
                                        style="cursor: pointer;"
                                        @click="getQuotationNo(scope.row.id)"
                                        :title="item.columnCname"
                                    >{{scope.row[item.columnName]}}</p>
                                </span>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-else-if="item.columnName==='statusCname'"
                        :width="item.columnWidth"
                        :key="item.id"
                        :label="item.columnCname"
                        align="center">
                        <template slot-scope="scope">
                                <span v-if="scope.row.statusCode==='IQ2'">
                                    {{scope.row[item.columnName]}}
                                </span>
                                <span style="color:blue;" v-else>
                                    {{scope.row[item.columnName]}}
                                </span>
                        </template>
                    </el-table-column>
                    
                    
                    <el-table-column
                        v-else
                        :width="item.columnWidth"
                        :key="item.id"
                        :prop="item.columnName"
                        :label="item.columnCname"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row[item.columnName]}}</span>
                        </template>
                    </el-table-column>

                </template>        

            </el-table>

            <!--报价单号-->
            <el-dialog :title="dialogTitle" :visible.sync="dialogQuo" width="400px" class="customerDialog">
                <el-form :inline="true" size="mini">
                    <el-form-item label="公    仔：">
                        <el-switch style="width:140px;" v-model="boolDoll" active-text="是" inactive-text="否"></el-switch>
                    </el-form-item>
                    <el-form-item label="材料证明：">
                        <el-switch
                            style="width:140px;"
                            v-model="boolMaterial"
                            active-text="需要"
                            inactive-text="不需要"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item label="样品申请：">
                        <el-switch style="width:140px;" v-model="boolSample" active-text="是" inactive-text="否"></el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
                        <el-button type="primary" style="display:none;" v-if="item.operationCode==='savetool'" @click="submitDialogData" size="small">{{item.operationName}}</el-button>
                    </span>
                    <el-button @click="dialogQuo = false" size="small">取 消</el-button>
                </div>
            </el-dialog>

            <!--编辑-----手板-->
            <el-dialog :title="dialogTitle" :visible.sync="dialogViewInquirySheet3D" width="1700px" class="customerDialog">
                <el-form :inline="true" size="mini">
                    <el-table ref="tableInquirySheet" :row-style="{height:'50px'}" :cell-style="{padding:'0px'}" stripe size="mini" max-height="600px" :data="supInquiry3DList" border style="width: 100%">

                        <el-table-column prop="supplierName" label="供应商" width="180">
                        </el-table-column>
                        <el-table-column prop="supplierShort" label="简称" width="">
                        </el-table-column>
                        <el-table-column prop="partQty" label="产品数量" width="80">
                        </el-table-column>
                        <el-table-column prop="" label="产品单价" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supUnitcost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="单品总价" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalcost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="" label="税率" width="100">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.taxRate"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="含税总价" width="100">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.taxRateCost"></el-input>
                                </div>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="" label="原型材料成本" width="150">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalmasterVccost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="硅模材料成本" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldMaterialCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="产品材料成本" width="130">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalpartmaterialCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="编程成本" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supProgramCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="CNC或3D打印成本" width="140">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" ></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="后处理成本" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalfinishCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="单件工时" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supCnc3dSinglehours"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="手工手时" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supHandSinglehours"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="生产周期(天)" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.totalLeadtime"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
                        <el-button type="primary" v-if="item.operationCode==='savetool'" @click="submitDialogInquirySheet3D" size="small">{{item.operationName}}</el-button>
                    </span>
                    <el-button @click="dialogViewInquirySheet3D = false" size="small">取 消</el-button>
                </div>
            </el-dialog> 


            <!--编辑----快速模具-->
            <el-dialog :title="dialogTitle" :visible.sync="dialogViewInquirySheetMold" width="1700px" class="customerDialog">
                <el-form :inline="true" size="mini">
                    <el-table ref="tableInquirySheet" :span-method="quoteSpanMethodInquiryMold" :row-style="{height:'50px'}" :cell-style="{padding:'0px'}" stripe size="mini" max-height="600px" :data="supInquiryMoldList" border style="width: 100%">

                        <el-table-column prop="supplierName" label="供应商" width="">
                        </el-table-column>
                        <el-table-column prop="" label="图片" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <img :title="scope.row.attachmentOriginal3dname" style="width:70%;" :src="scope.row.imagenamePath" alt/>
                                </div>
                            </template>
                        </el-table-column>
                        
                        <el-table-column prop="attachmentOriginal3dname" label="产品名称" width="100">
                        </el-table-column>
                        
                        <el-table-column prop="partQty" label="产品数量" width="90">
                        </el-table-column>
                        <el-table-column prop="" label="产品单价" width="110">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supUnitcost"></el-input>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="" label="模具总价" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldMoldTotalcost"></el-input>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="" label="总价" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalcost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="" label="税率" width="100">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.taxRate"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="含税总价" width="100">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.taxRateCost"></el-input>
                                </div>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="" label="胶料费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supTotalpartmaterialCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="模具材料费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldMaterialCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="加工费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldProductionCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="设计费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldDesignCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="试模费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldTestmoldCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="人工费" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.supFmouldMoldlaborCost"></el-input>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="" label="生产周期(天)" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <el-input class="el-input-quote" v-model="scope.row.totalLeadtime"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
                        <el-button type="primary" v-if="item.operationCode==='savetool'" @click="submitDialogInquirySheetMold" size="small">{{item.operationName}}</el-button>
                    </span>
                    <el-button @click="dialogViewInquirySheetMold = false" size="small">取 消</el-button>
                </div>
            </el-dialog> 
            
            <!---发送询价--->
            <el-dialog :title="dialogTitle" :visible.sync="dialogViewInquirySheetMoldSup" width="400px" class="customerDialog">
                <el-form :inline="true" size="mini">

                    <el-form-item label="询价单号：">
                        <el-input style="width:175px;" v-model="inquiryNoSup" disabled="disabled" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="不含税总金额：">
                        <el-input style="width:175px;" v-model="supTotalcostSup" disabled="disabled" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="预估天数：">
                        <el-input style="width:175px;" v-model="totalLeadtimeSup"  autocomplete="off" ></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!-- <el-button type="primary" @click="submitDialogDataSendInquiry" size="small">确 定</el-button> -->
                    <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
                        <el-button type="primary" v-if="item.operationCode==='savetool'" @click="submitDialogDataSendInquiry" size="small">{{item.operationName}}</el-button>
                    </span>
                    <el-button @click="dialogViewInquirySheetMoldSup = false" size="small">取 消</el-button>
                </div>
            </el-dialog>






        
        
        </div>
    </div>
    
</template>

<script>
  export { default } from './js/supplierInquiry'
</script>

<style lang="less">
  @import './css/style.less';
</style>



