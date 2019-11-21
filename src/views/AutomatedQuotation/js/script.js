import Cookies from 'js-cookie'
import * as $ from 'jquery'
import dayjs from 'dayjs'
// 导入plupload包
import plupload from 'plupload'
// 上传3D图纸组件
import upload from '../../../components/upload/upload.vue'
import uploadImg from '../../../components/upload/uploadImg.vue'
import uploadAll from '../../../components/upload/uploadAll.vue'
import uploadItem from '../../../components/upload/uploadItem.vue';
import comm from './constRe'
import api from './api'
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
export default {
    data() {
        return{
                //oss数据
            ossdata: [],        //未上传之前的队列数据
            progressbar: [],    // 进度条数据
            navId:'',  //选项卡
            NavNameList: [
              {title: '3D打印', price: ''},
              {title: 'CNC金属', price: ''},
              {title: 'CNC塑料', price: ''},
              {title: '复模', price: ''},
              {title: '快速模具', price: ''},
          ], // 五种模式的标题

            /***无3D图纸参数---开始* */
            dialogNot3D:false,          //无3D上传窗口是否显示
            titleFlg: 1,       //无3D图纸上传对话框默认选择1----知道材料、重量
            no3DknowMaterial: {       //无3D图纸上传参数----知道材料,重量
                no_drawing_name: '',    //名称
                no_drawing_length: '',  //长度
                no_drawing_width: '',   //宽度
                no_drawing_height: '',  //高度
                no_drawing_weight: '',  //重量
                no_drawing_material: '',//材料
                no_drawing_imgUrl: '',   //图片
            },
            no3DknowVolumn: {       //无3D图纸上传参数----知道体积
                no_drawing_name_: '',    //名称
                no_drawing_length_: '',  //长度
                no_drawing_width_: '',   //宽度
                no_drawing_height_: '',  //高度
                no_drawing_volumn_: '',  //体积
                no_drawing_imgUrl_: '',   //图片
            },
            no_drawing_material_list:[],    //无3D图纸上传材料
            /***无3D图纸参数---结束* */

            /****下拉列表参数----开始***** */
                // 3d打印
            threed_gongyi: [],// 工艺集合（包括材料和表面处理）
            threed_cailiao: [],//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
            threed_face: [],//表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
            
                //cnc金属
            cnc_jinshu_gongyi: [],// 工艺集合（包括材料和表面处理）
            cnc_jinshu_cailiao: [],//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
            cnc_jinshu_face: [],//表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
            cnc_jinshu_jiagongmianshu: [],// 加工面数集合
            cnc_jinshu_chaijian: [],// 拆件集合
            cnc_jinshu_complexity : [],// 难度系数集合
            cnc_jinshu_gongcha: [],// 公差集合

                // CNC塑料
            cnc_suliao_gongyi: [],// 工艺集合（包括材料和表面处理）
            cnc_suliao_cailiao: [],//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
            cnc_suliao_face: [],//表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
            cnc_suliao_jiagongmianshu: [],// 加工面数集合
            cnc_suliao_chaijian: [],// 拆件集合
            cnc_suliao_complexity : [],// 难度系数集合
            cnc_suliao_gongcha: [],// 公差要求集合

                // 复模
            fumo_gongyi: [],// 工艺集合（包括材料和表面处理）
            fumo_guanzhucailiao: [],//灌注材料集合
            fumo_yuanxingcailiao: [],//原型材料集合
            fumo_guimocailiao: [],//硅膜材料集合
            fumo_complexity : [],// 难度系数集合
            fumo_gongcha: [],// 公差集合
            fumo_face: [],//表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）

                // 快速模具
            fast_chanpinjiegou: [],// 产品结构集合
            fast_jinjiaoleixing: [],// 进胶类型集合
            fast_chanpinbiaomian: [],// 表面处理集合
            fast_gongcha: [],// 公差集合
            fast_morencailiao: [],// 模仁材料集合
            fast_mopeicailiao: [],// 模胚材料集合
            fast_mojushouming: [],// 模具寿命集合
            fast_mopeileixing: [],// 模胚类型集合
            fast_hangweigeshu: [],// 行位个数集合
            fast_xiedinggeshu: [],// 斜顶个数集合
            fast_xueshu: [],// 穴数集合
            fast_rezuigeshu: [],// 热嘴个数
            fast_chanpincailiao: [],// 产品材料集合
            fast_chanpinyanse: [],// 产品颜色集合
            /****下拉列表参数----结束***** */

        }
    },
    methods: {
      /**获取五个选项卡** */
      getQuoteType(){
        this.$request.post('/sysOperation/listOperationBar', {menuId: '03807145-41e3-4b02-b582-73bca757f1eb'}).then(res => {
            if(res.code === 0) {
                this.NavNameList = res.obj.listPageBarOperation
            }
        })
      },
      
      // 切换数据模板
      selectClass (index, id) {
        this.navId = id
      },

       /*******oss文件队列子组件传值(未上传完毕的文件队列)-----开始****/
      showossdata(data) {
        this.ossdata = data;
        console.log(this.ossdata);
      },
      /*******oss文件队列子组件传值(未上传完毕的文件队列)-----结束****/

      /*********oss数据子组件传值(已上传的文件队列)-----开始***********/ 
      showossurl(ossPath, id, file, imgurl) {

            console.log("3d文件路径"+ossPath)
            console.log("2d缩略图路径"+imgurl)
            console.log(file)
        
            var filename = file.name;


    //         // 初始化有图纸报价动态文件的数据
    //         this.ossurl.push({
    //             // 公用参数，大多是前端计算所得
    //             id: id,//唯一识别
    //             file: file,//文件信息
    //             filename: filename,
    //             localPath:'',
    //             url: ossPath,//3d文件路径
    //             // url_img: imgurl,//2d缩略图路径
    //             url_img: ossPath,
    //             chicun_x: 0,
    //             chicun_y: 0,
    //             chicun_z: 0,
    //             tiji: 0,//有图纸报价体积
    //             area: 0,//表面积
    //             isjiexishibai: false,//文件是否解析失败
    //             weight: 0,//无图纸报价重量
    //             offerType: '',//是否是无图纸报价

    //             // 不同加工方式参数细节
    //             // 3d打印
    //             threed_gongyi: this.threed_gongyi,// 默认工艺集合（包括材料和表面处理）
    //             threed_gongyi_value: this.threed_gongyi[0].techName,// 工艺值(默认第一个)
    //             threed_gongyi_valueid: this.threed_gongyi[0].id,// 工艺值ID(默认第一个)
    //             threed_cailiao: this.threed_cailiao,//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
    //             threed_cailiao_value: this.threed_cailiao[0].materialName, //材料值（默认为当前列表第一个）
    //             threed_cailiao_valueid: this.threed_cailiao[0].id,//材料值ID（默认为当前列表第一个）

    //             threed_cailiao_class: this.threed_cailiao[0].materialEnglishName,//英文材料

    //             threed_face: this.threed_face, //默认表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
    //             // threed_face_value: this.threed_face[0].surfaceName,// 默认表面处理值
    //             // threed_face_valueid: this.threed_face[0].id,// 默认表面处理值ID
    //             threed_face_values: [
    //             {
    //                 "id": this.threed_face[0].id,//表面处理ID
    //                 "surfaceName": this.threed_face[0].surfaceName,//表面处理名称
    //                 "surfaceEnglishName": this.threed_face[0].surfaceEnglishName//英文表面处理名称
    //             },
    //             ],//表面处理列表,默认只有一个，默认为第一个，其他的随事件而变化
    //             threed_face_select:[{}],
    //             threed_jiaoqi: this.threed_jiaoqi,//交期集合
    //             threed_jiaoqi_value: this.threed_jiaoqi[0].paramContent,// 默认交期值

    //             // 供应商 sup 数据
    //             three_supManualWorkingHours:0,
    //             three_supPrice:0,
    //             three_supMaterialCost:0,
    //             three_supTotal:0,

    //             // 手工费
    //             three_unitPrintingCost:0,//单件打印费用
    //             three_unitPriceManualHandlingFee:0,//单价手工处理费
    //             three_supUnitPrintingCost:0,//单件打印费用
    //             three_supUnitPriceManualHandlingFee:0,//单价手工处理费
    //             three_sysUnitPrintingCost:0,//单件打印费用
    //             three_sysUnitPriceManualHandlingFee:0,//单价手工处理费

    //             threed_ischeck: true,//默认选中状态
    //             threed_number: 1,//数量
    //             threed_beizhu: '',//备注
    //             threed_price: 0,//单价
    //             threed_allprice: 0,//总价
    //             threed_weight: 0,//重量(通过体积反推)
    //             threed_tiji: 0,//3D体积（通过重量反推）
    //             threed_zuidijia: 0,//最低价
    //             threed_isminimum: '最低价',//是否最低价（第一次默认最低价）
    //             // threed_isminimum:'',//是否最低价（第一次默认最低价）
    //             threed_isfirst: '第一次上传',//是否第一次报价请求
    //             threed_2dimg: '',//2D缩略图


    //             //cnc金属
    //             cnc_jinshu_ischeck: true,//默认选中状态
    //             cnc_jinshu_gongyi: this.cnc_jinshu_gongyi,// 默认工艺集合（包括材料和表面处理）
    //             cnc_jinshu_gongyi_value: this.cnc_jinshu_gongyi[0].techName,// 工艺值(默认第一个)
    //             cnc_jinshu_gongyi_valueid: this.cnc_jinshu_gongyi[0].id,// 工艺值ID(默认第一个)
    //             cnc_jinshu_cailiao: this.cnc_jinshu_cailiao,//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
    //             cnc_jinshu_cailiao_value: this.cnc_jinshu_cailiao[0].materialName,//默认材料值

    //             cnc_jinshu_cailiao_class: this.cnc_jinshu_cailiao[0].materialEnglishName,//英文材料

    //             cnc_jinshu_cailiao_valueid: this.cnc_jinshu_cailiao[0].id,//默认材料值id
    //             cnc_jinshu_face: this.cnc_jinshu_face,//默认表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
    //             // cnc_jinshu_face_value: this.cnc_jinshu_face[0].surfaceName,// 默认表面处理值
    //             cnc_jinshu_face_values: [
    //             {
    //                 "id": this.cnc_jinshu_face[0].id,//表面处理ID
    //                 "surfaceName": this.cnc_jinshu_face[0].surfaceName,//表面处理名称
    //                 "surfaceEnglishName": this.cnc_jinshu_face[0].surfaceEnglishName//英文表面处理名称
    //             }
    //             ],//可以添加多种表面处理
    //             cnc_jinshu_face_select:[{}],
    //             cnc_jinshu_jiaoqi: this.cnc_jinshu_jiaoqi,//交期集合
    //             cnc_jinshu_jiaoqi_value: this.cnc_jinshu_jiaoqi[0].paramContent,// 默认交期值
    //             cnc_jinshu_jiagongmianshu: this.cnc_jinshu_jiagongmianshu,// 加工面数集合
    //             cnc_jinshu_jiagongmianshu_value: this.cnc_jinshu_jiagongmianshu[0].paramContent, // 默认加工面数值
    //             cnc_jinshu_chaijian: this.cnc_jinshu_chaijian,  // 拆件集合
    //             cnc_jinshu_chaijian_value: this.cnc_jinshu_chaijian[0].paramContent,// 默认拆件值
    //             cnc_jinshu_chanpinjiegou: this.cnc_jinshu_chanpinjiegou,//产品结构集合
    //             cnc_jinshu_chanpinjiegou_value: this.cnc_jinshu_chanpinjiegou[0].paramContent,//默认产品结构值
    //             cnc_jinshu_gongchayaoqiu: this.cnc_jinshu_gongchayaoqiu,//公差要求集合
    //             cnc_jinshu_gongchayaoqiu_value: this.cnc_jinshu_gongchayaoqiu[0].paramContent,//默认公差要求值
    //             cnc_jinshu_gongya: this.cnc_jinshu_gongya,//攻牙集合
    //             cnc_jinshu_gongya_value: this.cnc_jinshu_gongya[0].paramContent,//默认攻牙值
    //             cnc_jinshu_qianjian: this.cnc_jinshu_qianjian,//嵌件集合
    //             cnc_jinshu_qianjian_value: this.cnc_jinshu_qianjian[0].paramContent,//默认嵌件值

    //             // 供应商 sup 数据
    //             cnc_jinshu_supPrice:0,
    //             cnc_jinshu_supMaterialCost:0,
    //             cnc_jinshu_supTotal:0,
    //             cnc_jinshu_supCNCWorkingHours:0,
    //             cnc_jinshu_supManualWorkingHours:0,

    //             // 表面处理
    //             cnc_jinshu_postprocessingFee:0,
    //             cnc_jinshu_postprocessingTotalFee:0,
    //             cnc_jinshu_supPostprocessingFee:0,
    //             cnc_jinshu_supPostprocessingTotalFee:0,


    //             cnc_jinshu_isxianqiege: false,//是否线切割
    //             cnc_jinshu_isdahuohua: false,//是否打火花
    //             cnc_jinshu_number: 1,//数量
    //             cnc_jinshu_beizhu: '',//备注
    //             cnc_jinshu_price: 0,//单价
    //             cnc_jinshu_allprice: 0,//总价
    //             cnc_jinshu_weight: 0,//重量
    //             cnc_jinshu_tiji: 0,//体积
    //             cnc_jinshu_zuidijia: 0,//最低价
    //             cnc_jinshu_isminimum: '最低价',//是否最低价（第一次默认最低价）
    //             // cnc_jinshu_isminimum:'',//是否最低价（第一次默认最低价）
    //             cnc_jinshu_isfirst: '第一次上传',//是否第一次报价请求
    //             cnc_jinshu_2dimg: '',//2D缩略图


    //             //cnc塑料
    //             cnc_suliao_ischeck: true,//默认选中状态
    //             cnc_suliao_gongyi: this.cnc_suliao_gongyi,// 默认工艺集合（包括材料和表面处理）
    //             cnc_suliao_gongyi_value: this.cnc_suliao_gongyi[0].techName,// 默认工艺值(第一个)
    //             cnc_suliao_gongyi_valueid: this.cnc_suliao_gongyi[0].id,// 默认工艺值ID(第一个)
    //             cnc_suliao_cailiao: this.cnc_suliao_cailiao,//渲染材料集合（可能随工艺改变而改变,默认为第一个工艺的材料）
    //             cnc_suliao_cailiao_value: this.cnc_suliao_cailiao[0].materialName,//默认材料值

    //             cnc_suliao_cailiao_class: this.cnc_suliao_cailiao[0].materialEnglishName,//英文材料

    //             cnc_suliao_cailiao_valueid: this.cnc_suliao_cailiao[0].id,//默认材料值ID
    //             cnc_suliao_face: this.cnc_suliao_face,//默认表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
    //             // cnc_suliao_face_value: this.cnc_jinshu_face[0].surfaceName,// 默认表面处理值
    //             cnc_suliao_face_values: [
    //             {
    //                 "id": this.cnc_suliao_face[0].id,//表面处理ID
    //                 "surfaceName": this.cnc_suliao_face[0].surfaceName,//表面处理名称
    //                 "surfaceEnglishName": this.cnc_suliao_face[0].surfaceEnglishName//英文表面处理名称
    //             }
    //             ],//可以添加多种表面处理
    //             cnc_suliao_face_select:[{}],
    //             cnc_suliao_jiaoqi: this.cnc_suliao_jiaoqi,//交期集合
    //             cnc_suliao_jiaoqi_value: this.cnc_suliao_jiaoqi[0].paramContent,// 默认交期值
    //             cnc_suliao_jiagongmianshu: this.cnc_suliao_jiagongmianshu,// 加工面数集合
    //             cnc_suliao_jiagongmianshu_value: this.cnc_suliao_jiagongmianshu[0].paramContent, // 默认加工面数值
    //             cnc_suliao_chaijian: this.cnc_suliao_chaijian,  // 拆件集合
    //             cnc_suliao_chaijian_value: this.cnc_suliao_chaijian[0].paramContent,// 默认拆件值
    //             cnc_suliao_chanpinjiegou: this.cnc_suliao_chanpinjiegou,//产品结构集合
    //             cnc_suliao_chanpinjiegou_value: this.cnc_suliao_chanpinjiegou[0].paramContent,//默认产品结构值
    //             cnc_suliao_gongchayaoqiu: this.cnc_suliao_gongchayaoqiu,//公差要求集合
    //             cnc_suliao_gongchayaoqiu_value: this.cnc_suliao_gongchayaoqiu[0].paramContent,//默认公差要求值
    //             cnc_suliao_gongya: this.cnc_suliao_gongya,//攻牙集合
    //             cnc_suliao_gongya_value: this.cnc_suliao_gongya[0].paramContent,//默认攻牙值
    //             cnc_suliao_qianjian: this.cnc_suliao_qianjian,//嵌件集合
    //             cnc_suliao_qianjian_value: this.cnc_suliao_qianjian[0].paramContent,//默认嵌件值

    //             // 供应商 sup 数据
    //             cnc_suliao_supPrice:0,
    //             cnc_suliao_supMaterialCost:0,
    //             cnc_suliao_supTotal:0,
    //             cnc_suliao_supCNCWorkingHours:0,
    //             cnc_suliao_supManualWorkingHours:0,

    //             // 表面处理
    //             cnc_suliao_postprocessingFee:0,
    //             cnc_suliao_postprocessingTotalFee:0,
    //             cnc_suliao_supPostprocessingFee:0,
    //             cnc_suliao_supPostprocessingTotalFee:0,


    //             cnc_suliao_number: 1,//数量
    //             cnc_suliao_beizhu: '',//备注
    //             cnc_suliao_price: 0,//单价
    //             cnc_suliao_allprice: 0,//总价
    //             cnc_suliao_weight: 0,//重量
    //             cnc_suliao_tiji: 0,//体积（通过重量反推）
    //             cnc_suliao_zuidijia: 0,//最低价
    //             cnc_suliao_isminimum: '最低价',//是否最低价（第一次默认最低价）
    //             // cnc_suliao_isminimum:'',//是否最低价（第一次默认最低价）
    //             cnc_suliao_isfirst: '第一次上传',//是否第一次报价请求
    //             cnc_suliao_2dimg: '',//2D缩略图


    //             //复模
    //             fumo_ischeck: true,//默认选中状态
    //             fumo_guimocailiao: this.fumo_guimocailiao,//硅膜材料集合
    //             fumo_guimocailiao_value: this.fumo_guimocailiao[0].materialName,//硅膜材料值
    //             fumo_guimocailiao_valueid: this.fumo_guimocailiao[0].id,//硅膜材料ID
    //             fumo_guanzhucailiao: this.fumo_guanzhucailiao,//灌注材料集合

    //             fumo_guanzhucailiao_class: this.fumo_guanzhucailiao[0].materialEnglishName,//英文灌注材料
    //             fumo_guanzhucailiao_value: this.fumo_guanzhucailiao[0].materialName,//灌注材料值
    //             fumo_guanzhucailiao_valueid: this.fumo_guanzhucailiao[0].id,//灌注材料值ID

    //             fumo_yuanxingcailiao: this.fumo_yuanxingcailiao,//原型材料集合
    //             fumo_yuanxingcailiao_value: this.fumo_yuanxingcailiao[0].materialName,//原型材料值
    //             fumo_yuanxingcailiao_valueid: this.fumo_yuanxingcailiao[0].id,//原型材料ID

    //             fumo_face_guanzhu: this.fumo_face_guanzhu,//默认表面处理集合（可能随材料改变而改变,默认为第一个材料的表面处理）
    //             // cnc_suliao_face_value: this.cnc_jinshu_face[0].surfaceName,// 默认表面处理值
    //             fumo_face_guanzhu_values: [
    //             {
    //                 "id": this.fumo_face_guanzhu[0].id,//表面处理ID
    //                 "surfaceName": this.fumo_face_guanzhu[0].surfaceName,//表面处理名称
    //                 "surfaceEnglishName": this.fumo_face_guanzhu[0].surfaceEnglishName//英文表面处理名称
    //             }
    //             ],//可以添加多种表面处理
    //             fumo_face_guanzhu_select:[{}],
    //             fumo_yuanxingyaoqiu: this.fumo_yuanxingyaoqiu,//原型要求集合
    //             fumo_yuanxingyaoqiu_value: this.fumo_yuanxingyaoqiu[0].paramContent,//原型要求值
    //             fumo_jiaoqi: this.fumo_jiaoqi,//交期集合
    //             fumo_jiaoqi_value: this.fumo_jiaoqi[0].paramContent,//默认交期值
    //             fumo_chanpinjiegou: this.fumo_chanpinjiegou,//交期集合
    //             fumo_chanpinjiegou_value: this.fumo_chanpinjiegou[0].paramContent,//默认交期值
    //             fumo_gongchayaoqiu: this.fumo_gongchayaoqiu,//公差要求集合
    //             fumo_gongchayaoqiu_value: this.fumo_gongchayaoqiu[0].paramContent,//默认公差要求值

    //             // 供应商 sup 数据
    //             fumo_supManualWorkingHours:0, //
    //             fumo_supMaterialCost:0,
    //             fumo_supPrice:0,
    //             fumo_supPrototypePrice:0,
    //             fumo_supTotalPriceOfFilling:0,
    //             fumo_supTotal:0,
    //             fumo_supTotalMoldPrice:0,
    //             fumo_supMoldCost:0,

    //             fumo_number: 1,//数量
    //             fumo_beizhu: '',//备注
    //             fumo_price: 0,//单价
    //             fumo_allprice: 0,//产品总价
    //             fumo_totalPrice: 0,//总价
    //             fumo_yuanxingprice: 0,//原型价格
    //             fumo_mojvprice: 0,//模具总价
    //             fumo_guanzhuprice: 0,//灌注总价
    //             fumo_weight: 0,//重量
    //             fumo_tiji: 0,//体积（通过重量反推）
    //             fumo_zuidijia: 0,//最低价
    //             fumo_isminimum: '最低价',//是否最低价（第一次默认最低价）
    //             // fumo_isminimum:'',//是否最低价（第一次默认最低价）
    //             fumo_isfirst: '第一次上传',//是否第一次报价请求
    //             fumo_2dimg: '',//2D缩略图


    //             //快速模具
    //             fast_ischeck: true,//默认选中状态

    //             fast_mupeicailiao: this.fast_mupeicailiao,//模胚材料集合
    //             fast_mupeicailiao_value: this.fast_mupeicailiao[0].materialName,//模胚材料值（默认第一个）

    //             fast_mupeicailiao_length: 0,//模胚长
    //             fast_mupeicailiao_width: 0,//模胚宽
    //             fast_mupeicailiao_height: 0,//模胚高

    //             fast_mupeicailiao_valueid: this.fast_mupeicailiao[0].id,//模胚材料值ID（默认第一个）
    //             fast_chanpincailiao: this.fast_chanpincailiao,//产品材料集合

    //             fast_chanpincailiao_class: this.fast_chanpincailiao[0].materialEnglishName,//英文灌注材料

    //             fast_chanpincailiao_value: this.fast_chanpincailiao[0].materialName,//产品材料值（默认第一个）
    //             fast_chanpincailiao_valueid: this.fast_chanpincailiao[0].id,//产品材料值id（默认第一个）
    //             fast_murencailiao: this.fast_murencailiao,//模仁材料集合
    //             fast_murencailiao_value: this.fast_murencailiao[0].materialName,//模仁材料值（默认第一个）
    //             fast_murencailiao_valueid: this.fast_murencailiao[0].id,//模仁材料值（默认第一个）

    //             fast_chanpinbiaomian: this.fast_chanpinbiaomian,//产品表面集合
    //             fast_chanpinbiaomian_values: [
    //             {
    //                 "id": this.fast_chanpinbiaomian[0].id,//表面处理ID
    //                 "surfaceName": this.fast_chanpinbiaomian[0].surfaceName,//表面处理名称
    //                 "surfaceEnglishName": this.fast_chanpinbiaomian[0].surfaceEnglishName//英文表面处理名称
    //             }
    //             ],//可以添加多种表面处理

    //             fast_chanpinjiegou: this.fast_chanpinjiegou,//产品结构集合
    //             fast_chanpinjiegou_value: this.fast_chanpinjiegou[0].paramContent,//产品结构值（默认第一个）
    //             fast_gongchayaoqiu: this.fast_gongchayaoqiu,//公差要求集合
    //             fast_gongchayaoqiu_value: this.fast_gongchayaoqiu[0].paramContent,//公差要求值（默认第一个）
    //             fast_jinjiaoleixing: this.fast_jinjiaoleixing,//进胶类型集合
    //             fast_jinjiaoleixing_value: this.fast_jinjiaoleixing[0].paramContent,//进胶类型值（默认第一个）
    //             fast_chanpinyanse: this.fast_chanpinyanse,//产品颜色集合
    //             fast_chanpinyanse_value: this.fast_chanpinyanse[0].paramContent,//产品颜色值（默认第一个）
    //             fast_mupeileixing: this.fast_mupeileixing,//模胚类型集合
    //             fast_mupeileixing_value: this.fast_mupeileixing[0].paramContent,//模胚类型值（默认第一个）
    //             fast_hangweigeshu: this.fast_hangweigeshu,//行位个数集合
    //             fast_hangweigeshu_value: this.fast_hangweigeshu[0].paramContent,//行位个数值（默认第一个）
    //             fast_xiedinggeshu: this.fast_xiedinggeshu,//斜顶个数集合
    //             fast_xiedinggeshu_value: this.fast_xiedinggeshu[0].paramContent,//斜顶个数值（默认第一个）
    //             fast_shoudongxiangjian: this.fast_shoudongxiangjian,//手动镶件集合
    //             fast_shoudongxiangjian_value: this.fast_shoudongxiangjian[0].paramContent,//手动镶件值（默认第一个）
    //             fast_xueshu: this.fast_xueshu,//穴数集合
    //             fast_xueshu_value: this.fast_xueshu[0].paramContent,//穴数值（默认第一个）
    //             fast_jiaoqi: this.fast_jiaoqi,//交期集合
    //             fast_jiaoqi_value: this.fast_jiaoqi[0].paramContent,//交期值（默认第一个）
    //             fast_mujvshouming: this.fast_mujvshouming,//模具寿命集合
    //             fast_mujvshouming_value: this.fast_mujvshouming[0].paramContent,//模具寿命值（默认第一个）
    //             fast_rezuigeshu: this.fast_rezuigeshu,//热嘴个数集合
    //             fast_rezuigeshu_value: this.fast_rezuigeshu[0].paramContent,//热嘴个数值（默认第一个）
                
    //             fast_kp_mj_material_cost:0,//快速模具模具材料费
    //             fast_kp_mr_material_cost:0, //快速模具模仁材料费
    //         fast_kp_mp_material_cost:0,//快速模具模胚材料费
    //         fast_kp_tl_material_cost:0,//快速模具铜料费
    //         fast_kp_accessories_cost:0,//快速模具配件费
    //         fast_kp_process_cost:0,//快速模具加工费
    //         fast_kp_design_cost:0, //快速模具设计费
    //         fast_kp_moletest_cost:0,//快速模具试模费
    //         fast_kp_moldLabor_cost:0, //快速模具配模人工费
    //         fast_kp_other_cost:0, //快速模具其他费
    //         fast_local_path:""    ,     //本地路径',
    //         fast_kp_hole_depth :0  ,//深孔钻深度(米),
    // fast_kp_hole_depth_cost :0  , //深孔钻深度金钱,
    // fast_kp_wedm_time :0    ,  //线切割时间(h)',
    // fast_kp_wedm_cost :0   ,         // '线切割金钱',
    // fast_kp_grinder_time :0  ,   //磨铣床时间(h),
    // fast_kp_grinder_cost :0     ,   // 磨铣床金钱',
    // fast_kp_cncprocess_time:0  ,        //cnc加工时间',
    // fast_kp_cncprocess_cost:0  , // cnc加工费',
    // fast_kp_edm_time:0 , // 'EDM时间',
    // fast_kp_edm_cost:0  , // EDM金额,
    // fast_kp_surface_time:0  ,  //'表面处理时间',
    // fast_kp_surface_cost:0 ,  //表面处理费用',
    // fast_kp_moletest_time:0 ,  //'试模时间',
    // fast_kp_moldLabor_time:0  ,  //模具人工费时间',
    // fast_kp_kp_design_time:0,   // 设计时长

    //             // 供应商 sup 数据
    //             fast_supManualWorkingHours:0, //
    //             fast_supMaterialCost:0,
    //             fast_supMoldCost:0,
    //             fast_supPrice:0,
    //             fast_supTotal:0,

    //             fast_number: 1,//数量
    //             fast_beizhu: '',//备注
    //             fast_price: 0,//单价
    //             fast_allprice: 0,//总价
    //             fast_weight: 0,//重量
    //             fast_mojvprice: 0,
    //             fast_tiji: 0,//体积（通过重量反推）
    //             fast_zuidijia: 0,//最低价
    //             fast_isminimum: '最低价',//是否最低价（第一次默认最低价）
    //             // fast_isminimum:'',//是否最低价（第一次默认最低价）
    //             fast_isfirst: '第一次上传',//是否第一次报价请求
    //             fast_2dimg: '',//2D缩略图


    //         });
      },
      /*********oss数据子组件传值(已上传的文件队列)-----结束***********/
      
      /*********无3D图纸上传------开始********* */
        /**弹出无3D上传对话框**/
      noDrawingoffer(){

         this.$request.post('/salordmain/showOrderDetailsById', {
          ids: "301acaa5b9974e33935ac14098e7058b"
        }).then(res => {
          console.log(res)    //请求成功方法，data为请求成功返回的数据
          if (res.code == 0) {
            window.open(res.obj);
          }
        }).catch(e => {
          console.log("错误")
        })


        // this.dialogNot3D=true;
        // this.no3DdialogEmpty();
      },

        /**清空无3D图纸上传对话框*/
       no3DdialogEmpty(){
                /***清空(知道材料，重量) */
            this.no3DknowMaterial.no_drawing_name="";
            this.no3DknowMaterial.no_drawing_length="";
            this.no3DknowMaterial.no_drawing_width="";
            this.no3DknowMaterial.no_drawing_height="";
            this.no3DknowMaterial.no_drawing_weight="";
            this.no3DknowMaterial.no_drawing_material="";
            this.no3DknowMaterial.no_drawing_imgUrl=comm.no3DImg;     //给一张图片
            console.log(this.no3DknowMaterial.no_drawing_imgUrl)

                /***清空(知道材料，重量) */
            this.no3DknowVolumn.no_drawing_name_="";
            this.no3DknowVolumn.no_drawing_length_="";
            this.no3DknowVolumn.no_drawing_width_="";
            this.no3DknowVolumn.no_drawing_height_="";
            this.no3DknowVolumn.no_drawing_volumn_="";
            this.no3DknowVolumn.no_drawing_imgUrl_=comm.no3DImg;    //给一张图片
       },

        /**无3D上传对话框---确定功能**/
      dialogNot3Dsave(){

        this.dialogNot3D=false;
      },

        /**无3D图纸对话框----选择上传类型（知道材料----1，知道体积----2）*/
      selectNo3DFun(itemValues){
        this.titleFlg = itemValues;
      },

      /*********无3D图纸上传------结束********* */

       /***------------获取加工参数的请求方法-----（开始）----------------**/
            // 3d加工方式参数列表
            getquoteprarmeter() {
              // getReturnVOByWorkType
              this.$request.post('/autoQuote/getReturnVOByWorkType', {}).then(res => {
                console.log(res)    //请求成功方法，data为请求成功返回的数据
                if (res.code == 0) {
                  console.log("=================")
                  this.EmployeeList = res.obj;
                }
              }).catch(e => {
                console.log("错误")
              })
            },
        /***------------获取加工参数的请求方法-----（结束）----------------**/


    },
    created() {
        /**页面加载时，获取参数集合数据------开始--------------------****/ 
        this.getQuoteType();
        this.getquoteprarmeter();
        /***页面加载时，获取参数集合数据------结束--------------------*****/ 
       
    },
    mounted() {
        
    },
    components:{
        upload,uploadImg,uploadAll,uploadItem
    },
    watch: {
        
    }
  
}