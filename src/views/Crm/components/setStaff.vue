<template>
    <div>
        <div>
            <h1>显示在职人员</h1>
            <div>
                <div v-for="item in staffArr" :key="item.id" @click="adjust(item)">
                    {{item.name}} ( {{item.orderNumber}})
                </div>
            </div>
        </div>
        <div>
            <h1>隐藏离职人员</h1>
            <div>
                <div v-for="item in noStaffArr" :key="item.id" @click="entry(item)">
                    {{item.name}} (0)
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            staffArr: [{name: '武昌'}], // 在职人员
            noStaffArr: [], // 离职人员
        }
    },
    methods: {
        // 改变会离职
        adjust (val) {
            if (val.orderNumber === 0 || val.orderNumber === '0') {
                staffArr.forEach((item, index) => {
                    if (item.id === val.id) {
                        this.staffArr.splice(index, 1)
                        this.noStaffArr.push(val)
                    }
                })
            } else {
                this.$message.error('请先转移客户信息');
            }
        },
        // 离职改变为在职
        entry (val) {
            noStaffArr.forEach((item, index) => {
                if (item.id === val.id) {
                    this.noStaffArr.splice(index, 1)
                    this.staffArr.push(val)
                }
            })
        }
    }
}
</script>
<style lang="less">
</style>
