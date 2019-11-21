<template>
    <p>我是P标签</p>
   <!-- <el-dialog
            title="编辑"
            :visible.sync="isShown"
            v-if="customerData[editIndex]"
            class="Addnewcompany_head"
    >
        <el-form :model="customerData[editIndex]">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="公司编号:" :label-width="formitemWidth">
                        <el-input
                                v-model="customerData[editIndex].companyNumber"
                                autocomplete="off"
                                :disabled="true"
                                value="companyNumber"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="公司简称:" :label-width="formitemWidth">
                        <el-input v-model="customerData[editIndex].customerShortname" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="公司全称:" :label-width="formitemWidth" prop="field">
                        <el-input v-model="customerData[editIndex].customerFullname" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="来源:" :label-width="formitemWidth">
                        <el-select v-model="customerData[editIndex].source" placeholder="请选择来源">
                            <el-option
                                    v-for="item in SourceInfoList"
                                    :key="item.id"
                                    :label="item.cname"
                                    :value="item.cname"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="网址1:" :label-width="formitemWidth" prop="field">
                        <el-input v-model="customerData[editIndex].companyAddress1" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="网址2:" :label-width="formitemWidth">
                        <el-input v-model="customerData[editIndex].companyAddress2" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="客户类别:" :label-width="formitemWidth" prop="region">
                        <el-select v-model="customerData[editIndex].category" placeholder="请选择客户类别">
                            <el-option
                                    v-for="item in CategoryCodeList"
                                    :key="item.id"
                                    :label="item.cname"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="行业:" :label-width="formitemWidth" prop="industryList">
                        <el-select v-model="customerData[editIndex].industry" placeholder="请选择行业">
                            <el-option
                                    v-for="item in industryList"
                                    :key="item.id"
                                    :label="item.cname"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="国家:" :label-width="formitemWidth" prop="region">
                        <el-select v-model="customerData[editIndex].countryName">
                            <el-option
                                    v-for="item in countryList"
                                    :key="item.id"
                                    :label="item.countryCname"
                                    :value="item.countryCode"
                            ></el-option>
                        </el-select>
                        &lt;!&ndash; <el-input v-model="customerData[editIndex].countryName" autocomplete="off"></el-input> &ndash;&gt;
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="城市:" :label-width="formitemWidth" prop="cityList">
                        <el-select v-model="customerData[editIndex].cityName">
                            <el-option
                                    v-for="item in cityList"
                                    :key="item.id"
                                    :label="item.cityCname"
                                    :value="item.cityCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="公司地址:" :label-width="formitemWidth">
                        <el-input v-model="newCompanyInfo.companyAddress" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="电话:" :label-width="formitemWidth">
                        <el-input v-model="customerData[editIndex].companyPhone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="颜色标识:" :label-width="formitemWidth" prop="ColorList">
                        <el-select v-model="newCompanyInfo.colorCode" placeholder="请选择颜色标识">
                            <el-option
                                    v-for="item in ColorList"
                                    :key="item.id"
                                    :label="item.cname"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="收货地址:" :label-width="formitemWidth">
                        <el-input v-model="newCompanyInfo.shippingAddress" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="发展日期:" :label-width="formitemWidth">
                        <el-input v-model="customerData[editIndex].developmentTime" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="付款方式:" :label-width="formitemWidth" prop="region">
                        <el-select v-model="customerData[editIndex].payment" placeholder="请选择付款方式">
                            <el-option
                                    v-for="item in monthPayList"
                                    :key="item.id"
                                    :label="item.cname"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="备注:" :label-width="formitemWidth">
                        <el-input v-model="customerData[editIndex].contactRemarks" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="收款银行:" :label-width="formitemWidth" prop="region">
                        <el-select v-model="newCompanyInfo.bankName" placeholder="请选择收款银行">
                            <el-option
                                    v-for="item in BankList"
                                    :key="item.id"
                                    :label="item.bankCname"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="货币类型:" :label-width="formitemWidth" prop="region">
                        <el-select
                                v-model="customerData[editIndex].currencyCode"
                                placeholder="请选择货币类型"
                                prop="currencyTypeList"
                        >
                            <el-option
                                    v-for="item in currencyTypeList"
                                    :key="item.id"
                                    :label="item.currencyName"
                                    :value="item.currencyCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="银行账号:" :label-width="formitemWidth">
                        <el-input
                                v-model="newCompanyInfo.accountCode"
                                autocomplete="off"
                                :disabled="true"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="户主:" :label-width="formitemWidth">
                        <el-input
                                v-model="newCompanyInfo.accountName"
                                autocomplete="off"
                                :disabled="true"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-radio class="el_radio" v-model="enabled" label="1">启用</el-radio>
                <el-radio class="el_radio" v-model="enabled" label="2">不启用</el-radio>
            </el-row>
            <el-button class="newcompanycannelbuttons" @click="isShown = false">取消</el-button>
            <el-button class="newcompanybuttons" type="primary">保存</el-button>
        </el-form>
    </el-dialog>-->
</template>

<script>
    export default {
        name: "CustomerEditor"
    }
</script>

<style scoped>

</style>