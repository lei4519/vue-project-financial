<template>
  <div>
    <headerVue/>
    <router-view/>
    <!-- <footerVue/> -->
    <!-- <navBarVue/> -->
  </div>
</template>

<script>
import headerVue from 'common/header'
// import footerVue from 'common/footer'
// import navBarVue from 'common/navBar'
export default {
  components: {
    headerVue
    // footerVue,
    // navBarVue
  }
}
</script>
