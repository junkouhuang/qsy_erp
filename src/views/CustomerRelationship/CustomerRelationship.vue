<template>
  <div id="CrmMain">
    <!-- 左侧树形 -->
    <div class="CrmLeft">
      <el-tree
              :data="leftmenudata"
              class="Crmtree"
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick" >
            <div class="custom-tree-node" slot-scope="{ data }">
              <!-- value:1表示一级 2表示2级 3表示3级 hasChildren-->
              <!-- hasChildren:false表示没有子目录右边箭头不显示-->
              <!-- 当前状态是否是点击状态-->
              <img v-if="data.value==1" src="../../assets/image/img10.png" >
              <img v-if="data.value==2" src="../../assets/image/img11.png">
              <!-- 文字部分根据不同级别，span宽度对应做调整-->
              <span v-if="data.value==1" class="txtname1">{{ data.text }}</span>
              <span v-if="data.value==2" class="txtname2">{{ data.text }}</span>
              <span v-if="data.value==3" class="txtname3">{{ data.text }}</span>
             <!-- <template>
                <img v-if="data.value==1  && data.hasChildren " src="../../assets/image/img09.png" >

              </template>
              <template>
                <img v-if="data.value==2  && data.hasChildren" src="../../assets/image/img09.png" >

              </template>-->
            </div>
      </el-tree>
    </div>
    <!-- 右侧内容 -->
    <div class="CrmRight">
      <!--右侧表格 -->
      <CustomerData :customerData.sync="tables"  :treeData.sync="treeData"/>
      <!-- <div class="right_bottom_back"></div> -->
    </div>
  </div>
</template>

<script>
  import CustomerData from "../CustomerRelationship/components/CustomerData/CustomerData";
  export default {
    name: "CustomerRelationship",
    components: {
      CustomerData
    },
    data() {
      return {
        restaurants: [],
        companyNo: "",
        isShown: false,
        isShownAdd: false,
        formLabelWidth: "120px",
        formitemWidth: "80px",
        radio: "1",
        // input
        inputs: ["公司编号:", "公司名称:"],
        // 编辑弹窗form
        form: {
          companyNumber: "", //公司编号
          // customerName:"",
          customerShortname: "", //公司简称
          customerFullname: "", //公司全称
          source: "", //来源
          companyAddress1: "",
          companyAddress2: "",
          customerServiceCategory: "",
          industry: "",
          countryName: "",
          cityName: "",
          shippingAddress: "", //收货地址
          // companyAddress: "",
          companyPhone: "",
          color: "", //颜色标识
          developmentTime: "",
          payment: "",
          note: "",
          collectingBank: "",
          currencyType: "",
          bankAccount: "",
          householder: ""
        },
        // 业务人员增加弹窗
        customerForm: {
          contactNumber: "",
          contactName: "",
          landline: "",
          telephone: "",
          contactEmail: "",
          position: "",
          skype: "",
          birthday: "",
          qq: "",
          weixing: "",
          whatsapp: "",
          loginPwd: "",
          remark: "",
          enable: ""
        },
        // 左侧树形菜单
        leftmenudata: [],
        // 右边table组件数据显示；根据左边获取出来不同code；获取到不同数据
        tables: [],
        treeData:[],
        defaultProps: {
          children: "children",
          label: "text"
        },
        //联系人数据
        cancatData:[
          {
            contactNumber: "C00015",
            contactName: "xzy",
            landline: "120456630",
            telephone: "15675273393",
            contactEmail: "2428066192@qq.com",
            position: "IT",
            skype: "",
            qq: "",
            weixing: "",
            whatsapp: "",
            enable: "是"
          }
        ],
        // 业务人员数据
        customerTables: [
          {
            contactNumber: "C00015",
            contactName: "xzy",
            landline: "120456630",
            telephone: "15675273393",
            contactEmail: "2428066192@qq.com",
            position: "IT",
            skype: "",
            qq: "",
            weixing: "",
            whatsapp: "",
            enable: "是"
          },
          {
            contactNumber: "C00015",
            contactName: "xzy",
            landline: "120456630",
            telephone: "15675273393",
            contactEmail: "2428066192@qq.com",
            position: "IT",
            skype: "",
            qq: "",
            weixing: "",
            whatsapp: "",
            enable: "是"
          }
        ],
        // 客户信息
        customerData: [
          /*{
            dataItem: "contactNumber",
            dataName: "联系人编号"
          },
          {
            dataItem: "contactName",
            dataName: "联系人姓名"
          },
          {
            dataItem: "landline",
            dataName: "座机"
          },
          {
            dataItem: "telephone",
            dataName: "手机号码"
          },
          {
            dataItem: "contactEmail",
            dataName: "联系人邮箱"
          },
          {
            dataItem: "position",
            dataName: "职位"
          },
          {
            dataItem: "skype",
            dataName: "skype"
          },
          {
            dataItem: "qq",
            dataName: "QQ"
          },
          {
            dataItem: "weixing",
            dataName: "微信"
          },
          {
            dataItem: "whatsapp",
            dataName: "whatsapp"
          },
          {
            dataItem: "enable",
            dataName: "是否启用"
          }*/
        ]
      };
    },
    methods: {
/*      renderContent(h, { node, data, store }) {
        console.log(node);
        console.log(data);
        console.log(store);
        console.log("====");
        return (
                <span>

                <i class={data.className}></i>
                <span>{node.label}ss</span>
                </span>
      );
      },*/
      // 右边table组件数据显示；根据左边获取出来不同code；获取到不同数据
      handleNodeClick(data) {
        this.treeData = data;
        this.treeData['page'] = 1;
        this.treeData['pageSize'] = 10;
        this.listByParam(this.treeData);
      },
      listByParam(data){
        let arr =new Array();
        arr = data.value == 1 || data.value == 2? {code:this.treeData.id,level:this.treeData.value,page:this.treeData.page,rows:this.treeData.pageSize}:{code:data.id,level:data.value,parentCode:this.treeData.parentId,page:this.treeData.page,rows:this.treeData.pageSize} //level为1表示1级，为2表示2级，为3表示3级
        this.$request.post("/salctcompany/listByParam",arr).then(data => {
          this.treeData.total = data.obj.page;
          this.treeData.total = data.obj.total;
          this.tables=data.obj.rows;
        }).catch(e => {
          console.log("123456", e);
        });
      },
      getMeunList() {}
    },
    created() {
      // 获取初始化页面的左边树形目录

      this.$request.post('/salctcompany/getCategory', {}).then(res => {
        if (res.code === 0) {
            console.log(res);
            console.log("=========");
          // 待处理
          this.leftmenudata = res.obj.children;
          this.handleNodeClick(res.obj.children[0]);//默认显示公共客户池的信息
        }
      })
    },
    mounted() {

    }
  };
