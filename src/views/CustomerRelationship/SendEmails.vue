<template>
  <div id="CrmMain">
    <!-- 左侧 -->
    <div class="CrmLeft">
      <el-menu router>
        <el-menu-item>
          <div class="OrderLeft row-flex-start" v-for="(item,index) in ordersList" :key="index">
            <div class="Orderimgs">
              <img src="ordersList.imgs" />
            </div>
            <span>{{item.text}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧 -->
    <div class="CrmRight">
      <el-row class="el-row">
        <el-col class="row-flex-start">
          <el-button class="buttons">发送</el-button>
          <el-button class="buttons">定时发送</el-button>
          <el-button class="buttons">存草稿</el-button>
          <el-button class="buttons">添加图片</el-button>
          <el-button class="buttons">关闭</el-button>
        </el-col>
      </el-row>
      <div class="CrmRightMain">
        <el-col class="row-flex-start recipients">
          <p>收件人</p>
          <input class="el-input" />
        </el-col>
        <el-col class="row-flex-start recipients">
          <p class="theme_p">主题</p>
          <input class="el-input" />
        </el-col>
        <el-col class="row-flex-start recipients">
          <p class="theme_p">正文</p>
          <input type="text" class="main" />
        </el-col>
        <!-- 附件上传 -->
        <div class="Coloum_accessory">
          <div class="accessory">
            <span></span>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="search row-flex-start">
          <!-- <el-input
         class="search_input"
          placeholder="查看联系人"
          suffix-icon="el-icon-search"
          >-->
          <div class="icon_search">
            <img src="../../assets/icons/search_input.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendEmails",
  data() {
    return {
      ordersList: [
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "写信"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "收件箱(123)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "已发送(10)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "通讯录(10)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "星标邮件(12)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "草稿箱(10)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "已删除(10)"
        },
        {
          imgs: "../../assets/icons/OrderDetailsLeft.png",
          text: "签名(10)"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style  scoped>
#CrmMain {
  width: 100%;
  height: 100%;
  margin: 15px 0 50px 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
}
.CrmLeft,
.CrmRight {
  background: #ffffff;
  border-radius: 5px;
  height: 100%;
}
.CrmLeft {
  width: 10%;
  margin: 0 12px;
}
.CrmRight {
  width: 90%;
}
/* 水平对齐方式 公共 */
.row-flex-start {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
}
/* 从上到下垂直对齐 */
.Coloum-flex-start {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
.OrderLeft {
  text-align: center;
}
.Orderimgs {
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.Orderimgs image {
  width: 100%;
  height: 100%;
}
span {
  margin-left: 10px;
}
.el-row {
  margin-left: 10px;
}
.main,
.el-input {
  width: 60%;
  border: 1px solid #000;
}
.recipients {
  margin: 10px 20px;
  font-size: 10vm;
  text-align: center;
}
p {
  line-height: 40px;
  margin: 0 10px;
}
.theme_p {
  margin-left: 30px;
}
.main {
  padding: 20% 0;
}
.accessory {
  width: 10%;
  left: 71%;
}
.search {
  width: 14%;
  left: 83%;
}
.search_input {
  margin: 10px 0 0 10px;
  height: 35px;
  width: 200px;
  position: relative;
}
.search,
.accessory {
  position: absolute;
  top: 13.5%;
  height: 88.5%;
  border: 1px solid #000;
}
.icon_search {
  width: 25px;
  height: 25px;
  position: relative;
  top: 15px;
  left: 10px;
  overflow: hidden;
}
.icon_search image {
  width: 100%;
  height: 100%;
}
/* 按钮 */
.buttons {
  height: 35px;
  padding: 0 20px;
  background: #fffbf4;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: 10;
  text-align: center;
  line-height: 35px;
  margin: 15px 10px 0 5px;
}
</style>