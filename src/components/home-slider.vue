<template>
  <article :class="$style.container">
    <Slider></Slider>
    <section :class="$style.list">
      <div class="item" v-for="item in enters" :key="item.img">
        <router-link :to="{name: item.href}">
          <img :src="item.img" alt="item.title">
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </section>
  </article>
</template>

<script>
import Slider from 'core/slider.vue'

export default {
  data() {
    return {
      items: [],
      enters: [
        {
          img: '//img12.360buyimg.com/jrpmobile/jfs/t3991/64/2521945388/12110/93c0139/58d1e462Ncf294123.png?width=132&height=132',
          href: 'home',
          title: '优惠券'
        },
        {
          img: '//img12.360buyimg.com/jrpmobile/jfs/t5590/252/875247023/17343/946aa72c/59224650N0f7ffc92.png?width=132&height=132',
          href: 'home',
          title: '领福利'
        },
        {
          img: '//img12.360buyimg.com/jrpmobile/jfs/t4393/329/2180608902/13217/c88c0cec/58ec9dcdN1534e2d7.png?width=132&height=132',
          href: 'home',
          title: '抢钢镚'
        },
        {
          img: '//img12.360buyimg.com/jrpmobile/jfs/t4618/115/2179710654/11347/bf520df/58ec9d84Nfd169001.png?width=132&height=132',
          href: 'home',
          title: '领京豆'
        },
        {
          img: '//img12.360buyimg.com/jrpmobile/jfs/t5488/298/1036263348/12073/b4f4de97/590ac8e8Ne9def22e.png?width=135&height=135',
          href: 'home',
          title: '白条提额'
        }
      ]
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" module>
@import "style/element.scss";
.container {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
}
.list {
  @include list(row);
  font-size: 26px;
  img {
    width: 90px;
    height: 90px;
  }
}
</style>