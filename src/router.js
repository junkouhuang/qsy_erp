import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
   // 首页
   {
      path: '/',
      name: 'home',
      meta: {name: 'home'},
      component: () => import('@/views/home/Home.vue')
    },
     // 首页
    {
      path: '/homepage',
      name: 'homepage',
      meta: {name: 'homepage'},
      component: () => import('@/views/homePage/homePage.vue')
    },
    // 登录
    {
      path: '/login',
      name: 'home',
      component: import('@/views/login/Login.vue')
    },
    // 自动报价
    {
      path: '/quotation',
      name: 'quotation',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/AutomatedQuotation/AutomatedQuotations')
    },
    // 请假
    {
      path: '/askForLeave',
      name: 'askForLeave',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/hrEmployee/askForLeave')
    },
    // 外出登记
    {
      path: '/goOutCheckIn',
      name: 'goOutCheckIn',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/hrEmployee/goOutCheckIn')
    },
    // 人事档案
    {
      path: '/personnelFiles',
      name: 'personnelFiles',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/hrEmployee/personnelFiles')
    },
    // 汇率
    {
      path: '/exchangeRateMaintain',
      name: 'exchangeRateMaintain',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/exchangeRateMaintain/exchangeRateMaintain')
    },
    // 材料维护
    {
      path: '/materialMaintain',
      name: 'materialMaintain',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/materialMaintain/materialMaintain')
    },
    //窗体设置
    {
      path: '/formSet',
      name: 'formSet',
      meta: {},
      component: () => import('@/views/MenuOperation/formSet')
    },
    //角色和权限设置
    {
      path: '/roleSet',
      name: 'roleSet',
      meta: {},
      component: () => import('@/views/MenuOperation/roleAuthoritySet')
    },
    // 客户关系管理
    {
      path: '/sales/crm',
      name: 'CustomerRelationship',
      meta: {},
      component: () => import( './views/CustomerRelationship/CustomerRelationship')
    },
    // 订单详情
    {
      path: '/OrderDetails',
      name: 'OrderDetails',
      meta: {},
      component: () => import('./views/CustomerRelationship/OrderDetails')
    },
    // 发送邮件
    {
      path: '/SendEmails',
      name: 'SendEmails',
      meta: {},
      component: () => import( './views/CustomerRelationship/SendEmails')
    },
    // 发送短信
    {
      path: '/SendNote',
      name: 'SendNote',
      meta: {},
      component: () => import( './views/CustomerRelationship/SendNote')
    },
     // 订单汇总表
    {
      path: '/orderSummaryTable',
      name: 'orderSummaryTable',
      meta: {},
      component: () => import( './views/CustomerRelationship/components/OrderDetailsData.vue')
    },
    // 订单流程主页面
    {
      path: '/orderFlow',
      name: 'orderFlow',
      meta: {},
      component: () => import( '@/views/orderFlow/orderFlow'),
      children: [
        //询价抢单
        {
          path: '/inquiryGrab',
          name: 'inquiryGrab',
          meta: {},
          component: () => import('@/views/salQuotation/inquiryOrder')
        },
        // 客户询价
        {
          path: '/customerInquiry',
          component: () => import('@/views/salQuotation/customerInquiry')
        },
        //报价抢单
        {
          path: '/quotationGrab',
          name: 'quotationGrab',
          meta: {},
          component: () => import('@/views/salQuotation/quotationGrab')
        },
        //公司报价
        {
          path: '/quotationCompany',
          name: 'quotationCompany',
          meta: {},
          component: () => import('@/views/salQuotation/quotationCompany')
        },
        //已报客户
        {
          path: '/quotationRequo',
          name: 'quotationRequo',
          meta: {},
          component: () => import('@/views/salQuotation/quotationRequo')
        },
        //订单抢单
        // {
        //   path: '/orderCrab',
        //   name: 'orderCrab',
        //   meta: {},
        //   component: () => import('@/views/salQuotation/orderCrab')
        // },
        //生产
        {
          path: '/manufacture',
          name: 'manufacture',
          meta: {},
          component: () => import('@/views/salQuotation/manufacture')
        },
        //跟单收货
        {
          path: '/quotationRequo',
          name: 'quotationRequo',
          meta: {},

        },
        //品检
        {
          path: '/qualityCheck',
          name: 'qualityCheck',
          meta: {},
          component: () => import('@/views/salQuotation/qualityChecks')
        },

      ]
    },
     // 生产商管理
    {
      path: '/manufacturerManage',
      name: 'manufacturerManage',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */ '@/views/manufacturerManage/manufacturerManage')
    },
    //生产商管理里面的设备维护
    {
      path: '/facilities',
      name: 'facilities',
      meta: {},
      component: () => import('@/views/manufacturerManage/facilities')
    },
    //产能对比
    {
      path: '/capacityComparison',
      name: 'capacityComparison',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */'@/views/manufacturerManage/capacityComparison')
    },
    //生产上面的设备维护
    {
      path: '/facilitiesMaintenance',
      name: 'facilitiesMaintenance',
      meta: {},
      component: () => import(/* webpackChunkName: "about" */'@/views/facilitiesMaintenance/facilitiesMaintenance')
    },
       //每日存量维护
       {
        path: '/dailyInventoryMaintenance',
        name: 'dailyInventoryMaintenance',
        meta: {},
        component: () => import(/* webpackChunkName: "about" */'@/views/dailyInventoryMaintenance/dailyInventoryMaintenance')
      },
      //每日工作记录
      {
        path: '/salesDailywork',
        name: 'salesDailywork',
        meta: {},
        component: () => import(/* webpackChunkName: "about" */'@/views/salesDailywork/salesDailywork')
      },
      //每日问题反馈
      {
        path: '/dailyProblemFeedback',
        name: 'dailyProblemFeedback',
        meta: {},
        component: () => import(/* webpackChunkName: "about" */'@/views/dailyProblemFeedback/dailyProblemFeedback')
      },
      //供应商------询价
      {
        path: '/supplierInquiry',
        name: 'supplierInquiry',
        meta: {},
        component: () => import('@/views/InquiryOrder/supplierInquiry')
      },

      // 信息列表夜
      {
        path: '/info',
        name: 'info',
        meta: {},
        component: () => import(/* webpackChunkName: "about" */'@/views/InfoPage/info')
      },
        //收款录入
        {
          path: '/receiptEntry',
          name: 'receiptEntry',
          meta: {},
          component: () => import(/* webpackChunkName: "about" */'@/views/receiptEntry/receiptEntry')
        },
        // 收款查看
        {
          path: '/creditCheck',
          name: 'creditCheck',
          meta: {},
          component: () => import(/* webpackChunkName: "about" */'@/views/creditCheck/creditCheck')
        },
        // 付款录入
        // {
        //   path: '/paymentType',
        //   name: 'paymentType',
        //   meta: {},
        //   component: () => import(/* webpackChunkName: "about" */'@/views/paymentType/paymentType')
        // },




  ]
})
