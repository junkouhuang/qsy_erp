//  请求方法封装
import axios from 'axios'

const api  = {}
// 获取工艺
api.getTechnologyListFun = function (type) {
    return axios.post('/qt/tech/getTech', {workType: type})
}
// 获取材料(需要通过工艺来获取) IsPlastic 0为金属 1 为塑料
api.getMaterialsListFun = function (craftId, IsPlastic) {
    return  axios.post('/qt/materials/getMaterials', {techId: craftId, boolPlastic: IsPlastic})
}
api.getCncMaterialsFun = function (craftId, IsPlastic) {
    return  axios.post('/qt/materials/getCncMaterials', {techId: craftId, boolPlastic: IsPlastic})
}
// 获取各种要求材料接口 WorkType (10：为快速模具，2：CNC金属； 1：CNC塑料；3：3D打印；4：复模)
// ParamType(lineCount:行位个数; hillCount:穴数 dieLife: 模具寿命 hotCount: 热嘴个数 prototype 原型要求) 模坯类型：mouldBaseType
// 加工面数:faceCount  拆件：splitCount  产品结构:prodMix 公差：tolerance 产品颜色：productColour 进胶类型：gateType 斜顶个数：pentroofCount
api.getMaterialsYQListFun = function (WorkType, ParamType) {
    return axios.post('/qt/paramcontent/getParamList', {workType: WorkType, paramType: ParamType})
}
// 获取表面处理(根据材料ID来) materialsCode=材料Code或者为上一级苗冕处理Code
api.getSurfaceListFun = function (materialsCode) {
    return axios.post ('/qt/materialsfinish/getMaFinish', {materialCode: materialsCode})
}
// 获取复杂度
api.getComplexityFun = function () {
    return axios.get('/qt/facomplexity/getComplexityList')
}
// 获取 复模材料接口
// 灌注材料:pourMa 模仁材料:CaviMa  硅胶材料:SeetMa 模胚材料: MoldMa
api.getModeMaterialListFun = function (type) {
    return axios.post('/qt/materials/getMaterialsType', {materialType: type})
}
// 获取无3D图纸弹窗材料
api.getNoThrDMarter = function () {
    return axios.post('/qt/materials/getMaterNoImage')
}
// 获取3D价格数据
api.getThrPirceFun = function (obj) {
    return axios.post('/salqtdetails/getPrint3D', obj)
}
// 获取金属CNC价格数据
api.getCNCPiceFun = function (obj) {
    return axios.post('/salqtdetails/getCNCMetal', obj)
}
// 获取CNC塑料价格数据
api.getCncSuPiceFun = function (obj) {
    return axios.post('/salqtdetails/getCNCPlastic ', obj)
}
// 获取复模
api.getFumoPiceFun = function (obj) {
    return axios.post('/salqtdetails/getComplexMode ', obj)
}
// 获取快速复模
api.getModelPiceFun = function (obj) {
    return axios.post('/salqtdetails/getRapidMode', obj)
}
// 处理请求报价需要参数的方法
api.getPriceDateValue = function (val, type) {
    console.log(val)
    let objV = {
        attachmentFileid: val.pirct3Did, // 3D文件OSSid
        dimensionX: val.long, // 长
        dimensionY: val.width, // 宽
        dimensionZ: val.height, // 高
        volume: val.tiji, // 体积
        surfaceArea: val.area ? val.area === '' ? 0 : val.area : 0, // 表面积
        partQty: val.amount, //  产品数量
        finishqualityCode: '', // 表面处理两个及两个以上的用,英文逗号拼接
        no3DImg: val.no3DImg
    }
    // 处理表面处理
    if (val.surfaceOne !== '0' && val.surfaceOne !== 0 && val.surfaceOne && val.surfaceOne !== '') {
        objV.finishqualityCode = objV.finishqualityCode + val.surfaceOne
    }
    // 处理表面处理数据
    if (val.surfaceTwo !== '0' && val.surfaceTwo !== 0 && val.surfaceTwo && val.surfaceTwo !== '') {
        if (objV.finishqualityCode === '') {
            objV.finishqualityCode = objV.finishqualityCode + val.surfaceTwo
        } else {
            objV.finishqualityCode = objV.finishqualityCode + ',' + val.surfaceTwo
        }
    }
    if (val.surfaceThr !== '0' && val.surfaceThr !== 0 && val.surfaceThr && val.surfaceThr !== '') {
        if (objV.finishqualityCode === '') {
            objV.finishqualityCode = objV.finishqualityCode + val.surfaceThr
        } else {
            objV.finishqualityCode = objV.finishqualityCode + ',' + val.surfaceThr
        }
    }
    // 处理不同数据
    if (type === 'tab0') { // 3D打印
        objV.partMaterialCode = val.materials3d // 材料编号
    } else if (type === 'tab1' || type === 'tab2') { // CNC金属 或者塑料
        objV.setupsCount = val.machinePage // 加工面数
        objV.splitCount = val.piecemeal // 拆件数
        objV.complexityCode = val.difficulty // 难度系数Code
        objV.threadQty = val.tapping // 攻牙数量
        objV.cncInsertQty =  val.inserts === '' ? 0 : val.inserts // 镶件数量
        objV.tolerance = val.tolerance // 公差的值
    } else if (type === 'tab3') {// 复模
        objV.techId = val.craft3d // 工艺ID
        objV.partMaterialCode = val.materials3d // 灌注材料code
        objV.masterMaterialCode = val.promaterials // 原型材料Code
        objV.moldMaterialCode = val.Silicon // 硅模材料编号Code
        objV.complexityCode = val.difficulty, // 难度系数Code
        objV.threadQty = val.tapping // 攻牙数量
        objV.tolerance = val.tolerance // 公差的值
    } else if (type === 'tab4') { // 快速复模
        // console.log('定位专用')
        objV.partMaterialCode = val.productMaterials // 产品材料code
        objV.masterMaterialCode = val.moldCore // 模仁材料Code
        objV.moldMaterialCode = val.dieBlank // 模胚材料Code
        objV.complexityCode = val.difficulty // 产品结构难度系数Code
        objV.mouldPartColor = val.productColor // 产品颜色
        objV.mouldBaseType = val.dieBlankType // 模胚类型
        objV.mouldSlideCount = val.rowNum // 行位个数
        objV.mouldLifterCount = val.tiltNum // 斜顶个数
        objV.mouldInsertCount = val.inserts === '' ? 0 : val.inserts // 镶件个数
        objV.mouldCavitiesCount = val.holeNum // 穴数
        objV.mouldHotsprueCount = val.hotNum // 热嘴个数
        objV.mouldTimes = val.lifetime // 模具寿命
        objV.tolerance = val.tolerance //  公差的值
        objV.partQty = val.proAmount // 快速模具的产品数量
        objV.moldQty = val.moldAmout // 快速模具数量
        objV.mouldGateType = val.glueType // 进胶类型
    }
    return objV
}
// 处理计算总价的问题
api.getTotalFun = function (arr1, arr2, arr3, arr4, arr5) {
    let total1 = 0
    let total2 = 0
    let total3 = 0
    let total4 = 0
    let total5 = 0
    arr1.forEach(item => {
        if (item.edit === true) {
            total1 = ((total1 - 0) + (item.offterTotal - 0)).toFixed(2)
        }
    })
    arr2.forEach(item => {
        if (item.edit === true) {
            total2 = ((total2 - 0) + (item.offterTotal - 0)).toFixed(2)
        }
    })
    arr3.forEach(item => {
        if (item.edit === true) {
            total3 = ((total3 - 0) + (item.offterTotal - 0)).toFixed(2)
        }
    })
    arr4.forEach(item => {
        if (item.edit === true) {
            total4 = ((total4 - 0) + (item.offterTotal - 0)).toFixed(2)
        }
    })
    arr5.forEach(item => {
        if (item.edit === true) {
            if (item.rowFlag !== '') {
                total5 = ((total5 - 0) + (item.jsTotal - 0)).toFixed(2)
            } else {
                total5 = ((total5 - 0) + (item.total - 0)).toFixed(2)
            }
        }
    })
    return ((total1 - 0) + (total2 -0) + (total3 - 0) + (total4 - 0) + (total5 -0)).toFixed(2)
}
export default api