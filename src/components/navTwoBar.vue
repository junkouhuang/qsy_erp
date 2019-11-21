<template>
    <div class="header_order_nav_bar">
        <div class="order_nav_bar_ul">
            <div class="order_nav_bar_li" v-for="(item, index) in navList" :key="item.id">
                <!-- 可点击 -->
                <div class="order_nav_bar_li_true" :class="{order_nav_bar_li_active: flagIndex === index}" @click="getIndex(index, item)"
                  @mouseenter="mouIndex(index)" @mouseout="mouseOut(index)" v-if="item.disabled === true">
                    <span>{{item.menuCname}}</span>
                    <!-- 开始默认 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === 0 && flagIndex !== index && mouseIndex !== index" src="../assets/image/first-mr.png" alt="">
                    <!-- 开始选中 -->
                    <img class='order_nav_bar_li_true_img1' v-if='index === 0 && flagIndex === index' src="../assets/image/first-xz.png" />
                    <!-- 开始移入 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === 0 && flagIndex !== index && mouseIndex === index" src="../assets/image/first-yr.png" alt="">
                    <!-- 中间默认 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index !== 0 && index !== navList.length - 1 && flagIndex !== index && mouseIndex !== index" src="../assets/image/zj-mr.png" />
                    <!-- 中间选中 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index !== 0 && index !== navList.length - 1 && flagIndex === index" src="../assets/image/zj-xz.png" />
                    <!-- 中间移入 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index !== 0 && flagIndex !== index && index !== navList.length - 1 && mouseIndex === index" src="../assets/image/zj-yr.png" alt="">
                    <!-- 结束默认 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === navList.length - 1 && flagIndex !== index && mouseIndex !== index" src="../assets/image/last-mr.png" alt="" />
                    <!-- 结束选中 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === navList.length - 1 && flagIndex === index" src="../assets/image/last-xz.png" alt="">
                    <!-- 结束移入 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === navList.length - 1 && flagIndex !== index && mouseIndex === index" src="../assets/image/last-yr.png" alt="">
                </div>
                <!-- 禁用不可点击 -->
                <div class="order_nav_bar_li_false" v-if="item.disabled === false">
                    <span>{{item.menuCname}}</span>
                    <!-- 开始禁用 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === 0" src="../assets/image/first-jy.png" alt="">
                    <!-- 中间禁用 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index !== 0 && index !== navList.length - 1" src="../assets/image/middle.png" />
                    <!-- 结束禁用 -->
                    <img class="order_nav_bar_li_true_img1" v-if="index === navList.length - 1" src="../assets/image/last.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            menid: '',
            navList: [{menuCname: '询价抢单', disabled: true},{menuCname: '报价单2', disabled: true},
                {menuCname: '报价单', disabled: true}, {menuCname: '报价单2', disabled: false},{menuCname: '报价单2', disabled: false},{menuCname: '报价单2', disabled: false} ],
            flagIndex: 0, // 999为默认不存在
            mouseIndex: 999
        }
    },
    created () {
        this.menid = Cookies.get('navMenuId')
        if (this.menid !== '' && this.menid ) {
            // console.log('asdasdasd', this.menid)
            this.$request.post('/sysOperation/listOperationByPosition', {menuId: this.menid}).then(res => {

                console.log(res)
                if (res.code === 0) {
                    this.navList = res.obj
                }
            })
        }
    },
    methods: {
        mouIndex (index) {
            this.mouseIndex = index
        },
        mouseOut (index) {
            this.mouseIndex = 999
        },
        // 点击选择
        getIndex (i, item)  {
            this.flagIndex = i
            // console.log(item)
            // this.$emit('backNavMenuId', {item: item, indexFlag: i})
            this.$router.push({
                path: item.menuUrl,
                query: {
                    id: item.id
                }
            })
        }
    }
}
</script>
<style lang="less">
    .header_order_nav_bar {
        padding-left:10px;
        background: #fff; 
        .order_nav_bar_ul {
            padding: 10px;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            padding-top: 0px;
            background-color: #fff;
            .order_nav_bar_li {
                margin-top: 10px;
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #333;
                font-size: 12px;
                position: relative;
                .order_nav_bar_li_true {
                    width: 80px;
                    height: 30px;
                    // background-image: url('../assets/image/navBg2.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    // // background-position: -10px 0px;
                    position: relative;
                    cursor: pointer;
                    .order_nav_bar_li_true_img1 {
                        width: 90px;
                        height: 30px;
                        position: absolute;
                        top: 0;
                        left: -10px;
                    }
                    span {
                        width: 80px;
                        font-size: 12px;
                        z-index: 10px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;
                        text-align: left;
                        padding-left:10px; 
                    }
                }
                .order_nav_bar_li_active {
                    width: 80px;
                    height: 30px;
                    color: #fff;
                    // background-image: url('../assets/image/navBg1.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    cursor: pointer;
                }
                .order_nav_bar_li_false {
                    width: 80px;
                    height: 30px;
                    // background-image: url('../assets/image/navBg3.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    // pointer-events: none;
                    cursor: not-allowed;
                    color: #CCC;
                    .order_nav_bar_li_true_img1 {
                        width: 90px;
                        height: 30px;
                        position: absolute;
                        top: 0;
                        left: -10px;
                    }
                    span {
                        width: 80px;
                        font-size: 12px;
                        z-index: 10px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;
                    }
                }
                
            }
        }
    }
</style>