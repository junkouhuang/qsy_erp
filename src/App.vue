<template>
  <div id="app">
    <header-nav :rowList='rowList' v-if="showHeader"></header-nav>
    <router-view/>
  </div>
</template>
<script>
  import SockJS from  'sockjs-client'
  import Stomp from 'stompjs'
  import HeaderNav from './components/NavBar'
  import Cookies from 'js-cookie'
  import Axios from 'axios'
  export default {
    name: 'app',
    components: {
      HeaderNav
    },
    data () {
      return {
        showHeader: false,
        stompClient:'',
        timer:'',
        total: 0,
        rowList: [],
        los: 0
      }
    },
    watch: {
      $route(to, from,) {
        // console.log(to.meta.showFoot)
        // console.log(from)
        // console.log(to)
        to.name == 'homepage' || to.name == 'home' ? this.showHeader = false : this. showHeader = true
      }
    },
    created () {
      Axios.defaults.headers['token'] = Cookies.get('TOKEN')
      // if (Cookies.get('TOKEN')) {
      //   this.handleNotification()
      // }
      // 这里写的有点不合理;不应该写定时器创建Socket;应该写到登录页去；然后把值写在状态管理；在去到导航条
      // 找到铃铛位置；然后取出状态管理的值；监听变化；
      this.timer = setInterval(() => {
          if (Cookies.get('TOKEN')) {
            this.initWebSocket()
            // this.handleNotification()
            clearInterval(this.timer)
          }
      }, 3000)
      this.$request.post('/oa/notify/selfList').then(res => {
        this.total = res.rows.length
        this.rowList = res.rows
      })
    },
    methods: {
      // 获取实时消息
      notify () {
        this.$request.post('/oa/notify/selfList').then(res => {
          alert(res)
          console.log(res)
          this.total = res.rows.length
          this.rowList = res.rows
          // this.$forceUpdate()
          if (this.los !== 0) {
            this.$message({
              message: res.rows[0].title,
              type: 'success'
            });
          } else {
            this.los = 1
          }
          this.$forceUpdate()
          // title
        })
      },
      handleNotification () {
        this.notify()
      },
      initWebSocket() {
        this.connection()
        let that= this
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        // this.timer = setInterval(() => {
        //     try {
        //         that.stompClient.send("test")
        //     } catch (err) {
        //         console.log("断线了: " + err)
        //         that.connection()
        //     }
        // }, 5000)
      },  
      connection() {
          let that = this
          // 建立连接对象
          let socket = new SockJS('/endpointChat')
          console.log(socket)
          // 获取STOMP子协议的客户端对象
          this.stompClient = Stomp.over(socket)
          // 定义客户端的认证信息,按需求配置
          let headers = {
              Authorization:''
          }
          // 向服务器发起websocket连接
          this.stompClient.connect(headers,() => {
              this.stompClient.subscribe("/user/queue/notifications", handleNotification => {
                // that.handleNotification()
                that.notify()
              });
              this.stompClient.subscribe('/topic/getResponse', (msg) => { // 订阅服务端提供的某个topic
                  // alert(msg)
                  // alert('广播成功')
                console.log(msg, '收到msg信息');  // msg.body存放的是服务端发送给我们的信息
                this.$message({
                    message: JSON.stringify(msg.body),
                    type: 'success'
                });
              },headers);
              this.stompClient.send("/app/chat.addUser",
                  headers,
                  JSON.stringify({sender: '',chatType: 'JOIN'}),
                  // alert('调用成功')
              )   //用户加入接口
          }, (err) => {
              // 连接发生错误时的处理函数
              console.log('失败')
              console.log(err);
              // clearInterval(this.timer)
          });
          // this.handleNotification()
      },    //连接 后台
      disconnect() {
          if (this.stompClient) {
              this.stompClient.disconnect();
          }
      },  // 断开连接
    },
    mounted () {
      // if (Cookies.get('TOKEN')) {
      //   console.log('????')
      // }
      // this.initWebSocket()
      // console.log(this.$route.fullPath)
      // this.$route.name == 'home' ? this.showHeader = false : this. showHeader = true
      //用于判断是否登录了，否则跳转到登录页
      if(this.$route.meta.name === 'homepage' && !Cookies.get('TOKEN')){
        this.$router.push('/homepage')
        // console.log('走了？？？')
        // this.$router.push({
        //   path: '/home',
        //   query: {
        //     fullPath: this.$route.fullPath
        //   }
        // })
      }
    },
    beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        this.disconnect()
        clearInterval(this.timer)
    }
  }
</script>

<style lang="less">
    @import './assets/css/index.less';
</style>
