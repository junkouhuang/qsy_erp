<template>
  <div id="home">
    <div id="erpDiv">
      <!-- <img id="erpImg" src="../../assets/image/login.jpg"/> -->
      <div id="erpNote">齐乐ERP管理系统</div>
    </div>
    
    <div id="erpLogin" class="demo-input-suffix">
      
      <el-input id="logName" placeholder="用户名" v-model="userName"></el-input>
      <el-input  id="logPwd" placeholder="密码" type="password" v-model="userPwd"></el-input>
      <el-checkbox id="pwdRe">记住密码</el-checkbox><span id="spanNote">{{errorNote}}</span>
      <el-button id="logBtnE" v-model="logBtn" @click="userLogin">登录</el-button>
    </div>

    <div id="divFooter">HLHPROTOTYPES ERP系统 版本：2019 ©深圳市齐乐模具科技有限公司</div>

  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import Axios from 'axios'
  export default {
    name: "home",
    data() {
      return {
        userName:'admin',
        userPwd:'123456',
        errorNote:'用户名或密码错误！',
        logBtn:''
        // imgErp:'../../assets/images/logo.png'
        
      };
    },
    methods: {
      userLogin () {
        if(this.userName.trim()==''||this.userPwd.trim()==''){
          document.getElementById('spanNote').style.color = '#FF3600'
          this.errorNote='用户名或密码不为空'
        }else{
          this.$request.post('/adminUser/login', { userCode: this.userName, psw: this.userPwd }).then(res => {
            console.log(res)    //请求成功方法，data为请求成功返回的数据
            if (res.code == 0) {
              document.getElementById('spanNote').style.color = 'white'
              Cookies.set('TOKEN', res.obj.token)
              Cookies.set('roleName',res.obj.roleName)
              Axios.defaults.headers['token'] = Cookies.get('TOKEN')
              // 在这更新axios实例的header token 怎么弄？
              var getToken = Cookies.get('TOKEN')
              if (getToken) {
                this.$router.push({
                  path: '/quotation'
                })
                // window.location.href = '/#/quotation'
                // window.location.href = '127.0.0.1:8184/quotation'
              }
            }
          }).catch(e=>{
              console.log("错误")
              document.getElementById('spanNote').style.color = '#FF3600';
              this.errorNote='用户名或密码错误！'
              console.log(e)    //请求失败方法，弹出错误信息
          })
        }
      },
    }
  }
</script>

<style lang="less">
  @import './style.less';
</style>

