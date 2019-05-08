<template>
  <div id="app">
    <b-container>
       <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Chat Nimbrung</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav> 
        <b-nav-item to="/">Beranda</b-nav-item> 
        <b-nav-item to="/about">About</b-nav-item> 
        <b-nav-item to="/login" v-if="!isLogin">Login</b-nav-item> 
        <b-nav-item to="/daftar" v-if="!isLogin">Daftar</b-nav-item> 
        <b-nav-item to="/profile" v-if="isLogin">Profile</b-nav-item> 
      </b-navbar-nav>

       
    </b-collapse>
  </b-navbar>
    </b-container> 

    <router-view/>
  </div>
</template>
<script>

import firebase from "firebase";
export default {
  name: 'App',
  data () {
    return { 
      isLogin: false
    }
  },
   computed:{
    cek(){
      const currentUser = firebase.auth().currentUser;
      if(currentUser){
        console.log("login")
        this.isLogin = currentUser;
      }else{
        console.log("tidak")
      }
      
      
      console.log(this.isLogin)
    }
  },
  watch: {
            // call again the method if the route changes
            '$route': 'cekLogin'
    },
    created:function(){

        this.cekLogin() 

    },
  methods:{
     cekLogin(){
            if(this.$auth.isLogin()){
                this.isLogin = true
            }else{
                this.isLogin = false
            }

            if(this.isLogin == true){
                this.cartLink = 'cart'
            }
        },
  }
}
</script>
