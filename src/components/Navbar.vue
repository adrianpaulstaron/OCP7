<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white navbar-fixed-top">
        <a class="navbar-brand" href="#">Groupomania</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Page Principale</router-link>                
            </li>
            <li class="nav-item">
                <router-link to="/profile" class="nav-link">Profil</router-link>                
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

export default {
  name: 'Navbar',
  components: {
  },
  methods: {
      handleLogout: () => {
        store.commit('logout')
        router.push("/");
      }
      
  }
}
</script>