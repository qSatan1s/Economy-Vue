import firebase from 'firebase/app'

export default {
  actions: {
    async fetchFavorites({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories =
          (await firebase
            .database()
            .ref(`/users/${uid}/favorites`)
            .once('value')).val() || {}
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchFavoritesDelete({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/favorites`)
          .child(id)
          .remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async editFavorites(
      { commit, dispatch },
      { name, request, sort, number_requests, id }
    ) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/favorites`)
          .child(id)
          .update({ name, request, sort, number_requests })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createFavorites(
      { commit, dispatch },
      { name, request, sort, number_requests }
    ) {
      try {
        const uid = await dispatch('getUid')
        const favorites = await firebase
          .database()
          .ref(`/users/${uid}/favorites`)
          .push({ name, request, sort, number_requests })
        return { name, request, sort, number_requests, id: favorites.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
