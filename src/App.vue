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
      console.log("user du local storage => " + localStorage.getItem('User'))
      if(localStorage.getItem('User') != "null"){
        console.log("j'ai trouvé un user en localstorage")
         // on récupère l'User du localStorage
        let userLocalStorage = localStorage.getItem('User')
        // on le transforme en objet javascript
        let userJS = JSON.parse(userLocalStorage)
        // on le met dans le store
        store.commit('storeUser', userJS)
        // router.push("/timeline");
      }
     
    }
  },
  beforeMount(){
      this.handler()
      this.getUser()
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
