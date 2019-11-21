<template>
  <div id="header">
    <div class="left">
      <img src="../assets/image/login.png" alt />
      <!-- <h2>齐思印</h2>
      <span>ERP系统</span>-->
    </div>
    <div class="right">
      <div class="nav">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          @click.stop="goMenu(item.menuUrl, item.id,index)"
          :style="{color: index === menuIndex1 ? '#ffffff' : '#999999'}"
        >
          {{ item.menuCname}}
          <ul>
            <li
              v-for="(item_2, index_2) in item.children"
              :key="index_2"
              @click.stop="goMenu2(item_2.menuUrl, item_2.id, index,index_2)"
              :class="{'class-a': index_2 === menuIndex2 && index === menuIndex1}"
            >
              {{ item_2.menuCname}}
              <ul :class="{'child-active': index_2 === menuIndex2 && index === menuIndex1}">
                <li
                  v-for="(item_3, index_3) in item_2.children"
                  :key="index_3"
                  @click.stop="goMenu3(item_3.menuUrl, item_3.id,index,index_2,index_3)"
                  :class="{'class-a': index_3 === menuIndex3 && index_2 === menuIndex2 && index === menuIndex1}"
                >
                  {{ item_3.menuCname}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="loginIcon">
        <!-- <el-badge is-dot class="item" v-if="true">
          <i class="el-icon-bell"></i>
        </el-badge> -->
        <div class="hea_sockBox_info"  @mouseover="overSockBox" @mouseleave="leaveSockBox">
          <i class="el-icon-bell"></i>
          <span class="hea_sockBox_info_sl" @click="goto">{{this.rowList.length > 99 ? 99 : this.rowList.length}}</span>
          <div class="info_list_box" v-if="infoFlag" @mouseover="overSockBox" @mouseleave="leaveSockBox">
            <div class="info_list" v-for="(item) in arrList" :key="item.id">
              <div class="info_list_item">
                <div class="info_list_item_title">
                  <span>系统消息:</span>
                  <p>{{item.title}}</p>
                </div>
                <div class="info_list_item_time">{{getJsonDateFun(item.createdTime)}}</div>
              </div>
            </div>
            <div class="info_list_gd" @click="goto">更多未读消息（<span>{{total}}</span>）</div>
          </div>
        </div>
        <i class="el-icon-user"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#header {
  background: #191919;
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 20px;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    height: 40px;
    h2 {
      margin: 0 20px 0 8px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: 100%;
    color: #999;
    font-size: 14px;
    .nav {
      height: 100%;
      line-height: 40px;
      cursor: pointer;
      > div {
        height: 100%;
        display: inline-block;
        width: 120px;
        text-align: center;
        position: relative;
        > ul {
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
          > li {
            padding: 0 5px 0 10px;
            // position: relative;
            > ul {
              width: 147px;
              // box-shadow: 0px 5px 10px #e0e0e0;
              position: absolute;
              top: 0;
              right: -147px;
              background: #191919;
              color: #999;
              > li {
                color: #999999;
                padding: 0 10px 0 20px;
              }
              > li:hover {
                background: #444;
                color: #fff;
              }
            }
          }
          > li:hover {
            background: #444;
            color: #fff;
          }
        }
      }
      > div:hover {
        background: #191919;
        color: #fff;
        > ul {
          background: #191919;
          color: #ccc;
          display: block;
          > li {
            > ul {
              display: none;
            }
            > ul.child-active {
              display: block;
            }
          }
          > li:hover {
            > ul {
              display: block;
            }
          }
        }
      }
      .class-a {
        background: #444;
        color: #fff;
      }
    }
    .loginIcon {
      font-size: 20px;
      margin-left: 30px;
      display: flex;
      .hea_sockBox_info {
        position: relative;
        margin-right: 10px;
        cursor: pointer;
        .hea_sockBox_info_sl {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -6px;
          right: -8px;
          width: 16px;
          height: 16px;
          font-size: 12px;
          color: #fff;
          background: #FF4A3B;
          border-radius: 50%;
          font-weight: 100;
        }
        .info_list_box {
          position: absolute;
          top: 31px;
          right: -8px;
          color: #333;
          box-shadow:0px 3px 5px 0px rgba(0, 0, 0, 0.2);
          background: #fff;
          z-index: 10;
          font-size: 12px; 
          .info_list {
            padding: 0 20px;
            background: #fff;
            .info_list_item {
              width: 332px;
              border-bottom: 1px dashed #ccc;
              padding: 10px 0px 6px 0px;
              .info_list_item_title {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                p {
                  width: 260px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-align: left;
                }
              }
              .info_list_item_time {
                text-align: right;
                color: #999;
              }
            }
          }
          .info_list:hover {
            background: #999;
            color: #fff;
            .info_list_item {
              border-color: #999;
              .info_list_item_time {
                color: #fff;
              }
            }
          }
          .info_list_gd {
            text-align: left;
            padding: 10px 0px;
            padding-left: 20px;
            min-width: 135px;
            span {
              color: #FF4A3B;
            }
          }
        }
      }
      i {
        cursor: pointer;
        margin-left: 5px;
      }
      i:hover {
        color: #FFF;
      }
    }
  }
}
</style>

