<template>
  <div class="upload">
    <!--<h2>OSS web直传-&#45;&#45;在服务端php签名, OSS会在文件上传成功，回调用户设置的回调url</h2>-->
    <!--<ol>-->
    <!--<li>基于plupload封装</li>-->
    <!--<li>支持html5,flash,silverlight,html4 等协议上传</li>-->
    <!--<li>可以运行在PC浏览器，手机浏览器，微信</li>-->
    <!--<li>签名在服务端(php)完成, 安全可靠, 推荐使用!</li>-->
    <!--<li>显示上传进度条</li>-->
    <!--<li>可以控制上传文件的大小,允许上传文件的类型,本例子设置了，只能上传jpg,png,gif结尾和zip,rar文件，最大大小是10M</li>-->
    <!--<li>最关键的是，让你10分钟之内就能移植到你的系统，实现以上牛逼的功能！</li>-->
    <!--<li>注意一点:bucket必须设置了Cors(Post打勾）,不然没有办法上传</li>-->
    <!--<li>注意一点:此例子默认是上传到user-dir目录下面，这个目录的设置是在php/get.php, $dir变量!</li>-->
    <!--<li>注意一点:把php/get.php里面的callbackUrl变量改成你自己的url</li>-->
    <!--<li>注意一点:这里返回的success,是OSS已经回调应用服务器，应用服务已经返回200!</li>-->
    <!--<li><a href="https://help.aliyun.com/document_detail/oss/practice/pc_web_upload/js_php_callback.html">点击查看详细文档</a>-->
    <!--</li>-->
    <!--</ol>-->
    <!--<br>-->
    <!--这个决定上传文件名字-->
    <form name=theform v-show="flag">
      <input type="radio" name="myradio" value="local_name"/> 上传文件名字保持本地文件名字
      <input type="radio" name="myradio" value="random_name" checked="true"/> 上传文件名字是随机文件名, 后缀保留
    </form>
    <!--文件队列-->
    <h4 v-show="flag">您所选择的文件列表：</h4>
    <!--<div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>-->
    <div id="ossfile" v-show="flag"></div>
    <div id="container">
      <p :id='msg23'  href="javascript:void(0);" class='btn'  @mousedown="getsign">上传3D图纸</p>
      <a id="postfiles" href="javascript:void(0);" class='btn' v-show="flag">开始上传</a>
    </div>
    <!--提示语-->
    <pre id="console" v-show="flag"></pre>
    <p v-show="flag"></p>
  </div>
</template>

<script>
  // 导入plupload包
  import plupload from 'plupload'
  import * as $ from 'jquery'

  export default {
    name: "uploadoss",
    data() {
      return {
        // 将不需要显示的控件隐藏
        flag:false,
        // 保存页面需要渲染的文件数据
        // ossurldata:[],
        objValue: {
          accessid: '',
          accesskey: '',
          host: '',
          policyBase64: '',
          signature: '',
          callbackbody: '',
          filename: '',
          key: '',
          expire: 0,
          g_object_name: '',
          g_object_name_type: ''
        }, // res创建的数据；封装obj
        resVaule: {}, // 请求返回的数据
        msg:'abc',
        msg23:'selectfiles_a',
        timestamp: Date.parse(new Date()) / 1000,
        now: Date.parse(new Date()) / 1000,
      }
    },
    methods: {
      getsign () {
        this.msg23="iii_aaa"
        // '/oss/oss/uploadFile', {paraCode: 'OSSQuoteDM'}
        // 'http://47.106.92.209:8087/qt-admin/quotation/upload', {}
        this.$request.post('/oss/oss/uploadFile', {paraCode: 'OSSQuoteDM'})
          .then((response) => {
            // console.log('加工方式',response);
            // console.log(this);//vm
            // console.log(response);
            if (response.code === 0 && response.obj) {
              // var obj = response.ob
              $('.moxie-shim').remove();
              this.resVaule = response.obj
              // 莫名参数
              // 创建uploader上传实例上传
              var uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                // browse_button: 'selectfiles',
                browse_button: this.msg23,
                //multi_selection: false,
                container: document.getElementById('container'),
                flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
                url: 'http://oss.aliyuncs.com',
                filters: {
                  mime_types: [ //只允许上传图片和zip文件和stl文件
                    // {title: "Image files", extensions: "jpg,gif,png,bmp"},
                    // {title: "Zip files", extensions: "zip,rar"},
                    {title: "THREE files", extensions: "stl,STL,igs,IGS,IGES,iges,step,stp,IGES,STP,STEP"}
                  ],
                  max_file_size: '100mb', //最大只能上传100mb的文件
                  prevent_duplicates: true//是否允许选取重复文件
                },
                init: {
                  PostInit:()=> {
                    // console.log(this);
                    // $(".mouseleave").html(1);
                    // $(".mouseleaveflag").html("start");
                    console.log('第一步,按钮被点击,获取oss密钥,并出现文件选择窗口');
                    document.getElementById('ossfile').innerHTML = '';
                    document.getElementById('postfiles').onclick = function () {
                      this.set_upload_param(uploader, '', false)
                      return false;
                    }
                  },
                  FilesAdded:  (up, files)=> {
                    console.log('第二步,有新文件添加至队列')
                    if(uploader.files.length>10){
                        alert("一次只能上传十个文件，请删除多余文件!")
                        return;
                    }
                    // console.log(this);
                    this.set_upload_param(uploader, '', false);
                    // console.log(files);
                    //向父组件发送数据
                    this.$emit('getossdata',files);
                    plupload.each(files,  (file)=> {
                      document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                        + '</div>';
                    });
                  },
                  BeforeUpload: (up, file) => {
                    console.log('第三步,上传前准备');
                    this.check_object_radio()
                    this.set_upload_param(up, file.name, true)
                  },
                  UploadProgress:  (up, file)=> {
                    console.log('第四步,上传中...');
                    this.$emit('getprogressbar',file.id,file.percent)
                    // console.log(file);
                    var d = document.getElementById(file.id);
                    d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                    var prog = d.getElementsByTagName('div')[0];
                    // progBar是上传进度
                    var progBar = prog.getElementsByTagName('div')[0]
                    // console.log(file.percent);
                    progBar.style.width = 2 * file.percent + 'px';
                    progBar.setAttribute('aria-valuenow', file.percent);
                    // console.log(this.ossdata);
                  },
                  FileUploaded:  (up, file, info) =>{
                    console.log('第五步,上传结束后,获取oss路径,并在ossurl中添加当前上传的对象')
                    if (info.status == 200) {
                      document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' +
                        this.get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + JSON.stringify(info);
                      // $(".mouseleave").html(1)
                      // $(".mouseleaveflag").html("start")
                      // 获取上传后文件的id
                      var igsCanvasId = file.id;
                      var ossPath = this.objValue.host + '/' + this.get_uploaded_object_name(file.name);
                      //将路径添加到
                      this.$emit('getossurl',ossPath,igsCanvasId,file,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551175656701&di=1ffd5ecd2282338e42b44b6ab71384fd&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf745342987031e9387958409c512665db6513ab81bb-5M44D2_fw658');
                      // this.ossurldata.push(ossPath);
                    }
                    else if (info.status == 203) {
                      document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
                    }
                    else {
                      document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                    }
                  },

                  Error: (up, err) => {
                    console.log('出现错误');
                    if (err.code == -600) {
                      document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
                    }
                    else if (err.code == -601) {
                      document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
                    }
                    else if (err.code == -602) {
                      document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
                    }
                    else {
                      document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                    }
                  }
                }
              });
              // console.log(uploader);
              uploader.init()
            }
            else {
              return;
            }
          })
      },
      check_object_radio () {
        console.log('????')
        var tt = document.getElementsByName('myradio')
        for (var i = 0; i < tt.length; i++) {
          if (tt[i].checked) {
            this.objValue.g_object_name_type = tt[i].value
            break;
          }
        }
      },
      get_signature (obj, objValue) {
        console.log('???')
        // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
        objValue.now = objValue.timestamp = Date.parse(new Date()) / 1000;
        if (objValue.expire < objValue.now + 3) {
          objValue.host = obj['host']
          objValue.policyBase64 = obj['policy']
          objValue.accessid = obj['accessid']
          objValue.signature = obj['signature']
          objValue.expire = parseInt(obj['expire'])
          objValue.callbackbody = obj['callback']
          objValue.key = obj['dir']
          return true
        }
        return false
      },
      random_string (len) {
        len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      },
      get_suffix(filename) {
        let pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos != -1) {
          suffix = filename.substring(pos)
        }
        return suffix;
      },
      calculate_object_name(filename) {
        if (this.objValue.g_object_name_type == 'local_name') {
          this.objValue.g_object_name += "${filename}"
        }
        else if (this.objValue.g_object_name_type == 'random_name') {
          let suffix = this.get_suffix(filename)
          this.objValue.g_object_name = this.objValue.key + this.random_string(10) + suffix
        }
        return ''
      },
      get_uploaded_object_name(filename) {
        if (this.objValue.g_object_name_type == 'local_name') {
          let tmp_name = this.objValue.g_object_name
          tmp_name = tmp_name.replace("${filename}", filename);
          return tmp_name
        }
        else if (this.objValue.g_object_name_type == 'random_name') {
          return this.objValue.g_object_name
        }
      },
      set_upload_param(up, filename, ret) {
        if (ret == false) {
          console.log('???4')
          ret = this.get_signature(this.resVaule, this.objValue)
        }
        this.objValue.g_object_name = this.objValue.key;
        if (filename != '') {
          let suffix = this.get_suffix(filename)
          console.log(suffix)
          this.calculate_object_name(filename)
        }
        let new_multipart_params = {
          'key': this.objValue.g_object_name,
          'policy': this.objValue.policyBase64,
          'OSSAccessKeyId': this.objValue.accessid,
          'success_action_status': '200', //让服务端返回200,不然，默认会返回204
          // 'callback' : callbackbody,
          'signature': this.objValue.signature,
        };
        up.setOption({
          'url': this.objValue.host,
          'multipart_params': new_multipart_params
        });
        up.start();
      }
    }
  }
