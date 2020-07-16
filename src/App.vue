<template>
  <div id="app">
    <Navbar v-if="isLogin" />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'

export default {
  components: {
    Navbar
  },

  computed: {
    isLogin: function() {
      if (this.$store.getters.info.name) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
html {
  background: #fafafa;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Open Sans';
  font-size: 16px;
  color: #000;
}
.Loader {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
