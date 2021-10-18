<template>


    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-bind:class=" { 'navbarOpen': show }">
        <router-link to="/Timeline" class="nav-link">    
            <img src="../assets/icon-left-font-monochrome-black.svg" width="150" height="30" alt="logo de Groupomania">
        </router-link>         
        <button aria-label="burger button" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" @click.stop="toggleNavbar()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-bind:class="{ 'show': show }">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <router-link to="/profile" class="nav-link">{{firstname}} (profil)</router-link>                
              </li>
              <li class="nav nav-item">
                  <a v-on:click="handleLogout" class="nav-link mx-auto" href="#">Déconnexion</a>
              </li>   

            </ul>
        </div>
    </nav>

</template>

<script>
// @ is an alias to /src
// import Accueil from '@/components/Accueil.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import store from "../store"
import router from "../router";
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  data(){
    return {
      show: true
    }
  },
  components: {
  },
  computed: mapState({
      isLoggedin: 'isLoggedin',
      firstname: 'firstname',
      surname: 'surname',
      email: 'email'
    }),
  methods: {
      handleLogout: () => {
        store.commit('logout')
        router.push("/")
      },
      toggleNavbar() {
        this.show = !this.show
      }
  }
}
</script>