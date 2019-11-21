<template>
  <div>
          
        <img id="erpImg" src="../../assets/image/files.png"/>
            <input class="file" name="file" type="file" multiple="multiple" @change="fileUpload"/>
  </div>
</template>

<script>
export default {
    name: "test",
  components: {},
  data() {
    return {

    };
  },
  mounted () {
  alert(111111);
  },
  methods: {
    //   上传
    fileUpload(e){
        let files=e.target.files;
        for(let i=0;i<files.length;i++){
            let param = new FormData(); //创建form对象
            param.append('myfile',files[i]);//通过append向form对象添加数据
            this.$request.post('/salqtdetails/uploadQuotation', param).then(res => {
                console.log(res)    //请求成功方法，data为请求成功返回的数据
                if (res.code == 0) {
                    
                }
            }).catch(e=>{
                console.log("错误")
            })
        }
    },




    
  }
}
</script>