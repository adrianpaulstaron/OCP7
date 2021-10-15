<template>
    <div id="nav">
    <router-link to="/">Connexion</router-link> |
    <router-link to="/inscription">Inscription</router-link>
    </div>
    <Connection></Connection>
    
</template>

<script>
// @ is an alias to /src
import Connection from '@/views/Connection.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Connection
  }
}
</script>