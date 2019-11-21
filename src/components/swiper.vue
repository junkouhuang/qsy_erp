<template>
   <div class="swiper">
      <!-- swiper1 -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(item,index) in imgList" :key="index">
          <img :src="item" alt="">
        </swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs" v-show="imgList.length>1">
        <swiper-slide v-for="(item,index) in imgList" :key="index">
          <img :src="item" alt="">
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>
    </div>
</template>


<script>
import { swiper,swiperSlide} from 'vue-awesome-swiper'
  export default {
     props:{
        imgList:{
          type:Array,
          required:true
        }
      },
    data() {
      let seft=this
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          loop: true,
          loopedSlides: seft.imgList.length, //looped slides should be the same
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: seft.imgList.length,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: seft.imgList.length, //looped slides should be the same
          slideToClickedSlide: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    mounted() {      
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
    components: {
        swiper,
        swiperSlide
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    background-color: #fff;
     --swiper-theme-color: #666;/* 设置Swiper风格 */
    --swiper-navigation-color: #6666;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 16px;/* 设置按钮大小 */
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
    height: 400px;
    img{
     height: 100%;
     border: 1px solid #eee;
    }
  }
   .gallery-top-box {
        width: 100%;
        margin: 0 auto;
    }

    .gallery-thumbs-box {
        width: 100%;
        margin: 0 auto;
    }

    .swiper-container {
        width: 100%;
        height: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    .gallery-thumbs {
        height: 100px;
        box-sizing: border-box;
        padding: 10px 0;
        img{
          width: 100%;
          border: 1px solid #eee;
        }
    }

    .gallery-thumbs .swiper-slide {
        height: 100%;
        opacity: 0.4;
    }

    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }

    .gallery-thumbs .swiper-wrapper {
        transform: none!important;
    }
</style>