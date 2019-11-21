<template>
    <div>
        <div class="header">
            <div class="container">
               <img  src="../../assets/icons/mlh_logo.png" alt="民乐荟logo"/>
               <div class="home-header-container">
                   <div class="home-header-search">
                       <el-input placeholder="小二七星茶" class="text">
                           <el-button slot="append"  class="search-btn">
                               <img  src="../../assets/icons/search.png" class="search-icon"/>
                           </el-button>
                       </el-input>
                   </div>
                   <div class="search-history">
                       <ul>
                           <li class="active">热门搜索</li>
                           <li>感冒咳嗽</li>
                           <li>健康饮品</li>
                           <li>营养保障</li>
                           <li>健康饮品</li>
                           <li>健康饮品</li>
                       </ul>
                   </div>
               </div>
               <div class="shopping-car">
                   <router-link to="home"><img  src="../../assets/icons/index_shopping.png" alt="民乐荟logo"/><span>我的购物车</span></router-link>
               </div>
            </div>
        </div>
        <div class="nav">
            <div class="container">
                <div class="list">
                    <div class="dt">
                        <img src="../../assets/icons/index_nav_liebiao_icon.png">所有分类
                    </div>
                    <div class="nav-item">
                        <ul>
                            <li><a><span>健康药品</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>家电/厨具/装修</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>服装/配饰/内衣</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>手机/电脑/办公</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>食品/酒类/生鲜</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>汽车用品/汽车</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>图片/教育/文娱</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>运动/户外</span><i class="el-icon-arrow-right"></i></a></li>
                            <li><a><span>艺术/鲜花/礼品</span><i class="el-icon-arrow-right"></i></a></li>
                        </ul>
                    </div>
                </div>
                <ol>
                    <li class="active">首页</li>
                    <li>家用医疗</li>
                    <li>营养健康</li>
                    <li>靓眼世界</li>
                    <li>美容养生</li>
                </ol>
            </div>
        </div>
        <div class="banner">
            <el-carousel :interval="5000" arrow="always" height="450px">
                <el-carousel-item v-for="item in BrannerList" :key="item.title">
                    <img class="bannerImg" :src="item.url" alt="" >
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="home-footer">
            <div class="home-footer-title">
                <el-row>
                    <el-col :span="6"><div><img  src="../../assets/image/bottom_good_icon.png" /><span>正品保障，精致服务</span></div></el-col>
                    <el-col :span="6"><div><img src="../../assets/image/bottom_quick_icon.png"><span>闪电发货，急速配送</span></div></el-col>
                    <el-col :span="6"><div></div><img src="../../assets/image/bottom_save_icon.png"><span>天天低价，畅选无忧</span></el-col>
                    <el-col :span="6"><div><img src="../../assets/image/bottom_much_icon.png"><span>品类齐全，轻松购物</span></div></el-col>
                </el-row>
            </div>
            <div class="home-footer-item">
                <div class="container">
                    <el-row>
                        <el-col  :span="19">
                            <el-row>
                                <el-col :span="5">
                                    <span>新手入门</span>
                                    <ul class>
                                        <li>购物流程</li>
                                        <li>常见问题</li>
                                        <li>发票说明</li>
                                        <li>订单查询</li>
                                    </ul>
                                </el-col>
                                <el-col :span="5">
                                    <span>配送方式</span>
                                    <ul class>
                                        <li>配送范围及运费</li>
                                        <li>快递信息查询</li>
                                        <li>验收政策</li>
                                    </ul>
                                </el-col>
                                <el-col :span="5">
                                    <span>支付方式</span>
                                    <ul class>
                                        <li>货到付款</li>
                                        <li>在线支付</li>
                                    </ul>
                                </el-col>
                                <el-col :span="5">
                                    <span>售后服务</span>
                                    <ul class>
                                        <li>退换货流程</li>
                                        <li>退换货政策</li>
                                        <li>退货流程</li>
                                        <li>退换货运费规则</li>
                                    </ul>
                                </el-col>
                                <el-col :span="4">
                                    <a>商家支持</a>
                                    <ul class>
                                        <li>商家入驻</li>
                                        <li>商家规则</li>
                                        <li>商家常见问题</li>
                                    </ul>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="5">
                            <div class="qrcode">
                                <img src="../../assets/icons/wecchat subscription.png"/>
                                <div class="e">
                                    <p>扫一扫，关注公众号</p>
                                    <img src="../../assets/icons/wecchat.png"/>
                                    <img src="../../assets/icons/sina.png"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
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
        name: "Home",
        data () {
            return {
                BrannerList: [
                    {
                        url:require('../../assets/image/index_banner_img.png'),
                        title: '1'
                    },
                    {
                        url: require('../../assets/image/index_banner_img.png'),
                        title: '2'
                    },
                    {
                        url: require('../../assets/image/index_banner_img.png'),
                        title: '3'
                    },
                    {
                        url: require('../../assets/image/index_banner_img.png'),
                        title: ''
                    }
                ],
                shopingList: [],
                newList: [],
            }
        },
    }
