<template>
  <div id="CrmMain">
    <!-- 左侧 -->
    <div class="CrmLeft">
      <div>
        <ul>
          <template v-for="items in item">
            <div class="row_flex_text row_left">
              <img src="../../assets/icons/OrderDetailsLeft.png" />
              <li
                class="li_left"
                :class="{active:items.isActive}"
                @click="activeFun(items)"
              >{{items.name}}</li>
            </div>
          </template>
        </ul>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="CrmRight">
      <div class="CrmRightHead">
        <div class="el-input">
          <div class="sou">
            <span>查询条件:</span>
          </div>
          <el-select v-model="OrderDate.date" class="inputnumber">
            <el-option label="订单交期" value="订单交期"></el-option>
            <el-option label="结账日期" value="结账日期"></el-option>
            <el-option label="出货完成日期" value="出货完成日期"></el-option>
            <el-option label="预计收款日期" value="预计收款日期"></el-option>
          </el-select>
          <el-input placeholder="起始日期:" class="inputdate" autocomplete="off"></el-input>
          <span class="sou">——</span>
          <el-input placeholder="截止日期:" class="inputdate" autocomplete="off"></el-input>
          <el-input
            class="inputnumber"
            placeholder="业务:"
            v-model="companyNo"
            suffix-icon="el-icon-search"
          />
          <el-input
            class="inputnumber"
            placeholder="客户编号:"
            v-model="input"
            suffix-icon="el-icon-search"
          />
          <el-input
            class="inputnumber"
            placeholder="跟单:"
            v-model="input"
            suffix-icon="el-icon-search"
          />
          <el-input
            class="inputnumber"
            placeholder="品检:"
            v-model="input"
            suffix-icon="el-icon-search"
          />
          <el-button class="buttons">搜索</el-button>
          <el-button class="buttons clenBtn">清空</el-button>
          <el-button class="buttons">导出Excel</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      item: [
        {
          name: "1.订单汇总表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: true
        },
        {
          name: "2.报价下单分析表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "3.工作记录表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "4.客户分析表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "5.报价单汇总表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "6.迟交返工明细表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "7.业务奖金表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "8.每日问题反馈表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "9.客户到账流水表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "10.待发掘客户表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        },
        {
          name: "11.推广效果表",
          img: "../../assets/icons/OrderDetailsLeft.png",
          isActive: false
        }
      ],
      OrderDate: {
        date: ""
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 左侧文字切换样式
    activeFun: function(data) {
      this.item.forEach(function(obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
    }
  }
};
</script>

<style scoped>
#CrmMain {
  width: 100%;
  height: 100%;
  margin: 15px 0 80px 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
}
.CrmLeft,
.CrmRight {
  background: #ffffff;
  margin: 10px;
}
.CrmLeft {
  width: 200px;
  height: 1020px;
}
.CrmRight {
  width: 1690px;
  height: 1020px;
}
/* 右侧头部固定 */
.CrmRightHead {
  height: 60px;
  position: relative;
}
.inputnumber {
  width: 120px;
  height: 30px;
  margin: 10px 15px;
  font-size: 10vm;
  border-radius: 20px;
}
.inputdate{
  width: 90px;
  height: 30px;
  margin: 10px 15px;
  font-size: 10vm;
  border-radius: 20px;
}
.sou {
  height: 16px;
  text-align: left;
  margin: 20px 0px 0px 10px;
}
.el-input {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
  margin-right: 20px;
}
.OrderImg {
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.row_flex_text {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  text-align: center;
}
.row_left {
  margin: 10px;
  line-height: 5px;
}
.row_flex_text image {
  width: 40px;
  height: 50px;
  overflow: hidden;
}
.li_left {
  line-height: 30px;
}

.li_left.active {
  color: red;
}
/* 按钮 */
.buttons {
  padding: 7px 15px;
  color: #000;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #999999;
  font-size: 12px;
  text-align: center;
  margin: 15px 20px;
}
.clenBtn {
  background: #999999;
  color: #fff;
}
.el-select .el-input__inner {
  width: 50px;
}
</style>