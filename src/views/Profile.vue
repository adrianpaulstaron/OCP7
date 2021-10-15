<template>
  <div class="profile">
    <h1>{{firstname}}</h1>
    <div>{{surname}}</div>
    <div>{{email}}</div>
    <div>
        <button type="button" class="btn btn-danger">Effacer le compte</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Accueil from '@/components/Accueil.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    // Accueil
  },
  computed: mapState({
      isLoggedin: 'isLoggedin',
      firstname: 'firstname',
      surname: 'surname',
      email: 'email'
    }),
}
</script>