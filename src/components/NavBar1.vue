<template>
    <div id="header">
        <div class="left">
            <img src="../assets/image/login.png" alt="">
            <!-- <h2>齐思印</h2>
            <span>ERP系统</span> -->
        </div>
        <div class="right">
            <div class="nav">
                <div class="oneBarStyle" v-for="(item, index) in menuList" :key="index"  @click.stop="goMenu(item.menuUrl, item.id)"> 
                    {{ item.menuCname}}
                    <ul>
                        <li  class="twoBarStyle" v-for="(item_2, index_2) in item.children" :key="index_2" @click.stop="goMenu2(item_2.menuUrl, item_2.id)">
                            {{ item_2.menuCname}} 
                            <ul>
                                <li class="threeBarStyle" v-for="(item_3, index_3) in item_2.children" :key="index_3"  @click.stop="goMenu3(item_3.menuUrl, item_3.id)">
                                    {{ item_3.menuCname}} 
                                    <!-- <span v-if="item_3.num">({{ item_3.num }})</span> -->
                                </li>
                            </ul> 
                        </li>
                    </ul>
                </div>               
            </div>
            <div class="loginIcon">
                <el-badge is-dot class="item" v-if="true">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <i class="el-icon-bell" v-else></i>
                <i class="el-icon-user"></i>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #header{
        background: #191919;
        display: flex;
        height: 40px;
        align-items: center;
        padding: 0 20px;
        .left{
            flex: 1;
            display: flex;
            align-items: center;
            height: 40px;
            h2{
                margin: 0 20px 0 8px;
            }
        }
        .right{
            display: flex;
            align-items: center;
            height: 100%;
            color: #999;
            font-size: 14px;
            .nav{
                height: 100%;
                line-height: 40px;
                cursor: pointer;
                >div{
                    height: 100%;
                    display: inline-block;
                    width: 120px;
                    text-align: center;
                    position: relative;
                    >ul{
                        display: none;
                        // box-shadow: 0px 5px 10px #e0e0e0;
                        font-size: 14px;
                        line-height: 30px;
                        text-align: left;
                        position: absolute;
                        z-index: 5;
                        top: 40px;
                        background: #ffffff;
                        width: 100%;
                        >li{
                            padding: 0 5px 0 10px;
                            // position: relative;
                            >ul{
                                width: 147px;
                                // box-shadow: 0px 5px 10px #e0e0e0;
                                position: absolute;
                                top: 0;
                                right: -147px;
                                background: #191919;
                                color: #999;
                                >li{
                                    padding: 0 10px 0 20px;
                                }
                                >li:hover{
                                    background: #444;
                                    color: #fff;
                                }
                            }
                        }
                        >li:hover{
                            background: #444;
                            color: #fff;
                        }
                    }
                }
                >div:hover{
                    background: #191919;
                    color: #fff;
                    >ul{
                        background: #191919;
                        color: #ccc;
                        display: block;
                        >li{
                            >ul{
                                display: none;
                            }
                        }
                        >li:hover{
                            >ul{
                                display: block;
                            }
                        }
                    }
                }
            }
            .loginIcon{
                font-size: 20px;
                margin-left: 30px;
                i{
                    margin-left: 5px;
                }
            }
        }
    }
</style>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'HeaderNav',
    data () {
        return {
            menuList:[],
        }
    },
    created () {
        this.getMenuList()
    },
    methods:{
        getMenuList () {
            // console.log('菜单列表')
            this.$request.post('/sysMenu/list',{},).then(data => {
            // console.log(data)    //请求成功方法，data为请求成功返回的数据
                this.menuList=data.obj;
                // console.log(this.menuList);
            }).catch(e => {
                console.log(e)
            })
      },
      goMenu2 (url, id) {
            Cookies.set('navMenuId', id)
            // if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
            //     Cookies.set('navMenuId', id)
            // }
            if (url !== '' && url !== '#' && url) {
                this.$router.push(url)
            } else {
                
            }
      },
      goMenu(url, id){
            Cookies.set('navMenuId', id)
            // if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
            //     Cookies.set('navMenuId', id)
            // }
            if (url !== '' && url !== '#' && url) {
                this.$router.push(url)
            } else {
                
            }
      },
      goMenu3 (url, id) {
           Cookies.set('navMenuId', id)
        //    if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
        //         Cookies.set('navMenuId', id)
        //     }
            if (url !== '' && url !== '#' && url) {
                this.$router.push(url)
            } else {
                
            }
      }
    }
}
</script>
