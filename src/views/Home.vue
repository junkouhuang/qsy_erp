<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      user: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$request.post('/admin', {}).then(res => {
        console.log('--------------------------------');
        console.log(res)
      })
    }
  }
}
</script>
