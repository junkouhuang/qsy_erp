<template>
  <div id="goOutCheckIn">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition">搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item label="登记人" prop="djr">
            <el-input placeholder v-model="ruleForm.djr" suffix-icon="el-icon-search" size="small"></el-input>
          </el-form-item>
          <div style="display: inline-block;">
            <el-form-item label="外出日期" prop="start" style="margin: 0;">
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
            <el-button type="warning" size="small" @click="apply">外出登记</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
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
            </div>
            <div v-else>{{ row[item.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialog"
        width="815px"
        class="goOutCheckInDialog"
      >
        <el-form :model="initDialogForm" :rules="rules" ref="initDialogForm" :inline="true" size="mini">
          <el-form-item label="登记人" prop="djr">
            <el-input v-model="initDialogForm.djr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="外出日期" prop="wcrq">
            <el-date-picker v-model="initDialogForm.wcrq" ref="wcrq" type="date" prefix-icon=" "></el-date-picker>
          </el-form-item>
          <el-form-item label="外出时间" prop="wcsj">
            <el-time-picker v-model="initDialogForm.wcsj" ref="wcsj" format="HH:mm" prefix-icon=" "></el-time-picker>
          </el-form-item>
          <el-form-item label="预计返岗时间" prop="yjfgsj">
            <el-time-picker v-model="initDialogForm.yjfgsj" ref="yjfgsj" format="HH:mm" prefix-icon=" "></el-time-picker>
          </el-form-item>
          <el-form-item label="外出地点" prop="wcdd">
            <el-input v-model="initDialogForm.wcdd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="实际回来时间">
            <el-time-picker v-model="initDialogForm.sjhlsj" ref="sjhlsj" format="HH:mm" prefix-icon=" "></el-time-picker>
          </el-form-item>
          <el-form-item label="外出事由 （详细说明）" prop="wcsy" class="tripleItem">
            <el-input type="textarea" v-model="initDialogForm.wcsy"></el-input>
          </el-form-item>
          <el-form-item label="人事负责人" prop="rsfzr">
            <el-select v-model="initDialogForm.rsfzr">
              <el-option label="人事欧欧" value="人事欧欧"></el-option>
              <el-option label="张三" value="张三"></el-option>
              <el-option label="李四" value="李四"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" class="doubleItem">
            <el-input v-model="initDialogForm.bz" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitDialogData('initDialogForm')" size="small">确 定</el-button>
          <el-button @click="dialog = false" size="small">取 消</el-button>
        </div>
        <h3>说明：员工外出超过15分钟需进行登记，并告知部门负责人审批、人事负责人，考勤员定期进行稽核</h3>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: "goOutCheckIn",
  components: {},
  data() {
    return {
      dialogTitle: "",
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      ruleForm: {
        djr: "",
        start: "",
        end: ""
      },
      tableHeight: window.innerHeight - 320,
      tHeadData: [],
      tableData: [],
      loading: true,
      dialog: false,
      initDialogForm: "",
      dialogForm: {
        djr: '',
        wcrq: '',
        wcsj: '',
        yjfgsj: '',
        wcdd: '',
        sjhlsj: '',
        wcsy: '',
        rsfzr: '',
        bz: ''
      },
      rules:{       
        djr:[
            { required: true, message: '登记人不能为空', trigger: 'blur' },
        ],
        wcrq:[
          { type: 'date', required: true, message: '请选择外出日期', trigger: 'change' }
        ],
        wcsj:[
          { type: 'date', required: true, message: '请选择外出时间', trigger: 'change' }
        ],
        yjfgsj:[
          { type: 'date', required: true, message: '请选择预计返岗时间', trigger: 'change' }
        ],
        wcdd:[
          { required: true, message: '外出地点不能为空', trigger: 'blur' },
        ],
        wcsy:[
          { required: true, message: '外出事由不能为空', trigger: 'blur' },
        ],
        rsfzr:[
          { required: true, message: '请选择人事负责人', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    console.log(this.tHeadData);
    setTimeout(() => {
      this.tHeadData = [
        { name: "操作", prop: "cz" },
        { name: "登记人", prop: "djr" },
        { name: "外出日期", prop: "wcrq" },
        { name: "外出时间", prop: "wcsj" },
        { name: "预计返岗时间", prop: "yjfgsj" },
        { name: "外出地点", prop: "wcdd" },
        { name: "外出事由（详细说明）", prop: "wcsy" },
        { name: "人事负责人", prop: "rsfzr" },
        { name: "实际回来时间", prop: "sjhlsj" },
        { name: "备注", prop: "bz" }
      ];
      this.tableData = [
        {
          cz: "编辑 删除",
          djr: "文斌",
          wcrq: "2019-05-04",
          wcsj: "07:55",
          yjfgsj: "12:00",
          wcdd: "工厂",
          wcsy: "客户来参观工厂",
          rsfzr: "人事欧欧",
          sjhlsj: "14:00",
          bz: "无"
        },
        {
          cz: "编辑 删除",
          djr: "林文",
          wcrq: "2019-05-04",
          wcsj: "07:55",
          yjfgsj: "12:00",
          wcdd: "工厂",
          wcsy: "客户来参观工厂",
          rsfzr: "人事欧欧",
          sjhlsj: "18:00",
          bz: ""
        }
      ];
      this.loading = false;
      this.tHeadData.forEach((item, index) => {
        switch (item.prop) {
          case "cz":
            item.width = 90;
            item.align = "center";
            break;
          case "wcsy":
            item.width = 180;
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
    edit(index, row) {
      //点击列表编辑
      this.initDialogForm = { 
          ...row, 
          rowIndex: index, 
          wcsj: new Date('', '','', row.wcsj.split(':')[0], row.wcsj.split(':')[1]), 
          yjfgsj: new Date('', '','', row.yjfgsj.split(':')[0], row.yjfgsj.split(':')[1]), 
          sjhlsj: new Date('', '','', row.sjhlsj.split(':')[0], row.sjhlsj.split(':')[1]), 
      }; //表单渲染
      console.log(index);
      console.log(row);
      this.dialog = true;
      this.dialogTitle = "编辑";
    },
    resetForm(formName) {
      //清空表单搜索条件
      this.$refs[formName].resetFields();
      console.log("清空搜索条件-----------");
    },
    apply () {
      this.initDialogForm = {...this.dialogForm}   //表单渲染
      console.log('外出申请')
      this.dialogTitle = '外出申请'
      this.dialog = true
    },
    submitDialogData(formData) {
      //提交弹框数据
      this.$refs[formData].validate((valid) => {
          if (valid) {
            // const loading = this.$loading({
            //   lock: true,
            //   text: "提交数据中",
            //   // spinner: 'el-icon-loading',
            //   background: "rgba(255, 255, 255, 0.4)"
            // });
            // console.log("索引" + this.initDialogForm.rowIndex);
            // if (this.initDialogForm.rowIndex != undefined) {
            //   let that = this;
            //   setTimeout(() => {
            //     this.initDialogForm.wcrq = that.$refs.wcrq.displayValue
            //     this.initDialogForm.wcsj = that.$refs.wcsj.displayValue
            //     this.initDialogForm.yjfgsj = that.$refs.yjfgsj.displayValue
            //     this.initDialogForm.sjhlsj = that.$refs.sjhlsj.displayValue
            //     this.$set(
            //       that.tableData,
            //       that.initDialogForm.rowIndex,
            //       that.initDialogForm
            //     );
            //     loading.close();
            //     this.dialog = false;
            //     this.$message({
            //       type: "success",
            //       message: this.dialogTitle + "成功!"
            //     });
            //   }, 1000);
            // } else {
            //   let that = this;
            //   setTimeout(() => {
            //     this.initDialogForm.wcrq = that.$refs.wcrq.displayValue
            //     this.initDialogForm.wcsj = that.$refs.wcsj.displayValue
            //     this.initDialogForm.yjfgsj = that.$refs.yjfgsj.displayValue
            //     this.initDialogForm.sjhlsj = that.$refs.sjhlsj.displayValue
            //     this.tableData.push(this.initDialogForm);
            //     loading.close();
            //     this.dialog = false;
            //     this.$message({
            //       type: "success",
            //       message: this.dialogTitle + "成功!"
            //     });
            //   }, 1000);
            // }
          } else {
            console.log('error submit!!');
            return false;
          }
      });
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
    //提出结束时间必须大于提出开始时间
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
#goOutCheckIn {
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
    .goOutCheckInDialog {
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
        width: 96px;
        text-align: right;
      }
      .el-input__inner {
        width: 150px;
        padding-left: 10px;
      }
      .el-date-editor.el-input{
          width: 150px;
      }
      .tripleItem {
        width: 764px;
        .el-form-item__label{
            text-align: center;
        }
        .el-textarea__inner {
          width: 668px;
          height: 56px;
          padding-left: 10px;
          resize: none;
        }
      }
      .doubleItem {
        width: 505px;
        .el-input__inner {
          width: 409px;
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
