<template>
    <div id="dailyProblemFeedback">
        <div class="contentBox">
            <div class="searchBox">
                <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
                <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
                    <el-form-item prop="orderNo">
                        <el-input placeholder="订单编号" v-model="ruleForm.orderNo" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item prop="salesUsercode">
                        <el-input placeholder="业务" v-model="ruleForm.salesUsercode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item prop="qcUsercode">
                        <el-input placeholder="品检" v-model="ruleForm.qcUsercode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item prop="pmUsercode">
                        <el-input placeholder="跟单" v-model="ruleForm.pmUsercode" suffix-icon="el-icon-search" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" :icon="item.icon" v-for="(item,index) in searchButtons" :key="index" @click="clickEven(item.operationName)">{{item.operationName}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border v-loading="loading" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
                    <el-table-column v-for="item in tHeadData" :key="item.columnName" :prop="item.columnName" :label="item.columnCname" :min-width="item.columnWidth" align="center">
                        <template slot-scope="{row, $index}">
                            <div v-if="item.columnCname == '操作'">
                                <div class="table_btn" v-for="(btnitem,index) in listOneTableOperation" :key="index" v-show='btnitem.operationName=="修改"||btnitem.operationName=="删除"'>
                                <span class="hover_selec1" v-if='btnitem.operationName=="修改"' :class="{actived:isEditActive==$index }" title="修改" @click.stop="edit($index, row)"></span>
                                <span class="hover_selec2" v-else-if='btnitem.operationName=="删除"' :class="{actived:isDelActive==$index }" title="删除" @click.stop="del($index, row)"></span>
                                </div>
                            </div>
                            <div v-else-if="item.columnCname == '图片'">
                                <span style="color:#FF7A0F;font-size:12px;cursor: pointer;" @click="checkImg($index, row)">点击查看</span>
                            </div>
                            <div v-else>
                                {{ row[item.columnName] }}
                            </div>
                        </template>
                    </el-table-column>
            </el-table>
            <el-dialog :title="dialogTitle"  :visible.sync="dialog" width="800px"  class="dailyProblemFeedbackDialog" @closed="closed"  :close-on-click-modal= false>
                <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
                    <div class="divForm">
                        <el-form-item label="订单编号:" prop="orderNo">
                            <el-select v-model="initDialogForm.orderNo" filterable :filter-method="getOrderCode" placeholder="请选择:" @change="selectOrderCode" >
                                <el-option v-for="item in orderNoList" :key="item.id"  :label="item.orderNo" :value="item.orderNo">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="PO单号:">
                            <el-select v-model="initDialogForm.poNo" placeholder="请选择:"  @change="selectPoNo">
                                <el-option v-for="item in poNoList" :key="item.id"  :label="item.poNo" :value="item.poNo">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品:" prop="partName" class="rightM">
                            <el-select v-model="initDialogForm.partName" placeholder="请选择:"  @change="selectPartName">
                                <el-option v-for="(item,index) in partNameList" :key="index"  :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="divForm2">
                        <el-form-item label="问题描述:">
                            <el-input v-model="initDialogForm.quotationDetails" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="问题原因:">
                            <el-input v-model="initDialogForm.reasons" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="divForm line">
                        <el-form-item label="解决方案：">
                            <el-input type="textarea" v-model="initDialogForm.solution"></el-input>
                        </el-form-item>
                        <el-form-item label="影响：" >
                            <el-input type="textarea" v-model="initDialogForm.advEffects"></el-input>
                        </el-form-item>
                        <el-form-item label="损失："  class="rightM">
                            <el-input type="textarea" v-model="initDialogForm.loseAmount"></el-input>
                        </el-form-item>
                    </div>
                    <div class="divForm3">
                        <el-form-item label="备注："  class="rightM">
                            <el-input type="textarea" v-model="initDialogForm.remarks"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="图片上传：" class="avatarBox">
                        <div class="imgList">
                            <ul>
                            <li v-for="(item,index) in fileList" :key="index"><img :src='item.url' alt=""><span class="del" @click="handleRemove(item,index)"></span></li>
                            <el-upload  class="avatar-uploader" ref="upload" :action="uploadPic" :headers="{token:token}" :show-file-list="false"  :on-success="handleAvatarSuccess" 
                            :before-upload="beforeAvatarUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            </ul>
                        </div>
                    </el-form-item>
                </el-form>
                 <div slot="footer" class="dialog-footer">
                    <el-button :type="item.type" v-show='item.operationName=="保存"||item.operationName=="取消"' :class='{confirmBtn:item.operationName=="保存"}' v-for="(item,index) in listToolBarOperation" :key="index" @click="dialogEven(item.operationName)">
                    {{item.operationName}}
                </el-button>
                </div>
            </el-dialog>
             <el-dialog title="查看图片" :visible.sync="imgDialog" width="670px"  class="facilitiesDialog"  :close-on-click-modal= false>
                <!-- <el-carousel :interval="5000" arrow="always">
                        <el-carousel-item v-for="item in imgList" :key="item">
                        <img :src="item" ref="image" alt="" style="width:100%">
                        </el-carousel-item>
                    </el-carousel> -->
                    <Swiper :imgList='imgList'></Swiper>
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