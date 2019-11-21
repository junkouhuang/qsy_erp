<template>
    <div class="info_wrapp">
       <div class="info_left_bar">
           <div class="info_left_bar_item" :class="{active: infoType === '3'}" @click="getType('3')">
               <div class="info_left_bar_box">
                   <i class="fa fa-volume-off"></i>
                   全部消息
                </div>
           </div>
           <div class="info_left_bar_item" :class="{active: infoType === '2'}" @click="getType('2')">
               <div class="info_left_bar_box">
                   <i class="fa fa-volume-off"></i>
                   未读消息
                </div>
           </div>
           <div class="info_left_bar_item" :class="{active: infoType === '1'}" @click="getType('1')">
                <div class="info_left_bar_box">
                   <i class="fa fa-volume-off"></i>
                   已读消息
                </div>
           </div>
       </div>
       <div class="info_right_content" v-if="detailFlag === false">
           <div class="info_right_content_header">
               <span class="right_content_header_name">{{titleName}}</span>
               <el-button size="small" @click="dialogVisible = true">发送消息</el-button>
           </div>
           <div class="info_right_info_title">
               <button v-for="item in titleList" :key="item.code" :class="{active: classFlag === item.code}" @click="selecTitle(item)">
                   {{item.title}}
                   <span v-if="item.title !== '全部消息类型'">(<i>{{item.num}}</i>)</span>
               </button>
           </div>
           <el-table :data="tabList" ref="multipleTable" tooltip-effect="dark" style="width: 100%"  height="560px" @selection-change="handleSelectionChange" >
               <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="标题内容"
                    min-width="120">
                    <template slot-scope="scope">
                        <p class="item_box" @click="selectDeilt(scope.row)">
                            <span class="icon_rid" v-if="scope.row.boolRead == 2"></span>
                            <span class="item_box_p">
                                {{scope.row.title}}
                            </span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createdUsercode"
                    label="发送者"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    label="生成时间"
                    min-width="120"
                    show-overflow-tooltip>
                    <div slot-scope="scope">
                        {{getDateFun(scope.row.createdTime)}}
                    </div>
                </el-table-column>
                <el-table-column
                    label="类型"
                    min-width="120"
                    show-overflow-tooltip>
                    <div slot-scope="scope">
                        {{getDataType(scope.row.notifyType)}}
                    </div>
                </el-table-column>
           </el-table>
           <div class="right_content_btn">
                <el-button size="small" @click="deleteFun" :disabled="isHasCheck">删除</el-button>
                <el-button size="small" @click="readFun" :disabled="isHasCheck">标记已读</el-button>
                <el-button size="small" @click="allReadFun">全部已读</el-button>
                <el-button size="small" @click="allDeleteFun">全部删除</el-button>
                <el-button size="small" @click="unreadFun" :disabled="isHasCheck">标记未读</el-button>
           </div>
           <div class="right_content_page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="offset"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
           </div>
       </div>
       <div class="info_right_details" v-if="detailFlag === true">
           <span class="right_content_header_name">{{titleName}}</span>
           <div class="info_right_info_title">
                <button :class="{active: classFlag2 === 1}" @click="selecTitle2(0)">
                   返回上一级
                </button>
                 <button @click="selecTitle2(2)">
                   上一条
                </button>
                 <button @click="selecTitle2(3)">
                   下一级
                </button>
           </div>
           <div class="right_details_content">
               <h4>{{getDataType(this.detailObj.notifyType)}}</h4>
               <p>{{this.detailObj.title}}</p>
               <div class="right_info_footer">
                   <button>
                       <i class="fa fa-file-text-o" aria-hidden="true"></i>
                       下载附件
                   </button>
                   <div>
                       <p>发送者：<span>{{this.detailObj.createdUsercode}}</span></p>
                       <p>{{getDateFun(this.detailObj.createdTime)}}</p>
                   </div>
               </div>
           </div>
       </div>
       <el-dialog
          title="发送消息"
          :visible.sync="dialogVisible"
          width="30%"
          :close-on-click-modal= false>
            <div>
                <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px">
                    <el-form-item label="类型" prop="notifyType">
                        <el-select v-model="formObj.notifyType" placeholder="请选择类型" size='mini' style="width: 100%">
                            <el-option v-for="item in typeList" :key="item.code" :label="item.cname" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="formObj.title"  size='mini'></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" v-model="formObj.content"  size='mini'></el-input>
                    </el-form-item>
                    <el-form-item label="接收人" prop="recipient">
                        <el-select v-model="formObj.recipient" multiple  placeholder="请选择接收人" style="width: 100%"  size='mini'>
                            <el-option v-for="item in personList" :key="item.userCode" :label="item.userName" :value="item.userCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="立即发布">
                        <div class="floa_left">
                            <el-switch v-model="formObj.delivery"></el-switch>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input type="textarea" v-model="formObj.remarks"  size='mini'></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="suer()" class="add_clinet_box_suer">保 存</el-button>
                <el-button @click="dialogVisible = false" class="add_clinet_box_cancel">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import comFun from './js/index'
