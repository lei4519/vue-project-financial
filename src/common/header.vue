<template>
  <header :class="$style.header">
    <span :class="$style.left">
      <em>注册</em>&nbsp;|
      <em>登录</em>
    </span>
    <btn :class="$style.btnDownload">APP下载</btn>
  </header>
</template>

<script>
import btn from 'core/btn'
export default {
  components: {
    btn
  }
}
</script>

<style lang="scss" module>
@import "style/layout";
@import "style/element";
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 100px;
  font-size: 32px;
  background: #fff url(//m.jr.jd.com/spe/qyy/main/images/jr-logo.png) no-repeat
    center/auto 50%;
  color: #666;
  z-index: 1;
  .left {
    font-size: 28px;
    line-height: 30px;
    margin: 17px 0 0 18px;
  }
  .btnDownload {
    float: right;
    font-size: 24px;
    border-width: 0;
    line-height: 56px;
    min-width: 120px;
    padding: 0;
    border-radius: 4px;
    margin: 28px 24px 0 0;
  }
}
</style>