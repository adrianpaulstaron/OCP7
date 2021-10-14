<template>
  <div class="home">
    <h1>Connexion</h1>
    <Accueil/>
  </div>
</template>

<script>
// @ is an alias to /src
import Accueil from '@/components/Accueil.vue'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Accueil
  }
}
</script>