<template>
    <div class="order_flow_wrap">
        <div class="order_flow_wrap_menu"><navTwo @backNavMenuId='getbackNavMenuId'></navTwo></div>
        <router-view/>
    </div>
</template>
<script>
import navTwo from '../../components/navTwoBar.vue'
export default {
    date () {
        return {}
    },
    components:{
        navTwo
    },
    methods: {
        getbackNavMenuId (val, i) {
            console.log(val, i)
        }
    }
}
</script>
<style lang="less">
    .order_flow_wrap {
        padding: 10px;
        padding-bottom: 0;
        // height: 95%;
        height: 91%;
        // height: calc(100% - 60px);
        .order_flow_wrap_menu {
            margin-bottom: 10px;
        }
    }
</style>