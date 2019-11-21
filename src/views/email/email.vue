<template>
    <div id="email">
        <div class="left" id="left">
            <ul class="email_menu">
              <li class="write list">
                <router-link :to="{name:'write'}">
                   写信
               </router-link>
              </li>
              <li class="Inbox active list">
                <router-link :to="{name:'inbox'}">
                   收件箱 (168)
               </router-link>
              </li>
              <hr class="line" />
              <li class="addressBook list">
                <router-link :to="{name:'addressBook'}">
                   通讯录
               </router-link>
              </li>
              <li class="send list">
                <router-link :to="{name:'send'}">
                   已发送
               </router-link>
              </li>
               <li class="drafts list">
                <router-link :to="{name:'drafts'}">
                   草稿箱
               </router-link>
              </li>
               <li class="InterstellarEmail list">
                <router-link :to="{name:'InterstellarEmail'}">
                   星标邮件
               </router-link>
              </li>
               <li class="RegularMail list">
                <router-link :to="{name:'RegularMail'}">
                   定时邮件
               </router-link>
              </li>
               <li class="del list">
                <router-link :to="{name:'del'}">
                   已删除
               </router-link>
              </li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>
<script>
export { default } from './js/email'
</script>
<style lang="less">
 @import './css/style.less';
</style>