import Axios from 'axios'
import Cookies from 'js-cookie'
import Vue from 'vue'
import router from '../router'

export var baseURL = ''
import {Message} from 'element-ui'

Vue.prototype.$Message = Message
if (process.env.NODE_ENV === 'development') {
  // baseURL = 'http://192.168.181.59:9258' // 罗丹珠
  //  baseURL = 'http://192.168.10.14:9259' //服务器
  // baseURL = 'http://192.168.10.19:9259' //服务器
  //baseURL = 'http://192.168.181.59:9258' // 罗丹珠
  //  baseURL = 'http://192.168.10.14:9259' //服务器
  baseURL = 'http://192.168.181.19:9259'

  // baseURL = "http://192.168.181.51:8187"  // 杨善培
  // baseURL = 'http://192.168.181.51:9259'
  // baseURL = "http://192.168.181.51:8187" //服务器
  // baseURL = 'http://bosserp.qsy3d.com/'
 // baseURL = 'http://192.168.181.19:9258'
} else if (process.env.NODE_ENV === 'production') {
  // baseURL = 'http://192.168.181.51:8184'47.106.92.209
  // baseURL = 'http://47.106.92.209:8090'
  // baseURL = 'http://bosserp.qsy3d.com'
  baseURL = 'http://192.168.181.19:9259'
// baseURL = process.env.VUE_APP_BASE_URL // 生产环境
}

Axios.defaults.timeout = 20000
Axios.defaults.baseURL = baseURL
Axios.interceptors.request.use(config => {
  Axios.defaults.headers['token'] = Cookies.get('TOKEN')
  return config
})

Axios.interceptors.response.use(response => {
  // console.log(response)
  if ((response.status >= 200 && response.status < 300) || response.status === 304) {
    if (response.data.code === '200') {
      return response.data
    } else if (response.data.code === '401' || response.data.code === '601' || response.data.code == '40') {
      // 没有权限从定向
      // Vue.prototype.$Message.error({
      //   content: '你没有当前使用权限',
      //   onClose () {
      //     Vue.prototype.$axios.post(httpHost.api + '/logout').then(res => {
      //       window.location.href = '#/login'
      //     }).catch(err => {
      //       console.log(JSON.stringify(err))
      //     })
      //   }
      // })
      // Vue.prototype.$Message.error({

      // })
      router.push('/login')
      Cookies.remove('TOKEN')
    } else if (response.data.code === '9999' || response.data.code === 9999) {
      Vue.prototype.$Message.error(response.data.msg)
    }
    return response.data
  }
  return Promise.reject(new Error(response.status))
}, error => {
  if (error && error.response) {
    const errorText = {
      '400': '错误请求',
      '401': '未授权，请联系管理授权',
      '403': '拒绝访问',
      '404': '请求错误,未找到该资源',
      '405': '请求方法未允许',
      '408': '请求超时',
      '500': '服务器端出错',
      '502': '网络错误',
      '504': '网络超时',
      '601': '没有权限'
    }
    error.message = errorText[error.response.status] || `连接错误${error.response.status}`
  } else {
    error.message = '连接到服务器失败'
  }
  if (error.response.status === 401 || error.response.status === 601 || error.response.status === '40') {
    // 没有权限重定向
    // Vue.prototype.$Message.error({
    //   content: '你没有当前使用权限',
    //   onClose () {
    //     Vue.prototype.$axios.post(httpHost.api + '/logout').then(res => {
    //       window.location.href = '#/login'
    //     }).catch(err => {
    //       console.log(JSON.stringify(err))
    //     })
    //   }
    // })
    // window.location.href = '/#/'
    router.push('/login')
    Cookies.remove('TOKEN')
    // this.$Message.destroy()
  } else if (error.response.status === 403 || error.response.status == '40') {
    // 页面超时定向
    // Vue.prototype.$Message.error({
    //   content: '页面超时，请重新登录！',
    //   onClose () {
    //     Vue.prototype.$axios.post(httpHost.api + '/logout').then(res => {
    //       window.location.href = '#/login'
    //     }).catch(err => {
    //       console.log(JSON.stringify(err))
    //     })
    //   }
    // })
    router.push('/login')
  } else {
    Vue.prototype.$Message.error(error.message)
  }
  return Promise.reject(error)
})
Vue.prototype.$request = Axios