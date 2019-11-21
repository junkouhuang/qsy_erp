<template>
    <div class="automated_wrap">
        <div class="automated_header">
            <upload v-on:getossdata="showossdata"  v-on:getprogressbar="getUploadAwaitFun" v-on:getossurl="showtableData0"></upload>
            <div class="mn_btn_class" @click='showModel'>无3D图纸</div>
            <!-- <el-button type="warning" @click='showModel' plain>无3D图纸</el-button> -->
            <uploadAll v-on:getossdata="showossdata" v-on:getprogressbar="getUploadAwaitFun" v-on:getossurl="showPulodAll"></uploadAll>
            <!-- <el-button type="warning" plain @click="mergeFun">合并模具</el-button> -->
            <div class="mn_btn_class" @click='mergeFun'>合并模具</div>
            <div class="mn_btn_class" @click='splitFun'>拆分模具</div>
            <div class="mn_btn_class" @click='saveFun'>保存</div>
        </div>
        <div class="automated_table_box">
            <div class="automated_table_title" >
                <div class="automated_table_title_name" @click='selectClass(index, item.id)' :class="{automated_table_title_name_active: navId === item.id}"
                 v-for="(item, index) in NavNameList" :key="index">
                    <span>{{item.operationName}}</span>
                    <!-- <span v-show='item.price > 0'>¥&nbsp;&nbsp;{{item.price}}</span> -->
                </div>
            </div>
            <div class="automated_table_content">
            </div>
        </div>



<!-- :before-close="handleClose" -->
        <el-dialog title="无3D图纸报价" :visible.sync="dialogNot3D" width="30%">
            <div class="model_box_content">
                <div class="model_box_header_title">
                    <span :class="{model_active: titleFlg === 1}" @click="selectNoFun(1)">知道材料、重量</span>
                    <span :class="{model_active: titleFlg === 2}" @click="selectNoFun(2)">知道体积</span>
                </div>
                <div  class="model_box_input" v-show="titleFlg === 1">
                    <div class="model_box_input_left">
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>名称：<el-input v-model="noPictTwoObj.name" style="width: 150px" size="mini" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>长度：<el-input v-model="noPictTwoObj.long" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>宽度：<el-input v-model="noPictTwoObj.width" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>高度：<el-input v-model="noPictTwoObj.height" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                    </div>
                    <div class="model_box_input_left">
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>重量：<el-input v-model="noPictTwoObj.weight" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>9999999)value=9999999;if(value.length>7)value=value.slice(0,7);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>g
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>材料：
                            <el-select v-model="noPictTwoObj.master" placeholder="请选择" size='mini' style="width: 150px">
                                <el-option v-for="item in noThrmasterList" :key="item.materialCode" :label="item.materialCname" :value="item.materialCode"></el-option>
                            </el-select>
                            <!-- <el-input v-model="noPictTwoObj.master" style="width: 110px" size="mini" placeholder="请输入内容"></el-input> -->
                        </div>
                        <!-- <div class="model_box_input_left_li">
                            <span class="color">*</span>图纸：
                            <div style="width: 150px;">
                                <uploadImg v-on:getOssDataImg="getOssDataImg" v-on:getOssUrlImg="get2dImgFun">           
                                </uploadImg>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div  class="model_box_input" v-show="titleFlg === 2">
                    <div class="model_box_input_left">
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>名称：
                            <el-input v-model="noPictTwoObj2.name" style="width: 150px" size="mini" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>长度：
                            <el-input v-model="noPictTwoObj2.long" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>宽度：
                            <el-input v-model="noPictTwoObj2.width" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>高度：
                            <el-input v-model="noPictTwoObj2.height" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm
                        </div>
                    </div>
                    <div class="model_box_input_left">
                        <div class="model_box_input_left_li">
                            <span class="color">*</span>体积：<el-input v-model="noPictTwoObj2.tiji" style="width: 150px" size="mini" placeholder="请输入内容"
                            oninput="if(value>1300)value=1300;if(value.length>4)value=value.slice(0,4);if(value<0)value=1;if(isNaN(value))value=1;"></el-input>mm³
                        </div>
                        <!-- <div class="model_box_input_left_li">
                            <span class="color">*</span>图纸：
                            <div style="width: 150px;">
                                <uploadImg v-on:getOssDataImg="getOssDataImg" v-on:getOssUrlImg="get2dImgFun">           
                                </uploadImg>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <span slot="footer">
                <div class="automated_footer_box">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <div class="btn_cancel" @click="dialogVisible = false" >取消</div>
                    <div class="btn_suer" @click="add2DListFun">确定</div>
                    <!-- <el-button type="primary" @click="add2DListFun">确 定</el-button> -->
                </div>
            </span>
        </el-dialog>
        <!-- 附件删除新增 -->
        <el-dialog title="上传附件"
            :visible.sync="fileShow" width='607px'>
            <div class="mode_file_content" v-if='temporaryFileList.length != 0'>
                <div v-for="(item, index) in temporaryFileList" :key="index" class="mode_file_content_li">
                    <img @click='deleFun(item)' class='mode_file_content_delete' src="../../assets/image/delete.png" alt="">
                    <img v-if='getNameFun(item.name) === 1' src="../../assets/image/cad.png" alt="">
                    <img v-if='getNameFun(item.name) === 2' src="../../assets/image/pdf.png" alt="">
                    <img v-if='getNameFun(item.name) === 3' src="../../assets/image/ppt.png" alt="">
                    <img v-if='getNameFun(item.name) === 4' src="../../assets/image/excel.png" alt="">
                    <img v-if='getNameFun(item.name) === 5' src="../../assets/image/word.png" alt="">
                    <img v-if='getNameFun(item.name) === 6' src="../../assets/image/imgName.png" alt="">
                    <img v-if='getNameFun(item.name) === 7' src="../../assets/image/compress.png" alt="">
                    <span>{{item.nameTwo}}</span>
                </div>
            </div>
            <div class="mode_file_nocontent" v-if="temporaryFileList.length == 0">
                <img src="../../assets/image/no_content.png" alt="">
            </div>
            <div slot="footer">
                <div class="footer_btn_box">
                    <div class="delete_btn" @click="deleteAll">
                        一键删除
                    </div>
                    <div class="delete_btn" @click="deleteAll">
                        一键下载
                    </div>
                    <uploadItem v-on:getossdata="showossdataItem" v-on:getprogressbar="getUploadAwaitFun" v-on:getossurl="showPulodItem"></uploadItem>
                </div>
            </div>
        </el-dialog>
        <div class="mn_loading" v-if="showLoading">
            <!-- <img src="../../assets/image/loading_MN.gif" alt="">
            <span>上传中...&nbsp;&nbsp;&nbsp;完成度：{{showProgress}}&nbsp;%</span> -->
            <div class="mn_loading_li">
                <div class="mn_loading_li_item" v-for="item in progressList" :key="item.no">
                    <span>{{item.name}}</span>
                    <div style="width: 200px;">
                        <el-progress :stroke-width="15" :percentage="item.preNum" status="success"></el-progress>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div @click="gotoCrm">去CRM</div> -->
    </div>
