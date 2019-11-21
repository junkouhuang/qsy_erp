//  请求方法封装
import axios from 'axios'

const comFun = {}
// 获取发送消息下拉列表
comFun.getTypeFun = function () {
    return axios.post('/sysbasicinfo/getBasInfo', {parentCode: 'MsgCate'})
}
// 获取 发送消息发送人下拉列表
comFun.getPeronFun = function () {
    return axios.post('/adminUser/listUserErp', {status: '1'})
}

export default comFun
