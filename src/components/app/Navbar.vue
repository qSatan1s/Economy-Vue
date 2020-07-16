<template>
  <div class="nav">
    <div class="ovner">
      <router-link to="/">
        <img src="@/assets/img/logo.png" alt="logo" class="logo" />
      </router-link>

      <router-link
        v-for="link in links"
        :key="link.to"
        active-class="active"
        class="nav_item"
        :exact="link.exact"
        :to="link.to"
      >{{ link.title }}</router-link>
    </div>
    <a href="#" class="logout" @click.prevent="logout">Выйти</a>
  </div>
</template>

<style lang="scss" scoped>
.active {
  float: left;
  position: relative;
}
.active::after {
  border-bottom: 2px solid #1390e5;
  bottom: -28px;
  content: ' ';
  left: 0;
  position: absolute;
  right: 0;
}
.logo {
  width: 55px;
  margin-left: 2vw;
}
.nav {
  border: 1px solid #f1f1f1;
  height: 80px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ovner {
  display: flex;
  align-items: center;

  a {
    margin-left: 2vw;
  }
}

.logout {
  margin-right: 5vw;
}

a {
  color: #1390e5;
  font-family: Roboto;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
}
</style>

<script>
export default {
  data: () => ({
    links: [
      { title: 'Поиск', to: '/', exact: true },
      { title: 'Избранное', to: '/favorites' }
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },

  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
