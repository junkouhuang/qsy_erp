import { v_axios } from '@/request/fetchData'

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
      userLogin(){
        console.log("登陆!!!")
        if(this.userName.trim()==''||this.userPwd.trim()==''){
          document.getElementById('spanNote').style.color = '#FF3600';
          this.errorNote='用户名或密码不为空'
        }else{
          v_axios('/adminUser/login',{userCode:this.userName,psw:this.userPwd},'post').then(data => {
            console.log(data)    //请求成功方法，data为请求成功返回的数据
            document.getElementById('spanNote').style.color = 'white';
            sessionStorage.setItem('loginInfo','已登录')
            this.$router.push({
              path: '/orderManagement'
            })
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