</script>

<style scoped lang="less">
  .upload {
    overflow: hidden;
    float: left;
    font-size: 12px;
    /*width: 13%;*/
    // width: 160px;
    // height: 50px;
    // background: #f23f3f;
    color: #fff;
    line-height:50px;
    /*line-height: 3em;*/
    text-align: center;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;

    a {
      color: #0c0c0c;
    }
    .btn {
      width:100px;
      height:30px;
      border:1px solid rgba(102,102,102,1);
      border-radius:15px;
      color: #666666;
      /*background-color: #337ab7;*/
      background-color: #fff;
      // border-color: #f23f3f;
      /*display: inline-block;*/
      /*padding: 20px 30px;*/
      margin-bottom: 0;
      font-size: 12px;
      /*font-size: 1vw;*/
      font-weight: 400;
      /*line-height: 1.42857143;*/
      text-align: center;
      // white-space: nowrap;
      // text-decoration: none;
      // vertical-align: middle;
      line-height: 30px;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      // border: 1px solid transparent;
      // border-radius: 4px;
    }
    .btn:hover {
      background: #666;
      color: #fff;
    }
    /*a.btn:hover {*/
      /*background-color: #3366b7;*/
    /*}*/
    .progress {
      margin-top: 2px;
      width: 200px;
      height: 14px;
      margin-bottom: 10px;
      overflow: hidden;
      background-color: #f5f5f5;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    }
    .progress-bar {
      background-color: rgb(92, 184, 92);
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
      background-size: 40px 40px;
      box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
      box-sizing: border-box;
      color: rgb(255, 255, 255);
      display: block;
      float: left;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      transition-delay: 0s;
      transition-duration: 0.6s;
      transition-property: width;
      transition-timing-function: ease;
      width: 266.188px;
    }
  }
</style>
