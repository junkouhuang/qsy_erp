<template>
    <el-dialog title="新增客户" :visible.sync="isShownAddCompanyInfo" class="Addnewcompany Addnewcompany_head">
      <img src="../../../../../assets/image/border_top1.png" alt="" style="margin-bottom: 20px">
       <!-- <el-form :model="newCompanyInfo" ref="newCompanyInfo" :rules="companyInfoRules">
           <el-row :gutter="20">
               <el-col :span="4">
                   <el-form-item label="公司编号:">
                       <el-input
                               size='mini'
                               v-model="newCompanyInfo.InfocompanyNumber"
                               autocomplete="off"
                               :disabled="true"
                       ></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="4">
                   <el-form-item label="公司全称:" prop="customerFullname">
                       <el-input v-model="newCompanyInfo.customerFullname"  size='mini' autocomplete="off"></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="4">
                   <el-form-item label="公司简称:" prop="customerShortname">
                       <el-input v-model="newCompanyInfo.customerShortname"  size='mini' autocomplete="off"></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="4">
                   <el-form-item label="来源:" prop="sourceCode" >
                       <el-select v-model="newCompanyInfo.sourceName"  size='mini' @change="selectSourceCode">
                           <el-option
                                   v-for="item in SourceInfoList"
                                   :key="item.id"
                                   :label="item.cname"
                                   :value="item"
                           ></el-option>
                       </el-select>
                   </el-form-item>
               </el-col>
               <el-col :span="4">
                   <el-form-item label="网址1:" prop="website1">
                       <el-input v-model="newCompanyInfo.website1" autocomplete="off"  size='mini'></el-input>
                   </el-form-item>
               </el-col>
           </el-row>

       </el-form>-->
        <div slot="footer" class="add_clinet_box">
            <div class="add_clinet_box_cancel" @click="cancela('newCompanyInfo')">取消</div>
            <div class="add_clinet_box_suer" @click="saveCompany('newCompanyInfo') ">确定</div>
        </div>
    </el-dialog>
</template>

<script>

    export default {
        props:["isShownAddCompanyInfo"],
        data() {
            return {

            };
        },
    }
</script>

<style scoped>

</style>