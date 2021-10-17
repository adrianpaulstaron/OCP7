<template>
    <div id="nav">
    <router-link class="routerlink" to="/">Connexion</router-link> |
    <router-link class="routerlink" to="/inscription">Inscription</router-link>
    </div>
    <Connection></Connection>
    
</template>

<script>
import Connection from '@/views/Connection.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Connection
  }
}
</script>

<style>
  a {
  color: red;
}
a:hover {
   color: #00F
}

.router-link{
  color: rgb(240, 20, 20)
}

.routerlink{
  color: rgb(240, 20, 20);
  background-color: blue;
  }
  
</style>