<!-- <template>
  <section :class="cname" class="wrapererr">
    <div v-swiper:mySwiper="options">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in items" :key="item.src">
          <router-link to="/">
            <img :src="item.src">
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template> -->
<template>
  <div v-swiper:mySwiper="options" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items"  :key="item.src">
        <img :src="item.src">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    cname: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.mySwiper);
  }
}
</script>

<style lang="css">
@import "../../node_modules/swiper/dist/css/swiper.min.css";
</style>