</script>

<style  lang="less">
    @width:1190px;
    .header {
        width: 100%;
        height: 108px;
        background-color: #fff;
        .container {
            width:@width;
            margin: auto;
            height: 100%;
            position: relative;
            img {
                position: absolute;
                left: 0;
                top: 25px;
                width: 137px;
            }
            .home-header-container {
                position: absolute;
                top: 28px;
                right: 166px;
                .home-header-search {
                    width: 550px;

                    .text {
                        height: 36px;

                        input {
                            border-radius: 0;
                            border-width: 2px 0 2px 2px;
                            border-color: #056E40;
                            border-style: solid;
                            height: 36px;
                        }
                    }

                    .search-btn {
                        height: 36px;
                        background-color: #056E40;
                        position: relative;
                        border: 1px solid #056e40;
                        border-radius: 0;

                        .search-icon {
                            width: 22px;
                            position: absolute;
                            left: 8px;
                            top: 8px;
                        }
                    }
                }
                ul {
                    display: flex;
                    li {
                        margin:  8px 11px;
                        font-size: 14px;
                        color: #999;
                        cursor: pointer;
                        &:hover {
                            color: #3C3C3C;
                        }
                    }
                    .active {
                        color: #3C3C3C;
                    }
                }
            }
            .shopping-car {
                position: absolute;
                top: 28px;
                right: 0;
                border: 1px solid #f5f5f5;
                width: 138px;
                height: 36px;
                line-height: 36px;
                a {
                    cursor: pointer;
                    img {
                        width: 23px;
                        position: absolute;
                        top: 7px;
                        left: 15px;
                    }
                    span {
                        font-size: 14px;
                        color: #056E40;
                        margin-left: 30px;
                    }
                }
            }
        }
    }
    .nav {
        width: 100%;
        height: 36px;
        line-height: 36px;
        background-color: #fff;
        .container{
            width:@width;
            margin: auto;
            height: 100%;
            position: relative;
            .list {
                width: 187px;
                height: 100%;
                float: left;
                .dt {
                    width: 187px;
                    height: 100%;
                    background-color: #333333;
                    color: #ffffff;
                    float: left;
                    cursor: pointer;
                    text-align: center;
                    img {
                        position: absolute;
                        left: 23px;
                        top: 13px;
                    }
                }
                .nav-item {
                    position: absolute;
                    top: 36px;
                    left: 0;
                    width: 187px;
                    height: 450px;
                    z-index: 999;
                    background: rgba(255,255,255,0.5);
                    ul {
                        display:block;
                        li {
                            height: 50px;
                            line-height: 50px;
                            cursor: pointer;
                            span {
                                text-align: left;
                                display: inline-block;
                                width: calc(187px - 40px);
                                margin-left: 10px;
                            }
                            &:hover {
                                background-color: #ffffff;
                            }
                        }
                    }
                }
            }
            ol {
                display: flex;
                float: left;
                li {
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                    margin-left: 60px;
                    font-weight: 400;
                    font-size: 15px;
                    &:hover {
                        color: #056E40;
                        font-weight: bold;

                    }
                }
                .active {
                    color: #056E40;
                    font-weight: bold;
                }
            }
        }
    }
    .banner {
        position: relative;
        width: 100%;
        height: 450px;
        background: #00c06d;
        .bannerImg {
            width: 100%;
            height: 100%;
        }
    }
    .home-footer {
        width:100%;
        margin: auto;
        .home-footer-title {
            width:@width;
            height: 95px;
            line-height: 95px;
            margin: auto;
            div {
               cursor: pointer;
               img {
                   vertical-align:middle;
               }
               span {
                   color: #444444;
                   margin-left: 11px;
                   font-size: 18px;
                   font-weight:bold;
               }
           }
        }
        .home-footer-item {
            width: 100%;
            border-top: 1px solid #E3E4E5;
            border-bottom: 1px solid #E3E4E5;
            .container {
                padding: 53px 0;
                text-align: left;
                width:@width;
                margin: auto;
                span {
                  font-size: 17px;
                  font-weight:400;
              }
                ul {
                  li {
                      margin-top: 17px;
                      font-size: 13px;
                      cursor: pointer;
                      &:hover {
                          color: #3C3C3C;
                      }
                  }

              }
                .qrcode {
                  display: flex;
                  align-items: center;
                  .e {
                      p {
                          color: #555555;
                          font-size: 13px;
                          margin-bottom: 12px;
                      }
                      img {
                          width: 35px;
                          margin-left: 7px;
                      }
                  }
              }
            }
        }
        .commpany-info {
            padding: 27px 0;
            width:@width;
            margin: auto;
            ul {
                line-height: 32px;
                display: flex;
                justify-content: center;
                li{
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
                text-align: center;
            }
        }
    }
</style>