<template>
  <div>
    <div class="Loader" v-if="loading">
      <Loader />
    </div>
    <div class="search" v-else :class="{ search_ready: ready }">
      <div class="search_block">
        <form @submit.prevent="submitHandler">
          <span class="title_search">Поиск видео</span>
          <br />

          <div class="dropdown">
            <a class="material-icons like" href="#openModal" v-if="ready">favorite_border</a>
            <div class="dropdown-content">
              <span>Поиск сохранён в разделе «Избранное»</span>
              <br />
              <router-link to="favorites">Перейти в избранное</router-link>
            </div>
          </div>
          <input
            name="search"
            placeholder="Что хотите посмотреть?"
            v-model.trim="search"
            type="text"
            required
          />

          <button class="btn" type="submit">Поиск</button>
        </form>
        <div v-if="ready">
          <div class="found_video">
            <div class="result">
              <div>
                Видео по запросу
                <span class="request">«{{ request }}</span>» &nbsp;
                <span v-if="allVideo.pageInfo.totalResults >= 1000000">99999...</span>
                <span class="quantity" v-else>
                  {{
                  allVideo.pageInfo.totalResults
                  }}
                </span>

                <div class="display">
                  <div
                    class="material-icons view-switcher"
                    @click="list = true"
                    :class="{ active_view: list }"
                  >view_list</div>

                  <div
                    class="material-icons view-switcher"
                    @click="list = false"
                    :class="{ active_view: !list }"
                  >widgets</div>
                </div>
              </div>
            </div>
            <modal />

            <div
              class="video"
              v-for="video in allVideo.items"
              :key="video.id.videoId"
              :class="{ listView: list }"
            >
              <img src="@/assets/img/Video.png" alt />
              <div class="info">
                <p class="video_title">{{ video.snippet.title }}</p>
                <p class="video_description">{{ video.snippet.description }}</p>
                <p class="video_description">786 тыс. просмотров</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modal from '@/components/app/modal'

export default {
  data: () => ({
    loading: true,
    ready: false,
    list: true,
    search: '',
    request: ''
  }),
  watch: {
    allVideo: function(data) {}
  },

  components: { modal },
  computed: mapGetters(['allVideo']),
  methods: mapActions(['FetchVideo']),
  methods: {
    async submitHandler() {
      this.loading = true
      const search = this.search
      this.request = search
      await this.$store.dispatch('FetchVideo', { search })
      console.log(this.allVideo)
      this.ready = true
      this.loading = false
    }
  },

  async mounted(data) {
    await this.$store.dispatch('fetchInfo')

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.display {
  float: right;
  display: flex;
  font-size: 35px;
  width: 70px;
  justify-content: space-between;
}

.video_title {
  font-weight: 500;
  font-size: 14px;

  line-height: 16px;
  margin: 0;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.video_description {
  font-size: 14px;
  line-height: 16px;

  color: rgba(23, 23, 25, 0.3);
  margin: 0;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.result {
  font-size: 16px;
  height: 40px;
  width: 100%;
  .request {
    font-weight: 900;
  }
  .quantity {
    color: rgba(23, 23, 25, 0.3);
    font-size: 16px;
  }
}

.search {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;

  font-size: 36px;
  line-height: 52px;
}

.like {
  position: absolute;
  right: 160px;
  font-size: 30px;
  margin-top: 20px;
  color: #1390e5;
  cursor: pointer;
  z-index: 10;
}

form {
  position: relative;
}

.found_video {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  height: 200px;
  width: 1100px;
  margin-top: 2vh;
}

.search_ready {
  height: 40vh;

  .search_block {
    text-align: left;

    font-size: 28px;
    line-height: 40px;

    input {
      margin-top: 1vh;
      width: 100%;
    }
    .btn {
      bottom: 0px;
    }
  }
}

.video {
  position: relative;
  margin-top: 2vh;
  width: 245px;
  height: 226px;
  cursor: pointer;
  font-size: 15px;
}

input {
  margin-top: 5vh;
  width: 686px;
  min-height: 52px;
  font-size: 20px;
  font-family: Roboto;
  line-height: 24px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;

  padding-left: 20px;
}

input:focus {
  background: rgba(197, 228, 249, 0.3);
  box-sizing: border-box;
  border: 1px solid #1390e5;
}

.btn {
  margin-top: 5vh;
  right: -1px;
  position: absolute;
  font-family: Roboto;
  background: #1390e5;
  width: 150px;
  height: 52px;
  border: 0;
  outline: none;
  color: white;
  border-radius: 0px 5px 5px 0px;
  font-size: 20px;
  line-height: 24px;
  cursor: pointer;
}

.search_block {
  text-align: center;
}

.view-switcher {
  color: #272727;
  opacity: 0.3;
  cursor: pointer;
  font-size: 24px;
}

.active_view {
  opacity: 1;
}

.listView {
  width: 687px;
  height: 100px;
  display: flex;
  right: 35px;
  img {
    object-fit: contain;
  }
}

.like:hover + .dropdown-content {
  display: block;
}

.dropdown-content {
  margin-top: 50px;
  display: none;
  position: absolute;
  right: 80px;

  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  width: 200px;
  height: 124px;

  z-index: 11000;
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

.dropdown:hover .dropdown-content {
  display: block;
}

a {
  text-decoration: none;
}
</style>
