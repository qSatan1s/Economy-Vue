import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',

      component: () => import('./views/Login.vue')
    },

    {
      path: '/',
      name: 'Search',
      props: true,
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Home.vue')
    },

    {
      path: '/favorites',
      name: 'favorites',
      props: true,
      meta: { layout: 'main', auth: true },
      component: () => import('./views/favorites.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
