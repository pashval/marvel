<template>
  <main>
    <div class="marvel-back">
      <router-view/>
    </div>
  </main>
</template>
<script>
export default {
  name: 'mainProj'
  }
</script>

<style>
@import "../../public/src/css/characters.min.css";
@import "../../public/src/css/specifComic.min.css";
@import "../../public/src/css/specifChar.min.css";
@import "../../public/src/css/pagination.min.css";
</style>