<template>
  <div id="facilities">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
            <el-form-item prop="machineTypecode">
               <el-select v-model="ruleForm.machineTypecode" placeholder="请选择设备类型:" @change="selectSearch">
                    <el-option v-for="item in machineTypecodeList" :key="item.id"  :label="item.cname" :value="item.code">
                    </el-option>
                </el-select>
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
                    <div v-else-if="item.columnCname == '状态'" :class='{noAuditStatus:row.auditStatus=="待审核"}'>
                        {{row.auditStatus}}
                    </div>
                    <div v-else-if="item.columnCname == '查看图片'">
                        <el-button  size="mini" round @click="checkImg($index, row)">查看图片</el-button>
                    </div>
                    <div v-else>
                        {{ row[item.columnName] }}
                    </div>
                </template>
            </el-table-column>
      </el-table>
      <div class="toolBar_btn">
            <el-button size="mini" round v-show='item.operationName=="新增"' v-for="(item,index) in listToolBarOperation" :key="index" @click="dialogEven(item.operationName)">
            {{item.operationName}}
            </el-button>
      </div>
      <el-dialog :title="dialogTitle"  :visible.sync="dialog" width="670px"  class="facilitiesDialog"  @closed="closed">
          <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
            <el-form-item label="供应商:">
                <el-input v-model="initDialogForm.supplierName" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备类型:" prop="machineTypecode">
                <el-select v-model="initDialogForm.machineTypecode" placeholder="请选择:"  @change="selectMachineTypecode">
                    <el-option v-for="item in machineTypecodeList" :key="item.id"  :label="item.cname" :value="item.cname">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量:" prop="qty">
                <el-input type="number" v-model="initDialogForm.qty" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="X最大成型:" >
                <el-input type="number" v-model="initDialogForm.maxX" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Y最大成型:" >
                <el-input type="number" v-model="initDialogForm.maxY" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Z最大成型:" >
                <el-input type="number" v-model="initDialogForm.maxZ" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="精度:" >
                <el-input type="number" v-model="initDialogForm.accuracy" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成型层厚度:" >
                <el-input v-model="initDialogForm.thickness" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="轴数:" >
                <el-input type="number" v-model="initDialogForm.ofAxes" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="附件上传：" class="avatarBox">
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
            <!-- <el-button  @click="innerVisibleCancel()">取消 </el-button>
            <el-button class='confirmBtn' style="margin-left:13%;margin-right:0"  @click="save()">保存</el-button> -->
            <el-button :type="item.type" v-show='item.operationName=="保存"||item.operationName=="取消"' :class='{confirmBtn:item.operationName=="保存"}' v-for="(item,index) in listToolBarOperation" :key="index" @click="dialogEven(item.operationName)">
            {{item.operationName}}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="设备图片" :visible.sync="imgDialog" width="670px"  class="facilitiesDialog" >
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
