<template>
  <div id="facilities">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition"><span class="index"></span> 搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
            <el-form-item prop="machineTypecode">
                <!-- <el-input placeholder="设备类型" v-model="ruleForm.machineName" suffix-icon="el-icon-search" size="small"></el-input> -->
                <el-select v-model="ruleForm.machineTypecode" placeholder="请选择设备类型:" @change="selectSearch">
                    <el-option v-for="item in machineTypecodeList" :key="item.id"  :label="item.cname" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">清空</el-button>
                <el-button size="small" @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%" :height="tableHeight" :max-height="tableHeight">
            <el-table-column label="操作" width="100"  align="center" > 
                <template slot-scope="{row, $index}">
                  <div class="table_btn">
                      <span class="hover_selec1"  :class="{actived:isEditActive==$index }" title="编辑" @click.stop="edit($index, row)"></span>
                  </div>
                  <div class="table_btn">
                      <span class="hover_selec2"  :class="{actived:isDelActive==$index }" title="删除" @click.stop="del($index, row)"></span>
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="supplierName" label="生产商" width="160"  align="center" :show-overflow-tooltip="true"> 
            </el-table-column>
            <el-table-column prop="machineTypecode" label="设备类型" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="ofAxes" label="轴数" width="100"  align="center" > 
            </el-table-column>
            <el-table-column prop="maxX" label="X（最大成型尺寸）mm" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="maxY" label="Y（最大成型尺寸）mm" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="maxZ" label="Z（最大成型尺寸）mm" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="accuracy" label="精度（mm）" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="thickness" label="成型层厚度（mm）" width="160"  align="center" > 
            </el-table-column>
            <el-table-column prop="qty" label="数量" width="152"  align="center" > 
            </el-table-column>
            <el-table-column prop="updatedTime" label="更新时间" width="160"  align="center" > 
            </el-table-column>
            <el-table-column label="状态" width="100"  align="center" > 
                 <template slot-scope="{row}">
                     <div :class='{noAuditStatus:row.auditStatus=="待审核"}'>
                         {{row.auditStatus}}
                     </div>
                 </template>
            </el-table-column>
            <el-table-column label="查看图片" align="center" > 
                <template slot-scope="{row,$index}">
                <div>
                    <el-button  size="mini" round @click="checkImg($index, row)">查看图片</el-button>
                </div>
                </template>
            </el-table-column>
      </el-table>
        <div class="toolBar_btn">
            <el-button size="mini" round  @click="addFacilities">新增设备</el-button>
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
            <el-button  @click="innerVisibleCancel()">取消 </el-button>
            <el-button class='confirmBtn' style="margin-left:13%;margin-right:0"  @click="save()">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="设备图片" :visible.sync="imgDialog" width="670px"  class="facilitiesDialog" >
          <Swiper :imgList='imgList'></Swiper>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export { default } from './js/facilities'
</script>
<style lang="less">
 @import '../../common/css/style.less';
</style>
