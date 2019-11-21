<template>
  <div id="askForLeave">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition">搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item label="申请人" prop="sqr">
            <el-input placeholder v-model="ruleForm.sqr" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="ssbm">
            <el-select v-model="ruleForm.ssbm" placeholder="请选择" size="small">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="display: inline-block;">
            <el-form-item label="请假日期" prop="start" style="margin: 0;">
              <el-date-picker
                v-model="ruleForm.start"
                type="date"
                ref="searchStart"
                :picker-options="startDatePicker"
                placeholder="起始日期"
                size="small"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin: 0 5px;">-</el-form-item>
            <el-form-item prop="end" style="margin: 0;">
              <el-date-picker
                v-model="ruleForm.end"
                type="date"
                ref="searchEnd"
                :picker-options="endDatePicker"
                placeholder="结束日期"
                size="small"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="success" plain size="small" @click="resetForm('ruleForm')">清空</el-button>
            <el-button type="warning" size="small" @click="apply">请假申请</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <!-- <el-table-column label="序号" type="index" :index="indexMethod" width="60" align="center"></el-table-column> -->
        <!-- <el-table-column v-for="item in getCz" :key="item.prop" :prop="item.prop" :label="item.name" :width="item.width" align="center">
            <template slot-scope="{row, $index}">
              <i class="el-icon-edit-outline" title="编辑" @click.stop="edit($index, row)"></i>
              <i class="el-icon-delete" title="删除" @click.stop="del($index, row)"></i>
            </template>
        </el-table-column>-->
        <el-table-column
          v-for="item in tHeadData"
          :key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :width="item.width"
          align="center"
        >
          <template slot-scope="{row, $index}">
            <div v-if="item.prop == 'cz'">
              <i class="el-icon-edit-outline" title="编辑" @click.stop="edit($index, row)"></i>
              <i class="el-icon-delete" title="删除" @click.stop="del($index, row)"></i>
            </div>
            <div v-else-if="item.prop == 'bmjl'">
              <i class="el-icon-success" style="color: #78c06e;"></i>
            </div>
            <div v-else-if="item.prop == 'zjl'">
              <div v-if="row.zjlZt == '0'">
                <el-button type="primary" size="mini">同意</el-button>
                <el-button type="warning" plain size="mini">拒绝</el-button>
              </div>
              <div v-else-if="row.zjlZt == '1'">
                <span style="color: #ff0000;">待审核</span>
              </div>
            </div>
            <div v-else>{{ row[item.prop] }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column v-for="item in getBmjl" :key="item.prop" :prop="item.prop" :label="item.name" :width="item.width" align="center">
            <template slot-scope="">
              <i class="el-icon-success" style="color: #78c06e;"></i>
            </template>
        </el-table-column>-->
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialog"
        width="800px"
        class="askForLeaveDialog"
      >
        <el-form :model="initDialogForm" :inline="true" size="mini">
          <el-form-item label="请假日期">
            <el-input v-model="initDialogForm.qjrq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="initDialogForm.sqr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-input v-model="initDialogForm.ssbm" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请假事由" class="tripleItem">
            <el-input type="textarea" v-model="initDialogForm.qjsy"></el-input>
          </el-form-item>
          <el-form-item label="请假时间起" class="doubleItem">
            <el-date-picker v-model="initDialogForm.qjsjq" range-separator="至" ref="qjsjq" type="datetimerange" format="yyyy-MM-dd HH:mm" prefix-icon=" "></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="请假时间止">
            <el-date-picker v-model="initDialogForm.qjsjz" ref="qjsjz" type="datetime" format="yyyy-MM-dd HH:mm" prefix-icon=" "></el-date-picker>
          </el-form-item> -->
          <el-form-item label="合计">
            <el-input v-model="initDialogForm.hj" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitDialogData" size="small">确 定</el-button>
          <el-button @click="dialog = false" size="small">取 消</el-button>
        </div>
        <h3>注：请假条必须在请假前填写，由领导批准后生效，否则一律按旷工处理</h3>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "askForLeave",
  components: {},
  data() {
    return {
      dialogTitle: "",
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      ruleForm: {
        sqr: "",
        ssbm: "",
        start: "",
        end: ""
      },
      tableHeight: window.innerHeight - 320,
      departmentOptions: [
        { value: "全部", label: "全部" },
        { value: "业务部", label: "业务部" },
        { value: "跟单部", label: "跟单部" }
      ],
      tHeadData: [],
      tableData: [],
      loading: true,
      dialog: false,
      initDialogForm: "",
      dialogForm: {
        qjrq: '',
        sqr: '',
        ssbm: '',
        qjsy: '',
        qjsjq: [    //默认初始值
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 7, 55), 
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 17, 40)
        ],
        qjsjz: '',
        hj: ''
      }
    };
  },
  mounted() {
    console.log(this.tHeadData);
    setTimeout(() => {
      this.tHeadData = [
        { name: "操作", prop: "cz" },
        { name: "请假日期", prop: "qjrq" },
        { name: "申请人", prop: "sqr" },
        { name: "所属部门", prop: "ssbm" },
        { name: "请假事由", prop: "qjsy" },
        { name: "请假时间起", prop: "qjsjq" },
        { name: "请假时间止", prop: "qjsjz" },
        { name: "合计", prop: "hj" },
        { name: "部门经理", prop: "bmjl" },
        { name: "总经理", prop: "zjl" }
      ];
      this.tableData = [
        {
          cz: "编辑 删除",
          qjrq: "2019-05-03",
          sqr: "林文",
          ssbm: "跟单部",
          qjsy: "家里有事",
          qjsjq: "2019-05-05 07:55",
          qjsjz: "2019-05-06 11:45",
          hj: "一天半",
          bmjl: "√",
          zjl: "同意 拒绝",
          zjlZt: "0"
        },
        {
          cz: "编辑 删除",
          qjrq: "2019-05-05",
          sqr: "文斌",
          ssbm: "业务部",
          qjsy: "家里有事",
          qjsjq: "2019-05-06 07:55",
          qjsjz: "2019-05-06 09:55",
          hj: "2小时",
          bmjl: "√",
          zjl: "待审核",
          zjlZt: "1"
        }
      ];
      this.loading = false;
      this.tHeadData.forEach((item, index) => {
        switch (item.prop) {
          case "cz":
            item.width = 90;
            item.align = "center";
            break;
          case "zjl":
            item.width = 160;
            break;
          case "qjsjq":
            item.width = 160;
            break;
          case "qjsjz":
            item.width = 160;
            break;
        }
      });
    }, 500);
  },
  methods: {
    search() {
      //点击搜索
      console.log("搜索");
      this.ruleForm.start = this.$refs.searchStart.displayValue
      this.ruleForm.end = this.$refs.searchEnd.displayValue
      console.log(JSON.parse(JSON.stringify(this.ruleForm)));
    },
    indexMethod(index) {
      //列表序号
      return index + 1;
    },
    edit(index, row) {[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      //点击列表编辑
      this.initDialogForm = { 
          ...row, 
          rowIndex: index,
          qjsjq: [
              new Date(row.qjsjq.substr(0,4), row.qjsjq.substr(5,2)-1, row.qjsjq.substr(8,2), row.qjsjq.substr(11,2), row.qjsjq.substr(14,2)), 
              new Date(row.qjsjz.substr(0,4), row.qjsjz.substr(5,2)-1, row.qjsjz.substr(8,2), row.qjsjz.substr(11,2), row.qjsjz.substr(14,2))
          ]
      }; //表单渲染
      console.log(index);
      console.log(row);
      this.dialog = true;
      this.dialogTitle = "编辑";
    },
    del(index, row) {
      //点击列表删除
      console.log(index);
      console.log(row);
      let that = this;
      this.$confirm("删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "删除中",
            // spinner: 'el-icon-loading',
            background: "rgba(255, 255, 255, 0.4)"
          });
          setTimeout(() => {
            loading.close();
            that.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }, 1000);
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    resetForm(formName) {
      //清空表单搜索条件
      this.$refs[formName].resetFields();
      console.log("清空搜索条件-----------");
    },
    apply () {
      this.initDialogForm = {...this.dialogForm}   //表单渲染
      console.log('请假申请')
      this.dialogTitle = '请假申请'
      this.dialog = true
    },
    submitDialogData() {
      //提交弹框数据
      const loading = this.$loading({
        lock: true,
        text: "提交数据中",
        // spinner: 'el-icon-loading',
        background: "rgba(255, 255, 255, 0.4)"
      });
      console.log("索引" + this.initDialogForm.rowIndex);
      if (this.initDialogForm.rowIndex != undefined) {
        let that = this;
        setTimeout(() => {
          this.initDialogForm.qjsjq = that.$refs.qjsjq.displayValue[0]
          this.initDialogForm.qjsjz = that.$refs.qjsjq.displayValue[1]
          this.$set(
            that.tableData,
            that.initDialogForm.rowIndex,
            that.initDialogForm
          );
          loading.close();
          this.dialog = false;
          this.$message({
            type: "success",
            message: this.dialogTitle + "成功!"
          });
        }, 1000);
      } else {
        let that = this;
        setTimeout(() => {
          this.initDialogForm.qjsjq = that.$refs.qjsjq.displayValue[0]
          this.initDialogForm.qjsjz = that.$refs.qjsjq.displayValue[1]
          this.tableData.push(this.initDialogForm);
          loading.close();
          this.dialog = false;
          this.$message({
            type: "success",
            message: this.dialogTitle + "成功!"
          });
        }, 1000);
      }
    },
    beginDate() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.end) {
            return new Date(self.ruleForm.end).getTime() < time.getTime();
          }
        }
      };
    },
    //结束时间必须大于提出开始时间
    processDate() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.start) {
            return new Date(self.ruleForm.start).getTime() > time.getTime();
          }
        }
      };
    }
  }
};
</script>
<style lang="less">
#askForLeave {
  height: calc(100% - 60px);
  padding: 0 10px;
  display: flex;

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .contentBox {
    min-width: 50%;
    background: #ffffff;
    padding: 20px 30px;
    flex: 1;
    .searchBox {
      border: 1px solid #ebeef5;
      margin-bottom: 20px;
      padding: 15px 10px 0;
      display: flex;
      .searchCondition {
        padding-top: 5px;
      }
      .condition {
        flex: 1;
        > div {
          font-size: 12px;
          margin-left: 40px;
          margin-right: 0;
          margin-bottom: 15px;
          .el-form-item__label {
            min-width: 68px;
          }
          .el-input {
            width: 150px;
          }
        }
      }
    }
    .el-table--border th {
      background: #f7f7f7;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background: initial;
    }
    .el-progress-bar__innerText {
      color: #000000;
    }
    .el-table .cell {
      i {
        font-size: 18px;
        vertical-align: middle;
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .askForLeaveDialog {
      .el-dialog__header {
        background: #ebefdf;
        text-align: center;
      }
      .el-dialog__footer {
        text-align: center;
      }
      .el-dialog__body {
        overflow: hidden;
        padding-left: 10px;
        padding-right: 20px;
        padding-bottom: 10px;
      }
      .el-form--inline .el-form-item {
        margin-right: 0;
        margin-left: 13px;
      }
      .el-form-item__label {
        width: 83px;
        text-align: right;
      }
      .el-date-editor.el-input{
          width: 150px;
      }
      .el-input__inner {
        width: 150px;
        padding-left: 10px;
      }
      .tripleItem {
        width: 725px;
        .el-textarea__inner {
          width: 642px;
          padding-left: 10px;
          resize: none;
        }
      }
      .doubleItem {
        width: 479px;
        .el-input__inner {
          width: 396px;
        }
      }
      h3{
          text-align: center;
          margin: 20px;
      }
    }
  }
}
.el-message--success {
  background: #161616;
  border-color: #161616;
}
</style>
