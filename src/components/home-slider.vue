<template>
  <article class="container">
    <Slider :items="items" class="sliderStyle"></Slider>
    <section class="list">
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
      items: [
        {
          src: '//img12.360buyimg.com/jrpmobile/jfs/t1/23009/6/7431/46179/5c6bdcfeEec7d3241/73b35d695302db25.jpg?width=750&height=320'
        },
        {
          src: '//img12.360buyimg.com/jrpmobile/jfs/t1/27314/20/7438/69592/5c6bdd9aE70b97c46/4577bc3d8b1887bc.jpg?width=750&height=320'
        },
        {
          src: '//img12.360buyimg.com/jrpmobile/jfs/t1/17896/17/7539/139307/5c6bdddaE61e3bc62/4cc519acb4470e0b.jpg?width=750&height=320'
        },
        {
          src: '//img12.360buyimg.com/jrpmobile/jfs/t1/25557/18/7321/49244/5c6bdeddE08817e85/fa7feecb5fdc7e9b.jpg?width=750&height=320'
        }
      ],
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
  methods: {
    fetchData() {
      return this.$store.dispatch('fetchHomeData')
    }
  },
  computed: {
    swiper() {
      return this.$store.getters.swiper
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
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
  background-color: #fff;
  font-size: 26px;
  padding-top: 40px;
  justify-content: space-around;
  .item {
    text-align: center;
    a {
      text-decoration: none;
    }
    img {
      width: 90px;
      height: 90px;
    }
    p {
      font-size: 26px;
      color: #666;
      margin-top: 12px;
    }
  }
}
.sliderStyle {
  & /deep/ img {
    width: 100%;
  }
  & /deep/ .swiper-pagination-bullet {
    width: 14px;
    height: 14px;
    opacity: 0.5;
    background: url(//m.jr.jd.com/spe/qyy/main/images/banner_point_cur.png)
      center center;
    background-size: 14px 14px;
    margin: 0 5px;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      background: url(//m.jr.jd.com/spe/qyy/main/images/banner_point_cur.png)
        center center;
    }
  }
}
</style>