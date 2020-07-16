import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.component('modal', {
  template: '#modal-template'
})

Vue.component('Loader', Loader)
firebase.initializeApp({
  apiKey: 'AIzaSyDLjwVjhEKqadgTvGXUw8X0KiO_FCB9uUM',
  authDomain: 'economy-c281a.firebaseapp.com',
  databaseURL: 'https://economy-c281a.firebaseio.com',
  projectId: 'economy-c281a',
  storageBucket: 'economy-c281a.appspot.com',
  messagingSenderId: '115880894230',
  appId: '1:115880894230:web:d2429395caf77efee3fa37',
  measurementId: 'G-GGR1DG5GP5'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
