<template>
  <div>
    <div class="Loader" v-if="loading">
      <Loader />
    </div>
    <div class="Favorites_block" v-else>
      <div class="Favorites_body">
        <div class="qq" v-for="f of favorites" :key="f.id">
          <div class="favorit_element">{{ f.name }}</div>
          <div class="dropdown">
            <div class="dropdown-content">
              <form class="drop_item">
                <!-- <a :id="f.id" @click="search">Выполнить</a> -->
                <div></div>
                <a href="#openModal" :id="f.id" @click="editItem" style=" color: #1390e5;">Изменить</a>
                <a style="color: red;" ref="id_item" :id="f.id" @click="FavoritesDelete">Удалить</a>
              </form>
            </div>
          </div>
        </div>
        <modal :blank="blank" @updateFavorites="updateFavorites" />
      </div>
    </div>
    <div class="noFavorite" v-if="favorites.length === 0">Вы ничего не добавили в избранное (^ ^)</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modal from '@/components/app/modal'
export default {
  data: () => ({
    favorites: [],
    loading: true,
    isActive: true,
    blank: {}
  }),

  async mounted() {
    this.favorites = await this.$store.dispatch('fetchFavorites')
    this.loading = false
  },

  computed: mapGetters(['allVideo']),
  methods: mapActions(['FetchVideo']),
  components: {
    modal
  },
  methods: {
    async search(e) {
      const id = e.target.id
      const idx = this.favorites.findIndex(c => c.id === id)

      try {
        await this.$store.dispatch('FetchVideo', {
          search: this.favorites[idx].name,
          sort: this.favorites[idx].sort,
          number_requests: this.favorites[idx].number_requests
        })

        this.$router.push({
          path: '/',
          params: this.allVideo
        })
      } catch (e) {}
    },
    async FavoritesDelete(e) {
      const id = e.target.id
      try {
        this.loading = true
        await this.$store.dispatch('fetchFavoritesDelete', id)
        this.favorites = await this.$store.dispatch('fetchFavorites')
        this.loading = false
      } catch (e) {}
    },
    async editItem(e) {
      const id = e.target.id
      const idx = this.favorites.findIndex(c => c.id === id)
      this.blank = this.favorites[idx]
    },
    async updateFavorites(newFavoritesq) {
      this.favorites = newFavoritesq
    }
  }
}
</script>

<style lang="scss" scoped>
.noActive {
  display: none;
}

.noFavorite {
  font-size: 40px;
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin-top: 25vh;
}

.Favorites_block {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #000000;
}
.Favorites_body {
  background: white;
  width: 1040px;
}

.favorit_element {
  display: block;
  position: relative;
  cursor: pointer;
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;

  text-transform: lowercase;
}
.main {
  position: relative;
  display: block;
}

.block_menu {
  height: 46px;
  background: #f1f1f1;
  background-blend-mode: multiply;
  width: 100%;
}

.dropdown-content {
  width: 1020px;
  display: none;
  position: absolute;

  background: #f1f1f1;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  margin-top: -50px;
  height: 50px;

  z-index: 100;
  text-align: left;
  padding-left: 20px;
  span {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }

  a {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    color: #1390e5;
  }
}

.qq:hover .dropdown-content {
  display: block;
}

.drop_item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vh;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  a {
    text-decoration: none;
    cursor: pointer;
  }
  div {
    flex: 0.8;
  }
}
</style>
