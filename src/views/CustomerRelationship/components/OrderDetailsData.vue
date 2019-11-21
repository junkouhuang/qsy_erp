
<template>
  <el-row class="tac">
    <el-menu>
      <el-menu-item index="/orderSummaryTable" @click="goTo('/orderSummaryTable')">
        <div class="Orderimgs">
          <img src="../../assets/icons/OrderDetailsLeft.png" />
        </div>
        <i class="el-icon-menu"></i>
        <span slot="title">订单汇总表</span>
      </el-menu-item>

      <el-menu-item index="/quotationListTable" @click="goTo('/quotationListTable')">
        <div class="Orderimgs">
          <img src="../../assets/icons/OrderDetailsLeft.png" />
        </div>
        <i class="el-icon-menu"></i>
        <span slot="title">导航2</span>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-row>
</template>


<template></template>

<script>
export default {
  name: "OrderDetailsData",
  components: {},
  props: ["OrderDetailsData"],
  data() {
    return {};
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style  scoped>
.OrderDetailsHead {
  position: relative;
  left: 10px;
}
p {
  font-size: 10vm;
  text-align: left;
}
/* 水平对齐方式 公共 */
.row-flex-start {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
}
.Orderimgs {
  overflow: hidden;
}
.Orderimgs image {
  width: 100%;
  height: 100%;
}
</style>