export default {
    data () {
        return {
            titleName: '未读消息',
            dialogVisible: false,
            isHasCheck:true,//当没勾选时，删除，标记已读，标记未读，这三个按钮做只读处理
            formObj: {
                notifyType: '', // 类型
                title: '', // 名称
                content: '', // 内容
                remarks: '', // 备注
                recipient: [], // 接收人
                delivery: false, // 立即发布
                important: 'asdc' // 重要性
            }, // 表单数据
            rules: {
                notifyType: [{ required: true, message: '请选择类型', trigger: 'change'}],
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                recipient: [{ required: true, message: '请选择接收人', trigger: 'change'}],
            }, // 表单校验规格
            typeList: [], // 类型列表
            personList: [], // 下拉人列表
            tabList: [], // 表格列表数据
            selecList: [], // 选择的数组列
            offset: 1, // 当前页数
            limit: 10, // 每页条数
            total: 0, // 总数
            titleList: [
                {
                    title: '全部消息类型',
                    code: 0,
                    num: ''
                },
                {
                    title: '公共消息',
                    code: 'MsgCate_Pub',
                    num: 99
                },
                {
                    title: 'CRM消息',
                    code: 'MsgCate_CRM',
                    num: 99
                },
                {
                    title: '报价消息',
                    code: 'MsgCate_meeting',
                    num: 99
                },
                {
                    title: '订单消息',
                    code: 'MsgCate_Rew_pun',
                    num: 99
                },
                {
                    title: '系统消息',
                    code: 'MsgCate_activity',
                    num: 99
                },
                {
                    title: '行政消息',
                    code: 'MsgCate_holidays',
                    num: 99
                },
                {
                    title: '生产消息',
                    code: 'MsgCate_appointment',
                    num: 99
                },
                {
                    title: '私有消息',
                    code: 'MsgCate_Pri',
                    num: 99
                }
            ], // 标题信息列表和个数
            classFlag: 0, // 点击之后改变样式
            infoType: '3', // 消息类想 2 未读 ， 1 为已读 3为全部
            classFlag2: 0, // 
            detailFlag: false,
            detailObj: {} // 详情数据
        }
    },
    created () {
        comFun.getTypeFun().then(res => {
            console.log(res, 'lei')
            if (res.code === 0) {
                this.typeList = res.obj
            }
        })
        comFun.getPeronFun().then(res => {
            console.log(res, 'ren')
            if (res.code === 0) {
                this.personList = res.obj
            }
        })
        // 这里有个很不合理获取数量方；后台改了在来做处理吧
        this.allNumListFun()
        // 获取表列表
        this.getInfoFun()
    },
    methods: {
        // 单个为已读
        oneReadFun (val) {
            this.$request.post('oa/notify/read', {id: val.id, type: '0'}).then(res => {
                console.log(res, 'chegg')
            })
        },
        // 点击内容
        selectDeilt (val) {
            // console.log(val)
            this.detailObj = val
            this.detailFlag = true
            this.oneReadFun(val)
        },
        // 一次获取全部数量
        allNumListFun () {
             // 公共消息
            this.getTitleNumFun ('MsgCate_Pub')
            // CRM消息
            this.getTitleNumFun ('MsgCate_CRM')
            // 报价消息
            this.getTitleNumFun ('MsgCate_meeting')
            // 订单消息
            this.getTitleNumFun ('MsgCate_Rew_pun')
            // 系统消息
            this.getTitleNumFun ('MsgCate_activity')
            // 行政消息
            this.getTitleNumFun ('MsgCate_holidays')
            // 生产消息
            this.getTitleNumFun ('MsgCate_appointment')
            // 私有消息
            this.getTitleNumFun ('MsgCate_Pri')
        },
        // 获取标题信息数量
        getTitleNumFun (val) {
            this.$request.post('/oa/notify/notifyCount', {notifyType: val}).then(res => {
                // console.log(res)
                if (val === 'MsgCate_Pub') {
                    this.titleList[1].num = res.total
                } else if (val === 'MsgCate_CRM') {
                    this.titleList[2].num = res.total
                } else if (val === 'MsgCate_meeting') {
                    this.titleList[3].num = res.total
                } else if (val === 'MsgCate_Rew_pun') {
                    this.titleList[4].num = res.total
                } else if (val === 'MsgCate_activity') {
                    this.titleList[5].num = res.total
                } else if (val === 'MsgCate_holidays') {
                    this.titleList[6].num = res.total
                } else if (val === 'MsgCate_appointment') {
                    this.titleList[7].num = res.total
                } else if (val === 'MsgCate_Pri') {
                    this.titleList[8].num = res.total
                }
            })
        },
        // 事件展示
        getDateFun (item) {
           return dayjs(item).format('YYYY-MM-DD HH:mm')
        },
        // 获取消息表格信息
        getInfoFun () {
            let obj = {
                notifyType: this.classFlag === 0 ? null : this.classFlag,
                boolRead: this.infoType === '3' ? null : this.infoType,
                offset: this.offset, // 当前页数
                limit: this.limit // 每页条数
            }
            this.$request.post('/oa/notify/message', obj).then(res => {
                console.log(res)
                this.tabList = res.rows
                this.total = res.total
                this.$forceUpdate()
            })
        },
        // 根据类型CODE解析出中文
        getDataType (code) {
            if (code === 'MsgCate_Pub') {
                return '公共消息'
            } else if (code === 'MsgCate_CRM') {
                return 'CRM消息'
            } else if (code === 'MsgCate_meeting') {
                return '报价消息'
            } else if (code === 'MsgCate_Rew_pun') {
                return '订单消息'
            } else if (code === 'MsgCate_activity') {
                return '系统消息'
            } else if (code === 'MsgCate_holidays') {
                return '行政消息'
            } else if (code === 'MsgCate_appointment') {
                return '生产消息'
            } else if (code === 'MsgCate_Pri') {
                return '私有消息'
            }
        },
        // 选择消息类型
        getType (val) {
            this.infoType = val
            this.detailFlag = false
            this.offset = 1
            this.limit = 10
            this.getInfoFun()
            this.allNumListFun()
        },
        selecTitle2 (val) {
            this.classFlag2 = val
            // 判断类型；如果返回需要重新刷新页面数据
            if (val === 0) {
                this.detailFlag = false
                this.allNumListFun()
                this.getInfoFun()
            } else if (val === 2) {
                for (let i = 0; i < this.tabList.length; i++) {
                    if (this.tabList[i].id === this.detailObj.id) {
                        if ((i > 0)) {
                            this.detailObj = JSON.parse(JSON.stringify(this.tabList[i - 1]))
                            break
                        } else {
                            this.detailObj = JSON.parse(JSON.stringify(this.tabList[i]))
                            break
                        }
                    }
                }
            } else if (val === 3) {
                for (let i = 0; i < this.tabList.length; i++) {
                    if (this.tabList[i].id === this.detailObj.id) {
                        if ((i < this.tabList.length - 1)) {
                            console.log(this.tabList[i + 1])
                            this.detailObj = JSON.parse(JSON.stringify(this.tabList[i + 1]))
                            break
                        } else {
                            this.detailObj = JSON.parse(JSON.stringify(this.tabList[i]))
                            break
                        }
                    }
                }
            }
            // 判断是否已读
            if (this.detailObj.boolRead === '2' || this.detailObj.boolRead === 2) {
                this.oneReadFun(this.detailObj)
            }
        },
        // 选择第标题
        selecTitle (val) {
            this.classFlag = val.code
            this.offset = 1
            this.limit = 10
            this.getInfoFun()
        },
        // 每页几条
        handleSizeChange (val) {
            this.limit = val
            this.getInfoFun()
        },
        // 改变页数
        handleCurrentChange (val) {
            this.offset = val
            this.getInfoFun()
        },
        // 第几页
        // 删除
        deleteFun () {
            // console.log(this.selecList)
            if (this.selecList.length !== 0) {
                let str = ''
                this.selecList.forEach((item, index) => {
                    if (index === this.selecList.length - 1) {
                        str += item.id
                    } else {
                        str += item.id + ','
                    }
                })
                this.$request.post('oa/notify/delete', {id: str}).then(res => {
                    console.log('chenggong')
                    if (res.code === 0) {
                        this.selecList = []
                        this.getInfoFun()
                    }
                })
            }
        },
        // 全部删除
        allDeleteFun () {
            this.$confirm('您确定要标记全部消息为删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$request.post('oa/notify/delete', {type: '1'}).then(res => {
                    if (res.code === 0) {
                        this.selecList = []
                        this.getInfoFun()
                    }
                })
            }).catch(() => {

            });
        },
        // 标记已读
        readFun () {
            if (this.selecList.length !== 0) {
                if (this.selecList.length !== 0) {
                    let str = ''
                    this.selecList.forEach((item, index) => {
                        if (index === this.selecList.length - 1) {
                            str += item.id
                        } else {
                            str += item.id + ','
                        }
                    })
                    this.$request.post('/oa/notify/read', {id: str, type: '1'}).then(res => {
                        // console.log('chenggong')
                        if (res.code === 0) {
                            this.selecList = []
                            this.getInfoFun()
                        }
                    })
                }
            }
        },
        // 全部已读
        allReadFun () {
            this.$confirm('您确定要标记全部消息为已读吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$request.post('/oa/notify/read', {type: '1'}).then(res => {
                    if (res.code === 0) {
                        this.selecList = []
                        this.getInfoFun()
                    }
                })
            }).catch(() => {

            });
        },
        // 标记未读
        unreadFun () {
            if (this.selecList.length !== 0) {
                if (this.selecList.length !== 0) {
                    let str = ''
                    this.selecList.forEach((item, index) => {
                        if (index === this.selecList.length - 1) {
                            str += item.id
                        } else {
                            str += item.id + ','
                        }
                    })
                    this.$request.post('/oa/notify/read', {id: str, type: '2'}).then(res => {
                        // console.log('chenggong')
                        if (res.code === 0) {
                            this.selecList = []
                            this.getInfoFun()
                        }
                    })
                }
            }
        },
        // 选择个数
        handleSelectionChange (val) {
            this.selecList = val
            this.isHasCheck = val.length>0?false:true;
        },
        // 关闭弹窗
        handleClose () {
            // console.log('aaaa')
            this.dialogVisible = false
        },
        // 确定
        suer () {
            this.$refs.formObj.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    let obj = {
                        // userCodes: this.formObj.recipient, // 接收人
                        notifyType: this.formObj.notifyType, // 类型
                        remarks: this.formObj.remarks, // 备注
                        content: this.formObj.content, // 内容
                        important: 'asdc' // 重要性
                    }
                    // 处理接收人多选的数据
                    if (this.formObj.recipient.length === 1) {
                        obj.userCodes = this.formObj.recipient[0]
                    } else if (this.formObj.recipient.length > 1) {
                        let str = ''
                        this.formObj.recipient.forEach((item, index) => {
                            // console.log(index)
                            if (index === this.formObj.recipient.length - 1) {
                                str = str + item
                            } else {
                                str = str + item + ','
                            }
                        })
                        obj.userCodes = str
                    }
                    this.$request.post('/oa/notify/save', obj).then(res => {
                        if (res.code === 0) {
                            this.dialogVisible = false
                        }
                    })
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
<style lang="less">
    @import './css/index.less';
</style>