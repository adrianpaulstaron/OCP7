<template>
  <Navbar v-show="isLoggedin"></Navbar>
  <Home></Home>
  <router-view/>
</template>

<script>
import Navbar from "./components/Navbar"
import { mapState } from 'vuex'
import store from "./store"

export default {
  name: "App",
  computed: mapState({
    isLoggedin: 'isLoggedin',
    firstname: 'firstname',
    surname: 'surname',
    email: 'email'
  }),
  components: { 
      Navbar,
  },
  methods: {
    handler() {
      document.documentElement.setAttribute('lang', "fr");
    },
    getUser(){
      if(localStorage.getItem('User') != "null" && localStorage.getItem('User') != null){
         // on récupère l'User du localStorage
        let userLocalStorage = localStorage.getItem('User')
        // on le transforme en objet javascript
        let userJS = JSON.parse(userLocalStorage)
        // on le met dans le store
        store.commit('storeUser', userJS)
      }
    }
  },
  beforeMount(){
    this.handler()
    this.getUser()
  },
  updated(){
    // à l'update de la page, si isLoggedin est false, on reload la page, ce qui aura donc pour effet de nous rediriger sur le login grâce à notre routeguard
    if(!this.isLoggedin){
      this.$router.go()
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
