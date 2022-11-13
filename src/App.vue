<template>
  <headerProj />
  <mainProj />
  <footerProj />
</template>

<script>
import headerProj from './components/headerProj.vue'
import mainProj from './components/mainProj.vue'
import footerProj from './components/footerProj.vue'

export default {
  name: 'App',
  components: {
    headerProj,
    mainProj,
    footerProj
  }
}
</script>

<style>
@import "../public/libraries/normalize.css";
@import "../public/src/css/fonts.min.css";
img {
  object-fit: cover;
}
</style>