</template>
<script>
import * as $ from 'jquery'
import dayjs from 'dayjs'
// 导入plupload包
import plupload from 'plupload'
// 上传3D图纸组件
import upload from '../../components/upload/upload'
import uploadImg from '../../components/upload/uploadImg'
import uploadAll from '../../components/upload/uploadAll'
import uploadItem from '../../components/upload/uploadItem';
// 自动报价的封装一些方法
import comFun from './js/index'
import api from './js/api'
// 拖拽
// import Sortable from "sortablejs"
//stl文件解析包
import * as THREE from 'three'
var STLLoader = require('three-stl-loader')(THREE)
// 文件解析包
import AsciiEffect from 'three-asciieffect'
import TrackballControls from 'three-trackballcontrols'
import { log } from 'three'
import { fail } from 'assert'
import { fips } from 'crypto'
import { filter } from 'minimatch'
import { Promise } from 'q'
import { type } from 'os'
// Vue.use(Share)w
const CNCList = [{val: '1', title: '线切割'}, {val: '2', title:'打火花'}]
export default {
    data () {
        return {
            noPictTwoObj: {
                name: '',
                width: '',
                long: '',
                height: '',
                weight: '',
                master: '',
                img_url: ''
            },
            noPictTwoObj2: {
                name: '',
                width: '',
                long: '',
                height: '',
                tiji: '',
                img_url: ''
            },
            fileAllList: [], // 一件上传附件；存储起来；与5个数据列表的里面的 名称最对比； 如果有相同的话； 就添加进去；
            titleFlg: 1, //  2D图片弹出默认选择1
            dialogVisible: false, // 弹窗
            cncArr: CNCList,
            pictFlagType: 0, // 0为3d，1位CNC金属。2为CNC塑料，3位复模，4为快速模具
            threeboxflag: false, // 是否显示canvas
            imgIndex: '', // 当前选择的的图片ID
            threeDList: [],
            ossdata: [],
            ossUrlList: [],
            NavNameList: [
                {title: '3D打印', price: ''},
                {title: 'CNC金属', price: ''},
                {title: 'CNC塑料', price: ''},
                {title: '复模', price: ''},
                {title: '快速模具', price: ''},
            ], // 五种模式的标题
            tableData0: [], // 3D表格列表
            tableData1: [], // CNC金属
            tableData2: [], // CNC塑料
            tableData3: [], // 复模
            tableData4: [], // 快速磨具
            // 删除记录的数组(编辑的时候用到)
            deleteTable0List: [], // 3d打印删除
            deleteTable1List: [], // CNC金属删除
            deleteTable2List: [], // CNC塑料删除
            deleteTable3List: [], // 复模删除
            deleteTable4List: [], // 快速模具删除
            multipleSelection: [], // 3D选择列表
            // 3Dtab下拉接口
            craf3DtList: [], // 3d工艺数据列表
            material3DList: [], // 3d材料数据列表
            surface3DListOne: [], // 3D表面处理数据列表
            surface3DListTwo: [],
            surface3DListThr: [],
            // SNS金属下拉接口
            snsCrafList: [], // sns工艺下拉
            snsMaterralList: [], // SNS金属材料
            snsSurfaceList: [], // SNS金属表面处理
            snsMetalPage: [], // SNS金属加工面数
            snsMetalToteranList: [], // SNS金属公差
            snsMetalPulgList: [], // SNS金属拆件
            // sns塑料下拉接口
            snsSMaterList: [], // NSN塑料材料
            snsPlastSurfList: [], // SNS塑料表面处理
            snsPlasPageList: [], // SNS塑料加工面数
            snsPlastoleranceList: [], // SNS塑料公差
            snsPlasPulgList: [], // SNS 拆件
            // 复杂难度API
            complexityList: [], // 难度系数接口
            // 复模下拉列表
            modeCrafList: [], // 复模工艺
            modePourList: [], // 复模灌注材料
            modeProtoypeList: [], // 复模原型材料
            siliconModeList: [], // 复模硅模材料
            modePageList: [], // 复模表面处理
            modeToleranceList: [], // 复模公差数据
            // 快速模具
            rapidStructureList: [], // 快速模具产品结构
            rapidAcupointList: [], // 快速模具穴数
            rapidHotSprueList: [], // 快速模具热嘴个数
            rapidLineNumList: [], // 快速模具行位个数
            rapidTopNumList: [], // 快速模具斜顶个数
            rapidToleranceList: [], // 快速模具公差
            repidModeCoreList: [], // 快速模具模仁材料
            repidModeDieList: [], // 快速模具模丕材料
            repidModeDieWList: [], // 快速模具模具寿命
            repidGumTypeList: [], // 快速模具进胶类型
            repidProductColorList: [], // 快速模具进胶类型
            repidProductList: [], // 快速模具产品材料
            repidSurList: [], // 快速模具 表面处理
            repidModeTypeList: [], // 模坯类型
            // 无3D图纸材料
            noThrmasterList: [], // 无3D材料
            // 快速模具选中的数组勾选
            modelSelectHBList: [],
            // 单个上传；临时获取出数据；存储起来后面添加时启用
            uploadItem: {}, // 上传需要
            uploadType: '',
            // 列表总价格
            tab0Total: 0, // 3d
            tab1Total: 0, // CNC金属
            tab2Total: 0, // CNC塑料
            tab3Total: 0, // 复模
            tab4Total: 0, // 快速模具
            // 单个上传附件会用到的地方
            fileShow: false, // 是否显示单个上传附件窗口
            temporaryFileList: [], // 临时存储需要展示的已上传的列表数据
            temporaryFileType: '', // 标识（当前上传；需要添加 到数组列表去）
            temporaryFileId: '', // 标识（当前上传；需要添加 到数据的上传列表去）
            temWidth: '600px', // 动态改变跨度
            showLoading: false, // 是否上传中
            showProgress: 0, // 进度条
            progressList: [], // 进度数据
            dragTypeFlag: '',
            dragging: null,
            money: 0,
            checked: false,
            editDataFlag: 33, // 请求下拉成功回调 = 0 时候；为全部结束
            quotationType: 0, // 1为手板单2位模具单3位钣金单；0时候为新增
            navId: 'c4023420-d442-11e9-84f8-000c290d53bf', // 选中nav的ID
        }
    },
    components: {
        upload,
        uploadImg,
        uploadAll,
        uploadItem
    },
    watch: {
        'tableData0.length' (newVal, oldVal) {
            if (newVal > oldVal) {
                // 当新值newVal大于旧值oldVal,说明添加新元素了
                if (newVal > oldVal) {
                    // console.log('执行')
                    // console.log('又一个文件上传完成,准备渲染3d图像');
                    // 如果是stl
                    var file = this.tableData0[this.tableData0.length - 1];//新上传的文件对象集合
                    var filepath = this.tableData0[this.tableData0.length - 1].url;//路径
                    var filesuffix = this.tableData0[this.tableData0.length - 1].url.substring(this.tableData0[this.tableData0.length - 1].url.length - 4);//文件后缀
                    // console.log(file)
                    //判断要预览的文件类型
                    if (filesuffix === '.stl' || filesuffix === '.STL') {
                        // if (file.getOneAjax !== 0) {
                        //     this.filePreview(file, filepath, this.tableData0, 'tab0')
                        // }
                        this.filePreview(file, filepath, this.tableData0, 'tab0')
                    } else if (filesuffix === '.png' || filesuffix === '.PNG' || filesuffix === '.jpg' || filesuffix === '.JPG' || filesuffix === '.jpeg' || filesuffix === '.JPEG') {
                        // 案例； 如果后期有改动 进行判断修改；
                        this.nostlpictureFun(filepath, file, 'tab0', this.tableData0)
                        // this.igsfilePreview(file, filepath, this.tableData0, 'tab0')
                    } else {
                        // console.log('???')
                        this.nostlpictureFun(filepath, file, 'tab0', this.tableData0)
                    }
                }
            }
        },
        'tableData1.length' (newVal, oldVal) {
            if (newVal > oldVal) {
                // 当新值newVal大于旧值oldVal,说明添加新元素了
                if (newVal > oldVal) {
                    // console.log('又一个文件上传完成,准备渲染3d图像');
                    // 如果是stl
                    var file = this.tableData1[this.tableData1.length - 1];//新上传的文件对象集合
                    var filepath = this.tableData1[this.tableData1.length - 1].url;//路径
                    var filesuffix = this.tableData1[this.tableData1.length - 1].url.substring(this.tableData1[this.tableData1.length - 1].url.length - 4);//文件后缀
                    //判断要预览的文件类型
                    if (filesuffix === '.stl' || filesuffix === '.STL') {
                        this.filePreview(file, filepath, this.tableData1, 'tab1')
                    } else {
                        this.nostlpictureFun(filepath, file, 'tab1', this.tableData1)
                    }
                }
            }
        },
        'tableData2.length' (newVal, oldVal) {
            if (newVal > oldVal) {
                // 当新值newVal大于旧值oldVal,说明添加新元素了
                if (newVal > oldVal) {
                    // console.log('又一个文件上传完成,准备渲染3d图像');
                    // 如果是stl
                    var file = this.tableData2[this.tableData2.length - 1];//新上传的文件对象集合
                    var filepath = this.tableData2[this.tableData2.length - 1].url;//路径
                    var filesuffix = this.tableData2[this.tableData2.length - 1].url.substring(this.tableData2[this.tableData2.length - 1].url.length - 4);//文件后缀
                    //判断要预览的文件类型
                    if (filesuffix === '.stl' || filesuffix === '.STL') {
                        this.filePreview(file, filepath, this.tableData2, 'tab2')
                    } else {
                        this.nostlpictureFun(filepath, file, 'tab2', this.tableData2)
                    }
                }
            }
        },
        'tableData3.length' (newVal, oldVal) {
            if (newVal > oldVal) {
                // 当新值newVal大于旧值oldVal,说明添加新元素了
                if (newVal > oldVal) {
                    // console.log('又一个文件上传完成,准备渲染3d图像');
                    // 如果是stl
                    var file = this.tableData3[this.tableData3.length - 1];//新上传的文件对象集合
                    var filepath = this.tableData3[this.tableData3.length - 1].url;//路径
                    var filesuffix = this.tableData3[this.tableData3.length - 1].url.substring(this.tableData3[this.tableData3.length - 1].url.length - 4);//文件后缀
                    //判断要预览的文件类型
                    if (filesuffix === '.stl' || filesuffix === '.STL') {
                        this.filePreview(file, filepath, this.tableData3, 'tab3')
                    } else {
                        this.nostlpictureFun(filepath, file, 'tab3', this.tableData3)
                    }
                }
            }
        },
        'tableData4.length' (newVal, oldVal) {
            if (newVal > oldVal) {
                // 当新值newVal大于旧值oldVal,说明添加新元素了
                if (newVal > oldVal) {
                    // console.log('又一个文件上传完成,准备渲染3d图像');
                    // 如果是stl
                    var file = this.tableData4[this.tableData4.length - 1];//新上传的文件对象集合
                    var filepath = this.tableData4[this.tableData4.length - 1].url;//路径
                    var filesuffix = this.tableData4[this.tableData4.length - 1].url.substring(this.tableData4[this.tableData4.length - 1].url.length - 4);//文件后缀
                    //判断要预览的文件类型
                    if (filesuffix === '.stl' || filesuffix === '.STL') {
                        console.log('stl')
                        this.filePreview(file, filepath, this.tableData4, 'tab4')
                    } else {
                        this.nostlpictureFun(filepath, file, 'tab4', this.tableData4)
                    }
                }
            }
        }
    },
    created () {
        // 5个菜单权限
        this.$request.post('/sysOperation/listOperationBar', {menuId: '03807145-41e3-4b02-b582-73bca757f1eb'}).then(res => {
            // console.log(res, 'lalaa')
            if(res.code === 0) {
                this.NavNameList = res.obj.listPageBarOperation
            }
        })
        // 3d打印表格单元格下拉列表数据
        api.getTechnologyListFun(3).then(res => {
            if (res.code === 0) {
                this.craf3DtList = res.obj
                this.editDataFlag = this.editDataFlag - 1
                api.getMaterialsListFun(res.obj[0].id).then(res2 => {
                    if (res2.code === 0) {
                        this.material3DList = res2.obj
                        this.editDataFlag = this.editDataFlag - 1
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                this.editDataFlag = this.editDataFlag - 1
                                this.surface3DListOne = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                            }
                        })
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
        // CNC金属下塑料拉数据
        api.getTechnologyListFun(1).then(res => {
            if (res.code === 0) {
                this.snsCrafList = res.obj
                this.editDataFlag = this.editDataFlag - 1
                // 金属材料
                api.getCncMaterialsFun(res.obj[0].id, 0).then(res2 => {
                    if (res2.code === 0) {
                        this.snsMaterralList = res2.obj
                        this.editDataFlag = this.editDataFlag - 1
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                this.editDataFlag = this.editDataFlag - 1
                                this.snsSurfaceList = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                            }
                        })
                    }
                })
                // 塑料材料
                api.getCncMaterialsFun(res.obj[0].id, 1).then(res2 => {
                    if (res2.code === 0) {
                        this.snsSMaterList = res2.obj
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                this.snsPlastSurfList = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                            }
                        })
                    }
                })
            }
        })
        // CNC金属加工面数List
        api.getMaterialsYQListFun(2, 'faceCount').then(res => {
            if (res.code === 0) {
                this.snsMetalPage = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // CNC金属公差List
        api.getMaterialsYQListFun(2, 'tolerance').then(res => {
            if (res.code === 0) {
                this.snsMetalToteranList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // CNC金属拆件List
        api.getMaterialsYQListFun(2, 'splitCount').then(res => {
            if (res.code === 0) {
                this.snsMetalPulgList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 获取CNC塑料加工面数List
        api.getMaterialsYQListFun(1, 'faceCount').then(res => {
            if (res.code === 0) {
                this.snsPlasPageList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 取CNC塑料公差
        api.getMaterialsYQListFun(1, 'tolerance').then(res => {
            if (res.code === 0) {
                this.snsPlastoleranceList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 取CNC塑料拆件
        api.getMaterialsYQListFun(1, 'splitCount').then(res => {
            if (res.code === 0) {
                this.snsPlasPulgList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 难度系数
        api.getComplexityFun().then(res => {
            console.log(res)
            if (res.code === 0) {
                this.complexityList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 复模工艺
        api.getTechnologyListFun(4).then(res => {
            if (res.code === 0) {
                this.modeCrafList = res.obj
                this.editDataFlag = this.editDataFlag - 1
                // 原型材料
                api.getMaterialsListFun(res.obj[0].id).then(res2 => {
                    if (res2.code === 0) {
                        this.modeProtoypeList = res2.obj
                        this.editDataFlag = this.editDataFlag - 1
                        // 表面处理
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                this.editDataFlag = this.editDataFlag - 1
                                this.modePageList = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                            }
                        })
                    }
                })
            }
        })
        // 复模灌注材料
        api.getModeMaterialListFun('pourMa').then(res => {
            if (res.code === 0) {
                this.modePourList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 复模材料
        api.getModeMaterialListFun('SeetMa').then(res => {
            if (res.code === 0) {
                this.siliconModeList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 复模公查
        api.getMaterialsYQListFun(4, 'tolerance').then(res => {
            if (res.code === 0) {
                this.modeToleranceList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具产品结构
        api.getMaterialsYQListFun(10, 'prodMix').then(res => {
            if (res.code === 0) {
                this.rapidStructureList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具穴数
        api.getMaterialsYQListFun(10, 'hillCount').then(res => {
            if (res.code === 0) {
                this.rapidAcupointList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具行位个数
        api.getMaterialsYQListFun(10, 'lineCount').then(res => {
            if (res.code === 0) {
                this.rapidLineNumList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具斜顶个数
        api.getMaterialsYQListFun(10, 'pentroofCount').then(res => {
            if (res.code === 0) {
                this.rapidTopNumList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具热嘴个数
        api.getMaterialsYQListFun(10, 'hotCount').then(res => {
            if (res.code === 0) {
                this.rapidHotSprueList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具公差
        api.getMaterialsYQListFun(10, 'tolerance').then(res => {
            if (res.code === 0) {
                this.rapidToleranceList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具模仁
        api.getModeMaterialListFun('CaviMa').then(res => {
            if (res.code === 0) {
                this.repidModeCoreList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具模坯
        api.getModeMaterialListFun('MoldMa').then(res => {
            if (res.code === 0) {
                this.repidModeDieList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具寿命
        api.getMaterialsYQListFun(10, 'dieLife').then(res => {
            if (res.code === 0) {
                this.repidModeDieWList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模进胶类型
        api.getMaterialsYQListFun(10, 'gateType').then(res => {
            if (res.code === 0) {
                this.repidGumTypeList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 快速模具产品颜色
        api.getMaterialsYQListFun(10, 'productColour').then(res => {
            if (res.code === 0) {
                this.repidProductColorList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
         // 快速模具产品材料
        api.getMaterialsListFun('2947A75C-966D-427A-B443-59395EE60252').then(res2 => {
            if (res2.code === 0) {
                this.repidProductList = res2.obj
                this.editDataFlag = this.editDataFlag - 1
                api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                    if (res3.code === 0) {
                        this.editDataFlag = this.editDataFlag - 1
                        this.repidSurList = res3.obj.map(item => {
                            let itemV = item
                            itemV.disbleFlag = false
                            return itemV
                        })
                    }
                })
            }
        })
        // 快速模具模坯类型
        api.getMaterialsYQListFun(10, 'mouldBaseType').then(res => {
            if (res.code === 0) {
                this.repidModeTypeList = res.obj
            }
        })
        // 3D 无图纸
        api.getNoThrDMarter().then(res => {
            if (res.code === 0) {
                this.noThrmasterList = res.obj
                this.editDataFlag = this.editDataFlag - 1
            }
        })
        // 编辑处理
        // 这里mainId 要从别的地方过来； 还要带上来源;这个定时器 是为了避免 编辑数据请求比下拉列表数据回调的快的；
        // 避免下拉数据列复制为空数组问题；当editDateFlag 为什么 0 时候；代表全部下拉数据已经请求完成
        // 目前还做的获取回来的ID 再次重新去获取下拉列表的数（必须这么做才是最正确的）（主要是表面处理。材料的下下拉301acaa5b9974e33935ac14098e7058b）
        var setInNum = setInterval(() => {
            if (this.editDataFlag == 0) {
                this.$request.post('/salqtmain/AgainQuotationCus', {mainId: '1845f57f9de14914ba9dccd437175299'}).then(res => {
                    // 3D打印
                    if (res.obj.listQuotation3D.length !== 0) {
                        res.obj.listQuotation3D.forEach(item => {
                            this.getEditDateValueFun(item, item.attachmentOss3dkey, this.tableData0, 0)
                        })
                    }
                    // 金属
                    if (res.obj.listQuotationCncm.length !== 0) {
                        res.obj.listQuotationCncm.forEach(item => {
                            this.getEditDateValueFun(item, item.attachmentOss3dkey, this.tableData1, 1)
                        })
                    }
                    // 塑料
                    if (res.obj.listQuotationCncp.length !== 0) {
                        res.obj.listQuotationCncp.forEach(item => {
                            this.getEditDateValueFun(item, item.attachmentOss3dkey, this.tableData2, 2)
                        })
                    }
                    // 复模
                    if (res.obj.listQuotationVc.length !== 0) {
                        res.obj.listQuotationVc.forEach(item => {
                            this.getEditDateValueFun(item, item.attachmentOss3dkey, this.tableData3, 3)
                        })
                    }
                    // 快速模具
                    if (res.obj.listQuotationFm.length !== 0) {
                        res.obj.listQuotationFm.forEach(item => {
                            this.getEditDateValueFun(item, item.attachmentOss3dkey, this.tableData4, 4)
                        })
                    }
                })
                clearTimeout(setInNum)
            }
        }, 2000)
    },
    methods: {
        //  解决请求的顺序问题 还是无法解决
        // async getYBDataFun (arr, type, value) {
        //     let seleArr = await Promise.all(arr)
        //     let comArr = this.seleArr[1].obj
        //     value.material3DList = seleArr[0].obj // 材料
        //     value.surface3DListOne = JSON.parse(JSON.stringify(comArr))
        //     value.surface3DListTwo = JSON.parse(JSON.stringify(comArr))
        //     value.surface3DListThr = JSON.parse(JSON.stringify(comArr))
        //     if (type === 'tab0') {
        //         this.tableData0.push(value)
        //     }
        // },
        // 编辑处理初始化2数据问题
        getEditDateValueFun (file, url, list, type) {
            let  obj = {
                name: file.attachmentOriginal3dname, // 名字
                id: file.attachmentFileid // ID
            }
            if (type === 0) { // 3D打印
                let value = comFun.addThrDValueFun(obj, url, this.tableData0, 0) // 取出初始化话数据
                value.numIndex = file.sortNum // 序号
                value.edit = file.boolChose // 是否选中 1为选中 0 为没选中
                value.craft3d = file.techId // 工艺ID
                value.craftThrName = file.technologyCname // 工艺名称
                value.craf3DtList = JSON.parse(JSON.stringify(this.craf3DtList)) // 工艺列表数据
                value.materials3d = file.partMaterialCode // 材料编号
                value.masterThrName = file.partMaterialCname // 材料名称
                value.loaGif = true // 是否显示 加载图
                // 重新获取 材料接口数据
                value.material3DList = JSON.parse(JSON.stringify(this.material3DList)) // 材料列表
                value.amount = file.partQty // 数量
                value.long = file.dimensionX // 长
                value.width = file.dimensionY // 宽
                value.height = file.dimensionZ // 高
                value.tiji = file.volume // 体积
                value.surfaceArea = file.surfaceArea // 面积
                value.weight = file.weightsGm // 重量
                value.remke = file.remarks // 备注
                value.offterPrice = file.cusUnitcost // 报价单价
                value.offterTotal = file.cusTotalcost // 报价总价
                value.supUnitcost = file.supUnitcost // 产品单价(供应商)
                value.supTotalcost = file.supTotalcost // 产品总价(供应商)
                value.handicraftsTime = file.handSinglehours // 手工工时
                value.proTime = file.cnc3dSinglehours // 单件工时
                value.proDate = file.totalLeadtime // 加工天数(交期，生产周期)
                value.no3DImg = 0 // 是否没有3D图纸 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.getOneAjax = 0 // 是否编辑第一次进来； 不获取Ajax； 0为是 1位不是
                // 表面数据处理
                if (file.finishqualityCode.length === 0) {
                    value.surfaceOne = '0'
                    value.surfaceTwo = '0'
                    value.surfaceThr = '0'
                } else {
                    let surArr = file.finishqualityCode.split(',')
                    if (surArr.length === 1) {
                        value.surfaceOne = surArr[0]
                    } else if (surArr.length === 2) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                    } else if (surArr.length === 3) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                        value.surfaceThr = surArr[2]
                    }
                }
                // 在选号里面 去获取ajax 或有个问题（数据复制 快过 成功调动）
                // let axiosArr = []
                // axiosArr.push(api.getMaterialsListFun(file.techId))
                // axiosArr.push(api.getSurfaceListFun(file.partMaterialCode))
                // this.getYBDataFun(axiosArr, 'tab0', value)
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                this.tableData0.push(value)
            } else if (type === 1) {
                let value = comFun.addThrDValueFun(obj, url, this.tableData0, 1) // 取出初始化话数据
                value.numIndex = file.sortNum // 序号
                value.edit = file.boolChose // 是否选中 1为选中 0 为没选中
                value.craft3d = file.techId // 工艺ID
                value.craftThrName = file.technologyCname // 工艺名称
                value.materials3d = file.partMaterialCode // 材料code
                value.masterThrName = file.partMaterialCname // 材料名称
                value.snsMaterralList = JSON.parse(JSON.stringify(this.snsMaterralList)) // 金属材料列表
                value.amount = file.partQty // 数量
                value.long = file.dimensionX // 长
                value.width = file.dimensionY // 宽
                value.height = file.dimensionZ // 高
                value.tiji = file.volume // 体积
                value.surfaceArea = file.surfaceArea // 面积
                value.weight = file.weightsGm // 重量
                value.remke = file.remarks // 备注
                value.piecemeal = file.splitCount // 拆件
                value.machinePage = file.setupsCount // 加工面数
                value.tolerance = file.tolerance // 公差
                value.tapping = file.threadQty // 攻牙
                value.difficulty = file.complexityCode // 难度编号
                value.difficultyName = file.complexityName // 难度名称
                value.inserts = file.mouldInsertCount // 镶件
                value.handicraftsTime = file.handSinglehours // 手工工时
                value.proTime = file.cnc3dSinglehours // 单件工时
                value.proDate = file.totalLeadtime // 加工天数(交期，生产周期)
                value.offterPrice = file.cusUnitcost // 报价单价
                value.offterTotal = file.cusTotalcost // 报价总价
                value.supUnitcost = file.supUnitcost // 产品单价（供应商）
                value.supTotalcost = file.supTotalcost // 产品总价（供应商）
                value.loaGif = true // 是否显示 加载图
                value.no3DImg = 0 // 是否没有3D图纸 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.getOneAjax = 0 // 是否编辑第一次进来； 不获取Ajax； 0为是 1位不是
                // 表面数据处理
                if (file.finishqualityCode.length === 0) {
                    value.surfaceOne = '0'
                    value.surfaceTwo = '0'
                    value.surfaceThr = '0'
                } else {
                    let surArr = file.finishqualityCode.split(',')
                    if (surArr.length === 1) {
                        value.surfaceOne = surArr[0]
                    } else if (surArr.length === 2) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                    } else if (surArr.length === 3) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                        value.surfaceThr = surArr[2]
                    }
                }
                // 在选号里面 去获取ajax 或有个问题（数据复制 快过 成功调动）
                // let axiosArr = []
                // axiosArr.push(api.getMaterialsListFun(file.techId))
                // axiosArr.push(api.getSurfaceListFun(file.partMaterialCode))
                // this.getYBDataFun(axiosArr, 'tab0', value)
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                // 处理选中火花线问题
                value.sparkList = []
                if (file.edm == 1) {
                    value.sparkList.push('1')
                }
                if (file.wireCutting == 1) {
                    value.sparkList.push('2')
                }
                this.tableData1.push(value)
            } else if (type === 2) {
                let value = comFun.addThrDValueFun(obj, url, this.tableData0, 1) // 取出初始化话数据
                value.numIndex = file.sortNum // 序号
                value.edit = file.boolChose // 是否选中 1为选中 0 为没选中
                value.craft3d = file.techId // 工艺ID
                value.craftThrName = file.technologyCname // 工艺名称
                value.materials3d = file.partMaterialCode // 材料code
                value.masterThrName = file.partMaterialCname // 材料名称
                value.snsMaterralList = JSON.parse(JSON.stringify(this.snsMaterralList)) // 金属材料列表
                value.amount = file.partQty // 数量
                value.long = file.dimensionX // 长
                value.width = file.dimensionY // 宽
                value.height = file.dimensionZ // 高
                value.tiji = file.volume // 体积
                value.surfaceArea = file.surfaceArea // 面积
                value.weight = file.weightsGm // 重量
                value.remke = file.remarks // 备注
                value.piecemeal = file.splitCount // 拆件
                value.machinePage = file.setupsCount // 加工面数
                value.tolerance = file.tolerance // 公差
                value.tapping = file.threadQty // 攻牙
                value.difficulty = file.complexityCode // 难度编号
                value.difficultyName = file.complexityName // 难度名称
                value.inserts = file.mouldInsertCount // 镶件
                value.handicraftsTime = file.handSinglehours // 手工工时
                value.proTime = file.cnc3dSinglehours // 单件工时
                value.proDate = file.totalLeadtime // 加工天数(交期，生产周期)
                value.offterPrice = file.cusUnitcost // 报价单价
                value.offterTotal = file.cusTotalcost // 报价总价
                value.supUnitcost = file.supUnitcost // 产品单价（供应商）
                value.supTotalcost = file.supTotalcost // 产品总价（供应商）
                value.loaGif = true // 是否显示 加载图
                value.no3DImg = 0 // 是否没有3D图纸 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.getOneAjax = 0 // 是否编辑第一次进来； 不获取Ajax； 0为是 1位不是
                // 表面数据处理
                if (file.finishqualityCode.length === 0) {
                    value.surfaceOne = '0'
                    value.surfaceTwo = '0'
                    value.surfaceThr = '0'
                } else {
                    let surArr = file.finishqualityCode.split(',')
                    if (surArr.length === 1) {
                        value.surfaceOne = surArr[0]
                    } else if (surArr.length === 2) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                    } else if (surArr.length === 3) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                        value.surfaceThr = surArr[2]
                    }
                }
                // 在选号里面 去获取ajax 或有个问题（数据复制 快过 成功调动）
                // let axiosArr = []
                // axiosArr.push(api.getMaterialsListFun(file.techId))
                // axiosArr.push(api.getSurfaceListFun(file.partMaterialCode))
                // this.getYBDataFun(axiosArr, 'tab0', value)
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                this.tableData2.push(value)
            } else if (type === 3) {
                let value = comFun.addThrDValueFun(obj, url, this.tableData3, 3) // 取出初始化话数据
                value.numIndex = file.sortNum // 序号
                value.edit = file.boolChose // 是否选中 1为选中 0 为没选中
                value.craft3d = file.techId // 工艺ID
                value.craftThrName = file.technologyCname // 工艺名称
                value.materials3d = file.partMaterialCode // 灌注材料编号
                value.materials3dName = file.partMaterialCname // 灌注材料名称
                value.promaterials = file.masterMaterialCode // 原型材料编号
                value.promaterialsName = file.masterMaterialCname // 原型材料名称
                value.promaterialsLsit = JSON.parse(JSON.stringify(this.modeProtoypeList)) // 原型材料列表
                value.Silicon = file.moldMaterialCode // 硅模材料编号
                value.SiliconName = file.moldMaterialCname // 硅模材料编号
                value.amount = file.partQty // 数量
                value.long = file.dimensionX // 长
                value.width = file.dimensionY // 宽
                value.height = file.dimensionZ // 高
                value.tiji = file.volume // 体积
                value.surfaceArea = file.surfaceArea // 面积
                value.weight = file.weightsGm // 重量
                value.remke = file.remarks // 备注
                value.piecemeal = file.splitCount // 拆件
                value.machinePage = file.setupsCount // 加工面数
                value.tolerance = file.tolerance // 公差
                value.tapping = file.threadQty // 攻牙
                value.difficulty = file.complexityCode // 难度编号
                value.difficultyName = file.complexityName // 难度名称
                value.inserts = file.mouldInsertCount // 镶件
                value.handicraftsTime = file.handSinglehours // 手工工时
                value.proTime = file.cnc3dSinglehours // 单件工时
                value.proDate = file.totalLeadtime // 加工天数(交期，生产周期)
                value.proTotal = file.cusTotalmasterVccost // 原型总价
                value.moldTotal = file.cusTotalmoldVccost // 模具总价
                value.pourPrice = file.cusUnitcost // 灌注单价
                value.offterTotal = file.cusTotalcost // 报价总价
                value.supUnitcost = file.supUnitcost // 产品单价（供应商）
                value.supTotalcost = file.supTotalcost // 产品总价（供应商）
                value.loaGif = true // 是否显示 加载图
                value.no3DImg = 0 // 是否没有3D图纸 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.getOneAjax = 0 // 是否编辑第一次进来； 不获取Ajax； 0为是 1位不是
                // 表面数据处理
                if (file.finishqualityCode.length === 0) {
                    value.surfaceOne = '0'
                    value.surfaceTwo = '0'
                    value.surfaceThr = '0'
                } else {
                    let surArr = file.finishqualityCode.split(',')
                    if (surArr.length === 1) {
                        value.surfaceOne = surArr[0]
                    } else if (surArr.length === 2) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                    } else if (surArr.length === 3) {
                        value.surfaceOne = surArr[0]
                        value.surfaceTwo = surArr[1]
                        value.surfaceThr = surArr[2]
                    }
                }
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                this.tableData3.push(value)
            } else if (type === 4) {
                let value = comFun.addThrDValueFun(obj, url, this.tableData4, 4) // 取出初始化话数据
                value.numIndex = file.sortNum // 序号
                value.edit = file.boolChose // 是否选中 1为选中 0 为没选中
                value.amount = file.partQty // 数量
                value.long = file.dimensionX // 长
                value.width = file.dimensionY // 宽
                value.height = file.dimensionZ // 高
                value.tiji = file.volume // 体积
                value.surfaceArea = file.surfaceArea // 面积
                value.weight = file.weightsGm // 重量
                value.remke = file.remarks // 备注
                value.difficulty = file.complexityCode // 难度编号(产品结构Code)
                value.difficultyName = file.complexityName // 难度名称(产品结构名)
                value.glueType = file.mouldGateType // 进胶类型
                value.tolerance = file.tolerance // 公差
                value.moldCore = file.masterMaterialCode // 模仁材料
                value.moldCoreName = file.masterMaterialCname // 模仁材料名
                value.dieBlank = file.moldMaterialCode // 模坯材料
                value.dieBlankName = file.moldMaterialCname // 模坯材料名
                value.lifetime = file.mouldTimes // 模具寿命
                value.delivery = file.totalLeadtime // 交期
                value.dieBlankType = file.mouldBaseType // 模坯类型
                value.rowNum = file.mouldSlideCount // 行位个数
                value.tiltNum = file.mouldLifterCount // 斜顶个数
                value.inserts = file.mouldInsertCount // 手动镶嵌个数
                value.holeNum = file.mouldCavitiesCount // 穴数
                value.hotNum = file.mouldHotsprueCount // 热嘴个数
                value.productMaterials = file.partMaterialCode // 产品材料
                value.productMaterialsName = file.partMaterialCname // 产品材料名称 
                value.productColor = file.mouldPartColor // 产品颜色 
                value.proPrice = file.cusUnitcost // 产品单价 
                value.proAmount = file.partQty // 产品数量
                value.supUnitcost = file.supUnitcost // 产品单价（供应商）
                value.supTotalcost = file.supTotalcost // 产品单价（供应商）
                value.sysFmouldMrmaterialCost = file.sysFmouldMrmaterialCost // 快速模具模仁材料费
                value.sysFmouldMpmaterialCost = file.sysFmouldMpmaterialCost // 快速模具模胚材料费
                value.sysFmouldTlmaterialCost = file.sysFmouldTlmaterialCost // 快速模具铜料费
                value.sysFmouldPjmaterialCost = file.sysFmouldPjmaterialCost // 快速模具配件费
                value.sysFmouldMaterialCost = file.sysFmouldMaterialCost // 快速模具模具总材料费
                value.sysFmouldProductionCost = file.sysFmouldProductionCost // 加工费
                value.sysFmouldProductionTime = file.sysFmouldProductionTime // 加工时长
                value.sysFmouldDesignCost = file.sysFmouldDesignCost // 快速模具设计费
                value.sysFmouldDesignTime = file.sysFmouldDesignTime // 设计时长
                value.sysFmouldTestmoldCost = file.sysFmouldTestmoldCost // 快速模具试模费
                value.sysFmouldTestmoldTime = file.sysFmouldTestmoldTime // 试模时长
                value.sysFmouldMoldlaborCost = file.sysFmouldMoldlaborCost // 快速模具配模人工费
                value.sysFmouldMoldlaborTime = file.sysFmouldMoldlaborTime // 快速模具配模时长（人工费）
                value.sysFmouldOtherCost = file.sysFmouldOtherCost // 快速模具其他费用
                value.sysFmouldMoldCost = file.sysFmouldMoldCost // 快速模具单个模具费
                value.sysFmouldMoldTotalcost = file.sysFmouldMoldTotalcost // 快速模具模具费：模具单价*模具数量
                value.sysFmouldHoleDepth = file.sysFmouldHoleDepth // 深孔钻深度(米)
                value.sysFmouldCncTime = file.sysFmouldCncTime // 快速模具CNC时长
                value.sysFmouldEdmTime = file.sysFmouldEdmTime // EDM时长(h)
                value.sysFmouldWedmTime = file.sysFmouldWedmTime // 磨铣床时间(h)
                value.sysFmouldGrinderTime = file.sysFmouldGrinderTime // 线切割时间(h)
                value.sysFmouldSurfaceTime = file.sysFmouldSurfaceTime // 表面处理时长
                value.cusTotalpartmaterialCost = file.cusTotalpartmaterialCost // 快速模具胶料费(报客户)
                value.supFmouldMoldTotalcost = file.supFmouldMoldTotalcost // 产品总材料费(供应商)
                value.supFmouldMaterialCost = file.supFmouldMaterialCost // 快速模具模具总材料费(供应商)
                value.supFmouldProductionCost = file.supFmouldProductionCost // 加工费(供应商)
                value.supFmouldTestmoldCost = file.supFmouldTestmoldCost // 快速模具试模费(供应商)
                value.supFmouldMoldcost = file.supFmouldMoldcost // 快速模具单个模具费(供应商)
                value.supFmouldMoldTotalcost = file.supFmouldMoldTotalcost // 快速模具总模具费(供应商：模具单价*模具数量)
                value.rowKey = file.mouldMergeId //  如果id值存在 就为 合并项
                value.rowFlag=file.mouldMergeId //  如果id值存在 就为 合并项
                value.loaGif = true // 是否显示 加载图
                value.no3DImg = 0 // 是否没有3D图纸 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.getOneAjax = 0 // 是否编辑第一次进来； 不获取Ajax； 0为是 1位不是
                value.surfaceOne = file.finishqualityCode // 表面处理
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                this.tableData4.push(value)
            }
            // // 快速模具
            // let value4 = comFun.addThrDValueFun(file, ossPath,this.tableData4, 4)
            // value4.difficulty = this.complexityList[0].complexityCode
            // value4.difficultyName = this.complexityList[0].complexityCname
            // value4.holeNum = this.rapidAcupointList[0].paramContent1
            // value4.hotNum = this.rapidHotSprueList[0].paramContent1
            // value4.tolerance = this.rapidToleranceList [0].paramContent1
            // value4.moldCore = this.repidModeCoreList [0].materialCode
            // value4.moldCoreName  = this.repidModeCoreList [0].materialCname
            // value4.dieBlank = this.repidModeDieList [0].materialCode
            // value4.dieBlankName  = this.repidModeDieList [0].materialCname
            // value4.lifetime = this.repidModeDieWList [0].paramContent1
            // value4.glueType = this.repidGumTypeList [0].paramContent1
            // value4.productColor = this.repidProductColorList [0].paramContent1
            // value4.productMaterials = this.repidProductList [0].materialCode
            // value4.productMaterialsName = this.repidProductList[0].materialCname
            // value4.dieBlankType = this.repidModeTypeList [0].paramContent1
            // value4.rowNum = this.rapidLineNumList[0].paramContent1
            // value4.tiltNum = this.rapidTopNumList [0].paramContent1
            // value4.no3DImg = 0
        },
        // 上传图片的新增记录方法
        nostlpictureFun (url, file, type, list) {
            for (let k in list) {
                if (file.pirct3Did === list[k].pirct3Did) {
                    let objV = {
                        attachmentFileid: list[k].pirct3Did, // 3D文件OSSid
                        dimensionX: list[k].long, // 长
                        dimensionY: list[k].width, // 宽
                        dimensionZ: list[k].height, // 高
                        volume: list[k].tiji ? list[k].tiji : 0, // 体积
                        // surfaceArea: list[k].area ? list[k].area : 0, // 表面积
                        // volume: 100,
                        surfaceArea: 0,
                        partQty: list[k].amount, //  产品数量
                        finishqualityCode: '', // 表面处理两个及两个以上的用,英文逗号拼接
                        no3DImg: list[k].no3DImg, // 判断是否有三D图纸 1为有 0
                        weightsGm: list[k].weight
                    }
                    // console.log(list[k].weight)
                    // // 处理不同数据
                    if (type === 'tab0') { // 3D打印
                        objV.partMaterialCode = file.materials3d // 材料编号
                        api.getThrPirceFun(objV).then(res => {
                            console.log(res)
                            if (res.code === 0) {
                                list[k].offterPrice = res.obj.cusUnitcost
                                list[k].offterTotal = res.obj.cusTotalcost
                                list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                list[k].loaGif = true
                                list[k].weight = res.obj.weightsGm
                                // 循环出key名 然后进行复制；数据太多
                                for (let N in res.obj) {
                                    // console.log(N)
                                    for (let J in list[k]) {
                                        if (N === J) {
                                            list[k][J] = res.obj[N]
                                        } else {
                                            // console.log()
                                            list[k][N] = res.obj[N]
                                        }
                                    }
                                }
                                this.eidtTotalPirce (type)
                            }
                        })
                    } else if (type === 'tab1' || type === 'tab2') { // CNC金属 或者塑料
                        objV.partMaterialCode = list[k].materials3d
                        objV.setupsCount = list[k].machinePage // 加工面数
                        objV.splitCount = list[k].piecemeal // 拆件数
                        objV.complexityCode = list[k].difficulty // 难度系数Code
                        objV.threadQty = list[k].tapping // 攻牙数量
                        objV.cncInsertQty =  list[k].inserts // 镶件数量
                        objV.tolerance = list[k].tolerance // 公差的值
                        // CNC价格
                        if (type === 'tab1') {
                            api.getCNCPiceFun(objV).then(res => {
                                if (res.code === 0) {
                                    list[k].offterPrice = res.obj.cusUnitcost
                                    list[k].offterTotal = res.obj.cusTotalcost
                                    list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                    list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                    list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                    list[k].loaGif = true
                                    list[k].weight = res.obj.weightsGm
                                        // 循环出key名 然后进行复制；数据太多
                                    for (let N in res.obj) {
                                        // console.log(N)
                                        for (let J in list[k]) {
                                            if (N === J) {
                                                list[k][J] = res.obj[N]
                                            } else {
                                                // console.log()
                                                list[k][N] = res.obj[N]
                                            }
                                        }
                                    }
                                    this.eidtTotalPirce (type)
                                }
                            })
                        } else if (type === 'tab2') {
                            // console.log(objV)
                            api.getCncSuPiceFun(objV).then(res => {
                                if (res.code === 0) {
                                    list[k].offterPrice = res.obj.cusUnitcost
                                    list[k].offterTotal = res.obj.cusTotalcost
                                    list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                    list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                    list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                    list[k].loaGif = true
                                    list[k].weight = res.obj.weightsGm
                                    // 循环出key名 然后进行复制；数据太多
                                    for (let N in res.obj) {
                                        // console.log(N)
                                        for (let J in list[k]) {
                                            if (N === J) {
                                                list[k][J] = res.obj[N]
                                            } else {
                                                // console.log()
                                                list[k][N] = res.obj[N]
                                            }
                                        }
                                    }
                                    this.eidtTotalPirce (type)
                                }
                            })
                        }
                    } else if (type === 'tab3') {// 复模
                        objV.techId = list[k].craft3d // 工艺ID
                        objV.partMaterialCode = list[k].materials3d // 灌注材料code 
                        objV.masterMaterialCode = list[k].promaterials // 原型材料Code 
                        objV.moldMaterialCode = list[k].Silicon // 硅模材料编号Code
                        objV.complexityCode = list[k].difficulty, // 难度系数Code 
                        objV.threadQty = list[k].tapping // 攻牙数量
                        objV.tolerance = list[k].tolerance // 公差的值
                        // 复模价格
                        api.getFumoPiceFun(objV).then(res => {
                            console.log(res)
                            if (res.code === 0) {
                                list[k].offterPrice = res.obj.cusUnitcost
                                list[k].offterTotal = res.obj.cusTotalcost // 报价总价
                                list[k].proTotal  = res.obj.sysTotalmasterVccost // 原型总价
                                list[k].moldTotal  = res.obj.sysFmouldMoldTotalcost // 模具总价
                                list[k].pourPrice  = res.obj.cusUnitcost // 灌注总价
                                list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                list[k].loaGif = true
                                list[k].weight = res.obj.weightsGm
                                // 循环出key名 然后进行复制；数据太多
                                for (let N in res.obj) {
                                    // console.log(N)
                                    for (let J in list[k]) {
                                        if (N === J) {
                                            list[k][J] = res.obj[N]
                                        } else {
                                            // console.log()
                                            list[k][N] = res.obj[N]
                                        }
                                    }
                                }
                                this.eidtTotalPirce (type)
                            }
                        })
                    } else if (type === 'tab4') { // 快速复模
                        // console.log('定位专用')
                        objV.partMaterialCode = list[k].productMaterials // 产品材料code 
                        objV.masterMaterialCode = list[k].moldCore // 模仁材料Code 
                        objV.moldMaterialCode = list[k].dieBlank // 模胚材料Code
                        objV.complexityCode = list[k].difficulty // 产品结构难度系数Code 
                        objV.mouldPartColor = list[k].productColor // 产品颜色
                        objV.mouldBaseType = list[k].dieBlankType // 模胚类型 
                        objV.mouldSlideCount = list[k].rowNum === '' ? 0 : list[k].rowNum // 行位个数
                        objV.mouldLifterCount = list[k].tiltNum === '' ? 0 : list[k].tiltNum // 斜顶个数
                        objV.mouldInsertCount = list[k].inserts === '' ? 0 : list[k].inserts // 镶件个数 
                        objV.mouldCavitiesCount = list[k].holeNum === '' ? 0 : list[k].holeNum // 穴数 
                        objV.mouldHotsprueCount = list[k].hotNum === '' ? 0 : list[k].hotNum // 热嘴个数
                        objV.mouldTimes = list[k].lifetime // 模具寿命
                        objV.tolerance = list[k].tolerance //  公差的值
                        objV.mouldGateType = list[k].glueType // 进胶类型
                        objV.partQty = list[k].proAmount, //  产品数量
                        objV.moldQty = list[k].moldAmout // 模具数量
                        list[k].loaGif = true
                        // 快速磨具价格
                        api.getModelPiceFun(objV).then(res => {
                            console.log(res)
                            if (res.code === 0) {
                                // list[k].offterPrice = res.obj.cusUnitcost
                                // list[k].offterTotal = res.obj.cusTotalcost
                                list[k].delivery = res.obj.totalLeadtime // 交期
                                list[k].moldoPrice = res.obj.cusFmouldMoldcost // 模具单价
                                list[k].moldTotal = res.obj.cusFmouldMoldTotalcost // 模具总价
                                list[k].proPrice = res.obj.cusUnitcost // 产品单价
                                list[k].proTotal = (res.obj.cusUnitcost * list[k].proAmount).toFixed(2) // 产品总价
                                list[k].total = res.obj.cusTotalcost // 总价
                                list[k].mergeTotal = res.obj.cusTotalcost  // 合并后的总价
                                list[k].mergeModePrice = res.obj.cusFmouldMoldcost // 合并后的模具单价
                                list[k].mergeModeTotal = res.obj.cusFmouldMoldTotalcost // 合并后的模具总价
                                list[k].weight = res.obj.weightsGm
                                // 循环出key名 然后进行复制；数据太多
                                for (let N in res.obj) {
                                    // console.log(N)
                                    for (let J in list[k]) {
                                        if (N === J) {
                                            list[k][J] = res.obj[N]
                                        } else {
                                            // console.log()
                                            list[k][N] = res.obj[N]
                                        }
                                    }
                                }
                                this.eidtTotalPirce (type)
                            }
                        })
                    }
                }
            }
            // // 处理表面处理
            // // if (list[k].surfaceOne !== '0') {
            // //     objV.finishqualityCode = objV.finishqualityCode + list[k].surfaceOne
            // // }
            // // // 处理表面处理数据
            // // if (list[k].surfaceTwo !== '0') {
            // //     if (objV.finishqualityCode === '') {
            // //         objV.finishqualityCode = objV.finishqualityCode + list[k].surfaceTwo
            // //     } else {
            // //         objV.finishqualityCode = objV.finishqualityCode + ',' + list[k].surfaceTwo
            // //     }
            // // }
            // // if (list[k].surfaceThr !== '0') {
            // //     if (objV.finishqualityCode === '') {
            // //         objV.finishqualityCode = objV.finishqualityCode + list[k].surfaceThr
            // //     } else {
            // //         objV.finishqualityCode = objV.finishqualityCode + ',' + list[k].surfaceThr
            // //     }
            // // } 
        },
        // 专挑到CEM
        gotoCrm () {
            this.$router.push('/CRM')
        },
        // 计算全部价格
        getAllListTotal (e) {
            // 帮说有列表 添加选择项
            if (e === true) {
                this.tableData4.forEach(item => {
                    item.edit = e
                    this.$refs.multipleTable4.toggleRowSelection(item)
                })
                this.tableData0.forEach(item => {
                    item.edit = e
                    this.$refs.multipleTable0.toggleRowSelection(item)
                })
                this.tableData1.forEach(item => {
                    item.edit = e
                    this.$refs.multipleTable1.toggleRowSelection(item)
                })
                this.tableData2.forEach(item => {
                    item.edit = e
                    this.$refs.multipleTable2.toggleRowSelection(item)
                })
                this.tableData3.forEach(item => {
                    item.edit = e
                    this.$refs.multipleTable3.toggleRowSelection(item)
                })
                // 获取计算总价
                this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
            } else {
                this.tableData4.forEach(item => {
                    item.edit = e
                })
                this.tableData0.forEach(item => {
                    item.edit = e
                })
                this.tableData1.forEach(item => {
                    item.edit = e
                })
                this.tableData2.forEach(item => {
                    item.edit = e
                })
                this.tableData3.forEach(item => {
                    item.edit = e
                })
                this.$refs.multipleTable0.clearSelection()
                this.$refs.multipleTable1.clearSelection()
                this.$refs.multipleTable2.clearSelection()
                this.$refs.multipleTable3.clearSelection()
                this.$refs.multipleTable4.clearSelection()
                this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
            }
        },
        // 上传的不是stl文件格式3D图纸
        igsfilePreview(file, url, type, list) {
            console.log(url)
            this.$request.post('/salqtdetails/changeIgs', {filePath: url}).then(res => {
                console.log(res)
                if (res.code === 0) {
                    file.url = res.obj.ossKeyStl
                    console.log("==============================================")
                    console.log(file.url)
                    this.filePreview(file, res.obj.ossKeyStl, type, list)
                }
            })
        },
        // 拖拽实习位置互换
        handleDragStart (e, item) {
            // console.log(e, item)
            // console.log('触发了1')
            this.dragging = item
            e.dataTransfer.effectAllowed  = 'move'
            // console.log(e.dataTransfer.effectAllowed)
        },
        handleDragOver (e, item) {
            // console.log(e)
            // console.log(item)
            e.dataTransfer.dropEffect = 'move';
            // console.log('触发了2')
        },
        handleDragEnter (e, item, type) {
            if (this.dragging) {
                e.dataTransfer.effectAllowed = 'move';// 为需要移动的元素设置dragstart事件
                if (item === this.dragging) {
                    return;
                }
                let newItems = []
                if (type === 'tab0') {
                    newItems = [...this.tableData0]
                } else if (type === 'tab1') {
                    newItems = [...this.tableData1]
                } else if (type === 'tab2') {
                    newItems = [...this.tableData2]
                } else if (type === 'tab3') {
                    newItems = [...this.tableData3]
                } else if (type === 'tab4') {
                    newItems = [...this.tableData4]
                }
                // const newItems = [...this.tableData4];
                // console.log(newItems);
                const src = newItems.indexOf(this.dragging);
                const dst = newItems.indexOf(item);
                newItems.splice(dst, 0, ...newItems.splice(src, 1));
                if (type === 'tab0') {
                    this.tableData0 = newItems;
                } else if (type === 'tab1') {
                    this.tableData1 = newItems;
                } else if (type === 'tab2') {
                    this.tableData2 = newItems;
                } else if (type === 'tab3') {
                    this.tableData3 = newItems;
                } else if (type === 'tab4') {
                    this.tableData4 = newItems;
                }
            }
            // console.log('触发31')
        },
        handleDragEnd (e, item, type) {
            // console.log('触发4')
            this.dragging = null
            // 重新复制 numIndex
            if (type === 'tab0') {
                this.tableData0.forEach((item, index) => {
                    item.numIndex = index + 1
                })
            } else if (type === 'tab1') {
                this.tableData1.forEach((item, index) => {
                    item.numIndex = index + 1
                })
            } else if (type === 'tab2') {
                this.tableData2.forEach((item, index) => {
                    item.numIndex = index + 1
                })
            } else if (type === 'tab3') {
               this.tableData3.forEach((item, index) => {
                    item.numIndex = index + 1
                })
            } else if (type === 'tab4') {
                this.tableData4.forEach((item, index) => {
                    item.numIndex = index + 1
                })
            }
        },
        // 上传中回调出发
        getUploadAwaitFun (id, percent) {
            console.log(this.progressList[0].id)
            this.progressList.forEach(item => {
                if(item.id === id) {
                    item.preNum = percent
                }
            })
            // this.showProgress = percent
            this.$forceUpdate()
        },
        // 当个上传的数据列表
        showossdataItem (val) {
           this.showLoading = true
           this.shshowProgressow = 0
            //    console.log(val)
           // 添加进度条参数
           this.progressList = val
           this.progressList.forEach(item => {
               item.preNum = 0
           })
        },
        showPulodItem (ossPath, id, file, ossName) {
            // 处理一下文字显示问题
            let clos = ''
            if (file.name.length > 14) {
                clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
            } else {
                clos = file.name
            }
            let obj = {
                path: ossPath,
                id: id,
                name: file.name,
                nameTwo: clos, // 显示的名字
                attachmentFileid: this.temporaryFileId,
                attachmenOriginalname: ossName,
                attachmenOssfilename: file.name,
                attachmentPath: ossPath,
                source: 'noAll'
            }
            let arr = []
            arr.push(obj)
            this.temporaryFileList.push(obj)
            if (this.temporaryFileType === 'tab0') {
                this.tableData0.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData0[index].fileList.push(obj)
                    }
                })
            } else if (this.temporaryFileType === 'tab1') {
                 this.tableData1.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData1[index].fileList.push(obj)
                    }
                })
            } else if (this.temporaryFileType === 'tab2') {
                this.tableData2.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData2[index].fileList.push(obj)
                    }
                })
            } else if (this.temporaryFileType === 'tab3') {
                this.tableData3.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData3[index].fileList.push(obj)
                    }
                })
            } else if (this.temporaryFileType === 'tab4') {
                 this.tableData4.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData4[index].fileList.push(obj)
                    }
                })
            }
            let showBtm = this.progressList.some(v => v.preNum != 100 )
            console.log(showBtm)
            // console.log(showBtm)
            // console.log(this.tableData4[0].fileList)
            if (arr.length !== 0) {
                 this.$request.post('/salqtdetailsattachment/saveAttachment', arr).then(res => {
                    console.log(res)
                })
            }
            setTimeout(() => {
                this.showLoading = showBtm
            }, 1000)
        },
        // 保存按钮总数据
        saveFun () {
            let arr = []
            // console.log(this.tableData0[0])
            this.tableData0.forEach(item => {
                let obj= {
                    boolChose: item.edit === true ? 1 : 0, // 是否选择
                    sortNum: item.numIndex, // 序列号
                    attachmentOriginal3dname: item.name, // 3D源文件名,3D文件OSS上
                    attachmentFileid: item.pirct3Did, // OSS下载路径ID
                    attachmentOss3dkey:item.picture, // 附件OSS下载路径（含文件名）
                    // imagenameOss3dpart: ''  // 3d截图名字（争议中）
                    imagenamePath: item.url_img, // 3D截图路径（含文件名）
                    technologyCategory: 3, // // 1：CNC塑料 2：CNC金属  3：3D打印  4：复模  10：快速模具 (区别当前是什么)
                    techId: item.craft3d, // 工艺id
                    technologyCname: item.craftThrName, // 工艺名称
                    partMaterialCode: item.materials3d, // 产品材料编号(灌注，钣金)
                    partMaterialCname: item.masterThrName, // 产品材料名称(灌注，钣金)
                    partQty: item.amount, // 产品数量
                    dimensionX: item.long, // 长
                    dimensionY: item.width, // 宽
                    dimensionZ: item.height, // 高
                    volume: item.tiji, // 体积
                    surfaceArea: item.surfaceArea, // 表面积
                    weightsGm: item.weight, // 重量
                    handSinglehours: item.handicraftsTime, // 手工工时
                    cnc3dSinglehours: item.proTime, // 单件工时
                    totalLeadtime: item.proDate, // 加工天数(交期，生产周期)
                    remarks: item.remke, // 备注
                    cusUnitcost: item.offterPrice, // 报价单价
                    cusTotalcost: item.offterTotal, // 报价总价
                    supUnitcost: item.supUnitcost, // 产品单价(供应商)
                    supTotalcost: item.supTotalcost // 产品总价(供应商)
                }
                let sArr = this.disposeBMFun(item)
                obj.finishqualityCode = sArr[0] // 表面处理Code
                obj.finishqualityName = sArr[1] // 表面处理名字
                arr.push(obj)
            })
            this.tableData1.forEach(item => {
                let obj = {
                    boolChose: item.edit === true ? 1 : 0, // 是否选择
                    sortNum: item.numIndex, // 序列号
                    attachmentOriginal3dname: item.name, // 3D源文件名,3D文件OSS上
                    attachmentFileid: item.pirct3Did, // OSS下载路径ID
                    attachmentOss3dkey:item.picture, // 附件OSS下载路径（含文件名）
                    // imagenameOss3dpart: ''  // 3d截图名字（争议中）
                    imagenamePath: item.url_img, // 3D截图路径（含文件名）
                    technologyCategory: 1, // // 1：CNC塑料 2：CNC金属  3：3D打印  4：复模  10：快速模具 (区别当前是什么)
                    techId: item.craft3d, // 工艺id
                    technologyCname: item.craftThrName, // 工艺名称
                    partMaterialCode: item.materials3d, // 产品材料编号(灌注，钣金)
                    partMaterialCname: item.masterThrName, // 产品材料名称(灌注，钣金)
                    partQty: item.amount, // 产品数量
                    dimensionX: item.long, // 长
                    dimensionY: item.width, // 宽
                    dimensionZ: item.height, // 高
                    volume: item.tiji, // 体积
                    surfaceArea: item.surfaceArea, // 表面积
                    weightsGm: item.weight, // 重量
                    splitCount: item.piecemeal, // 拆件
                    setupsCount: item.machinePage, // 加工面数
                    tolerance: item.tolerance, // 公差
                    threadQty: item.tapping, // 攻牙
                    complexityCode: item.difficulty, // 难度编号
                    complexityName: item.difficultyName, // 难度名称
                    mouldInsertCount: item.inserts, // 镶件
                    handSinglehours: item.handicraftsTime, // 手工工时
                    cnc3dSinglehours: item.proTime, // 单件工时
                    totalLeadtime: item.proDate, // 加工天数(交期，生产周期)
                    remarks: item.remke, // 备注
                    cusUnitcost: item.offterPrice, // 报价单价
                    cusTotalcost: item.offterTotal, // 报价总价
                    supUnitcost: item.supUnitcost, // 产品单价（供应商）
                    supTotalcost: item.supTotalcost // 产品总价（供应商）
                }
                let sArr = this.disposeBMFun(item)
                obj.finishqualityCode = sArr[0] // 表面处理Code
                obj.finishqualityName = sArr[1] // 表面处理名字
                if (item.sparkList.length !== 0) {
                    item.sparkList.forEach(s => {
                        if (s == '1') {
                            obj.edm = 1
                        } else {
                            obj.edm = 0
                        }
                        if (s == '2') {
                            obj.wireCutting = 1
                        } else {
                            obj.wireCutting = 0
                        }
                    })
                } else {
                    obj.edm = 0
                    obj.wireCutting = 0
                }

                arr.push(obj)
            })
            this.tableData2.forEach(item => {
                let obj = {
                    boolChose: item.edit === true ? 1 : 0, // 是否选择
                    sortNum: item.numIndex, // 序列号
                    attachmentOriginal3dname: item.name, // 3D源文件名,3D文件OSS上
                    attachmentFileid: item.pirct3Did, // OSS下载路径ID
                    attachmentOss3dkey:item.picture, // 附件OSS下载路径（含文件名）
                    // imagenameOss3dpart: ''  // 3d截图名字（争议中）
                    imagenamePath: item.url_img, // 3D截图路径（含文件名）
                    technologyCategory: 2, // // 1：CNC塑料 2：CNC金属  3：3D打印  4：复模  10：快速模具 (区别当前是什么)
                    techId: item.craft3d, // 工艺id
                    technologyCname: item.craftThrName, // 工艺名称
                    partMaterialCode: item.materials3d, // 产品材料编号(灌注，钣金)
                    partMaterialCname: item.masterThrName, // 产品材料名称(灌注，钣金)
                    partQty: item.amount, // 产品数量
                    dimensionX: item.long, // 长
                    dimensionY: item.width, // 宽
                    dimensionZ: item.height, // 高
                    volume: item.tiji, // 体积
                    surfaceArea: item.surfaceArea, // 表面积
                    weightsGm: item.weight, // 重量
                    splitCount: item.piecemeal, // 拆件
                    setupsCount: item.machinePage, // 加工面数
                    tolerance: item.tolerance, // 公差
                    threadQty: item.tapping, // 攻牙
                    complexityCode: item.difficulty, // 难度编号
                    complexityName: item.difficultyName, // 难度名称
                    mouldInsertCount: item.inserts, // 镶件
                    handSinglehours: item.handicraftsTime, // 手工工时
                    cnc3dSinglehours: item.proTime, // 单件工时
                    totalLeadtime: item.proDate, // 加工天数(交期，生产周期)
                    remarks: item.remke, // 备注
                    cusUnitcost: item.offterPrice, // 报价单价
                    cusTotalcost: item.offterTotal, // 报价总价
                    supUnitcost: item.supUnitcost, // 产品单价（供应商）
                    supTotalcost: item.supTotalcost, // 产品总价（供应商）
                    edm: 0, // 火花
                    wireCutting: 0, // 切割线
                }
                let sArr = this.disposeBMFun(item)
                obj.finishqualityCode = sArr[0] // 表面处理Code
                obj.finishqualityName = sArr[1] // 表面处理名字
                arr.push(obj)
            })
            this.tableData3.forEach(item => {
                let obj = {
                    boolChose: item.edit === true ? 1 : 0, // 是否选择
                    sortNum: item.numIndex, // 序列号
                    attachmentOriginal3dname: item.name, // 3D源文件名,3D文件OSS上
                    attachmentFileid: item.pirct3Did, // OSS下载路径Id
                    attachmentOss3dkey:item.picture, // 附件OSS下载路径（含文件名）
                    // imagenameOss3dpart: ''  // 3d截图名字（争议中）
                    imagenamePath: item.url_img, // 3D截图路径（含文件名）
                    technologyCategory: 4, // // 1：CNC塑料 2：CNC金属  3：3D打印  4：复模  10：快速模具 (区别当前是什么)
                    techId: item.craft3d, // 工艺id
                    technologyCname: item.craftThrName, // 工艺名称
                    partMaterialCode: item.materials3d, // (灌注材料编号)
                    partMaterialCname: item.materials3dName, // (灌注材料名称)
                    masterMaterialCode: item.promaterials, // 原型材料编号
                    masterMaterialCname: item.promaterialsName, // 原型材料名称
                    moldMaterialCode: item.Silicon, // 硅模材料编号
                    moldMaterialCname: item.SiliconName, // 硅模材料名
                    partQty: item.amount, // 产品数量
                    dimensionX: item.long, // 长
                    dimensionY: item.width, // 宽
                    dimensionZ: item.height, // 高
                    volume: item.tiji, // 体积
                    surfaceArea: item.surfaceArea, // 表面积
                    weightsGm: item.weight, // 重量
                    splitCount: item.piecemeal, // 拆件
                    setupsCount: item.machinePage, // 加工面数
                    tolerance: item.tolerance, // 公差
                    threadQty: item.tapping, // 攻牙
                    complexityCode: item.difficulty, // 难度编号
                    complexityName: item.difficultyName, // 难度名称
                    mouldInsertCount: item.inserts, // 镶件
                    handSinglehours: item.handicraftsTime, // 手工工时
                    cnc3dSinglehours: item.proTime, // 单件工时
                    totalLeadtime: item.proDate, // 加工天数(交期，生产周期)
                    remarks: item.remke, // 备注
                    cusTotalmasterVccost: item.proTotal, // 原型总价
                    cusTotalmoldVccost: item.moldTotal, // 模具总价
                    cusUnitcost: item.pourPrice, // 灌注单价
                    cusTotalcost: item.offterTotal, // 报价总价
                    supUnitcost: item.supUnitcost, // 产品单价（供应商）
                    supTotalcost: item.supTotalcost, // 产品总价（供应商）
                    edm: 0, // 火花
                    wireCutting: 0, // 切割线
                }
                let sArr = this.disposeBMFun(item)
                obj.finishqualityCode = sArr[0] // 表面处理Code
                obj.finishqualityName = sArr[1] // 表面处理名字
                arr.push(obj)
            })
            this.tableData4.forEach(item => {
                let obj = {
                    boolChose: item.edit === true ? 1 : 0, // 是否选择
                    sortNum: item.numIndex, // 序列号
                    attachmentOriginal3dname: item.name, // 3D源文件名,3D文件OSS上
                    attachmentFileid: item.pirct3Did, // OSS下载路径Id
                    attachmentOss3dkey:item.picture, // 附件OSS下载路径（含文件名）
                    // imagenameOss3dpart: ''  // 3d截图名字（争议中）
                    imagenamePath: item.url_img, // 3D截图路径（含文件名）
                    technologyCategory: 10, // // 1：CNC塑料 2：CNC金属  3：3D打印  4：复模  10：快速模具 (区别当前是什么)
                    dimensionX: item.long, // 长
                    dimensionY: item.width, // 宽
                    dimensionZ: item.height, // 高
                    volume: item.tiji, // 体积
                    surfaceArea: item.surfaceArea, // 表面积
                    weightsGm: item.weight, // 重量
                    complexityCode: item.difficulty, // 难度编号(产品结构Code)
                    complexityName: item.difficultyName, // 难度名称(产品结构名)
                    mouldGateType: item.glueType, // 进胶类型
                    tolerance: item.tolerance, // 公差
                    masterMaterialCode: item.moldCore, // 模仁材料
                    masterMaterialCname: item.moldCoreName, // 模仁材料名
                    moldMaterialCode: item.dieBlank, // 模坯材料
                    moldMaterialCname: item.dieBlankName, // 模坯材料名
                    mouldTimes: item.lifetime, // 模具寿命
                    totalLeadtime: item.delivery, // 交期
                    mouldBaseType: item.dieBlankType, // 模坯类型
                    mouldSlideCount: item.rowNum, // 行位个数
                    mouldLifterCount: item.tiltNum, // 斜顶个数
                    mouldInsertCount: item.inserts === '' ? 0 : item.inserts, // 手动镶嵌个数
                    mouldCavitiesCount: item.holeNum, // 穴数
                    mouldHotsprueCount: item.hotNum, // 热嘴个数
                    partMaterialCode: item.productMaterials, // 产品材料
                    partMaterialCname: item.productMaterialsName, // 产品材料名称
                    // productMaterials 产品材料code
                    // productMaterialsName 产品材料名
                    mouldPartColor: item.productColor, // 产品颜色
                    masterQty: 1, // 默认为1；暂时写死
                    cusUnitcost: item.proPrice, // 产品单价
                    partQty: item.proAmount, // 产品数量
                    // 直接去的是接口返回值
                    supUnitcost: item.supUnitcost, // 产品单价（供应商）
                    supTotalcost: item.supTotalcost, // 产品单价（供应商）
                    sysFmouldMrmaterialCost: item.sysFmouldMrmaterialCost, // 快速模具模仁材料费
                    sysFmouldMpmaterialCost: item.sysFmouldMpmaterialCost, // 快速模具模胚材料费
                    sysFmouldTlmaterialCost: item.sysFmouldTlmaterialCost, // 快速模具铜料费
                    sysFmouldPjmaterialCost: item.sysFmouldPjmaterialCost, // 快速模具配件费
                    sysFmouldMaterialCost: item.sysFmouldMaterialCost, // 快速模具模具总材料费
                    sysFmouldProductionCost: item.sysFmouldProductionCost, // 加工费
                    sysFmouldProductionTime: item.sysFmouldProductionTime, // 加工时长
                    sysFmouldDesignCost: item.sysFmouldDesignCost, // 快速模具设计费
                    sysFmouldDesignTime: item.sysFmouldDesignTime, // 设计时长
                    sysFmouldTestmoldCost: item.sysFmouldTestmoldCost, // /快速模具试模费
                    sysFmouldTestmoldTime: item.sysFmouldTestmoldTime, // /试模时长
                    sysFmouldMoldlaborCost: item.sysFmouldMoldlaborCost, // /快速模具配模人工费
                    sysFmouldMoldlaborTime: item.sysFmouldMoldlaborTime, // 快速模具配模时长（人工费）
                    sysFmouldOtherCost: item.sysFmouldOtherCost, // 快速模具其他费用
                    sysFmouldMoldCost: item.sysFmouldMoldCost, // 快速模具单个模具费
                    sysFmouldMoldTotalcost: item.sysFmouldMoldTotalcost, // 快速模具模具费：模具单价*模具数量
                    sysFmouldHoleDepth: item.sysFmouldHoleDepth, // 深孔钻深度(米)
                    sysFmouldCncTime: item.sysFmouldCncTime, // 快速模具CNC时长
                    sysFmouldEdmTime: item.sysFmouldEdmTime, // EDM时长(h)
                    sysFmouldWedmTime: item.sysFmouldWedmTime, // 磨铣床时间(h)
                    sysFmouldGrinderTime: item.sysFmouldGrinderTime, // 线切割时间(h)
                    sysFmouldSurfaceTime: item.sysFmouldSurfaceTime, // 表面处理时长
                    cusTotalpartmaterialCost: item.cusTotalpartmaterialCost, // 快速模具胶料费(报客户)
                    supFmouldMoldTotalcost: item.supFmouldMoldTotalcost, // 产品总材料费(供应商)
                    supFmouldMaterialCost: item.supFmouldMaterialCost, // 快速模具模具总材料费(供应商)
                    supFmouldProductionCost: item.supFmouldProductionCost, // 加工费(供应商)
                    supFmouldTestmoldCost: item.supFmouldTestmoldCost, // 快速模具试模费(供应商)
                    supFmouldMoldcost: item.supFmouldMoldcost, // 快速模具单个模具费(供应商)
                    supFmouldMoldTotalcost: item.supFmouldMoldTotalcost, // 快速模具总模具费(供应商：模具单价*模具数量)
                    edm: 0, // 火花
                    wireCutting: 0, // 切割线
                    mouldMergeId: item.rowKey // 如果id值存在 就为 合并项
                }

                if (item.rowFlag !== '') {
                    obj.cusTotalcost = item.mergeTotal
                    obj.cusFmouldMoldTotalcost = item.mergeModeTotal
                    obj.cusFmouldMoldcost = item.mergeModeTotal // 快速模具单个模具费(报客户)
                } else {
                    obj.cusTotalcost = item.total
                    obj.cusFmouldMoldTotalcost = item.moldTotal
                    obj.cusFmouldMoldcost = item.moldTotal // 快速模具单个模具费(报客户)
                }
                let sArr = this.disposeBMFun(item)
                obj.finishqualityCode = sArr[0] // 表面处理Code
                obj.finishqualityName = sArr[1] // 表面处理名字
                arr.push(obj)
            })
            // console.log(JSON.stringify(arr))
            this.$request.post('/salqtdetails/saveQu', arr).then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.$router.push('/customerInquiry')
                }
            })
        },
        // 一件上传附件
        showPulodAll (ossPath, id, file, ossName) {
            // console.log(file)
            let arr = []
            let fileName = file.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
            if (this.tableData0.length !== 0) {
                this.tableData0.forEach(item => {
                    let objName = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
                    if (objName === fileName) {
                        let clos = ''
                        if (file.name.length > 14) {
                            clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
                        } else {
                            clos = file.name
                        }
                        let obj = {
                            path: ossPath,
                            id: id,
                            name: file.name,
                            nameTwo: clos,
                            attachmentFileid: item.pirct3Did,
                            attachmenOriginalname: ossName,
                            attachmenOssfilename: file.name,
                            attachmentPath: ossPath,
                            source: 'all'
                        }
                        arr.push(obj)
                        item.fileList.push(obj)
                    }
                })
            }
            if (this.tableData1.length !== 0) {
                this.tableData1.forEach(item => {
                    let objName = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
                    if (item.name === fileName) {
                        let clos = ''
                        if (file.name.length > 14) {
                            clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
                        } else {
                            clos = file.name
                        }
                        let obj = {
                            path: ossPath,
                            id: id,
                            name: file.name,
                            attachmentFileid: item.pirct3Did,
                            attachmenOriginalname: ossName,
                            attachmenOssfilename: file.name,
                            attachmentPath: ossPath,
                            nameTwo: clos,
                            source: 'all'
                        }
                        arr.push(obj)
                        item.fileList.push(obj)
                    }
                })
            }
            if (this.tableData2.length !== 0) {
                this.tableData2.forEach(item => {
                    let objName = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
                    if (objName === fileName) {
                        let clos = ''
                        if (file.name.length > 14) {
                            clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
                        } else {
                            clos = file.name
                        }
                        let obj = {
                            path: ossPath,
                            id: id,
                            name: file.name,
                            nameTwo: clos,
                            attachmentFileid: item.pirct3Did,
                            attachmenOriginalname: ossName,
                            attachmenOssfilename: file.name,
                            attachmentPath: ossPath,
                            source: 'all'
                        }
                        arr.push(obj)
                        item.fileList.push(obj)
                    }
                })
            }
            if (this.tableData3.length !== 0) {
                this.tableData3.forEach(item => {
                    let objName = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
                    if (objName === fileName) {
                        let clos = ''
                        if (file.name.length > 14) {
                            clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
                        } else {
                            clos = file.name
                        }
                        let obj = {
                            path: ossPath,
                            id: id,
                            name: file.name,
                            nameTwo: clos,
                            attachmentFileid: item.pirct3Did,
                            attachmenOriginalname: ossName,
                            attachmenOssfilename: file.name,
                            attachmentPath: ossPath,
                            source: 'all'
                        }
                        arr.push(obj)
                        item.fileList.push(obj)
                    }
                })
            }
            if (this.tableData4.length !== 0) {
                this.tableData4.forEach(item => {
                    let objName = item.name.replace(/(.*\/)*([^.]+).*/ig,"$2")
                    if (objName === fileName) {
                        let clos = ''
                        if (file.name.length > 14) {
                            clos = file.name.replace(/^(^.{7})(.+)(.{2}\.+\w+$)$/g, "$1...$3")
                        } else {
                            clos = file.name
                        }
                        let obj = {
                            path: ossPath,
                            id: id,
                            name: file.name,
                            attachmentFileid: item.pirct3Did,
                            attachmenOriginalname: ossName,
                            attachmenOssfilename: file.name,
                            attachmentPath: ossPath,
                            nameTwo: clos,
                            source: 'all' // 用来区分开是否一键上传传过来的
                        }
                        arr.push(obj)
                        item.fileList.push(obj)
                    }
                })
            }
            if (arr.length !== 0) {
                this.$request.post('/salqtdetailsattachment/saveAttachment', arr).then(res => {
                    console.log(res)
                })
            }
            let showBTN = this.progressList.some(v => v.preNum != 100 )
            // this.showLoading = showBTN
            setTimeout(() => {
                this.showLoading = showBTN
            }, 1000)
        },
        // 2D弹窗确地添加数据 
        add2DListFun () {
            if (this.titleFlg === 1) {
                console.log('111')
                if (this.noPictTwoObj.long != '' && this.noPictTwoObj.width != '' && this.noPictTwoObj.height != '' && this.noPictTwoObj.weight != '' 
                && this.noPictTwoObj.name != '' && this.noPictTwoObj.master != '') {
                    // if (this.noPictTwoObj.img_url !== '') {
                    //     this.show2DTableList(this.noPictTwoObj, 1)
                    //     this.dialogVisible = false
                    // } else {
                    //     this.$message.error('请先上传图片');
                    // }
                    this.noPictTwoObj.img_file = ''
                    this.noPictTwoObj.img_file = {
                        id: '',
                        name: '',
                    }
                    this.dialogVisible = false
                    this.show2DTableList(this.noPictTwoObj, 1)
                } else {
                    this.$message.error('请先填写完整信息');
                }
            } else {
                console.log('222')
                if (this.noPictTwoObj2.long != '' && this.noPictTwoObj2.width != '' && this.noPictTwoObj2.height != '' && this.noPictTwoObj2.tiji != '' 
                && this.noPictTwoObj2.name != '') {
                    // if (this.noPictTwoObj2.img_url !== '') {
                    //     this.show2DTableList(this.noPictTwoObj2, 2)
                    //     this.dialogVisible = false
                    // } else {
                    //     this.$message.error('请先上传图片');
                    // }
                    this.noPictTwoObj2.img_file = ''
                    this.noPictTwoObj2.img_file = {
                        id: '',
                        name: '',
                    }
                    this.dialogVisible = false
                    this.show2DTableList(this.noPictTwoObj2, 2)
                } else {
                    this.$message.error('请先填写完整信息');
                }
            }
        },
        // 选择数据类型
        selectNoFun (i) {
            this.titleFlg = i
        },
        // 显示弹出
        showModel () {
            this.dialogVisible = true
            for(let i in this.noPictTwoObj) {
                this.noPictTwoObj[i] = ''
            }
            for(let i in this.noPictTwoObj2) {
                this.noPictTwoObj2[i] = ''
            }
        },
        // 2D关闭
        handleClose(done) {
            this.dialogVisible = false
            // this.$confirm('确认关闭？').then(res => {
            //     this.dialogVisible = false
            // })
            // .catch(err => {
            //     // this.dialogVisible = false
            // });
        },
        // 图片2D
        getOssDataImg (data) {
            console.log(data)
        },
        // 处理2D图片添加
        get2dImgFun (ossPath, id, file, imgurl) {
            if (this.titleFlg === 1) {
                this.noPictTwoObj.img_url = ossPath ? ossPath : require('../../assets/image/baojia_img.jpg')
                this.noPictTwoObj.img_file = file
                this.noPictTwoObj.addId = id
            } else {
                this.noPictTwoObj2.img_url = ossPath ? ossPath : require('../../assets/image/baojia_img.jpg')
                this.noPictTwoObj2.img_file = file
                this.noPictTwoObj2.addId = id
            }
        },

        // 处理2D文件上传后点击确定 数据处理
        show2DTableList (addItem, type) {
            // 处理2D数据
            let value = comFun.addThrDValueFun(addItem.img_file, addItem.img_url, this.tableData0, 0)
            value.craft3d = this.craf3DtList[0].id
            value.craftThrName = this.craf3DtList[0].techName
            value.pirct3Did = ''
            value.width = JSON.parse(JSON.stringify(addItem.width))
            value.long = JSON.parse(JSON.stringify(addItem.long))
            value.name = JSON.parse(JSON.stringify(addItem.name))
            value.height = JSON.parse(JSON.stringify(addItem.height))
            value.url_img = '' 
            value.craf3DtList = JSON.parse(JSON.stringify(this.craf3DtList))
            if (type === 2) {
                value.tiji = JSON.parse(JSON.stringify(addItem.tiji))
                value.no3DImg = 2  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
            } else {
                value.no3DImg = 1  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value.weight = JSON.parse(JSON.stringify(addItem.weight))
            }
            // 看看材料里是否有对应的选中的材料
            let tab0Flag = this.material3DList.some(s => s.materialCode === addItem.master)
            let tab0FlagObj = this.material3DList.find(s => s.materialCode === addItem.master)
            if (tab0Flag) {
                value.materials3d = addItem.master
                value.masterThrName = this.tab0FlagObj.materialCname
            } else {
                value.materials3d =  this.material3DList[0].materialCode
                value.masterThrName = this.material3DList[0].materialCname
            }
            // value.materials3d = this.titleFlg === 1 ? addItem.master : this.material3DList[0].materialCode
            value.material3DList = JSON.parse(JSON.stringify(this.material3DList))
            value.surfaceOne = '0'
            value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
            value.surfaceTwo = '0'
            value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
            value.surfaceThr = '0'
            value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
            // SNS金属
            let value1 = comFun.addThrDValueFun(addItem.img_file, addItem.img_url,this.tableData1, 1)
            value1.pirct3Did = ''
            value1.width = JSON.parse(JSON.stringify(addItem.width))
            value1.long = JSON.parse(JSON.stringify(addItem.long))
            value1.name = JSON.parse(JSON.stringify(addItem.name))
            value1.height = JSON.parse(JSON.stringify(addItem.height))
            value1.url_img = ''
            value1.craft3d = this.snsCrafList[0].id
            value1.craftThrName = this.craf3DtList[0].techName
            value1.snsMaterralList = JSON.parse(JSON.stringify(this.snsMaterralList))
            if (type === 2) {
                value1.tiji = JSON.parse(JSON.stringify(addItem.tiji))
                value1.no3DImg = 2  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
            } else {
                value1.no3DImg = 1  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value1.weight = JSON.parse(JSON.stringify(addItem.weight))
            }
            // let tab0Flag = this.material3DList.some(s => s.materialCode === addItem)
            if (tab0Flag === true) {
                value1.materials3d = addItem.master
                value1.masterThrName = this.tab0FlagObj.materialCname
            } else {
                value1.materials3d =  this.material3DList[0].materialCode
                value1.masterThrName = this.material3DList[0].materialCname
            }
            // value1.materials3d = this.titleFlg === 1 ? addItem.master : this.material3DList[0].materialCode
            value1.surfaceOne = '0'
            value1.surface3DListOne = JSON.parse(JSON.stringify(this.snsSurfaceList))
            value1.surfaceTwo = '0'
            value1.surface3DListTwo = JSON.parse(JSON.stringify(this.snsSurfaceList))
            value1.surfaceThr = '0'
            value1.surface3DListThr = JSON.parse(JSON.stringify(this.snsSurfaceList))
            value1.machinePage = this.snsMetalPage[0].paramContent1
            value1.tolerance = this.snsMetalToteranList[0].paramContent1
            value1.piecemeal = this.snsMetalPulgList[0].paramContent1
            value1.difficulty = this.complexityList[0].complexityCode
            value1.difficultyName = this.complexityList[0].complexityCname
            // SNS塑料
            let value2 = comFun.addThrDValueFun(addItem.img_file, addItem.img_url,this.tableData2, 2)
            value2.pirct3Did = ''
            value2.width = JSON.parse(JSON.stringify(addItem.width))
            value2.long = JSON.parse(JSON.stringify(addItem.long))
            value2.name = JSON.parse(JSON.stringify(addItem.name))
            value2.height = JSON.parse(JSON.stringify(addItem.height))
            value2.url_img = ''
            value2.craft3d = this.snsCrafList[0].id
            value2.craftThrName = this.craf3DtList[0].techName
            value2.snsMaterralList = JSON.parse(JSON.stringify(this.snsSMaterList))
            if (type === 2) {
                // console.log('????')
                value2.no3DImg = 2  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value2.tiji = JSON.parse(JSON.stringify(addItem.tiji))
            } else {
                value2.no3DImg = 1  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value2.weight = JSON.parse(JSON.stringify(addItem.weight))
            }
            if (tab0Flag === true) {
                value2.materials3d = addItem.master
                value2.masterThrName = this.tab0FlagObj.materialCname
            } else {
                value2.materials3d =  this.material3DList[0].materialCode
                value2.masterThrName = this.material3DList[0].materialCname
            }
            // value2.materials3d = this.titleFlg === 1 ? addItem.master : this.material3DList[0].materialCode
            value2.surfaceOne = '0'
            value2.surface3DListOne = JSON.parse(JSON.stringify(this.snsPlastSurfList))
            value2.surfaceTwo = '0'
            value2.surface3DListTwo = JSON.parse(JSON.stringify(this.snsPlastSurfList))
            value2.surfaceThr = '0'
            value2.surface3DListThr = JSON.parse(JSON.stringify(this.snsPlastSurfList))
            value2.machinePage = this.snsPlasPageList[0].paramContent1
            value2.tolerance = this.snsPlastoleranceList[0].paramContent1
            value2.piecemeal = this.snsPlasPulgList[0].paramContent1
            value2.difficulty = this.complexityList[0].complexityCode
            value2.difficultyName = this.complexityList[0].complexityCname
            // 复模
            let value3 = comFun.addThrDValueFun(addItem.img_file, addItem.img_url,this.tableData3, 3)
            value3.pirct3Did = ''
            value3.width = JSON.parse(JSON.stringify(addItem.width))
            value3.long = JSON.parse(JSON.stringify(addItem.long))
            value3.name = JSON.parse(JSON.stringify(addItem.name))
            value3.height = JSON.parse(JSON.stringify(addItem.height))
            value3.url_img = ''
            value3.craft3d = this.modeCrafList[0].id
            value3.craftThrName = this.craf3DtList[0].techName
            if (type === 2) {
                value3.no3DImg = 2 // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value3.tiji = JSON.parse(JSON.stringify(addItem.tiji))
            } else {
                value3.no3DImg = 1 // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value3.weight = JSON.parse(JSON.stringify(addItem.weight))
            }
            // 灌注材料校验
            let tab3 = this.modePourList.some(p => p.materialCode === addItem.master)
            let tab3Obj = this.modePourList.find(p => p.materialCode === addItem.master)
            if (tab3 === true) {
                value3.materials3d = addItem.master
                value3.materials3dName = tab3Obj.materialCname
            } else {
                value3.materials3d = this.modePourList[0].materialCode
                value3.materials3dName = this.modePourList[0].materialCname
            }
            value3.promaterials = this.modeProtoypeList[0].materialCode
            value3.promaterialsName = this.modeProtoypeList[0].materialCname
            value3.promaterialsLsit = JSON.parse(JSON.stringify(this.modeProtoypeList))
            value3.Silicon = this.siliconModeList[0].materialCode
            value3.difficulty = this.complexityList[0].complexityCode
            value3.difficultyName = this.complexityList[0].complexityCname
            value3.tolerance = this.modeToleranceList[0].paramContent1
            value3.surfaceOne = '0'
            value3.surface3DListOne = JSON.parse(JSON.stringify(this.modePageList))
            value3.surfaceTwo = '0'
            value3.surface3DListTwo = JSON.parse(JSON.stringify(this.modePageList))
            value3.surfaceThr = '0'
            value3.surface3DListThr = JSON.parse(JSON.stringify(this.modePageList))
            // 快速模具
            let value4 = comFun.addThrDValueFun(addItem.img_file, addItem.img_url,this.tableData4, 4)
            value4.pirct3Did = ''
            value4.width = JSON.parse(JSON.stringify(addItem.width))
            value4.long = JSON.parse(JSON.stringify(addItem.long))
            value4.name = JSON.parse(JSON.stringify(addItem.name))
            value4.height = JSON.parse(JSON.stringify(addItem.height))
            value4.url_img = ''
            value4.difficulty = this.complexityList[0].complexityCode
            value4.difficultyName = this.complexityList[0].complexityCname
            value4.holeNum = this.rapidAcupointList[0].paramContent1
            value4.hotNum = this.rapidHotSprueList[0].paramContent1
            value4.tolerance = this.rapidToleranceList [0].paramContent1
            value4.moldCore = this.repidModeCoreList [0].materialCode
            value4.moldCoreName  = this.repidModeCoreList [0].materialCname
            value4.dieBlank = this.repidModeDieList [0].materialCode
            value4.dieBlankName  = this.repidModeDieList [0].materialCname
            value4.rowNum = this.rapidLineNumList[0].paramContent1
            value4.tiltNum = this.rapidTopNumList [0].paramContent1
            value4.lifetime = this.repidModeDieWList [0].paramContent1
            value4.glueType = this.repidGumTypeList [0].paramContent1
            value4.productColor = this.repidProductColorList [0].paramContent1
            if (type === 2) {
                value4.no3DImg = 2  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value4.tiji = JSON.parse(JSON.stringify(addItem.tiji))
            } else {
                value4.no3DImg = 1  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
                value4.weight = JSON.parse(JSON.stringify(addItem.weight))
            }
            // 产品产量
            let tab4 = this.repidProductList.some(p => p.materialCode === addItem.master)
            let tab4obj = this.repidProductList.find(p => p.materialCode === addItem.master)
            if (tab4 === true) {
                value4.productMaterials = addItem.master
                value4.productMaterialsName = tab4obj.materialCname
            } else {
                value4.productMaterials = this.repidProductList[0].materialCode
                value4.productMaterialsName = this.repidProductList[0].materialCname
            }
            // value4.productMaterials = this.repidProductList [0].materialCode
            value4.dieBlankType = this.repidModeTypeList [0].paramContent1
            value4.surfaceOne = '0'
            value4.surface3DListOne = JSON.parse(JSON.stringify(this.repidSurList))
            value4.surfaceTwo = '0'
            value4.surface3DListTwo = JSON.parse(JSON.stringify(this.repidSurList))
            value4.surfaceThr = '0'
            value4.surface3DListThr = JSON.parse(JSON.stringify(this.repidSurList))
            this.tableData0.push(value)
            this.tableData1.push(value1)
            this.tableData2.push(value2)
            this.tableData3.push(value3)
            this.tableData4.push(value4)
        },
        // 上传3D文件方法
        //oss文件队列子组件传值(未上传完毕的文件队列)
        showossdata(data) {
            this.progressList = data
            this.showLoading = true
        },
        // 处理3D文件 上传的回调
        showtableData0(ossPath, id, file, imgurl) {
            // 上传之后帮列表添加初始化数据
            // 3d打印列表的数据
            let showBTN = this.progressList.some(v => v.preNum != 100 )
            // this.showLoading = showBTN
            setTimeout(() => {
                this.showLoading = showBTN
            }, 1000)
            let urlFixx = ossPath.substring(ossPath.length - 4)
            if (urlFixx === 'STEP' || urlFixx === 'step' || urlFixx === '.STP' || urlFixx === '.stp' || urlFixx === 'iges' || urlFixx === 'IGES' || urlFixx === '.IGS' || urlFixx === '.igs') {
                this.$request.post('/salqtdetails/changeIgs', {filePath: ossPath}).then(res => {
                    // console.log(res)
                    if (res.code === 0) {
                        ossPath = res.obj.ossKeyStl
                        let value = comFun.addThrDValueFun(file, ossPath, this.tableData0, 0)
                        value.craft3d = this.craf3DtList[0].id
                        value.craftThrName = this.craf3DtList[0].techName
                        value.craf3DtList = JSON.parse(JSON.stringify(this.craf3DtList))
                        value.materials3d = this.material3DList[0].materialCode
                        value.masterThrName = this.material3DList[0].materialCname
                        value.material3DList = JSON.parse(JSON.stringify(this.material3DList))
                        value.no3DImg = 0
                        value.surfaceOne = '0'
                        // console.log(this.surface3DListOne)
                        value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                        value.surfaceTwo = '0'
                        value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                        value.surfaceThr = '0'
                        value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                        // SNS金属
                        let value1 = comFun.addThrDValueFun(file, ossPath,this.tableData1, 1)
                        value1.craft3d = this.snsCrafList[0].id
                        value1.craftThrName = this.snsCrafList[0].techName
                        value1.snsMaterralList = JSON.parse(JSON.stringify(this.snsMaterralList))
                        value1.materials3d = this.snsMaterralList[0].materialCode
                        value1.masterThrName = this.snsMaterralList[0].materialCname
                        value1.surfaceOne = '0'
                        value1.surface3DListOne = JSON.parse(JSON.stringify(this.snsSurfaceList))
                        value1.surfaceTwo = '0'
                        value1.surface3DListTwo = JSON.parse(JSON.stringify(this.snsSurfaceList))
                        value1.surfaceThr = '0'
                        value1.surface3DListThr = JSON.parse(JSON.stringify(this.snsSurfaceList))
                        value1.machinePage = this.snsMetalPage[0].paramContent1
                        value1.tolerance = this.snsMetalToteranList[0].paramContent1
                        value1.piecemeal = this.snsMetalPulgList[0].paramContent1
                        value1.difficulty = this.complexityList[0].complexityCode
                        value1.difficultyName = this.complexityList[0].complexityCname
                        value1.no3DImg = 0
                        // SNS塑料
                        let value2 = comFun.addThrDValueFun(file, ossPath,this.tableData2, 2)
                        value2.craft3d = this.snsCrafList[0].id
                        value2.craftThrName = this.snsCrafList[0].techName
                        value2.snsMaterralList = JSON.parse(JSON.stringify(this.snsSMaterList))
                        value2.materials3d = this.snsSMaterList[0].materialCode
                        value2.masterThrName = this.snsSMaterList[0].materialCname
                        value2.surfaceOne = '0'
                        value2.surface3DListOne = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                        value2.surfaceTwo = '0'
                        value2.surface3DListTwo = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                        value2.surfaceThr = '0'
                        value2.surface3DListThr = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                        value2.machinePage = this.snsPlasPageList[0].paramContent1
                        value2.tolerance = this.snsPlastoleranceList[0].paramContent1
                        value2.piecemeal = this.snsPlasPulgList[0].paramContent1
                        value2.difficulty = this.complexityList[0].complexityCode
                        value2.difficultyName = this.complexityList[0].complexityCname
                        value2.no3DImg = 0
                        // 复模
                        let value3 = comFun.addThrDValueFun(file, ossPath,this.tableData3, 3)
                        value3.craft3d = this.modeCrafList[0].id
                        value3.craftThrName = this.modeCrafList[0].techName
                        value3.materials3d = this.modePourList[0].materialCode
                        value3.materials3dName = this.modePourList[0].materialCname
                        value3.promaterials = this.modeProtoypeList[0].materialCode
                        value3.promaterialsName = this.modeProtoypeList[0].materialCname
                        value3.promaterialsLsit = JSON.parse(JSON.stringify(this.modeProtoypeList))
                        value3.Silicon = this.siliconModeList[0].materialCode
                        value3.SiliconName = this.siliconModeList[0].materialCname
                        value3.difficulty = this.complexityList[0].complexityCode
                        value3.difficultyName = this.complexityList[0].complexityCname
                        value3.tolerance = this.modeToleranceList[0].paramContent1
                        value3.no3DImg = 0
                        console.log(this.modePageList)
                        value3.surfaceOne = '0'
                        value3.surface3DListOne = JSON.parse(JSON.stringify(this.modePageList))
                        value3.surfaceTwo = '0'
                        value3.surface3DListTwo = JSON.parse(JSON.stringify(this.modePageList))
                        value3.surfaceThr = '0'
                        value3.surface3DListThr = JSON.parse(JSON.stringify(this.modePageList))
                        // 快速模具
                        let value4 = comFun.addThrDValueFun(file, ossPath,this.tableData4, 4)
                        value4.difficulty = this.complexityList[0].complexityCode
                        value4.difficultyName = this.complexityList[0].complexityCname
                        value4.holeNum = this.rapidAcupointList[0].paramContent1
                        value4.hotNum = this.rapidHotSprueList[0].paramContent1
                        value4.tolerance = this.rapidToleranceList [0].paramContent1
                        value4.moldCore = this.repidModeCoreList [0].materialCode
                        value4.moldCoreName  = this.repidModeCoreList [0].materialCname
                        value4.dieBlank = this.repidModeDieList [0].materialCode
                        value4.dieBlankName  = this.repidModeDieList [0].materialCname
                        value4.lifetime = this.repidModeDieWList [0].paramContent1
                        value4.glueType = this.repidGumTypeList [0].paramContent1
                        value4.productColor = this.repidProductColorList [0].paramContent1
                        value4.productMaterials = this.repidProductList [0].materialCode
                        value4.productMaterialsName = this.repidProductList[0].materialCname
                        value4.dieBlankType = this.repidModeTypeList [0].paramContent1
                        value4.rowNum = this.rapidLineNumList[0].paramContent1
                        value4.tiltNum = this.rapidTopNumList [0].paramContent1
                        value4.no3DImg = 0
                        // console.log(this.repidSurList)
                        value4.surfaceOne = '0'
                        value4.surface3DListOne = JSON.parse(JSON.stringify(this.repidSurList))
                        value4.surfaceTwo = '0'
                        value4.surface3DListTwo = JSON.parse(JSON.stringify(this.repidSurList))
                        value4.surfaceThr = '0'
                        value4.surface3DListThr = JSON.parse(JSON.stringify(this.repidSurList))
                        console.log(value3)
                        console.log(value2)
                        this.tableData0.push(value)
                        this.tableData1.push(value1)
                        this.tableData2.push(value2)
                        this.tableData3.push(value3)
                        this.tableData4.push(value4)
                    }
                })
            } else {
                let value = comFun.addThrDValueFun(file, ossPath, this.tableData0, 0)
                value.craft3d = this.craf3DtList[0].id
                value.craftThrName = this.craf3DtList[0].techName
                value.craf3DtList = JSON.parse(JSON.stringify(this.craf3DtList))
                value.materials3d = this.material3DList[0].materialCode
                value.masterThrName = this.material3DList[0].materialCname
                value.material3DList = JSON.parse(JSON.stringify(this.material3DList))
                value.no3DImg = 0
                value.surfaceOne = '0'
                // console.log(this.surface3DListOne)
                value.surface3DListOne = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surfaceTwo = '0'
                value.surface3DListTwo = JSON.parse(JSON.stringify(this.surface3DListOne))
                value.surfaceThr = '0'
                value.surface3DListThr = JSON.parse(JSON.stringify(this.surface3DListOne))
                // SNS金属
                let value1 = comFun.addThrDValueFun(file, ossPath,this.tableData1, 1)
                value1.craft3d = this.snsCrafList[0].id
                value1.craftThrName = this.snsCrafList[0].techName
                value1.snsMaterralList = JSON.parse(JSON.stringify(this.snsMaterralList))
                value1.materials3d = this.snsMaterralList[0].materialCode
                value1.masterThrName = this.snsMaterralList[0].materialCname
                value1.surfaceOne = '0'
                value1.surface3DListOne = JSON.parse(JSON.stringify(this.snsSurfaceList))
                value1.surfaceTwo = '0'
                value1.surface3DListTwo = JSON.parse(JSON.stringify(this.snsSurfaceList))
                value1.surfaceThr = '0'
                value1.surface3DListThr = JSON.parse(JSON.stringify(this.snsSurfaceList))
                value1.machinePage = this.snsMetalPage[0].paramContent1
                value1.tolerance = this.snsMetalToteranList[0].paramContent1
                value1.piecemeal = this.snsMetalPulgList[0].paramContent1
                value1.difficulty = this.complexityList[0].complexityCode
                value1.difficultyName = this.complexityList[0].complexityCname
                value1.no3DImg = 0
                // SNS塑料
                let value2 = comFun.addThrDValueFun(file, ossPath,this.tableData2, 2)
                value2.craft3d = this.snsCrafList[0].id
                value2.craftThrName = this.snsCrafList[0].techName
                value2.snsMaterralList = JSON.parse(JSON.stringify(this.snsSMaterList))
                value2.materials3d = this.snsSMaterList[0].materialCode
                value2.masterThrName = this.snsSMaterList[0].materialCname
                value2.surfaceOne = '0'
                value2.surface3DListOne = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                value2.surfaceTwo = '0'
                value2.surface3DListTwo = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                value2.surfaceThr = '0'
                value2.surface3DListThr = JSON.parse(JSON.stringify(this.snsPlastSurfList))
                value2.machinePage = this.snsPlasPageList[0].paramContent1
                value2.tolerance = this.snsPlastoleranceList[0].paramContent1
                value2.piecemeal = this.snsPlasPulgList[0].paramContent1
                value2.difficulty = this.complexityList[0].complexityCode
                value2.difficultyName = this.complexityList[0].complexityCname
                value2.no3DImg = 0
                // 复模
                let value3 = comFun.addThrDValueFun(file, ossPath,this.tableData3, 3)
                value3.craft3d = this.modeCrafList[0].id
                value3.craftThrName = this.modeCrafList[0].techName
                value3.materials3d = this.modePourList[0].materialCode
                value3.materials3dName = this.modePourList[0].materialCname
                value3.promaterials = this.modeProtoypeList[0].materialCode
                value3.promaterialsName = this.modeProtoypeList[0].materialCname
                value3.promaterialsLsit = JSON.parse(JSON.stringify(this.modeProtoypeList))
                value3.Silicon = this.siliconModeList[0].materialCode
                value3.SiliconName = this.siliconModeList[0].materialCname
                value3.difficulty = this.complexityList[0].complexityCode
                value3.difficultyName = this.complexityList[0].complexityCname
                value3.tolerance = this.modeToleranceList[0].paramContent1
                value3.no3DImg = 0
                console.log(this.modePageList)
                value3.surfaceOne = '0'
                value3.surface3DListOne = JSON.parse(JSON.stringify(this.modePageList))
                value3.surfaceTwo = '0'
                value3.surface3DListTwo = JSON.parse(JSON.stringify(this.modePageList))
                value3.surfaceThr = '0'
                value3.surface3DListThr = JSON.parse(JSON.stringify(this.modePageList))
                // 快速模具
                let value4 = comFun.addThrDValueFun(file, ossPath,this.tableData4, 4)
                value4.difficulty = this.complexityList[0].complexityCode
                value4.difficultyName = this.complexityList[0].complexityCname
                value4.holeNum = this.rapidAcupointList[0].paramContent1
                value4.hotNum = this.rapidHotSprueList[0].paramContent1
                value4.tolerance = this.rapidToleranceList [0].paramContent1
                value4.moldCore = this.repidModeCoreList [0].materialCode
                value4.moldCoreName  = this.repidModeCoreList [0].materialCname
                value4.dieBlank = this.repidModeDieList [0].materialCode
                value4.dieBlankName  = this.repidModeDieList [0].materialCname
                value4.lifetime = this.repidModeDieWList [0].paramContent1
                value4.glueType = this.repidGumTypeList [0].paramContent1
                value4.productColor = this.repidProductColorList [0].paramContent1
                value4.productMaterials = this.repidProductList [0].materialCode
                value4.productMaterialsName = this.repidProductList[0].materialCname
                value4.dieBlankType = this.repidModeTypeList [0].paramContent1
                value4.rowNum = this.rapidLineNumList[0].paramContent1
                value4.tiltNum = this.rapidTopNumList [0].paramContent1
                value4.no3DImg = 0
                // console.log(this.repidSurList)
                value4.surfaceOne = '0'
                value4.surface3DListOne = JSON.parse(JSON.stringify(this.repidSurList))
                value4.surfaceTwo = '0'
                value4.surface3DListTwo = JSON.parse(JSON.stringify(this.repidSurList))
                value4.surfaceThr = '0'
                value4.surface3DListThr = JSON.parse(JSON.stringify(this.repidSurList))
                this.tableData0.push(value)
                this.tableData1.push(value1)
                this.tableData2.push(value2)
                this.tableData3.push(value3)
                this.tableData4.push(value4)
            }
        },
        // 拿到回调后；处理初始化数据问题
        // 3D报价列表选择回调x选择
        handleSelectionChange (val) {
            this.tableData0.forEach(item2 => {
                let ss = val.some(item => item.numIndex === item2.numIndex)
                item2.edit = ss
            })
            this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
        },
        // CNC金属选中回调
        handleSelectionChange1 (val) {
            this.tableData1.forEach(item2 => {
                let ss = val.some(item => item.numIndex === item2.numIndex)
                item2.edit = ss
            })
            this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
        },
        // CNC 塑料选中回调
        handleSelectionChange2 (val) {
             this.tableData2.forEach(item2 => {
                let ss = val.some(item => item.numIndex === item2.numIndex)
                item2.edit = ss
            })
            this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
        },
        // 复模选中回调
        handleSelectionChange3 (val) {
             this.tableData3.forEach(item2 => {
                let ss = val.some(item => item.numIndex === item2.numIndex)
                item2.edit = ss
            })
            this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
        },
        rowspan (){},
        // 3D选中后合并数据
        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
            // 首先判断当前数据为合并数组
            if (row.rowFlag !== '') {
                // 第几列 进行合并
                if (columnIndex === 0 || columnIndex === 5 || columnIndex === 6 || columnIndex === 8) {
                    let rowNum = 0
                    let rowNumNoFlag = 0
                    // 索引出需要的合并的个数
                    this.tableData4.forEach(item => {
                        if (item.rowFlag === row.rowFlag) {
                            rowNum = rowNum + 1
                        }
                    })

                    // 索引出第一次 合并的参数
                    if (rowNum !== 0) {
                        for (let i = 0; i < this.tableData4.length; i++) {
                            if (this.tableData4[i].rowFlag != '' &&  this.tableData4[i].rowFlag === row.rowFlag) {
                                rowNumNoFlag = i
                                break
                            }
                        }
                    }
                    // 根据索引的合并个数和 第一次出现的位置 进行合并
                    if (rowNum !== 0 && rowNumNoFlag === rowIndex) {
                        return {
                            rowspan: rowNum,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            }
        },
        // 切换数据模板
        selectClass (index, id) {
            this.navId = id
        },
        // 3d打印列表修改数量后调用方法  (下拉改变后也可以跟着调用辞方法)
        amountHandleChange3d (val, type) {
            let obj = api.getPriceDateValue(val, type)
            if (type === 'tab0') {
                api.getThrPirceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.offterPrice = res.obj.cusUnitcost
                        val.offterTotal = res.obj.cusTotalcost
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            }
        },
        amountHandleChange (val) {
            console.log(val)
        },
        // 3d打印改变总价
        offterTotalFun (itme, val) {
            console.log(item,'+', val)
        },
        // 3D删除打印
        delete3dFun (val) {
            console.log(val)
        },
        // 删除按钮
        deleteFun (val, num) {
            val.btnDefaFlag1 = true
            if (num === 0) {
                this.tableData0.splice(val.numIndex - 1, 1)
                this.tableData0.forEach((item, index) => {
                    if (item.numIndex > val.numIndex) {
                        item.numIndex = item.numIndex - 1
                    }
                })
                $('.' + val.threedmodelidKey).remove()
            } else if (num === 1) {
                this.tableData1.splice(val.numIndex - 1, 1)
                this.tableData1.forEach((item, index) => {
                    if (item.numIndex > val.numIndex) {
                        item.numIndex = item.numIndex - 1
                    }
                })
                $('.' + val.threedmodelidKey).remove()
            } else if (num === 2) {
                this.tableData2.splice(val.numIndex - 1, 1)
                this.tableData2.forEach((item, index) => {
                    if (item.numIndex > val.numIndex) {
                        item.numIndex = item.numIndex - 1
                    }
                })
            } else if (num === 3) {
                this.tableData3.splice(val.numIndex - 1, 1)
                this.tableData3.forEach((item, index) => {
                    if (item.numIndex > val.numIndex) {
                        item.numIndex = item.numIndex - 1
                    }
                })
                $('.' + val.threedmodelidKey).remove()
            } else if (num === 4) {
                this.tableData4.splice(val.numIndex - 1, 1)
                // 重新复制下标
                this.tableData4.forEach((item, index) => {
                    if (item.numIndex > val.numIndex) {
                        item.numIndex = item.numIndex - 1
                    }
                })
                $('.' + val.threedmodelidKey).remove()
            }
        },
        // 复制
        copyFun (val, list) {
            let obj = JSON.parse(JSON.stringify(val))
            val.btnDefaFlag2 = true
            if (list === 0) {
                obj.numIndex = this.tableData0.length + 1
                obj.btnDefaFlag2 = false
                this.tableData0.push(obj)
            } else if (list === 1) {
                obj.numIndex = this.tableData1.length + 1
                obj.btnDefaFlag2 = false
                this.tableData1.push(obj)
            } else if (list === 2) {
                obj.numIndex = this.tableData2.length +1 
                obj.btnDefaFlag = false
                this.tableData2.push(obj)
            } else if (list === 3) {
                obj.numIndex = this.tableData3.length + 1
                obj.btnDefaFlag = false
                this.tableData3.push(obj)
            } else if (list === 4) {
                obj.numIndex = this.tableData4.length + 1
                obj.btnDefaFlag = false
                this.tableData4.push(obj)
            }
            //   let obj = {  
            //   }
            //   let newItem = JSON.parse(JSON.stringify(val))
            //   newItem.btnDefaFlag1 = false
            //   newItem.btnDefaFlag2 = false
            //   newItem.btnDefaFlag3 = false
            //   newItem.btnDefaFlag4 = false
            //   newItem.btnDefaFlag5 = false
            //   newItem.numIndex = list.length
            //   list.push(newItem)
        },
        // 向下应用
        applyFun (val, type) {
            val.btnDefaFlag3 = true
            if (type === 0) {
                for(let i = 0; i < this.tableData0.length; i++) {
                    if (this.tableData0[i].numIndex > val.numIndex) {
                        this.tableData0[i].craft3d = val.craft3d // 工艺ID
                        this.tableData0[i].craftThrName = val.craftThrName // 工艺名
                        this.tableData0[i].materials3d = val.materials3d // 材料Id
                        this.tableData0[i].masterThrName = val.masterThrName // 材料名
                        this.tableData0[i].surface3DListOne = val.surface3DListOne // 表面处理1 数组
                        this.tableData0[i].surface3DListTwo = val.surface3DListTwo // 表面处理2 数组
                        this.tableData0[i].surface3DListThr = val.surface3DListThr // 表面处理3 数组
                        this.tableData0[i].surfaceOne = val.surfaceOne // 表面1
                        this.tableData0[i].surfaceTwo = val.surfaceTwo // 表面2
                        this.tableData0[i].surfaceThr = val.surfaceThr // 表面3
                        this.tableData0[i].surfaceOneName = val.surfaceOneName // 表1名字
                        this.tableData0[i].surfaceTwoName = val.surfaceTwoName // 表2名
                        this.tableData0[i].surfaceThrName = val.surfaceThrName // 表3名
                        this.tableData0[i].amount = val.amount // 数量
                        this.selectGetPirce(this.tableData0[i], 'tab0')
                    }
                }
            } else if (type === 1) {
                for (let i = 0; i < this.tableData1.length; i ++) {
                    if (this.tableData1[i].numIndex > val.numIndex) {
                        this.tableData1[i].craft3d = val.craft3d // CNC金属工艺
                        this.tableData1[i].craftThrName = val.craftThrName // CNC金属工艺名
                        this.tableData1[i].materials3d = val.materials3d // CNC金属材料
                        this.tableData1[i].masterThrName = val.masterThrName // CNC金属材料名
                        this.tableData1[i].piecemeal = val.piecemeal // 拆件
                        this.tableData1[i].machinePage = val.machinePage // 加工面数
                        this.tableData1[i].difficulty = val.difficulty // 难度系数
                        this.tableData1[i].difficultyName = val.difficultyName // 难度系数
                        this.tableData1[i].tapping = val.tapping // 攻牙
                        this.tableData1[i].tolerance = val.tolerance // 公差
                        this.tableData1[i].sparkList = val.sparkList // // 打火花或者切割线
                        this.tableData1[i].inserts = val.inserts // // 嵌件
                        this.tableData1[i].surfaceOne = val.surfaceOne // 表面1
                        this.tableData1[i].surfaceTwo = val.surfaceTwo // 表面2
                        this.tableData1[i].surfaceThr = val.surfaceThr // 表面3
                        this.tableData1[i].surfaceOneName = val.surfaceOneName // 表1名字
                        this.tableData1[i].surfaceTwoName = val.surfaceTwoName // 表2名
                        this.tableData1[i].surfaceThrName = val.surfaceThrName // 表3名
                        this.selectGetPirce(this.tableData1[i], 'tab1') // 重新计算
                    }
                }
            } else if (type === 2) {
                for (let i = 0; i < this.tableData2.length; i++) {
                    if (this.tableData2[i].numIndex > val.numIndex) {
                        this.tableData2[i].craft3d = val.craft3d // CNC塑料工艺
                        this.tableData2[i].craftThrName = val.craftThrName // CNC塑料工艺名
                        this.tableData2[i].materials3d = val.materials3d // CNC塑料材料
                        this.tableData2[i].masterThrName = val.masterThrName // CNC塑料材料名
                        this.tableData2[i].piecemeal = val.piecemeal // 拆件
                        this.tableData2[i].machinePage = val.machinePage // 加工面数
                        this.tableData2[i].difficulty = val.difficulty // 难度系数
                        this.tableData2[i].difficultyName = val.difficultyName // 难度系数
                        this.tableData2[i].tapping = val.tapping // 攻牙
                        this.tableData2[i].tolerance = val.tolerance // 公差
                        this.tableData2[i].inserts = val.inserts // // 嵌件
                        this.tableData2[i].surfaceOne = val.surfaceOne // 表面1
                        this.tableData2[i].surfaceTwo = val.surfaceTwo // 表面2
                        this.tableData2[i].surfaceThr = val.surfaceThr // 表面3
                        this.tableData2[i].surfaceOneName = val.surfaceOneName // 表1名字
                        this.tableData2[i].surfaceTwoName = val.surfaceTwoName // 表2名
                        this.tableData2[i].surfaceThrName = val.surfaceThrName // 表3名
                        this.selectGetPirce(this.tableData2[i], 'tab2')
                    }
                }
            } else if (type === 3) {
                for (let i = 0; i < this.tableData3.length; i++) {
                    if (this.tableData3[i].numIndex > val.numIndex) {
                        this.tableData3[i].craft3d = val.craft3d // 复模工艺ist
                        this.tableData3[i].craftThrName = val.craftThrName //复模工艺名
                        this.tableData3[i].materials3d = val.materials3d // 灌注材料
                        this.tableData3[i].materials3dName = val.materials3dName // 灌注材料名称
                        this.tableData3[i].promaterials = val.promaterials // 原型材料
                        this.tableData3[i].promaterialsLsit = val.promaterialsLsit // 原型材料List
                        this.tableData3[i].SiliconName = val.SiliconName // 原型材料名称
                        this.tableData3[i].Silicon = val.Silicon // 硅模材料
                        this.tableData3[i].Silicon = val.Silicon // 硅模材料
                        this.tableData3[i].machinePage = val.machinePage // 加工面数
                        this.tableData3[i].difficulty = val.difficulty // 难度系数
                        this.tableData3[i].difficultyName = val.difficultyName // 难度系数
                        this.tableData3[i].tapping = val.tapping // 攻牙
                        this.tableData3[i].tolerance = val.tolerance // 公差
                        this.tableData3[i].surfaceOne = val.surfaceOne // 表面1
                        this.tableData3[i].surfaceTwo = val.surfaceTwo // 表面2
                        this.tableData3[i].surfaceThr = val.surfaceThr // 表面3
                        this.tableData3[i].surfaceOneName = val.surfaceOneName // 表1名字
                        this.tableData2[i].surfaceTwoName = val.surfaceTwoName // 表2名
                        this.tableData3[i].surfaceThrName = val.surfaceThrName // 表3名
                        this.selectGetPirce(this.tableData3[i], 'tab3')
                    }
                }
            } else if (type === 4) {
                    // rowNum: '', // 行位个数
                    // tiltNum: '', // 斜顶个数
                    // inserts: '', // 手动嵌件
                for (let i = 0; i < this.tableData4.length; i++) {
                    if (this.tableData4[i].numIndex > val.numIndex) {
                        this.tableData4[i].glueType = val.glueType // 进胶类型
                        this.tableData4[i].tolerance = val.tolerance // 公差
                        this.tableData4[i].difficulty = val.difficulty // 产品结构
                        this.tableData4[i].difficultyName = val.difficultyName // 产品结构名
                        this.tableData4[i].hotNum = val.hotNum // 热嘴个数
                        this.tableData4[i].holeNum = val.holeNum // 穴数
                        this.tableData4[i].productMaterials = val.productMaterials // 产品材料
                        this.tableData4[i].productMaterialsName = val.productMaterialsName // 产品材料名称
                        this.tableData4[i].productColor = val.productColor // 产品颜色
                        this.tableData4[i].moldCore = val.moldCore // 模仁材料
                        this.tableData4[i].moldCoreName = val.moldCoreName // 模仁材料名称
                        this.tableData4[i].dieBlank = val.dieBlank // 模坯材料
                        this.tableData4[i].dieBlankType = val.dieBlankType // 模坯类型
                        this.tableData4[i].lifetime = val.lifetime // 模具寿命
                        this.tableData4[i].delivery = val.delivery // 交期
                        this.tableData4[i].rowNum = val.rowNum // 行位个数
                        this.tableData4[i].tiltNum = val.tiltNum // 斜顶个数
                        this.tableData4[i].inserts = val.inserts // 手动嵌件
                        this.tableData4[i].surfaceOne = val.surfaceOne // 表面1
                        this.tableData4[i].surfaceTwo = val.surfaceTwo // 表面2
                        this.tableData4[i].surfaceThr = val.surfaceThr // 表面3
                        this.tableData4[i].surfaceOneName = val.surfaceOneName // 表1名字
                        this.tableData4[i].surfaceTwoName = val.surfaceTwoName // 表2名
                        this.tableData4[i].surfaceThrName = val.surfaceThrName // 表3名
                        this.selectGetPirce(this.tableData3[i], 'tab3')
                    }
                }
            }
        },
        // 上传附件
        uploadingFun (val, type) {
            console.log(val)
            val.btnDefaFlag4 = true
            this.fileShow = true
            this.temporaryFileType = type
            this.temporaryFileList = JSON.parse(JSON.stringify(val.fileList))
            this.temporaryFileId = val.pirct3Did
        },
        //  下载物性表
        downloadFun (val) {
            val.row.btnDefaFlag5 = true
        },
        // stl渲染 (颜色,贴图,3d文件路径,3d文件信息)//stl(主体方法)
        filePreview (file, filePath, list, type) {
            // 判断是否删除来的；数组已经没有数据；如果是删除来的话直接return走
            if (type === 'tab0') {
                if (this.tableData0.length === 0) {
                    return
                }
            }
            if (type === 'tab1') {
                if (this.tableData1.length === 0) {
                    return
                }
            }
            if (type === 'tab2') {
                if (this.tableData2.length === 0) {
                    return
                }
            }
            if (type === 'tab3') {
                if (this.tableData3.length === 0) {
                    return
                }
            }
            if (type === 'tab4') {
                if (this.tableData4.length === 0) {
                    return
                }
            }
            // var WIDTH, HEIGHT;
            // var renderer;
            // // 1.设置three.js渲染器 （定义全局变量 var renderer）
            // this.initThree(WIDTH, HEIGHT, renderer, file)
            // /* 设置摄像头 */
            // var camera;
            // this.initCamera(camera)
            // $('.previewBox canvas').remove();
            var WIDTH, HEIGHT;
            var renderer;
            // 1.设置three.js渲染器 （定义全局变量 var renderer）
            function initThree() {
                // 设置3D图像的宽高
                WIDTH = 548;
                HEIGHT = 400;
                /* 渲染器 */
                renderer = new THREE.WebGLRenderer({
                    antialias: true, //是否开启反锯齿
                    precision: "highp", //着色精度选择
                    alpha: true, //是否可以设置背景色透明
                    premultipliedAlpha: false,
                    stencil: false,
                    preserveDrawingBuffer: true, //是否保存绘图缓冲
                    maxLights: 3 //maxLights:最大灯光数
                });
                renderer.setSize(WIDTH, HEIGHT);
                // 背景色
                // renderer.setClearColor(new THREE.Color('#bbb'));
                renderer.setClearColor(new THREE.Color('#fff'));

                renderer.gammaInput = true;
                renderer.gammaOutput = true;
                //dom处理
                // console.log($(renderer.domElement));
                //设置画布的css样式
                $(renderer.domElement).css({
                    'position': 'absolute',
                    // 'display':'none'
                    // 隐藏3d，点击缩略图显示
                    'visibility': 'hidden',
                    // 'background':'#ccc'
                })
                //为当前画布添加自定义id
                let timeKey = dayjs().unix()
                file.threedmodelidKey =  file.pirct3Did + type + timeKey
                $(renderer.domElement).attr('threedmodelid', file.pirct3Did + type + timeKey).attr('class', file.pirct3Did + type + timeKey)
                //将画布添加到画布盒子中
                $('#abc').append(renderer.domElement)
            }
            /* 设置摄像头 */
            var camera;
            function initCamera() {
                var VIEW_ANGLE = 45,
                    ASPECT = WIDTH / HEIGHT,
                    NEAR = 1,
                    FAR = 10000;
                //视野角：fov； 纵横比：aspect； 相机离视最近的距离：near； 相机离视体积最远距离：far）
                camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
                //设置相机的位置坐标
                camera.position.set(50, 0, 0);
                camera.up.set(0, 0, 1)
                //设置视野的中心坐标
                camera.lookAt(300, 0, 0);
                // var scale = vector3.length();
                // camera.position.set(scale, 0, 0);
                // camera.lookAt(scene.position);
                // scene.add(camera);
            }
            /* 场景 */
            var scene;
            function initScene() {
                scene = new THREE.Scene();
                // scene.background = new THREE.Color(0x333333);
                // console.log(scene);
            }
            /* 灯光 */
            var light, light2, light3;
            function initLight() {
                // 平行光
                light = new THREE.DirectionalLight(0xFFFFFF);//
                // light.position.set(-500, 99, 0).normalize();
                light.position.set(0, 99, 0).normalize();
                scene.add(light);
                // scene.add(new THREE.SpotLight('#fff', 0.8));
                // 环境光
                // light2 = new THREE.AmbientLight('#f09d1c');//
                light2 = new THREE.AmbientLight(0x999999);
                scene.add(light2);
                // // 点光源
                // light3 = new THREE.PointLight('#f09d1c');//紫色
                // light3.position.set(250, -200, 100);
                light3 = new THREE.PointLight(0xFFFFFF);
                    light3.position.set(250, -200, 100);
                scene.add(light3);
                // var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
                // scene.add(helper);
                // 轴
                // var axes = new THREE.AxisHelper(300);
                // scene.add(axes);
            }
            //生成2d图形
            var drawShape = () => {
                // console.log(this);//vm
                // console.log('模型加载完成,准备生成2d图像路径');
                // console.log(renderer.domElement);
                setTimeout(() => {
                    // console.log(this);
                    var canvasUrl = renderer.domElement.toDataURL("image/png");
                    for (let k in list) {
                        if (file.getOneAjax !== 0) {
                            if (file.pirct3Did === list[k].pirct3Did) {
                                list[k].url_img = canvasUrl;
                                list[k].threed_2dimg = canvasUrl;
                                list[k].cnc_jinshu_2dimg = canvasUrl;
                                list[k].cnc_suliao_2dimg = canvasUrl;
                                list[k].fumo_2dimg = canvasUrl;
                                list[k].fast_2dimg = canvasUrl;
                                if (
                                list[k].tiji === 0 ||
                                list[k].threed_tiji === 0 ||
                                list[k].cnc_jinshu_tiji === 0 ||
                                list[k].cnc_suliao_tiji === 0 ||
                                list[k].fumo_tiji === 0 ||
                                list[k].fast_tiji === 0 ||
                                list[k].long === 0 ||
                                list[k].width === 0 ||
                                list[k].height === 0 ||
                                list[k].area === 0 ||
                                isNaN(list[k].tiji) ||
                                isNaN(list[k].long) ||
                                isNaN(list[k].width) ||
                                isNaN(list[k].height) ||
                                isNaN(list[k].area)

                                ) {
                                    console.log('stl文件解析失败了', k, type);
                                    list[k].isjiexishibai = true;
                                // return
                                } else {
                                    // console.log(type)
                                    let objV = {
                                        attachmentFileid: list[k].pirct3Did, // 3D文件OSSid
                                        dimensionX: list[k].long, // 长
                                        dimensionY: list[k].width, // 宽
                                        dimensionZ: list[k].height, // 高
                                        volume: list[k].tiji, // 体积
                                        surfaceArea: list[k].area, // 表面积
                                        partQty: list[k].amount, //  产品数量
                                        finishqualityCode: '', // 表面处理两个及两个以上的用,英文逗号拼接
                                        no3DImg: list[k].no3DImg // 判断是否为3D图纸； 0不是 1是
                                    }
                                    // 处理不同数据
                                    if (type === 'tab0') { // 3D打印
                                        objV.partMaterialCode = list[k].materials3d // 材料编号
                                        api.getThrPirceFun(objV).then(res => {
                                            console.log(res)
                                            if (res.code === 0) {
                                                list[k].offterPrice = res.obj.cusUnitcost
                                                list[k].offterTotal = res.obj.cusTotalcost
                                                list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                                list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                                list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                                list[k].loaGif = true
                                                list[k].weight = res.obj.weightsGm
                                                // 循环出key名 然后进行复制；数据太多
                                                for (let N in res.obj) {
                                                    // console.log(N)
                                                    for (let J in list[k]) {
                                                        if (N === J) {
                                                            list[k][J] = res.obj[N]
                                                        } else {
                                                            // console.log()
                                                            list[k][N] = res.obj[N]
                                                        }
                                                    }
                                                }
                                                this.eidtTotalPirce (type)
                                            }
                                        })
                                    } else if (type === 'tab1' || type === 'tab2') { // CNC金属 或者塑料
                                        objV.partMaterialCode = list[k].materials3d
                                        objV.setupsCount = list[k].machinePage // 加工面数
                                        objV.splitCount = list[k].piecemeal // 拆件数
                                        objV.complexityCode = list[k].difficulty // 难度系数Code
                                        objV.threadQty = list[k].tapping // 攻牙数量
                                        objV.cncInsertQty =  list[k].inserts // 镶件数量
                                        objV.tolerance = list[k].tolerance // 公差的值
                                        // CNC价格
                                        if (type === 'tab1') {
                                            api.getCNCPiceFun(objV).then(res => {
                                                if (res.code === 0) {
                                                    list[k].offterPrice = res.obj.cusUnitcost
                                                    list[k].offterTotal = res.obj.cusTotalcost
                                                    list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                                    list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                                    list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                                    list[k].loaGif = true
                                                    list[k].weight = res.obj.weightsGm
                                                        // 循环出key名 然后进行复制；数据太多
                                                    for (let N in res.obj) {
                                                        // console.log(N)
                                                        for (let J in list[k]) {
                                                            if (N === J) {
                                                                list[k][J] = res.obj[N]
                                                            } else {
                                                                // console.log()
                                                                list[k][N] = res.obj[N]
                                                            }
                                                        }
                                                    }
                                                    this.eidtTotalPirce (type)
                                                }
                                            })
                                        } else if (type === 'tab2') {
                                            // console.log(objV)
                                            api.getCncSuPiceFun(objV).then(res => {
                                                if (res.code === 0) {
                                                    list[k].offterPrice = res.obj.cusUnitcost
                                                    list[k].offterTotal = res.obj.cusTotalcost
                                                    list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                                    list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                                    list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                                    list[k].loaGif = true
                                                    list[k].weight = res.obj.weightsGm
                                                    // 循环出key名 然后进行复制；数据太多
                                                    for (let N in res.obj) {
                                                        // console.log(N)
                                                        for (let J in list[k]) {
                                                            if (N === J) {
                                                                list[k][J] = res.obj[N]
                                                            } else {
                                                                // console.log()
                                                                list[k][N] = res.obj[N]
                                                            }
                                                        }
                                                    }
                                                    this.eidtTotalPirce (type)
                                                }
                                            })
                                        }
                                    } else if (type === 'tab3') {// 复模
                                        objV.techId = list[k].craft3d // 工艺ID
                                        objV.partMaterialCode = list[k].materials3d // 灌注材料code 
                                        objV.masterMaterialCode = list[k].promaterials // 原型材料Code 
                                        objV.moldMaterialCode = list[k].Silicon // 硅模材料编号Code
                                        objV.complexityCode = list[k].difficulty, // 难度系数Code 
                                        objV.threadQty = list[k].tapping // 攻牙数量
                                        objV.tolerance = list[k].tolerance // 公差的值
                                        // 复模价格
                                        api.getFumoPiceFun(objV).then(res => {
                                            console.log(res)
                                            if (res.code === 0) {
                                                list[k].offterPrice = res.obj.cusUnitcost
                                                list[k].offterTotal = res.obj.cusTotalcost // 报价总价
                                                list[k].proTotal  = res.obj.sysTotalmasterVccost // 原型总价
                                                list[k].moldTotal  = res.obj.sysFmouldMoldTotalcost // 模具总价
                                                list[k].pourPrice  = res.obj.cusUnitcost // 灌注总价
                                                list[k].proDate  = res.obj.totalLeadtime // 生成周期
                                                list[k].proTime  = res.obj.cnc3dSinglehours // 单价工时
                                                list[k].handicraftsTime  = res.obj.handSinglehours // 手工工时
                                                list[k].loaGif = true
                                                list[k].weight = res.obj.weightsGm
                                                // 循环出key名 然后进行复制；数据太多
                                                for (let N in res.obj) {
                                                    // console.log(N)
                                                    for (let J in list[k]) {
                                                        if (N === J) {
                                                            list[k][J] = res.obj[N]
                                                        } else {
                                                            // console.log()
                                                            list[k][N] = res.obj[N]
                                                        }
                                                    }
                                                }
                                                this.eidtTotalPirce (type)
                                            }
                                        })
                                    } else if (type === 'tab4') { // 快速复模
                                        // console.log('定位专用')
                                        objV.partMaterialCode = list[k].productMaterials // 产品材料code 
                                        objV.masterMaterialCode = list[k].moldCore // 模仁材料Code 
                                        objV.moldMaterialCode = list[k].dieBlank // 模胚材料Code
                                        objV.complexityCode = list[k].difficulty // 产品结构难度系数Code 
                                        objV.mouldPartColor = list[k].productColor // 产品颜色
                                        objV.mouldBaseType = list[k].dieBlankType // 模胚类型 
                                        objV.mouldSlideCount = list[k].rowNum === '' ? 0 : list[k].rowNum // 行位个数
                                        objV.mouldLifterCount = list[k].tiltNum === '' ? 0 : list[k].tiltNum // 斜顶个数
                                        objV.mouldInsertCount = list[k].inserts === '' ? 0 : list[k].inserts // 镶件个数 
                                        objV.mouldCavitiesCount = list[k].holeNum === '' ? 0 : list[k].holeNum // 穴数 
                                        objV.mouldHotsprueCount = list[k].hotNum === '' ? 0 : list[k].hotNum // 热嘴个数
                                        objV.mouldTimes = list[k].lifetime // 模具寿命
                                        objV.tolerance = list[k].tolerance //  公差的值
                                        objV.mouldGateType = list[k].glueType // 进胶类型
                                        objV.partQty = list[k].proAmount, //  产品数量
                                        objV.moldQty = list[k].moldAmout // 模具数量
                                        list[k].loaGif = true
                                        // 快速磨具价格
                                        api.getModelPiceFun(objV).then(res => {
                                            console.log(res)
                                            if (res.code === 0) {
                                                // list[k].offterPrice = res.obj.cusUnitcost
                                                // list[k].offterTotal = res.obj.cusTotalcost
                                                list[k].delivery = res.obj.totalLeadtime // 交期
                                                list[k].moldoPrice = res.obj.cusFmouldMoldcost // 模具单价
                                                list[k].moldTotal = res.obj.cusFmouldMoldTotalcost // 模具总价
                                                list[k].proPrice = res.obj.cusUnitcost // 产品单价
                                                list[k].proTotal = (res.obj.cusUnitcost * list[k].proAmount).toFixed(2) // 产品总价
                                                list[k].total = res.obj.cusTotalcost // 总价
                                                list[k].mergeTotal = res.obj.cusTotalcost  // 合并后的总价
                                                list[k].mergeModePrice = res.obj.cusFmouldMoldcost // 合并后的模具单价
                                                list[k].mergeModeTotal = res.obj.cusFmouldMoldTotalcost // 合并后的模具总价
                                                list[k].weight = res.obj.weightsGm
                                                // 循环出key名 然后进行复制；数据太多
                                                for (let N in res.obj) {
                                                    // console.log(N)
                                                    for (let J in list[k]) {
                                                        if (N === J) {
                                                            list[k][J] = res.obj[N]
                                                        } else {
                                                            // console.log()
                                                            list[k][N] = res.obj[N]
                                                        }
                                                    }
                                                }
                                                this.eidtTotalPirce (type)
                                            }
                                        })
                                    }
                                }
                            }
                        } else {
                            if (file.pirct3Did === list[k].pirct3Did) {
                                list[k].url_img = canvasUrl;
                                list[k].threed_2dimg = canvasUrl;
                                list[k].cnc_jinshu_2dimg = canvasUrl;
                                list[k].cnc_suliao_2dimg = canvasUrl;
                                list[k].fumo_2dimg = canvasUrl;
                                list[k].fast_2dimg = canvasUrl;
                            }
                        }
                    }
                    this.$forceUpdate()
                }, 100)
                // var canvasurl=renderer.domElement.toDataURL('image/png')
                // console.log(canvasurl);
            }
            /* 显示对象 */
            var cube;
            // 处理canvs显示图纸
            var initObject = () => {
                // console.log(this);//vm
                // console.log(filename);
                // ASCII file
                var stlloader = new STLLoader();
                // console.log(stlloader);
                // var objloader = new THREE.OBJLoader();
                // console.log(objloader);
                // var camera_distance1;
                // console.log(camera_distance1);
                var geometry = new THREE.Geometry(260, 35, 185, 1, 1, 1)
                // console.log(geometry)
                //根据文件名处理多种文件
                //当路径包含stl时（后期需要修改）
                if (file.url.indexOf('stl') !== -1 || file.url.indexOf('STL') !== -1) {
                    stlloader.load(filePath, (geometry) => {
                        //砖红色
                        var material = new THREE.MeshPhongMaterial({
                            ambient: 'green',
                            color: 'green',
                            specular: 'green',
                            // ambient: '#023102',
                            // color: '#023102',
                            // specular: '#023102',
                            shininess: 10000
                        });
                        var material1 = new THREE.MeshLambertMaterial({
                            ambient: 'green',
                            color: 'green',
                            specular: 'green',
                            // ambient: '#023102',
                            // color: '#023102',
                            // specular: '#023102',
                            shininess: -2000
                        });

                        //创建纹理
                        var mat = new THREE.MeshLambertMaterial({
                            color: 0xFFD700
                        });
                        var mesh = new THREE.Mesh(geometry, material1)
                        // 使图像居中
                        geometry.center();
                        //显示对象旋转角度
                        mesh.rotation.set(0, 0, 1.55);
                        //位移
                        mesh.position.set(0, 0, 0);
                        // 获取原始大小
                        var originalx = geometry.boundingBox.max.x;
                        var originaly = geometry.boundingBox.max.y;
                        var originalz = geometry.boundingBox.max.z;
                        //*2=实际尺寸mm
                        // 获取原始最大值
                        var originalmax = Math.max(originalx, originaly, originalz);
                        // 获取模型体积和表面积
                        if (geometry instanceof THREE.BufferGeometry) {
                            geometry = new THREE.Geometry().fromBufferGeometry(geometry);
                        }
                        //尺寸
                        //体积
                        var volume = 0;
                        var volumes = 0;
                        var Area = 0;
                        // 计算体积的方法1
                        for (let f = 0, fl = geometry.faces.length; f < fl; f++) {
                            var face = geometry.faces[f];
                            var vA = geometry.vertices[face.a];
                            var vB = geometry.vertices[face.b];
                            var vC = geometry.vertices[face.c];
                            var x1 = vA.x,
                                x2 = vB.x,
                                x3 = vC.x;
                            var y1 = vA.y,
                                y2 = vB.y,
                                y3 = vC.y;
                            var z1 = vA.z,
                                z2 = vB.z,
                                z3 = vC.z;
                            var V = (-x3 * y2 * z1 + x2 * y3 * z1 + x3 * y1 * z2 - x1 * y3 * z2 - x2 * y1 * z3 + x1 * y2 * z3) / 6;
                            volume += V;
                        }
                        // 计算体积的方法2
                        function volumeOfT(p1, p2, p3) {
                            var v321 = p3.x * p2.y * p1.z;
                            var v231 = p2.x * p3.y * p1.z;
                            var v312 = p3.x * p1.y * p2.z;
                            var v132 = p1.x * p3.y * p2.z;
                            var v213 = p2.x * p1.y * p3.z;
                            var v123 = p1.x * p2.y * p3.z;
                            return (-v321 + v231 + v312 - v132 - v213 + v123) / 6.0;
                        }
                        function AreaOfTriangle(p1, p2, p3) {
                            var ax = p2.x - p1.x;
                            var ay = p2.y - p1.y;
                            var az = p2.z - p1.z;
                            var bx = p3.x - p1.x;
                            var by = p3.y - p1.y;
                            var bz = p3.z - p1.z;
                            var cx = ay * bz - az * by;
                            var cy = az * bx - ax * bz;
                            var cz = ax * by - ay * bx;
                            return (0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz));
                        }
                        for (var i = 0; i < geometry.faces.length; i++) {
                            var Pi = geometry.faces[i].a;
                            var Qi = geometry.faces[i].b;
                            var Ri = geometry.faces[i].c;
                            var P = new THREE.Vector3(geometry.vertices[Pi].x, geometry.vertices[Pi].y, geometry.vertices[Pi].z);
                            var Q = new THREE.Vector3(geometry.vertices[Qi].x, geometry.vertices[Qi].y, geometry.vertices[Qi].z);
                            var R = new THREE.Vector3(geometry.vertices[Ri].x, geometry.vertices[Ri].y, geometry.vertices[Ri].z);
                            volumes += volumeOfT(P, Q, R); // 会产生负数..............
                            Area += AreaOfTriangle(R, Q, P);
                        }
                        volumes=Math.abs(volumes);
                        // console.log('体积1:' + volumes);
                        // console.log('体积2:' + volume);
                        // console.log('表面积：' + Area);
                        // 将体积，尺寸等参数添加到数据中
                        for (let k in this.tableData0) {
                            if (this.tableData0[k].pirct3Did === file.pirct3Did) {
                                //体积
                                this.tableData0[k].tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData0[k].threed_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData0[k].cnc_jinshu_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData0[k].cnc_suliao_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData0[k].fumo_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData0[k].fast_tiji = (parseFloat(volumes)).toFixed(2)
                                //尺寸
                                // this.tableData0[k].chicun_x = parseInt(originalx * 2)
                                // this.tableData0[k].chicun_y = parseInt(originaly * 2)
                                // this.tableData0[k].chicun_z = parseInt(originalz * 2)
                                var chiCun=this.getSortNum(parseInt(originalx * 2),parseInt(originaly * 2),parseInt(originalz * 2)).split(',');
                                this.tableData0[k].long = chiCun[0]
                                this.tableData0[k].width = chiCun[1]
                                this.tableData0[k].height = chiCun[2]
                                //表面积
                                this.tableData0[k].area = parseFloat(Area)
                            }
                        }
                        for (let k in this.tableData1) {
                            if (this.tableData1[k].pirct3Did === file.pirct3Did) {
                                //体积
                                this.tableData1[k].tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData1[k].threed_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData1[k].cnc_jinshu_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData1[k].cnc_suliao_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData1[k].fumo_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData1[k].fast_tiji = (parseFloat(volumes)).toFixed(2)
                                //尺寸
                                // this.tableData0[k].chicun_x = parseInt(originalx * 2)
                                // this.tableData0[k].chicun_y = parseInt(originaly * 2)
                                // this.tableData0[k].chicun_z = parseInt(originalz * 2)
                                var chiCun=this.getSortNum(parseInt(originalx * 2),parseInt(originaly * 2),parseInt(originalz * 2)).split(',');
                                this.tableData1[k].long = chiCun[0]
                                this.tableData1[k].width = chiCun[1]
                                this.tableData1[k].height = chiCun[2]
                                //表面积
                                this.tableData1[k].area = parseFloat(Area)
                            }
                        }
                        for (let k in this.tableData2) {
                            if (this.tableData2[k].pirct3Did === file.pirct3Did) {
                                //体积
                                this.tableData2[k].tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData2[k].threed_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData2[k].cnc_jinshu_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData2[k].cnc_suliao_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData2[k].fumo_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData2[k].fast_tiji = (parseFloat(volumes)).toFixed(2)
                                //尺寸
                                // this.tableData0[k].chicun_x = parseInt(originalx * 2)
                                // this.tableData0[k].chicun_y = parseInt(originaly * 2)
                                // this.tableData0[k].chicun_z = parseInt(originalz * 2)
                                var chiCun=this.getSortNum(parseInt(originalx * 2),parseInt(originaly * 2),parseInt(originalz * 2)).split(',');
                                this.tableData2[k].long = chiCun[0]
                                this.tableData2[k].width = chiCun[1]
                                this.tableData2[k].height = chiCun[2]
                                //表面积
                                this.tableData2[k].area = parseFloat(Area)
                            }
                        }
                        for (let k in this.tableData3) {
                            if (this.tableData3[k].pirct3Did === file.pirct3Did) {
                                //体积
                                this.tableData3[k].tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData3[k].threed_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData3[k].cnc_jinshu_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData3[k].cnc_suliao_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData3[k].fumo_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData3[k].fast_tiji = (parseFloat(volumes)).toFixed(2)
                                //尺寸
                                // this.tableData0[k].chicun_x = parseInt(originalx * 2)
                                // this.tableData0[k].chicun_y = parseInt(originaly * 2)
                                // this.tableData0[k].chicun_z = parseInt(originalz * 2)
                                var chiCun=this.getSortNum(parseInt(originalx * 2),parseInt(originaly * 2),parseInt(originalz * 2)).split(',');
                                this.tableData3[k].long = chiCun[0]
                                this.tableData3[k].width = chiCun[1]
                                this.tableData3[k].height = chiCun[2]
                                //表面积
                                this.tableData3[k].area = parseFloat(Area)
                            }
                        }
                        for (let k in this.tableData4) {
                            if (this.tableData4[k].pirct3Did === file.pirct3Did) {
                                //体积
                                this.tableData4[k].tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData4[k].threed_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData4[k].cnc_jinshu_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData4[k].cnc_suliao_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData4[k].fumo_tiji = (parseFloat(volumes)).toFixed(2)
                                this.tableData4[k].fast_tiji = (parseFloat(volumes)).toFixed(2)
                                //尺寸
                                // this.tableData0[k].chicun_x = parseInt(originalx * 2)
                                // this.tableData0[k].chicun_y = parseInt(originaly * 2)
                                // this.tableData0[k].chicun_z = parseInt(originalz * 2)
                                var chiCun=this.getSortNum(parseInt(originalx * 2),parseInt(originaly * 2),parseInt(originalz * 2)).split(',');
                                this.tableData4[k].long = chiCun[0]
                                this.tableData4[k].width = chiCun[1]
                                this.tableData4[k].height = chiCun[2]
                                //表面积
                                this.tableData4[k].area = parseFloat(Area)
                            }
                        }
                        // 计算一个控制显示大小的参数
                        var arg = 15 / originalmax;
                        // 修改模型显示的大小
                        mesh.scale.set(arg, arg, arg);
                        scene.add(mesh)

                    },
                    //加载进度
                    function (xhr) {
                        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                        // console.log(xhr.loaded);
                        // console.log(xhr.total);
                        if ((xhr.loaded / xhr.total * 100) + '% loaded' === '100% loaded') {
                            console.log('模型加载完成后,调用drawShape()');
                            drawShape();
                        }
                    },
                    //加载完成
                    )
                } else {
                    console.log('文件无法解析或者是无图纸报价');
                    return
                }
            }
            //控制
            var effect;
            var controls;
            function initControl() {
                effect = new AsciiEffect(renderer);
                effect.setSize(WIDTH, HEIGHT);
                controls = new TrackballControls(camera, renderer.domElement);
                //设置相机距离原点的最远距离
                controls.minDistance = 30;
                //设置相机距离原点的最远距离
                controls.maxDistance = 150;
            }
            // 动画
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                effect.render(scene, camera);
            }
            // 启动
            function threeStart() {
                //制作画布
                initThree();
                initScene();
                //相机
                initCamera();
                initLight();
                // drawShape();
                initObject();
                initControl();
                animate();
            }
            threeStart();
        },
        //最小到大排列
        getSortNum(a,b,c){
            var m;
            var d = [a, b, c].sort(function(a,b){return b-a}).join(',');
            m=d;
            return m
        },
        // 点击图片
        showCanvas (item, typeTable, type) {
            // console.log(item.localPath)
            // let localPath=item.localPath;
            // if (item.virtual) {
            //     return false;
            // } else {
            //         this.
            // }
            // console.log('出发了？')
            this.pictFlagType = typeTable
            $(".canvasName").html(item.name)
            // if(item.filename.toLowerCase().indexOf(".stl")>-1){
            // }else{
            //     $('.threedwindow').show();
            //     $('.showwindow .'+item.id).css("display","block");
            // }
            this.imgIndex = item.threedmodelidKey; // 唯一keyID 和 class
            // data1决定弹窗是否显示
            this.threeboxflag = true;
            //2D图像预览  each遍历数组
            $('#abc>img').each(function(){
                console.log(this.getAttribute('imgid'))
                if(this.getAttribute('imgid') === item.threedmodelidKey){
                    this.src=item.url_img
                    this.style.display="block"
                }else{
                    this.style.display="none"
                }
            })
            // data2是产品id
            $('canvas').each(function () {
                // console.log(this);
                // console.log(this.getAttribute('threedmodelid'));
                // console.log(item.pirct3Did)
                if (this.getAttribute('threedmodelid') === item.threedmodelidKey) {
                    // console.log('id相同');
                    this.style.visibility = 'visible'
                    this.style.left = '0'
                } else {
                    this.style.visibility = 'hidden'
                }
            })
        },
        // 关闭3d模型弹窗
        closewindow() {
            this.threeboxflag = false;
            $('canvas').each(function () {
                this.style.visibility = 'hidden'
            })
        },
        // 修改截图
        editImg(e) {
            if (this.pictFlagType === 0) {
                console.log('1')
                for(let i =0; i<this.tableData0.length;i++){
                    if(this.tableData0[i].threedmodelidKey == this.imgIndex){
                        if($(".canvasName").html().toLowerCase().indexOf('.stl')>-1){
                            this.tableData0[i].url_img = $(this.$refs.canvasBox).find('.'+this.imgIndex).get(0).toDataURL("image/png");
                        }else{
                            console.log("igs")
                            this.tableData0[i].url_img =$('#abc').find('.'+this.imgIndex).contents().find('canvas')[0].toDataURL("image/png");
                        }
                    }
                }
            } else if (this.pictFlagType === 1) {
                for(let i =0; i<this.tableData1.length;i++){
                    if(this.tableData1[i].threedmodelidKey == this.imgIndex){
                        if($(".canvasName").html().toLowerCase().indexOf('.stl')>-1){
                            this.tableData1[i].url_img = $(this.$refs.canvasBox).find('.'+this.imgIndex).get(0).toDataURL("image/png");
                        }else{
                            console.log("igs")
                            this.tableData1[i].url_img =$('#abc').find('.'+this.imgIndex).contents().find('canvas')[0].toDataURL("image/png");
                        }
                    }
                }
            } else if (this.pictFlagType === 2) {
                for(let i =0; i<this.tableData2.length;i++){
                    if(this.tableData2[i].threedmodelidKey == this.imgIndex){
                        if($(".canvasName").html().toLowerCase().indexOf('.stl')>-1){
                            this.tableData2[i].url_img = $(this.$refs.canvasBox).find('.'+this.imgIndex).get(0).toDataURL("image/png");
                        }else{
                            console.log("igs")
                            this.tableData2[i].url_img =$('#abc').find('.'+this.imgIndex).contents().find('canvas')[0].toDataURL("image/png");
                        }
                    }
                }
            } else if (this.pictFlagType === 3) {
                for(let i =0; i<this.tableData3.length;i++){
                    if(this.tableData3[i].threedmodelidKey == this.imgIndex){
                        if($(".canvasName").html().toLowerCase().indexOf('.stl')>-1){
                            this.tableData3[i].url_img = $(this.$refs.canvasBox).find('.'+this.imgIndex).get(0).toDataURL("image/png");
                        }else{
                            console.log("igs")
                            this.tableData3[i].url_img =$('#abc').find('.'+this.imgIndex).contents().find('canvas')[0].toDataURL("image/png");
                        }
                    }
                }
            } else if (this.pictFlagType === 4) {
                console.log('5')
                for(let i =0; i<this.tableData4.length;i++){
                    if(this.tableData4[i].threedmodelidKey == this.imgIndex){
                        if($(".canvasName").html().toLowerCase().indexOf('.stl')>-1){
                            // console.log($(this.$refs.canvasBox).find('.'+this.imgIndex))
                            this.tableData4[i].url_img = $(this.$refs.canvasBox).find('.'+this.imgIndex).get(0).toDataURL("image/png");
                        }else{
                            console.log("igs")
                            this.tableData4[i].url_img =$('#abc').find('.'+this.imgIndex).contents().find('canvas')[0].toDataURL("image/png");
                        }
                    }
                }
            }
            this.$forceUpdate()
        },
        // 合并排序
        mergeSort (a, b) {
            return a.rowFlag > b.rowFlag ? 1 : -1;
        },
        // 3d打印选中工艺时触发
        craf3dFun (val) {
            console.log(val)
            this.craf3DtList.forEach(va => {
                if (val.craft3d === va.id) {
                    val.craftThrName = va.techName
                }
            })
            api.getMaterialsListFun(val.craft3d, 0).then(res2 => {
                if (res2.code === 0) {
                    if (res2.obj.length !== 0) {
                        val.material3DList = res2.obj
                        val.materials3d = res2.obj[0].materialCode
                        val.masterThrName = res.obj[0].materialCname
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                let arr = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                                val.surfaceOne = '0'
                                val.surfaceOneName = ''
                                val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                                val.surfaceTwo ='0'
                                val.surfaceTwoName = ''
                                val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                                val.surfaceThr = '0'
                                val.surfaceThrName = ''
                                val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                                // 调用用api 重新计算价格（后续补上）
                                // api.getThrPirceFun(val).then(res => {
                                //     if (res.code === 0) {
                                //         // 处理
                                //     }
                                // })
                                this.amountHandleChange3d(val, 'tab0')
                            }
                        })
                    } else {
                        val.material3DList = []
                        val.materials3d = ''
                        val.masterThrName = ''
                        val.surfaceOne = '0'
                        val.surfaceOneName = ''
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surfaceTwoName = ''
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surfaceThrName = ''
                        val.surface3DListThr = []
                    }
                }
            })
        },
        // 3d材料下拉选中的时候
        mater3dFun (val) {
            val.material3DList.forEach(cc => {
                if (cc.materialCode === val.materials3d) {
                    val.masterThrName = cc.materialCname
                }
            })
            api.getSurfaceListFun(val.materials3d).then(res3 => {
                if (res3.code === 0) {
                    if (res3.obj.length !== 0) {
                        let arr = res3.obj.map(item => {
                            let itemV = item
                            itemV.disbleFlag = false
                            return itemV
                        })
                        val.surfaceOne = '0'
                        val.surfaceOneName = ''
                        val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                        val.surfaceTwo = '0'
                        val.surfaceTwoName = ''
                        val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                        val.surfaceThr = '0'
                        val.surfaceThrName = ''
                        val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                        // 调用用api 重新计算价格（后续补上）
                        this.amountHandleChange3d(val, 'tab0')
                    } else {
                        val.surfaceOne = '0'
                        val.surfaceOneName = ''
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surfaceTwoName = ''
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surfaceThrName = ''
                        val.surface3DListThr = []
                    }
                }
            })
        },
        // 3d表面处理选中时候触发
        surface3dFun (val, type, num) {
            // num 是第几个表面处理； 取出表面处理名字需要用到
            if (num === 1) {
                val.surface3DListOne.forEach(item => {
                    if (val.surfaceOne === item.finishCode)
                    val.surfaceOneName = item.finishCname
                })
            }
            if (num === 2) {
                val.surface3DListTwo.forEach(item => {
                    if (val.surfaceTwo === item.finishCode)
                    val.surfaceTwoName = item.finishCname
                })
            }
            if (num === 3) {
                val.surface3DListThr.forEach(item => {
                    if (val.surfaceThr === item.finishCode)
                    val.surfaceThrName = item.finishCname
                })
            }
            val.surface3DListTwo.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceThr) {
                    this.tableData0[val.numIndex - 1].surface3DListTwo[index].disbleFlag = true
                } else {
                    this.tableData0[val.numIndex - 1].surface3DListTwo[index].disbleFlag = false
                }
            })
            val.surface3DListThr.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceTwo) {
                    this.tableData0[val.numIndex - 1].surface3DListThr[index].disbleFlag = true
                } else {
                    this.tableData0[val.numIndex - 1].surface3DListThr[index].disbleFlag = false
                }
            })
            val.surface3DListOne.forEach((item, index) => {
                if (item.finishCode === val.surfaceTwo || item.finishCode === val.surfaceThr) {
                    this.tableData0[val.numIndex - 1].surface3DListOne[index].disbleFlag = true
                } else {
                    this.tableData0[val.numIndex - 1].surface3DListOne[index].disbleFlag = false
                }
            })
            // 调用计算价格API(后续补上)
            let obj = api.getPriceDateValue(val, type)
            api.getThrPirceFun(obj).then(res => {
               if (res.code === 0) {
                    val.offterPrice = res.obj.cusUnitcost
                    val.offterTotal = res.obj.cusTotalcost
                    // 索引出相关的相残
                    for (let N in res.obj) {
                        // console.log(N)
                        for (let J in val) {
                            if (N === J) {
                                val[J] = res.obj[N]
                            } else {
                                // console.log()
                                val[N] = res.obj[N]
                            }
                        }
                    }
                    this.eidtTotalPirce(type)
                }
            })
            this.$forceUpdate()
        },
        // sns金属工艺下拉
        snsCrafFun (val, numI, type) {
            // 取出当前下拉名字
            val.snsCrafList.forEach(item => {
                if (item.id === val.craft3d) {
                    val.craftThrName = item.techName
                }
            })
            api.getMaterialsListFun(val.craft3d, numI).then(res2 => {
                if (res2.code === 0) {
                    if (res2.obj.length !== 0) {
                        val.snsMaterralList = res2.obj
                        val.materials3d = res2.obj[0].materialCode
                        val.masterThrName = res.obj[0].materialCname
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                let arr = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                                val.surfaceOne = '0'
                                val.surfaceOneName = ''
                                val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                                val.surfaceTwo ='0'
                                val.surfaceTwoName = ''
                                val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                                val.surfaceThr = '0'
                                val.surfaceThrName = ''
                                val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                                // 调用用api 重新计算价格（后续补上）
                                this.selectGetPirce(val, type)
                            }
                        })
                    } else {
                        val.snsMaterralList = []
                        val.materials3d = ''
                        val.masterThrName = ''
                        val.surfaceOne = '0'
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surface3DListThr = []
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                    }
                }
            })
        },
        // sns金属下拉处理
        snsMaterFun (val, type) {
            val.snsMaterralList.forEach(item => {
                if (item.materialCode === val.materials3d) {
                    val.masterThrName = item.materialCname
                }
            })
            api.getSurfaceListFun(val.materials3d).then(res3 => {
                if (res3.code === 0) {
                    if (res3.obj.length !== 0) {
                        let arr = res3.obj.map(item => {
                            let itemV = item
                            itemV.disbleFlag = false
                            return itemV
                        })
                        val.surfaceOne = '0'
                        val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                        val.surfaceThr = '0'
                        val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                        // 调用用api 重新计算价格（后续补上）
                        this.selectGetPirce(val, type)
                    } else {
                        val.surfaceOne = '0'
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surface3DListThr = []
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                    }
                }
            })
        },
        // sns金属表面处理下拉
        snsJSurfaceFun (val) {
            val.surface3DListTwo.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceThr) {
                    this.tableData1[val.numIndex - 1].surface3DListTwo[index].disbleFlag = true
                } else {
                    this.tableData1[val.numIndex - 1].surface3DListTwo[index].disbleFlag = false
                }
            })
            val.surface3DListThr.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceTwo) {
                    this.tableData1[val.numIndex - 1].surface3DListThr[index].disbleFlag = true
                } else {
                    this.tableData1[val.numIndex - 1].surface3DListThr[index].disbleFlag = false
                }
            })
            val.surface3DListOne.forEach((item, index) => {
                if (item.finishCode === val.surfaceTwo || item.finishCode === val.surfaceThr) {
                    this.tableData1[val.numIndex - 1].surface3DListOne[index].disbleFlag = true
                } else {
                    this.tableData1[val.numIndex - 1].surface3DListOne[index].disbleFlag = false
                }
            })
            // 调用计算价格API(后续补上)
            this.selectGetPirce(val, 'tab1')
            this.$forceUpdate()
        },
        // sns塑料表面处理下拉
        snsSSurfaceFun (val) {
            val.surface3DListTwo.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceThr) {
                    this.tableData2[val.numIndex - 1].surface3DListTwo[index].disbleFlag = true
                } else {
                    this.tableData2[val.numIndex - 1].surface3DListTwo[index].disbleFlag = false
                }
            })
            val.surface3DListThr.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceTwo) {
                    this.tableData2[val.numIndex - 1].surface3DListThr[index].disbleFlag = true
                } else {
                    this.tableData2[val.numIndex - 1].surface3DListThr[index].disbleFlag = false
                }
            })
            val.surface3DListOne.forEach((item, index) => {
                if (item.finishCode === val.surfaceTwo || item.finishCode === val.surfaceThr) {
                    this.tableData2[val.numIndex - 1].surface3DListOne[index].disbleFlag = true
                } else {
                    this.tableData2[val.numIndex - 1].surface3DListOne[index].disbleFlag = false
                }
            })
            // 调用计算价格API(后续补上)
            this.selectGetPirce(val, 'tab2')
            this.$forceUpdate()
        },
        // 复模表面下拉
        modeSurfaceFun (val) {
            val.surface3DListTwo.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceThr) {
                    this.tableData3[val.numIndex - 1].surface3DListTwo[index].disbleFlag = true
                } else {
                    this.tableData3[val.numIndex - 1].surface3DListTwo[index].disbleFlag = false
                }
            })
            val.surface3DListThr.forEach((item, index) => {
                if (item.finishCode === val.surfaceOne || item.finishCode === val.surfaceTwo) {
                    this.tableData3[val.numIndex - 1].surface3DListThr[index].disbleFlag = true
                } else {
                    this.tableData3[val.numIndex - 1].surface3DListThr[index].disbleFlag = false
                }
            })
            val.surface3DListOne.forEach((item, index) => {
                if (item.finishCode === val.surfaceTwo || item.finishCode === val.surfaceThr) {
                    this.tableData3[val.numIndex - 1].surface3DListOne[index].disbleFlag = true
                } else {
                    this.tableData3[val.numIndex - 1].surface3DListOne[index].disbleFlag = false
                }
            })
            // 调用计算价格API(后续补上)
            this.selectGetPirce(val, type)
            this.$forceUpdate()
        },
        // 复模工艺下拉
        modeCrafFun (val, type) {
            // 获取工艺名称
            this.modeCrafList.forEach(item => {
                if (item.id === val.craft3d) {
                    val.craftThrName = item.techName
                }
            })
            api.getMaterialsListFun(val.craft3d, 4).then(res2 => {
                if (res2.code === 0) {
                    if (res2.obj.length !== 0) {
                        val.promaterialsLsit = res2.obj
                        val.promaterials = res2.obj[0].materialCode
                        val.promaterialsName = res.obj[0].materialCname
                        api.getSurfaceListFun(res2.obj[0].materialCode).then(res3 => {
                            if (res3.code === 0) {
                                let arr = res3.obj.map(item => {
                                    let itemV = item
                                    itemV.disbleFlag = false
                                    return itemV
                                })
                                val.surfaceOne = '0'
                                val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                                val.surfaceTwo ='0'
                                val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                                val.surfaceThr = '0'
                                val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                                val.surfaceOneName = ''
                                val.surfaceTwoName = ''
                                val.surfaceThrName = ''
                                // 调用用api 重新计算价格（后续补上）
                                this.selectGetPirce(val, type)
                            }
                        })
                    } else {
                        val.promaterialsLsit = []
                        val.promaterials = ''
                        val.surfaceOne = '0'
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surface3DListThr = []
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                        
                    }
                }
            })
            this.$forceUpdate()
        },
        // 复模 原型材料下拉
        modeProtypeMaterFun (val, type) {
            val.promaterialsLsit.forEach(item => {
                if (item.materialCode === val.promaterials) {
                    val.promaterialsName = item.materialCname
                }
            })
            api.getSurfaceListFun(val.promaterials).then(res3 => {
                if (res3.code === 0) {
                    if (res3.obj.length !== 0) {
                        let arr = res3.obj.map(item => {
                            let itemV = item
                            itemV.disbleFlag = false
                            return itemV
                        })
                        val.surfaceOne = '0'
                        val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                        val.surfaceThr = '0'
                        val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                        // 调用用api 重新计算价格（后续补上）
                        this.selectGetPirce(val, type)
                    } else {
                        val.surfaceOne = '0'
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surface3DListThr = []
                        val.surfaceOneName = ''
                        val.surfaceTwoName = ''
                        val.surfaceThrName = ''
                    }
                }
            })
        },
        // 快速模具选择产品 材料
        rapidSurFun (val, type) {
            this.repidProductList.forEach(item => {
                if (item.materialCode === val.productMaterials) {
                    val.productMaterialsName = item.materialCname
                }
            })
            api.getSurfaceListFun(val.productMaterials).then(res3 => {
                if (res3.code === 0) {
                    if (res3.obj.length !== 0) {
                        let arr = res3.obj.map(item => {
                            let itemV = item
                            itemV.disbleFlag = false
                            return itemV
                        })
                        val.surfaceOne = '0'
                        val.surface3DListOne = JSON.parse(JSON.stringify(arr))
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = JSON.parse(JSON.stringify(arr))
                        val.surfaceThr = '0'
                        val.surface3DListThr = JSON.parse(JSON.stringify(arr))
                        // 调用用api 重新计算价格（后续补上）
                        // this.selectGetPirce(val, type)
                        this.getCaveFun(val)
                    } else {
                        val.surfaceOne = '0'
                        val.surface3DListOne = []
                        val.surfaceTwo = '0'
                        val.surface3DListTwo = []
                        val.surfaceThr = '0'
                        val.surface3DListThr = []
                    }
                }
            })
        },
        // 修改3D打印单价
        editPiceFun (val, type) {
            val.offterTotal = (val.offterPrice * val.amount).toFixed(2) // 重新计算总价
            // 修改3D的 修改总价
            this.eidtTotalPirce(type)
            this.$forceUpdate()
        },
        // 修改3D打印总价是 调用的方法
        eidtTotalPirce (type) {
             // 前三种次方法算出总价格； 复模 和 快速模具需要另外 重新特殊方法处理
            if (type === 'tab0') {
                this.tab0Total = 0
                this.tableData0.forEach(item => {
                    this.tab0Total = this.tab0Total + Number(item.offterTotal)
                })
            } else if (type === 'tab1') {
                this.tab1Total = 0
                this.tableData1.forEach(item => {
                    this.tab1Total = this.tab1Total + Number(item.offterTotal)
                })
            } else if (type === 'tab2') {
                this.tab2Total = 0
                this.tableData2.forEach(item => {
                    this.tab2Total = this.tab2Total + Number(item.offterTotal)
                })
            } else if (type === 'tab3') {
                this.tab3Total = 0
                this.tableData3.forEach(item => {
                    this.tab3Total = this.tab3Total + Number(item.offterTotal)
                })
            } else if (type === 'tab4') {
                this.tab4Total = 0
                this.tableData4.forEach(item => {
                    this.tab4Total = this.tab4Total + Number(item.jsTotal)
                })
            }
            this.$forceUpdate()
        },
        // 下拉修改参数获取价格重新计算重新 接口 (调用此方法的)(改修了参数；只调用接口；皆可以调用此接口)
        selectGetPirce (val, type) {
            let obj = api.getPriceDateValue(val, type)
            if (type === 'tab0') {
                api.getThrPirceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.offterPrice = res.obj.cusUnitcost
                        val.offterTotal = res.obj.cusTotalcost
                        val.proDate  = res.obj.totalLeadtime // 生成周期
                        val.proTime  = res.obj.cnc3dSinglehours // 单价工时
                        val.handicraftsTime  = res.obj.handSinglehours // 手工工时
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            } else if (type === 'tab1') {
                api.getCNCPiceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.offterPrice = res.obj.cusUnitcost
                        val.offterTotal = res.obj.cusTotalcost
                        val.proDate  = res.obj.totalLeadtime // 生成周期
                        val.proTime  = res.obj.cnc3dSinglehours // 单价工时
                        val.handicraftsTime  = res.obj.handSinglehours // 手工工时
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            } else if (type === 'tab2') {
                api.getCncSuPiceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.offterPrice = res.obj.cusUnitcost
                        val.offterTotal = res.obj.cusTotalcost
                        val.proDate  = res.obj.totalLeadtime // 生成周期
                        val.proTime  = res.obj.cnc3dSinglehours // 单价工时
                        val.handicraftsTime  = res.obj.handSinglehours // 手工工时
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            } else if (type === 'tab3') {
                api.getFumoPiceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.offterTotal = res.obj.cusTotalcost // 报价总价
                        val.proTotal  = res.obj.cusTotalmasterVccost // 原型总价
                        val.moldTotal  = res.obj.cusTotalmoldVccost // 模具总价
                        val.pourPrice  = res.obj.cusUnitcost // 灌注总价
                        val.proDate  = res.obj.totalLeadtime // 生成周期
                        val.proTime  = res.obj.cnc3dSinglehours // 单价工时
                        val.handicraftsTime  = res.obj.handSinglehours // 手工工时
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            } else if (type === 'tab4') {
                api.getModelPiceFun(obj).then(res => {
                    if (res.code === 0) {
                        val.delivery = res.obj.totalLeadtime // 交期
                        val.moldoPrice = res.obj.cusFmouldMoldcost // 模具单价
                        val.moldTotal = res.obj.cusFmouldMoldTotalcost // 模具总价
                        val.proPrice = res.obj.cusUnitcost // 产品单价
                        val.proTotal = (res.obj.cusUnitcost * val.proAmount).toFixed(2) // 产品单价
                        val.total = res.obj.cusTotalcost // 总价
                        val.mergeTotal = res.obj.cusTotalcost  // 合并后的总价
                        // val.jsTotal = (res.obj.cusTotalcost * 0.8).toFixed(2)
                        val.mergeModePrice = res.obj.cusFmouldMoldcost // 合并后的模具单价
                        val.mergeModeTotal = res.obj.cusFmouldMoldTotalcost // 合并后的模具总价
                        if (val.rowFlag !== '') {
                            this.jsTotalFun(val)
                        }
                        // 索引出相关的相残
                        for (let N in res.obj) {
                            // console.log(N)
                            for (let J in val) {
                                if (N === J) {
                                    val[J] = res.obj[N]
                                } else {
                                    // console.log()
                                    val[N] = res.obj[N]
                                }
                            }
                        }
                        this.eidtTotalPirce(type)
                    }
                })
            }
        },
        // 获取难度系数
        selectDiffValue (val, type) {
            // 去除难系数名
            this.complexityList.forEach(item => {
                if (item.complexityCode === val.difficulty) {
                    val.difficultyName = item.complexityCname
                }
            })
            this.selectGetPirce(val, type)
        },
        // 获取复模灌注材料名称
        getFuMuPour (val, type) {
            this.modePourList.forEach(item => {
                if (item.materialCode === val.materials3d) {
                    val.materials3dName = item.materialCname
                }
            })
            this.selectGetPirce(val, type)
        },
        // 获取硅模材料
        getSiliconName (val, type) {
            this.siliconModeList.forEach(item => {
                if (item.materialCode === val.Silicon) {
                    val.SiliconName = item.materialCname
                }
            })
            this.selectGetPirce(val, type)
        },
        // 修改复模灌注单价；重新计算总价
        getFuMoTotal (val) {
            val.offterTotal = ((val.proTotal - 0) + (val.moldTotal  - 0) + (val.pourPrice  * val.amount)).toFixed(2)
            this.eidtTotalPirce('tab3')
        },
        // 选择 产品结构
        getModelproDiff (val, type) {
            console.log(this.rapidStructureList)
            this.selectGetPirce(val, type)
        },
        // 快速模具的表面处理
        surfaceModel (val, type) {
            val.surface3DListOne.forEach(item => {
                if (item.finishCode === val.surfaceOne) {
                    val.surfaceOneName = item.finishCname
                }
            })
            this.selectGetPirce(val, type)
        },
        // 快速模具 的模仁材料选择
        getModelMR (val, type) {
            console.log(this.repidModeCoreList)
            this.repidModeCoreList.forEach(item => {
                if (item.materialCode === val.moldCore) {
                    val.moldCoreName = item.materialName
                }
            })
            this.selectGetPirce(val, type)
        },
        // 快速模具模坯材料选择
        getModelMP (val, type) {
             this.repidModeDieList.forEach(item => {
                if (item.materialCode === val.dieBlank) {
                    val.dieBlankName = item.materialName
                }
            })
            this.selectGetPirce(val, type)
        },
        // 快速复模打勾选中列表列
        getModelSelectTrue (val) {
            this.modelSelectHBList = []
            val.forEach(item => {
                if (item.rowFlag != '') {
                    this.tableData4.forEach((item2, index) => {
                        if (item.rowFlag === item2.rowFlag) {
                            this.modelSelectHBList.push(item2)
                        }
                    })
                } else {
                    this.tableData4.forEach(item3 => {
                        if (item.pirct3Did === item3.pirct3Did) {
                            this.modelSelectHBList.push(item3)
                        }
                    })
                }
            })
            this.tableData4.forEach(item2 => {
                if (item2.rowFlag !== '') {
                    let ss = val.some(item => item.rowFlag === item2.rowFlag)
                    item2.edit = ss
                } else {
                    let ss = val.some(item => item.numIndex === item2.numIndex)
                    item2.edit = ss
                }
                // let ss = val.some(item => item.numIndex === item2.numIndex)
                // item2.edit = ss
            })
            this.money = api.getTotalFun(this.tableData0, this.tableData1, this.tableData2, this.tableData3, this.tableData4)
            // this.modelSelectHBList = val
            console.log(this.modelSelectHBList)
            // console.log(val)
            // console.log(this.tableData4)
        },
        // 合并选中项
        mergeFun () {
            console.log('出发了？？')
            // 添加唯一key
            if (this.modelSelectHBList.length !== 0) {
                let rowKey = this.modelSelectHBList[0].pirct3Did + 'tab4' + this.modelSelectHBList[0].numIndex
                let pirceTotal = 0 // 总价
                let modeTotal = 0 // 模具总价
                this.tableData4.forEach(item => {
                    this.modelSelectHBList.forEach(val => {
                        if (item.pirct3Did === val.pirct3Did) {
                            // item.edit = true
                            item.rowFlag = rowKey
                            item.btnNoshow = true
                        }
                    })
                })
                let sele = this.tableData4.find(item => item.rowFlag === rowKey)
                this.getCaveFun(sele)
                // 重新排序
                this.tableData4.sort(this.mergeSort)
                this.modelSelectHBList = []
                this.$refs.multipleTable4.clearSelection()
            }
            this.$forceUpdate()
        },
        // 拆分模具
        splitFun () { 
            if (this.modelSelectHBList.length !== 0) {
                for (let i = 0; i < this.modelSelectHBList.length; i++) {
                    for (let j = 0; j < this.tableData4.length; j++) {
                        if (this.modelSelectHBList[i].pirct3Did === this.tableData4[j].pirct3Did) {
                            // this.tableData4[j].eidt = false
                            this.tableData4[j].rowFlag = ''
                            this.tableData4[j].btnNoshow = false
                            this.selectGetPirce(this.tableData4[j], 'tab4')
                        }
                    }
                }
                // 重置选择项
                this.modelSelectHBList = []
                this.$refs.multipleTable4.clearSelection()
                this.$forceUpdate()
            }
        },
        // 重新计算价格
        calculatePict (val, type) {
            // 重新换算 单价
            val.offterPrice = (val.offterTotal / val.amount).toFixed(2)
            // 根据类型重新 计算总价
            this.eidtTotalPirce(type)
        },
        // 合并项下拉
        getCaveListFun (val) {
            this.tableData4.forEach(item => {
                if (item.rowFlag === val.rowFlag) {
                    item.dieBlankType = val.dieBlankType
                    item.rowNum = val.rowNum
                    item.tiltNum = val.tiltNum
                    item.inserts = val.inserts
                    item.holeNum = val.holeNum
                    item.hotNum = val.hotNum
                    item.productColor = val.productColor
                }
            })
            this.getCaveFun(val)
        },
        // 合并项工艺处理方法
        async getCaveFun (val) {
            if (val.rowFlag === '') { // 当前为不是合并项
                this.selectGetPirce(val, 'tab4')
            } else { // 当前为合并项
                // 修改合并选中的值；
                let axiosList = [] // 请求的接口数量
                let dataList= [] // 请求接口的对应数据
                this.tableData4.forEach(item => {
                    if (item.rowFlag === val.rowFlag) {
                        item.dieBlankType = val.dieBlankType
                        let valKey = api.getPriceDateValue(item, 'tab4')
                        axiosList.push(api.getModelPiceFun(valKey))
                        dataList.push(item)
                    }
                })
               // 解决并发的问题
               let sucArr = await Promise.all(axiosList)
                // 解决数据对应赋值问题（都是临时数据）
                // 这里 要等并发请求把数据 处理完成； 然后 在重新 计算 价格
                sucArr.forEach((item2, index) => {
                    if (item2.code === 0) {
                        dataList[index].delivery = item2.obj.totalLeadtime // 交期
                        dataList[index].moldoPrice = item2.obj.cusFmouldMoldcost // 模具单价
                        dataList[index].moldTotal = item2.obj.cusFmouldMoldTotalcost // 模具总价
                        dataList[index].proPrice = item2.obj.cusUnitcost // 产品单价
                        dataList[index].proTotal = (item2.obj.cusUnitcost * dataList[index].proAmount).toFixed(2) // 产品单价
                        dataList[index].total = item2.obj.cusTotalcost // 总价
                        dataList[index].mergeTotal = item2.obj.cusTotalcost  // 合并后的总价
                        dataList[index].mergeModePrice = item2.obj.cusFmouldMoldcost // 合并后的模具单价
                        dataList[index].mergeModeTotal = item2.obj.cusFmouldMoldTotalcost // 合并后的模具总价
                        // 索引出相关的相残
                        for (let N in item2.obj) {
                            // console.log(N)
                            for (let J in dataList[index]) {
                                if (N === J) {
                                    dataList[index][J] = item2.obj[N]
                                } else {
                                    // console.log()
                                    dataList[index][N] = item2.obj[N]
                                }
                            }
                        }
                    }
                })
                // 总价临时存储参数
                let LsTotal = 0 // 总价格 （合并后）i
                let MjTotal = 0 // 模具总价（合并后）
                // 计算合并总价在进行赋值
                dataList.forEach(i => {
                    LsTotal = ((LsTotal - 0) + ((i.cusUnitcost*i.proAmount).toFixed(2) - 0) + ((i.cusFmouldMoldTotalcost * 0.8).toFixed(2) - 0)).toFixed(2) // 计算 合并的总价
                })
                dataList.forEach(v => {
                    // console.log(v)
                    MjTotal = ((v.moldTotal - 0) + (MjTotal - 0)).toFixed(2)
                })
                console.log(LsTotal)
                console.log(MjTotal)
                // 这里才是 正在赋值问题 (这里有一个逻辑 要区别; 合并 和未合并先 用在页面实现的模具总价 模具单价 还有 总价 是用的不同的参数值;)
                // 在保存处理数据的时候的 也要 根据是否为合并项；来去不同的参数值
                dataList.forEach(item3 => {
                    this.tableData4.forEach(item4 => {
                        if (item3.pirct3Did === item4.pirct3Did) {
                            item4 = item3
                            item4.mergeModeTotal = ((MjTotal * 0.8) / dataList.length).toFixed(2) // 模具总价
                            item4.mergeModePrice = ((MjTotal * 0.8) / dataList.length).toFixed(2) // 模具单价
                            item4.mergeTotal = (LsTotal * 0.8).toFixed(2)// 总价
                            item4.jsTotal = ((LsTotal * 0.8) / dataList.length).toFixed(2)
                        }
                    })
                })
            }
        },
        // 修改模具总价；重新计算
        editModeTotalFun (val, flag) {
            // flag为1 产品单价进入；需要重新计算 产品总价
            // flag为2 产品总价进去； 需要重新计算产品单价
            if (flag === 1) {
                val.proTotal = (val.proPrice*val.proAmount).toFixed(2)
            } else if(flag === 2) {
                val.proPrice = (val.proTotal / val.proAmount).toFixed(2)
            }
            if (val.rowFlag === '') {
                val.total = ((val.proTotal - 0) + (val.moldTotal - 0)).toFixed(2)
            } else {
                // 需要重新计算所有合并项的总价
                let dataList= [] // 对应数据
                // 找到相对应的数据
                this.tableData4.forEach(item => {
                    if (item.rowFlag === val.rowFlag) {
                        dataList.push(item)
                    }
                })
                // 循环对应数据；找到合并后总价
                let lsTotal = 0
                dataList.forEach(i => {
                    lsTotal = ((lsTotal - 0) + (i.mergeModeTotal - 0) + (i.proTotal - 0)).toFixed(2) // 计算 合并的总价
                })
                // 计算完 重新赋值
                dataList.forEach(item3 => {
                    this.tableData4.forEach(item4 => {
                        if (item3.pirct3Did === item4.pirct3Did) {
                            item4.mergeTotal = (lsTotal * 0.8).toFixed(2)// 总价
                            item4.jsTotal = ((lsTotal * 0.8) / dataList.length).toFixed(2)
                        }
                    })
                })
            }
            this.$forceUpdate()
        },
        // 专门处理保存时 表面处理的数据问题
        disposeBMFun (item) {
            let b1 = ''
            let b2 = ''
            console.log(item.surfaceOne)
            console.log(item.surfaceTwo)
            console.log(item.surfaceThr)
            if (item.surfaceOne !== 0 && item.surfaceOne !== '0') {
                if (b1 === '') {
                    b1 = b1 + item.surfaceOne
                    b2 = b2 + item.surfaceOneName
                } else {
                    b1 = b1 + ',' + item.surfaceOne
                    b2 = b2 + ',' + item.surfaceOneName
                }
            }
            if (item.surfaceTwo !== 0 && item.surfaceTwo !== '0') {
                if (b1 === '') {
                    b1 = b1 + item.surfaceTwo
                    b2 = b2 + item.surfaceTwoName
                } else {
                    b1 = b1 + ',' + item.surfaceTwo
                    b2 = b2 + ',' + item.surfaceTwoName
                }
            }
            if (item.surfaceThr !== 0 && item.surfaceThr !== '0') {
                if (b1 === '') {
                    b1 = b1 + item.surfaceThr
                    b2 = b2 + item.surfaceThrName
                } else {
                    b1 = b1 + ',' + item.surfaceThr
                    b2 = b2 + ',' + item.surfaceThrName
                }
            }
            let arr = []
            arr.push(b1)
            arr.push(b2)
            return arr
        },
        // 一件删除
        deleteAll () {
            this.temporaryFileList = []
            if (this.temporaryFileType === 'tab0') {
                this.tableData0.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData0[index].fileList = []
                    }
                })
            } else if (this.temporaryFileType === 'tab1') {
                 this.tableData1.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData1[index].fileList= []
                    }
                })
            } else if (this.temporaryFileType === 'tab2') {
                this.tableData2.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData2[index].fileList = []
                    }
                })
            } else if (this.temporaryFileType === 'tab3') {
                this.tableData3.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData3[index].fileList= []
                    }
                })
            } else if (this.temporaryFileType === 'tab4') {
                 this.tableData4.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData4[index].fileList = []
                    }
                })
            }
        },
        // 判断文件名字
        getNameFun (name) {
            let arr = name.split('.')
            let num = 7
            if (arr[arr.length -1] === 'png' || arr[arr.length -1] === 'PNG' || arr[arr.length -1] === 'jpg' || arr[arr.length -1] === 'JPG' || arr[arr.length -1] === 'jpeg' || arr[arr.length -1] === 'JPEG') {
                num = 6
            } else if (arr[arr.length - 1] === 'pdf' || arr[arr.length - 1] === 'PDF') {
                num = 2
            } else if (arr[arr.length - 1] === 'cad' || arr[arr.length - 1] === 'CAD') {
                num = 1
            } else if (arr[arr.length - 1] === 'ppt' || arr[arr.length - 1] === 'PPT') {
                num = 3
            } else if (arr[arr.length - 1] === 'excel' || arr[arr.length - 1] === 'EXCEL') {
                num = 4
            } else if (arr[arr.length - 1] === 'word' || arr[arr.length - 1] === 'WORD') {
                num = 5
            } else {
                 num = 7
            }
            return num
        },
        // 附件删除单个
        deleFun (val) {
            if (this.temporaryFileType === 'tab0') {
                this.tableData0.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData0[index].fileList.forEach((con, index2) => {
                            if (con.id === val.id) {
                                this.tableData0[index].fileList.splice(index2, 1)
                            }
                        })
                    }
                })
            } else if (this.temporaryFileType === 'tab1') {
                 this.tableData1.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData1[index].fileList.forEach((con, index2) => {
                            if (con.id === val.id) {
                                this.tableData1[index].fileList.splice(index2, 1)
                            }
                        })
                    }
                })
            } else if (this.temporaryFileType === 'tab2') {
                this.tableData2.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                       this.tableData2[index].fileList.forEach((con, index2) => {
                            if (con.id === val.id) {
                                this.tableData2[index].fileList.splice(index2, 1)
                            }
                        })
                    }
                })
            } else if (this.temporaryFileType === 'tab3') {
                this.tableData3.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                       this.tableData3[index].fileList.forEach((con, index2) => {
                            if (con.id === val.id) {
                                this.tableData3[index].fileList.splice(index2, 1)
                            }
                        })
                    }
                })
            } else if (this.temporaryFileType === 'tab4') {
                 this.tableData4.forEach((item, index) => {
                    if (item.pirct3Did === this.temporaryFileId){
                        this.tableData4[index].fileList.forEach((con, index2) => {
                            if (con.id === val.id) {
                                this.tableData4[index].fileList.splice(index2, 1)
                            }
                        })
                    }
                })
            }
            // 删除线束数组的
            this.temporaryFileList.forEach((vl, index) => {
                if (vl.id === val.id) {
                    this.temporaryFileList.splice(index, 1)
                }
            })
        },
        // 合并下下拉；重新计算价格
        jsTotalFun (val) {
            // 需要重新计算所有合并项的总价
            let dataList= [] // 对应数据
            // 找到相对应的数据
            this.tableData4.forEach(item => {
                if (item.rowFlag === val.rowFlag) {
                    dataList.push(item)
                }
            })
            // 循环对应数据；找到合并后总价
            let lsTotal = 0
            dataList.forEach(i => {
                lsTotal = ((lsTotal - 0) + (i.mergeModeTotal - 0) + (i.proTotal - 0)).toFixed(2) // 计算 合并的总价
            })
            // 计算完 重新赋值
            dataList.forEach(item3 => {
                this.tableData4.forEach(item4 => {
                    if (item3.pirct3Did === item4.pirct3Did) {
                        item4.mergeTotal = (lsTotal * 0.8).toFixed(2)// 总价
                        item4.jsTotal = ((lsTotal * 0.8) / dataList.length).toFixed(2)
                    }
                })
            })
        }
    }
}
</script>
<style lang="less">
    @import './css/style.less';
</style>