<script>
import Cookies from "js-cookie";
import dayjs from 'dayjs'
export default {
  name: "HeaderNav",
  props: {
    rowList: {
      tyep: Array,
      default: [],
    }
  },
  data() {
    return {
      timer:0,
      menuList: [],
      menuIndex1: -1,
      menuIndex2: -1,
      menuIndex3: -1,
      total: 0,
      arrList: [],
      infoFlag: false
    };
  },
  created() {
    this.getMenuList();
    this.total = this.rowList.length
    if (this.rowList.length > 5) {
      // console.log('进入了吗？？？')
      let arr = []
      this.rowList.forEach((item,index) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      this.arrList = arr
    }
    console.log(this.rowList)
    // console.log("this.$route.path", this.$route);
  },
  methods: {
    goto () {
      this.$router.push('/info')
    },
    getJsonDateFun (item) {
      return dayjs(item).format('YYYY-MM-DD HH:mm')
    },
    overSockBox(){
      clearTimeout(this.timer)
      this.infoFlag = true;
    },
    leaveSockBox(){
      let _that = this;
      this.timer = setTimeout(function () {
        _that.infoFlag = false;
      },500)

    },
    liveSockBox(){
      this.infoFlag = true
    },
    getMenuList() {
      // console.log("菜单列表");
      this.$request
        .post("/sysMenu/list", {})
        .then(data => {
          // console.log(data)    //请求成功方法，data为请求成功返回的数据
          this.menuList = data.obj;
          // console.log(this.menuList);
        })
        .catch(e => {
          console.log(e);
        });
    },
    goMenu2(url, id, index, index_2) {
      Cookies.set("navMenuId", id);
      // if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
      //     Cookies.set('navMenuId', id)
      // }
      if (url !== "" && url !== "#" && url) {
        if(id==="247602a7-b63e-430c-8e7b-17a3be279e90"||id==="6525e97d-7963-4abc-897c-35171eb3e368"){
            this.$request.get("/mail/code/getMailURL", {
            }).then(data => {
              if(data.code==0){
                window.open(data.obj)
              }else{
                 this.$message({
                   type: 'error',
                   message: data.msg
                 });
              }
            })
            .catch(e => {
              console.log(e);
            });
        }else{
          this.$router.push(url);
          this.menuIndex2 = index_2;
          this.menuIndex1 = index;
        }
      } else {
      }
    },
    goMenu(url, id, index) {
      Cookies.set("navMenuId", id);
      // if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
      //     Cookies.set('navMenuId', id)
      // }
      if (url !== "" && url !== "#" && url) {
        this.$router.push(url);
        this.menuIndex1 = index;
      } else {
      }
    },
    goMenu3(url, id, index, index_2, index_3) {
      Cookies.set("navMenuId", id);
      //    if (id === '121f4be9-c10b-48cb-acde-244d23e26a63' || id === '10ee253a-3e0e-46b5-bdcb-206f45ed21a6' || id === '121f4be9-c10b-48cb-acde-244d23e26a64') {
      //         Cookies.set('navMenuId', id)
      //     }
      if (url !== "" && url !== "#" && url) {
        this.$router.push(url);
        this.menuIndex1 = index;
        this.menuIndex2 = index_2;
        this.menuIndex3 = index_3;
      } else {
      }
    }
  }
};
</script>
