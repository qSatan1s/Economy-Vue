export default {
  actions: {
    async FetchVideo(ctx, { search, number_requests, sort }) {
      const key = process.env.VUE_APP_FIXER
      const limit = number_requests || 12
      const sortVideo = sort || 'relevance'
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&order=${sortVideo}&maxResults=${limit}&q=${search}/`
      )

      const videos = await res.json()

      ctx.commit('updateVideo', videos)
    }
  },
  state: {
    videos: []
  },
  mutations: {
    updateVideo(state, videos) {
      state.videos = videos
    }
  },
  getters: {
    allVideo(state) {
      return state.videos
    }
  }
}
