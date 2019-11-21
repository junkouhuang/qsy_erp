<template>
    <div class="login">
        <div class="header">
           <div class="container">
               <div class="logo">
                   <img src="../../assets/icons/mlh_logo.png" alt="民乐荟logo"/>
                   <i>|</i>
                   <span class="text">欢迎登录</span>
               </div>
               <div class="status">已有账户?<span>请登录</span></div>
           </div>
        </div>
        <div class="content">
            <div class="form">
                <el-form>
                    <el-form-item style="width: 350px;height:316px;">
                        <div class="title">用户登录</div>
                        <div class="frm">
                            <el-input placeholder="请输入用户名/手机号码">
                                <template slot="prepend">
                                    <img  src="../../assets/icons/uesre_icon.png" class="search-icon"/>
                                </template>
                            </el-input>
                            <el-input placeholder="请输入密码">
                                <template slot="prepend">
                                    <img  src="../../assets/icons/passwore_icon.png" class="search-icon"/>
                                </template>
                            </el-input>
                            <el-checkbox v-model="checked">记住账户</el-checkbox>
                            <el-button>登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="home-footer">
            <div class="commpany-info">
                <ul>
                    <li>友情链接：</li>
                    <li>xxxxx</li>
                    <li>xxxxx</li>
                    <li>xxxxx</li>
                    <li>xxxxx</li>
                </ul>
                <p>版权所有：民乐荟健康产业（深圳）有限公司</p>
                <p>Copyright © 2019 minlehui All Rights Reserve</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped lang="less">
    @width:1190px;
    .login {
        background-color: #fff;
        .header {
            width: 100%;
            height: 76px;
            line-height: 76px;
            .container {
                width: @width;
                height: 100%;
                margin: auto;
                position: relative;
                .logo {
                    left: 0;
                    top: 17px;
                    width: 250px;
                    height: 42px;
                    line-height: 42px;
                    position: absolute;
                    img {
                        position: relative;
                        left: 0;
                        top: 0;
                    }
                    i {
                        margin: 0 14px 0 16px;
                    }
                    .text {
                        color: #444444;
                    }
                }
                .status {
                    position: absolute;
                    right: 0;
                    color: #444444;
                    span {
                        color: #FC7406;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }

            }
        }
        .content {
            width: 100%;
            height: 600px;
            background: url(../../assets/image/login_icon.png);
            display: flex;
            justify-content: center;
            align-items: center;
            .form {
                width: @width;
                height: 316px;
                position: relative;
                form {
                    background-color: #ffffff;
                    position: absolute;
                    right: 0;
                    top: 0;
                    .title {
                        color: #444444;
                        font-size:18px;
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        border-bottom: 1px solid #DDDDDD;
                        font-weight:bold;
                        padding-left: 25px;
                        text-align: left;
                    }
                    .frm {
                        padding: 0 25px;
                        .el-input {
                            margin-top: 29px;
                            input {
                                height: 38px;
                            }
                        }
                        label {
                            width: 100%;
                            text-align: left;
                        }
                        button {
                            width:100%;
                            background-color: #33BB44;
                            color: #ffffff;
                            border: none;
                        }
                    }
                }
            }
        }
        .home-footer {
            width: 100%;
            margin: auto;
            .commpany-info {
                padding: 27px 0;
                width: @width;
                margin: auto;

                ul {
                    line-height: 32px;
                    display: flex;
                    justify-content: center;

                    li {
                        color: #444444;
                        font-size: 13px;
                        margin-left: 10px;
                    }
                }

                p {
                    line-height: 32px;
                    color: #444444;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }
        }
    }
</style>