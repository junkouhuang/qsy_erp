<template>
    <div class="home_page">
        <a id="C4" name='C4'></a>
        <div class="header">
            <ul>
                <li @click="menuGoTo(1)"><a>设计</a></li>
                <li @click="menuGoTo(2)"><a>打印</a></li>
                <li @click="menuGoTo(3)"><a>定制</a></li>
                <li @click="menuGoTo(4)"><a>商城</a></li>
                <li><span @click.stop="navGoTo">ERP系统</span></li>
            </ul>
            <img class="login" src="../../assets/image/logo.png" alt="">
            <ul>
                <li @click="menuGoTo(5)"><a>成为设计师</a></li>
                <li @click="menuGoTo(6)"><a>我的订单</a></li>
                <li>
                    <span @click.stop="goToLogin"><img src="../../assets/image/shoppingcartend.png" alt=""></span>
                </li>
                <li>
                    <span class="moreBox" @mouseenter.stop="showGoUrl" @mouseleave.stop="hideGoUrl">
                        更多
                        <div  @mouseenter.stop="showHideBox" @mouseleave.stop="showHide2" v-if="showBtnFlag" class="more_item">
                            <div class="btn_one">
                                <div class="btn" @click="goPhone">
                                    <img src="../../assets/image/home_my_phone.png" alt="">
                                    联系我们
                                </div>
                                <div class="btn btn2"  @click="goCompany">
                                    <img src="../../assets/image/home_my_com.png" alt="">
                                    公司简介
                                </div>
                            </div>
                            <div class="btn_one">
                                <div class="btn" @click="goService">
                                    <img src="../../assets/image/home_my_icon.png" alt="">
                                    服务介绍
                                </div>
                            </div>
                        </div>
                    </span>
                </li>
                <li>
                    <span class="login_btn" @click="goToLoginBtn">登录</span>
                </li>
            </ul>
        </div>
        <el-carousel height="500px" :autoplay="true" trigger='click' :loop='true' :interval='4000' >
            <el-carousel-item v-for="item in BrannerList" :key="item.title">
                <img class="bannerImg" :src="item.url" alt="" @click="gotuImgUrl(item.title)">
            </el-carousel-item>
        </el-carousel>
        <div class="print_box">
            <h3>报价打印</h3>
            <div class="print_content">
                <img src="../../assets/image/home_leftbg.png" alt="">
                <div class="right">
                    <h4>上传图纸，了解价格详情，下单打印</h4>
                    <p>3D打印进入鞋业制造应用已经趋于成熟化。鞋厂为什么要用3D打印在这之前有解读过，参考（链接）。利用3D打印有着加速出样，快速</p>
                    <p>模具，生产周期短，结构、花纹同步一键打印等。</p>
                    <span @click="goTo3d">上传3D图纸</span>
                </div>
            </div>
        </div>
        <div class="design_box">
            <h3>设计需求</h3>
            <p class="p_shuom">平台严格审核的设计师主动与您联系。线下轻松交流，设计质量高，效率快、服务好。</p>
            <div class="content">
                <img src="../../assets/image/desinBg.png" alt="">
                <div class="yd_box">
                    <p class="yd_title">发布需求</p>
                    <p class="yd_shuom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平台严格审核的设计师主动与您联系。线下轻松交流，设计质量高，效率快、服务好。</p>
                    <div class="yd_show_box">
                        <span class="yd_show_name">需求描述 :</span>
                        <div class="yd_show_border"></div>
                    </div>
                    <div class="yd_show_box">
                        <span class="yd_show_name">手机号码 :</span>
                        <div class="yd_show_border2"></div>
                    </div>
                    <div class="show_btn" @click="goXQ">发布需求</div>
                </div>
            </div>
        </div>
        <div class="originality_box">
            <h3>在线创意小软件</h3>
            <p>把你的创意表达出来，诸多3D工具让你选择</p>
            <ul>
                <li @click="goTY">
                    <img src="../../assets/image/cyBG1.png" alt="">
                    <span>涂鸦</span>
                </li>
                 <li>
                    <a href="#C4">
                        <img src="../../assets/image/cyBG2.png" alt="">
                        <span>3D文字</span>
                    </a>
                </li>
                 <li>
                    <a href="#C4">
                        <img src="../../assets/image/cyBG3.png" alt="">
                        <span>3D头像</span>
                    </a>
                </li>
                 <li>
                    <a href="#C4">
                        <img src="../../assets/image/cyBG4.png" alt="">
                        <span>手机壳</span>
                    </a>
                </li>
            </ul>
            <div class="footer_btn" @click="goTopirctur">
                更多工具
            </div>
        </div>
        <div class="shopping_box">
            <h3>3D商城</h3>
            <div class="content">
                 <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in shopingList" :key="item.id">
                            <div class="shopng_box_item" @click.stop="goToshopItem(item)">
                                <img class="swiper_shop_img" :src="item.imagePath" alt="">
                                <span>{{item.filename}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <!-- Add Pagination -->
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
            </div>
            <div class="footer_box">
                <div class="footer_btn" @click="goShopItem">
                    查看更多
                </div>
            </div>
        </div>
        <div class="journalism_box">
            <h3>
                新闻资讯
            </h3>
            <div class="content">
                <div class="content_item" v-for="item in newList" :key="item.id">
                    <img class="left" :src="item.previewImage" alt="">
                    <div class="right">
                        <h4>{{item.newsTitle}}</h4>
                        <span class="tiem">{{item.createdTime}}</span>
                        <p>{{item.previewContent}}</p>
                        <div class="gkBtn">
                            <span class="more">查看更多></span>
                            <div class="gkBtn_btn">
                                <div @click="goToNews(item)">
                                    <i class="el-icon-share"></i>
                                    <span>{{item.pageviews}}</span>
                                </div>
                                <div :class="{active: item.showFlag}" @click="gerLike(item)">
                                    <i class="el-icon-star-on"></i>
                                    <span>{{item.likeCount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_box">
                <div class="footer_btn" @click="goShopItem">
                    查看更多
                </div>
            </div>
        </div>
        <div class="nav_correlation">
            <div class="nav_title">
                <img src="../../assets/image/navLeft.png" alt="">
                <p>相关导航</p>
                <img src="../../assets/image/navRight.png" alt="">
            </div>
            <div class="nav_content">
                <div class="demo_box">
                    <p>设计</p>
                    <ul>
                        <li @click="goTo(1)">
                            成为设计师
                        </li>
                        <li @click="goTo(2)">
                            我的需求
                        </li>
                        <li @click="goTo(3)">
                            发布需求
                        </li>
                    </ul>
                </div>
                <div class="demo_box">
                    <p>打印</p>
                    <ul>
                        <li @click="goTo(4)">
                            上传打印
                        </li>
                        <li @click="goTo(5)">
                            月结申请
                        </li>
                        <li @click="goTo(6)">
                            设计规范
                        </li>
                        <li @click="goTo(7)">
                            材料介绍
                        </li>
                        <li @click="goTo(8)">
                            服务条款
                        </li>
                    </ul>
                </div>
                <div class="demo_box">
                    <p>定制</p>
                    <ul>
                        <li @click="goTo(9)">
                            3D头像
                        </li>
                        <li @click="goTo(10)">
                            手机壳
                        </li>
                        <li @click="goTo(11)">
                            涂鸦
                        </li>
                        <li @click="goTo(12)">
                            3D标牌
                        </li>
                    </ul>
                </div>
                <div class="demo_box">
                    <p>商城</p>
                    <ul>
                        <li>
                            <span class="span1" @click="goTo(13)">工艺</span>
                            <span @click="goTo(14)">人物角色</span>
                        </li>
                        <li>
                            <span class="span1" @click="goTo(15)">艺术</span>
                            <span @click="goTo(16)">生活创业</span>
                        </li>
                        <li>
                            <span class="span1" @click="goTo(17)">玩具</span>
                            <span @click="goTo(18)">等比例模型</span>
                        </li>
                        <li>
                            <span class="span1" @click="goTo(19)">饰品</span>
                            <span @click="goTo(20)">其他</span>
                        </li>
                    </ul>
                </div>
                <div class="demo_box">
                    <p>公司介绍</p>
                    <ul>
                        <li @click="goTo(21)">
                            公司简介
                        </li>
                        <li @click="goTo(22)">
                            服务介绍
                        </li>
                        <li @click="goTo(23)">
                            联系我们
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_content">
                <img class="img1" src="../../assets/image/logo.png" alt="">
                <span></span>
                <img class="img2" src="../../assets/image/Qrcode.jpg" alt="">
            </div>
            <div class="footer_nav">
                <a href="http://www.miitbeian.gov.cn">粤ICP备18088851号-1</a>
                <span class="name">©2018-2028 深圳市齐思印科技商贸有限公司</span>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from "swiper"
export default {
    data () {
        return {
            showBtnFlag: false,
            showTime: 1,
            BrannerList: [
                {
                    url:require('../../assets/image/banner.png'),
                    title: '3DSC'
                },
                {
                    url: require('../../assets/image/banner-1s.png'),
                    title: 'CYXRJ'
                },
                {
                    url: require('../../assets/image/banner-4.png'),
                    title: '3DDY'
                },
                {
                    url: require('../../assets/image/banner-1.png'),
                    title: '3DZD'
                }
            ],
            shopingList: [],
            newList: [],
        }
    },
    created () {
        // this.initSwiper()
        this.$request.post('https://www.qsy3d.com/product/listHotGoods').then(res => {
            console.log(res)
            if (res.code === 0) {
                this.shopingList = []
                res.obj.forEach(e => {
                    e.showFlag = false
                    this.shopingList.push(e)
                })
            }
        })
        this.$request.post('https://www.qsy3d.com/news/listNews').then(res => {
           if (res.code === 0) {
                this.newList = []
                res.obj.forEach(e => {
                    e.showFlag = false
                    this.newList.push(e)
                })
            }
        })
    },
    mounted () {
        this.initSwiper()
    },
    methods: {
        menuGoTo (val) {
            if (val === 1) {
                window.open('https://www.qsy3d.com/pages/LookingDesign/LookingDesign.html')
            } else if (val === 2) {
                window.open('https://www.qsy3d.com/pages/quote/quote.html')
            } else if (val === 3) {
                window.open('https://www.qsy3d.com/pages/smallSoftware/smallSoftware.html')
            } else if (val === 4) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html')
            } else if (val === 5) {
                window.open('https://www.qsy3d.com/pages/login/login.html?source=stylist')
            } else if (val === 6) {
                window.open('https://www.qsy3d.com/pages/login/login.html?source=myOrder')
            }
        },
        goTo (val) {
            if (val === 1) {
                window.open('https://www.qsy3d.com/pages/submitInfo/submitInfo.html')
            } else if (val === 2) {
                window.open('https://www.qsy3d.com/pages/myDemand/myDemand.html')
            } else if (val === 3) {
                window.open('https://www.qsy3d.com/pages/postDemand/postDemand.html')
            } else if (val === 4) {
                window.open('https://www.qsy3d.com/pages/quote/quote.html')
            } else if (val === 5) {
                window.open('https://www.qsy3d.com/monthlyBalance/monthlyBalance.html')
            } else if (val === 6) {
                window.open('https://www.qsy3d.com/pages/printedInstructions/printedInstructions.html?navPrint=%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83')
            } else if (val === 7) {
                window.open('https://www.qsy3d.com/pages/printedInstructions/printedInstructions.html?navPrint=%E6%9D%90%E6%96%99%E4%BB%8B%E7%BB%8D')
            } else if (val === 8) {
                window.open('https://www.qsy3d.com/pages/printedInstructions/printedInstructions.html?navPrint=%E6%9C%8D%E5%8A%A1%E6%9D%A1%E6%AC%BE')
            } else if (val === 9 || val === 10 || val === 12) {
                window.open('https://www.qsy3d.com/#')
            } else if (val === 11) {
                window.open('https://www.qsy3d.com/pages/scrawl/index.html')
            } else if (val === 13) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=5bdc5f15-b263-11e8-99f0-1c1b0dafe9b6')
            } else if (val === 14) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=ac63b659-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 15) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=8b0d4de3-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 16) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=9a5b9a8e-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 17) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=d742b254-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 18) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=b496bc4a-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 19) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html?id=72b4ae10-b263-11e8-99f0-1c1b0dafe9b6&page=1')
            } else if (val === 20) {
                window.open('https://www.qsy3d.com/pages/shop/shop.html')
            } else if (val === 21) {
                window.open('https://www.qsy3d.com/pages/companyProfile/companyProfile.html')
            } else if (val === 22) {
                window.open('https://www.qsy3d.com/pages/serve/serve.html')
            } else if (val === 23) {
                window.open('https://www.qsy3d.com/pages/contactUs/contactUs.html')
            }
        },
        goToNews (item) {
            let url = 'https://www.qsy3d.com/pages/news/news.html?newsId=' + item.id
            window.open(url)
        },
        gerLike (item) {
            if (item.showFlag === false) {
                this.$request.post('https://www.qsy3d.com/news/addLikeCount', {id: item.id}).then(res => {
                    if (res.code === 0) {
                        this.newList.forEach(e  => {
                            if (e.id === item.id) {
                                e.showFlag = true
                                e.likeCount = (e.likeCount - 0) + 1
                            }
                        })
                    }
                })
            }

        },
        initSwiper () {
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                spaceBetween: 30,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                // }
            })
        },
        navGoTo () {
            this.$router.push('/login')
        },
        goToLogin () {
            window.open('https://www.qsy3d.com/pages/login/login.html?source=cart')
        },
        goToLoginBtn () {
            window.open('https://www.qsy3d.com/pages/login/login.html')
        },
        showGoUrl () {
            this.showBtnFlag = true
        },
        hideGoUrl () {
            // console.log('222')
            // this.showBtnFlag = false
            setTimeout(() => {
                if (this.showTime === 1) {
                     this.showBtnFlag = false
                }
            }, 1000)
        },
        showHideBox () {
            this.showTime = 2
        },
        showHide2 () {
            this.showTime = 1
            this.showBtnFlag = false
        },
        goPhone () {
            window.open('https://www.qsy3d.com/pages/contactUs/contactUs.html')
        },
        goCompany () {
            window.open('https://www.qsy3d.com/pages/companyProfile/companyProfile.html')
        },
        goService () {
            window.open('https://www.qsy3d.com/pages/serve/serve.html')
        },
        gotuImgUrl (val) {
            if (val === '3DSC') {
                window.open('https://www.qsy3d.com/pages/shop/shop.html')
            } else if (val === 'CYXRJ') {
                window.open('https://www.qsy3d.com/pages/smallSoftware/smallSoftware.html')
            } else if (val === '3DDY') {
                window.open('https://www.qsy3d.com/pages/quote/quote.html')
            } else if (val === '3DZD') {
                window.open('https://www.qsy3d.com/pages/LookingDesign/LookingDesign.html')
            }
        },
        goTo3d () {
            window.open('https://www.qsy3d.com/pages/quote/quote.html')
        },
        goXQ () {
            window.open('https://www.qsy3d.com/pages/postDemand/postDemand.html')
        },
        goTY () {
            window.open('https://www.qsy3d.com/pages/scrawl/index.html')
        },
        goHome () {
            window.open('https://www.qsy3d.com/')
        },
        goTopirctur () {
            window.open('https://www.qsy3d.com/pages/smallSoftware/smallSoftware.html')
        },
        goShopItem () {
            window.open('https://www.qsy3d.com/pages/shop/shop.html')
        },
        goToshopItem (item) {
            let url =' https://www.qsy3d.com/pages/commodity/commodity.html?url='+ item.id + '&classifyID=' + item.categoryId
            window.open(url)
        },

    }
}
</script>
<style lang="less">
    @import '../../../node_modules/swiper/css/swiper.min.css';
    .home_page {
        h3 {
            margin-top: 75px;
            font-size: 36px;
            color: #333;
            text-align: center;
            margin-bottom: 15px;
        }
        .footer_btn {
            width: 150px;
            height: 50px;
            border: 1px solid #999;
            text-align: center;
            line-height: 50px;
            color: #999;
            font-size: 18px;
            border-radius: 10px;
            margin-bottom: 60px;
            margin-top: 20px;
        }
        width: 100%;
        height: 100%;
        background: #fff;
        .header {
            width: 100%;
            height:98px;
            border-bottom: 8px solid #1b2f4e;
            display: flex;
            justify-content: center;
            align-items: center;
            ul {
                display: flex;
                height: 100%;
                li {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    margin-right: 35px;
                    cursor: pointer;
                    a {
                        color: #4c4c4c;
                        font-size: 14px;
                        text-decoration:none;
                    }
                    span {
                        font-size: 14px;
                        cursor: pointer;
                    }
                    .moreBox {
                        position: relative;
                        .more_item {
                            position: absolute;
                            left: -190px;
                            top: 24px;
                            width: 400px;
                            height: 125px;
                            z-index: 3;
                            background: #FFF;
                            border: 1px solid #ccc;
                            border-radius: 15px;
                            padding: 10px;
                            .btn_one {
                                display: flex;
                                .btn {
                                    display: flex;
                                    align-items: center;
                                    width: 100px;
                                    padding: 10px;
                                    cursor: pointer;
                                    img {
                                        margin-right: 5px;
                                    }
                                }
                                .btn2 {
                                    margin-left: 50px;
                                }
                            }
                        }
                    }
                    .login_btn {
                        width: 58px;
                        height: 25px;
                        border: 1px solid #e0e0e0;
                        font-size: 12px;
                        color: #333;
                        border-radius: 11px;
                        text-align: center;
                        line-height: 25px;
                    }
                }
            }
            .login {
                width: 170px;
                height: 55px;
                margin-left: 50px;
                margin-right: 65px;
            }
        }
        .print_box {
            background: #fff;
            padding: 70px 0px;
            h3 {
                font-size: 36px;
                color: #333;
                text-align: center;
                font-weight: 400;
            }
            .print_content {
                display: flex;
                justify-content: center;
                margin-top: 50px;
                .right {
                    margin-left: 30px;
                    text-align: left;
                    h4 {
                        text-align: left;
                        font-size: 30px;
                        color: #5686c3;
                        margin-bottom: 30px;
                    }
                    p {
                        font-size: 16px;
                        color: #666;
                        text-align: left;
                    }
                    span {
                        display: inline-block;
                        text-align: center;
                        line-height: 40px;
                        width: 151px;
                        height: 40px;
                        background-color: #5aa4ff;
                        font-size: 18px;
                        color: #fff;
                        margin-top: 30px;
                        cursor: pointer;
                    }
                }
            }
        }
        .design_box {
            width: 100%;
            // height: 876px;
            background-color: #f8f8f8;
            padding-top: 80px;
            display: flex;
            // justify-content: center;
            flex-flow: column;
            align-items: center;
            h3 {
                font-size: 36px;
                color: #333;
                text-align: center;
                font-weight: 400;
                margin-bottom: 15px;
            }
            .p_shuom {
                font-size: 18px;
                color: #999;
                text-align: center;
                margin-bottom: 65px;
            }
            .content {
                position: relative;
                height: 650px;
                padding-bottom: 60px;
                text-align: left;
                width: 1240px;
                .show_btn {
                    width: 150px;
                    height: 40px;
                    background-color: #5aa4ff;
                    text-align: center;
                    line-height: 40px;
                    color: #fff;
                    font-size: 18px;
                    margin-left: 97px;
                    margin-top: 20px;
                    cursor: pointer;
                }
                .yd_box {
                    position: absolute;
                    top: 100px;
                    left: 100px;
                    width: 700px;
                    height: 500px;
                    background-color: #ffffff;
                    box-shadow: 1.4px 1.4px 20px 0px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    position: absolute;
                    left: 520px;
                    top: 90px;
                    padding: 0 40px;
                    z-index: 3;
                    .yd_title {
                        font-size: 30px;
                        color: #478dec;
                        text-align: center;
                        margin: 35px 0 25px 0;
                    }
                    .yd_shuom {
                            font-size: 18px;
                            color: #333;
                            line-height: 32px;
                            margin-bottom: 20px;
                    }
                    .yd_show_box {
                        display: flex;
                        margin-bottom: 10px;
                        span {
                            font-size: 18px;
                             color: #666;
                        }
                        .yd_show_border {
                            width: 510px;
                            height: 160px;
                            border: 1px solid #ccc;
                            margin-left: 15px;
                        }
                        .yd_show_border2 {
                            width: 240px;
                            height: 36px;
                            border: 1px solid #ccc;
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
        .originality_box {
            display: flex;
            flex-flow: column;
            align-items: center;
            background: #fff;
            p {
                font-size: 18px;
                color: #999;
                text-align: center;
                margin-bottom: 50px;
            }
            ul {
                display: flex;
                padding-bottom: 30px;
                li {
                    width: 310px;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    cursor: pointer;
                    a {
                        width: 310px;
                        display: flex;
                        flex-flow: column;
                        align-items: center;
                        cursor: pointer;
                        text-decoration:none; 
                        color:#333; 
                    }
                }
            }
        }
        .shopping_box {
            background: #f8f8f8;
            padding-top: 1px;
            .footer_box {
                display: flex;
                justify-content: center;
            }
        }
        .journalism_box {
            padding: 1px;
            background: #fff;
            display: flex;
            flex-flow: column;
            align-items: center;
            .content {
                margin-bottom: 60px;
                .content_item {
                    width: 1240px;
                    display: flex;
                    margin-top: 20px;
                    .left {
                        width: 300px;
                        height: 240px;
                    }
                    .right {
                        padding-left: 20px;
                        padding-top: 35px;
                        width: 920px;
                        h4 {
                            text-align: left;
                            font-size: 22px;
                            font-weight: 400;
                        }
                        .tiem {
                            font-size: 12px;
                            color: #666;
                            margin: 15px 0 25px 0;
                            text-align: left;
                            display: block;
                        }
                        p {
                            font-size: 16px;
                            color: #999;
                            text-align: left;
                        }
                        .gkBtn {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 20px;
                            .more {
                                color: #478dec;
                            }
                            .gkBtn_btn {
                                display: flex;
                                div {
                                    margin-left: 40px;
                                    display: flex;
                                    font-size: 12px;
                                    line-height: 12px;
                                    cursor: pointer;
                                    i {
                                        margin-right: 2px;
                                    }
                                }
                                .active {
                                    color: #478dec;
                                }
                            }
                        }
                    }
                }
            }
        }
        .nav_correlation {
            display: flex;
            align-items: center;
            flex-flow: column;
            padding: 40px 0px;
            background: #f8f8f8;
            .nav_title {
                display: flex;
                justify-items: center;
                align-items: center;
                p {
                    font-size: 24px;
                    color: #666;
                    margin: 0 10px;
                }
            }
            .nav_content {
                display: flex;
                justify-content: center;
                margin-top: 40px;
                .demo_box {
                    margin-left: 110px;
                    p {
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 12px;
                        text-align: left;
                    }
                    ul {
                        li {
                            font-size: 14px;
                            color: #666;
                            text-align: left;
                            margin-bottom: 10px;
                            cursor: pointer;
                            span {
                                display: inline-block;
                                cursor: pointer;
                            }
                            .span1 {
                                margin-right: 30px;
                            }
                        }
                    }
                }
            }
        }
        .footer {
            background: #fff;
            padding: 10px 0px;
            border-top: 8px solid #1b2f4e;
            .footer_content {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 120px;
                .img1 {
                    width: 170px;
                    height: 55px;
                }
                span {
                    width: 2px;
                    height: 60px;
                    margin-left: 150px;
                    margin-right: 190px;
                    background-color: #d2d2d2;
                }
                .img2 {
                    width: 80px;
                    height: 80px;
                }
            }
            .footer_nav {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                margin-bottom: 10px;
                a {
                    color: #666;
                }
                span {
                    margin-left: 50px;
                }
            }
        }
    }
    .swiper-container {
      width: 1400px;
      height: 290px;
      margin-bottom: 30px;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      .shopng_box_item {
        width: 230px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        cursor: pointer;
        .swiper_shop_img {
            width: 220px;
            height: 220px;
            cursor: pointer;
        }
        span {
            margin-top: 20px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
        }
      }
    }
    .bannerImg {
        cursor: pointer;
    }
</style>