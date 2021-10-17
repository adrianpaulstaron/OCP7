<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-white navbar-fixed-top">
        <router-link to="/Timeline" class="nav-link">    
            <img src="../assets/icon-left-font-monochrome-black.svg" width="150" height="30" alt="">
        </router-link>                
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item active">
                <router-link to="/" class="nav-link">Page Principale</router-link>                
            </li> -->
            <li class="nav-item">
                <router-link to="/profile" class="nav-link">{{firstname}}</router-link>                
            </li>
            <li class="nav nav-item">
                <a v-on:click="handleLogout" class="nav-link" href="#">Déconnexion</a>
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
        router.push("/");
      }
  }
}
</script>