</script>


<style scope lang="less">
  #CrmMain {
    width: 100%;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    /* margin: 15px 0 80px 0; */
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    text-align: center;
    box-sizing: border-box;
  }
  .CrmLeft {
    background: #fff;
    min-width: 200px;
  }
  .CrmRight {
    width: 100%;
    flex: 1;
    overflow: hidden;
    margin-left: 10px;
    background-color: #ffffff;
    position: relative;
    .crm_compont {
      padding: 0 10px;
    }
    .right_bottom_back {
      position: absolute;
      width: 100%;
      height: 10px;
      background: #fff;
      bottom: -10px;
      left: 210px;
    }
  }
  .Crmtree {
    margin-top: 15px;
    .el-icon-caret-right {
      position: absolute;
      right: 0;
    }
    .custom-tree-node {
      .txtname1 {
        width: 160px;
        margin-left: 6px;
        display: inline-block;
        text-align: left;
        font-size:14px;
      }
      .txtname2 {
        width: 146px;
        margin-left: 6px;
        display: inline-block;
        text-align: left;
        font-size:14px;
      }
      .txtname3 {
        width: 142px;
        display: inline-block;
        text-align: left;
        font-size:14px;
      }
    }
  }

  .icon {
    line-height: 30px;
  }
  /* 水平对齐方式 公共 */
  .row-flex-start {
    text-align: left;
  }
  /* 右侧头部固定 */
  .el-input {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    text-align: center;
    margin-right: 20px;
  }
  .P_head {
    width: 3px;
    height: 16px;
    margin-left: 20px;
    background: #999999;
  }

  .tree-icon {
    display: inline-block;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .group-class {
    width: 16px;
    height: 16px;
    overflow: hidden;
    margin-right: 10px;
    background-image: url("../../assets/icons/left_group_class.png");
  }
  .child-class {
    width: 12px;
    height: 13px;
    overflow: hidden;
    margin-right: 10px;
    background-image: url("../../assets/icons/left_child_class.png");
  }
  .right_group_icon {
    width: 6px;
    height: 10px;
    overflow: hidden;
    background-image: url("../../assets/icons/right_group_icon.png");
  }
  .up_group_icon {
    width: 10px;
    height: 6px;
    overflow: hidden;
    background-image: url("../../assets/icons/up_group_icon.png");
  }
  .Content {
    margin: 15px 1px;
  }
</style>

