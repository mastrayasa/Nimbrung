import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


Vue.config.productionTip = false
/* eslint-disable */

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZTsS4aCdRcgvC05AHbSkKt7Alh4VwdmU",
    authDomain: "nimbrung.firebaseapp.com",
    databaseURL: "https://nimbrung.firebaseio.com",
    projectId: "nimbrung",
    storageBucket: "nimbrung.appspot.com",
    messagingSenderId: "124568400884",
    appId: "1:124568400884:web:259d6e0a97675837"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
