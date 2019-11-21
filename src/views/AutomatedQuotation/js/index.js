// 解决一些处理的数据的问题哦的封装函数
function addThrDValueFun (val, url, list, type) {
    let obj = {
        draType: 'tab0', // 实现拖拽时候需要用到来判断是哪一个数据改变
        pirct3Did: val.id, // id数据唯一关键值(3d图ID)
        numIndex: list.length + 1, // 序号
        localPath: '', // 弹窗cansas会用到
        url: url, // 路径图
        picture: url, // 缩略图
        url_img: url, // 3d用于显示的
        filePath:val.name, // 名字
        specification: '', // 规格
        rowFlag: '', // 合并ID
        amount: '1', // 数量
        assess: '', // 评估
        remke: '', // 备注
        operation: true, // 操作
        name: val.name, // 名字
        height: 0, // 高
        width: 0, // 宽
        long: 0, // 长
        weight: 0, // 重量
        craft3d: '', // 3d工艺
        craftThrName: '', // 3d工艺名
        materials3d: '', // 3d材料
        masterThrName: '', // 3D 材料名称
        surfaceOne: '', // 表面处理1
        surfaceOneName: '', // 表面处理1名
        surfaceTwo: '', // 表面处理2
        surfaceTwoName: '', // 表面处理2名
        surfaceThr: '', // 表面处理3
        surfaceThrName: '', // 表面处理3名
        surface3DListOne: [],
        surface3DListTwo: [],
        surface3DListThr: [],
        offterTotal: '', // 报价总价
        offterPrice: '', // 报价单价
        proDate: '', // 生产周期
        proTime: '', // 单间工时
        handicraftsTime: '', // 手工工时
        fileList: [], // 附件列表
        edit: false, // 是否勾选中
        loaGif: false, // 是否回调数据完毕
        caozuoFlag: true, // 是否可以操作
        btnDefaFlag1: false, // 删除按钮是否点击过；
        btnDefaFlag2: false, // 复制按钮是否点击过；
        btnDefaFlag3: false, // 向下应用按钮是否点击过；
        btnDefaFlag4: false, // 上传附件按钮是否点击过;
        btnDefaFlag5: false, // 物性表按钮是否点击过；
        getOneAjax: 1,
        no3DImg: 0 // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
    }
    let obj1 = {
        draType: 'tab1', // 实现拖拽时候需要用到来判断是哪一个数据改变
        pirct3Did: val.id, // id数据唯一关键值(3d图ID)
        numIndex: list.length + 1, // 序号
        localPath: '', // 弹窗cansas会用到
        url: url, // 路径图
        url_img: url, // 3d用于显示的
        filePath:val.name, // 名字
        picture: url, // 缩略图
        id: 123, // id数据唯一关键值
        specification: '', // 规格
        rowFlag: '', // 合并ID
        amount: '1', // 数量
        assess: '', // 评估
        remke: '', // 备注 q
        operation: true, // 操作
        name: val.name, // 名字
        height: 0, // 高
        width: 0, // 宽
        long: 0, // 长
        weight: 0, // 重量
        craft3d: '', // CNC金属工艺
        craftThrName: '', // 3d工艺名
        materials3d: '', // CNC金属材料
        masterThrName: '', // 3D 材料名称
        piecemeal: '', // 拆件
        machinePage: '', // 加工面数
        difficulty: '', // 难度系数
        difficultyName: '', // 难度系数名
        tapping: 0, // 攻牙
        tolerance: '', // 公差
        sparkList: [], // 打火花或者切割线
        inserts: 0, // 嵌件
        surfaceOne: '', // 表面处理1
        surfaceTwo: '', // 表面处理2
        surfaceThr: '', // 表面处理3
        offterTotal: '', // 报价总价
        offterPrice: '', // 报价单价
        proDate: '', // 生产周期
        proTime: '', // 单间工时
        handicraftsTime: '', // 手工工时
        fileList: [], // 附件列表
        loaGif: false, // 是否回调数据完毕
        edit: false, // 是否勾选中
        btnDefaFlag1: false, // 删除按钮是否点击过；
        btnDefaFlag2: false, // 复制按钮是否点击过；
        btnDefaFlag3: false, // 向下应用按钮是否点击过；
        btnDefaFlag4: false, // 上传附件按钮是否点击过;
        btnDefaFlag5: false, // 物性表按钮是否点击过；
        getOneAjax: 1,
        no3DImg: 0  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
    }
    let obj2 = {
        draType: 'tab2', // 实现拖拽时候需要用到来判断是哪一个数据改变
        fileList: [], // 附件列表
        pirct3Did: val.id, // id数据唯一关键值(3d图ID)
        numIndex: list.length + 1, // 序号
        localPath: '', // 弹窗cansas会用到
        url: url, // 路径图
        url_img: url, // 3d用于显示的
        filePath:val.name, // 名字
        picture: url, // 缩略图
        name: val.name, // 名字
        id: 123, // id数据唯一关键值
        specification: '', // 规格
        rowFlag: '', // 合并ID
        amount: 1, // 数量
        assess: '', // 评估
        remke: '', // 备注 q
        operation: true, // 操作
        height: 0, // 高
        width: 0, // 宽
        long: 0, // 长
        weight: 0, // 重量
        craft3d: '', // 3d工艺
        craftThrName: '', // 3d工艺名
        materials3d: '', // 3d材料
        masterThrName: '', // 3D 材料名称
        piecemeal: '', // 拆件
        machinePage: '', // 加工面数
        difficulty: '', // 难度系数
        difficultyName: '', // 难度系数名
        tapping: 0, // 攻牙
        tolerance: '', // 公差
        inserts: 0, // 嵌件
        surfaceOne: '', // 表面处理1
        surfaceTwo: '', // 表面处理2
        surfaceThr: '', // 表面处理3
        offterTotal: '', // 报价总价
        offterPrice: '', // 报价单价
        proDate: '', // 生产周期
        proTime: '', // 单间工时
        handicraftsTime: '', // 手工工时
        edit: false, // 是否勾选中
        loaGif: false, // 是否回调数据完毕
        btnDefaFlag1: false, // 删除按钮是否点击过；
        btnDefaFlag2: false, // 复制按钮是否点击过；
        btnDefaFlag3: false, // 向下应用按钮是否点击过；
        btnDefaFlag4: false, // 上传附件按钮是否点击过;
        btnDefaFlag5: false, // 物性表按钮是否点击过；
        getOneAjax: 1,
        no3DImg: 0  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
    }
    let obj3 = {
        draType: 'tab3', // 实现拖拽时候需要用到来判断是哪一个数据改变
        fileList: [], // 附件列表
        pirct3Did: val.id, // id数据唯一关键值(3d图ID)
        numIndex: list.length + 1, // 序号
        localPath: '', // 弹窗cansas会用到
        url: url, // 路径图
        url_img: url, // 3d用于显示的
        filePath:val.name, // 名字
        picture: url, // 缩略图
        name: val.name, // 名字
        id: 123, // id数据唯一关键值
        specification: '', // 规格
        rowFlag: '', // 合并ID
        amount: 1, // 数量
        assess: '', // 评估
        remke: '', // 备注 q
        operation: true, // 操作
        height: 0, // 高
        width: 0, // 宽
        long: 0, // 长
        weight: 0, // 重量
        craft3d: '', // 工艺
        craftThrName: '', // 工艺名称
        materials3d: '', // 灌注材料
        materials3dName: '', // 灌注材料名称
        promaterials: '', // 原型材料
        promaterialsName: '', // 原型材料名称
        promaterialsLsit: [], // 原型材料List
        Silicon: '', // 硅模材料
        SiliconName: '', // 硅模材料名称
        machinePage: '', // 加工面数
        difficulty: '', // 难度系数
        difficultyName: '', // 难度系数名
        tapping: 0, // 攻牙
        tolerance: '', // 公差
        surfaceOne: '', // 表面处理1
        surfaceTwo: '', // 表面处理2
        surfaceThr: '', // 表面处理3
        surfaceOneName: '', // 表面处理名1
        surfaceTwoName: '', // 表面处理名2
        surfaceThrName: '', // 表面处理名3
        proTotal: '', // 原型总价
        moldTotal: '', // 模具总价
        pourPrice: '', // 灌注单价
        offterTotal: '', // 报价总价
        proDate: '', // 生产周期
        proTime: '', // 单间工时
        handicraftsTime: '', // 手工工时
        edit: false, // 是否勾选中
        loaGif: false, // 是否回调数据完毕
        btnDefaFlag1: false, // 删除按钮是否点击过；
        btnDefaFlag2: false, // 复制按钮是否点击过；
        btnDefaFlag3: false, // 向下应用按钮是否点击过；
        btnDefaFlag4: false, // 上传附件按钮是否点击过;
        btnDefaFlag5: false, // 物性表按钮是否点击过；
        getOneAjax: 1,
        no3DImg: 0  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
    }
    let obj4 = {
        draType: 'tab4', // 实现拖拽时候需要用到来判断是哪一个数据改变
        fileList: [], // 附件列表
        pirct3Did: val.id, // id数据唯一关键值(3d图ID)
        numIndex: list.length+1, // 序号
        localPath: '', // 弹窗cansas会用到
        url: url, // 路径图
        url_img: url, // 3d用于显示的
        filePath:val.name, // 名字
        picture: url, // 缩略图
        name: val.name, // 名字
        id: 123, // id数据唯一关键值
        specification: '', // 规格
        rowFlag: '', // 合并ID
        amount: 1, // 数量
        assess: '', // 评估
        remke: '', // 备注 q
        operation: true, // 操作
        height: 0, // 高
        width: 0, // 宽
        long: 0, // 长
        volume: '', // 体积
        weight: 0, // 重量
        difficulty: '', // 产品结构
        difficultyName: '', // 产品结构名
        glueType: '', // 进胶类型
        surfaceOne: '', // 表面处理1
        surfaceOneName: '', // 表面处理名字
        tolerance: '', // 公差
        holeNum: '', // 穴数
        hotNum: '', // 热嘴个数
        productMaterials: '', // 产品材料
        productMaterialsName: '', // 产品材料名称
        productColor: '', // 产品颜色
        moldCore: '', // 模仁材料
        moldCoreName: '', // 模仁材料名称
        dieBlank: '', // 模坯材料
        dieBlankName: '', // 模坯材料名
        lifetime: '', // 模具寿命
        delivery: '', // 交期
        dieBlankType: '', // 模坯类型
        rowNum: '', // 行位个数
        tiltNum: '', // 斜顶个数
        inserts: '', // 手动嵌件
        proAmount: '1', // 产品数量
        proPrice: '', // 产品单价
        proTotal: '', // 产品总价
        moldAmout: '1', // 模具数量
        moldPrice: '', // 模具单价
        moldTotal: '', // 模具总价
        total: '', // 总价
        mergeTotal: '', // 合并后的总价
        mergeModePrice: '', // 合并后的模具单价
        mergeModeTotal: '', // 合并后的模具总价
        edit: false, // 是否勾选中
        loaGif: false, // 是否回调数据完毕
        btnNoshow: false, // 是否不显示按钮
        btnDefaFlag1: false, // 删除按钮是否点击过；
        btnDefaFlag2: false, // 复制按钮是否点击过；
        btnDefaFlag3: false, // 向下应用按钮是否点击过；
        btnDefaFlag4: false, // 上传附件按钮是否点击过;
        btnDefaFlag5: false, // 物性表按钮是否点击过；
        getOneAjax: 1,
        no3DImg: 0  // 0 为3D图纸   1：无图纸知道材料重量  2：为知道体积
    }
    if (type === 0) {
        return obj
    } else if (type === 1) {
        return obj1
    } else if (type === 2) {
        return  obj2 
    } else if (type === 3) {
        return obj3
    } else if (type === 4) {
        return obj4
    }
}

let common = {
    addThrDValueFun
}

export default common