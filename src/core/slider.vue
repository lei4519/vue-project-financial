<template>
  <section class="layoutStyle">
    <div v-swiper:mySwiper="options">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in items" :key="item.src">
          <img :src="item.src">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    layoutStyle: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default() {
        return {
          loop: true,
          autoplay: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            slideChange() {
              // console.log('onSlideChangeEnd', this)
            },
            tap() {
              // console.log('onTap', this)
            }
          }
        }
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
