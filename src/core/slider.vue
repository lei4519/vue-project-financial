<template>
  <section :class="cname">
    <swiper :options="options" :not-next-tick="options.notNextTick">
      <swiper-slide v-for="item in items" :key="item.href">
        <router-link :to="{name: item.href}">
          <img :src="item.src">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" v-if="options.pagination"></div>
    </swiper>
  </section>
</template>

<script>
/* eslint-disable */
import { swiper, swiperSlider } from 'vue-awesome-swiper'
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
          },
          notNextTick: false
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
  components: {
    swiper,
    swiperSlider
  }
}
</script>

<style lang="css">
@import "../../node_modules/swiper/dist/css/swiper.min.css";
</style>