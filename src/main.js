import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueCookies from 'vue-cookies'
// import request from './request/request'
import './assets/css/index.less'
import './request/request'
// import './assets/css/common.css'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import './common/css/common.css'
import './common/css/basic.less'//hjg private css
import 'font-awesome/css/font-awesome.min.css'
// import './assets/js/jquery.js'
// import './assets/js/sockjs.min.js'
// import './assets/js/stomp.min.js'
// import VueDND from 'awe-dnd'

Vue.config.productionTip = false

// Vue.prototype.$request = request
Vue.prototype.$Cookies = Cookies
// Vue.prototype.$mycookies = VueCookies
Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(VueDND)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// //用于判断是否登录了，否则跳转到登录页
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
//     if (sessionStorage.getItem('loginInfo')) {  // 判断当前用户的登录信息loginInfo是否存在
//       next();
//     } else {
//       next({
//         path: '/',
//         query: {
//           fullPath: to.fullPath
//         }
//       })
//     }
//   }else {
//     next();
//   }
// })