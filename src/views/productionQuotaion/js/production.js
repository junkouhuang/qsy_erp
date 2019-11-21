import Cookies from 'js-cookie'
export default {
    name: "production",
    data () {
        return {
            menuId: '7ecba3c9-c414-11e9-8631-000c290d53bf',
            pageSize: 15,
            currentPage:1,
            total:0,
            loading: true,
            tableHeight: window.innerHeight - 250,
           // twoTableHeight:window.innerHeight - 800,
            ruleForm:{
                poNo:'',attachmentOriginal3dname:'',orderNo:'',dateType:'',start:'',end:''
            },
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
            searchButtons:'',  //搜索框按钮列表
        }
    },
    methods: {
        /*----------- 开始时间(start)  --------------*/
        beginDate(){
            let self = this
            return {
            disabledDate(time){
                if(self.ruleForm.end){
                return new Date(self.ruleForm.end).getTime() < time.getTime()
                }
            }
            }
        },
        /*----------- 开始时间(end)  --------------*/
    
        /*----------- 结束日期(start)  --------------*/
        //提出结束时间必须大于提出开始时间
        processDate(){
            let self = this
            return {
            disabledDate(time){
                if(self.ruleForm.start){
                return new Date(self.ruleForm.start).getTime() > time.getTime()
                }
            }
            }
        },
        /*----------- 结束日期(end)  --------------*/
    }
}