<template>
  <div class="profile">
  <h1 class="mt-5">Profil</h1>
  <div class="d-flex justify-content-center">
    <div class="card mt-3" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{user.firstname}}</li>
        <li class="list-group-item">{{user.surname}}</li>
        <li class="list-group-item">{{user.email}}</li>
        <button v-if="userId == user.id" v-on:click="handleDelete" type="button" class="btn btn-danger">Effacer le compte</button>
      </ul>
    </div>
      <div>
      </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Accueil from '@/components/Accueil.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import Swal from "sweetalert2";
import { mapState } from 'vuex'
import axios from "axios";
import store from "../store"
import router from "../router";

// import router from "../router";

export default {
  name: 'Home',
  computed: mapState({
      userId: 'userId',
      token: 'token'
      }),
  data(){
    return {
      user:""
    }
  },
  methods: {
    handleDelete: function () {
      Swal.fire({
        title: 'Suppression du compte',
        text: "Êtes-vous certain de vouloir supprimer votre compte ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: "Non"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:3001/api/users/" + this.userId)
            .then(()=>{
              store.commit('logout')
              router.push("/");
            })
        }
      })
    },
    // on crée une méthode getUser qui va chercher un user
    getUser: function () {
        // elle requête la route get users, avec en paramères l'id de l'user qu'on a récupéré en url, et on met en header le token qu'on a récupéré du store
        axios.get("http://localhost:3001/api/users/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
        .then((response) => {
            console.log("response data => ", response.data)
            this.user = response.data.user
        })
    },
  },
  beforeMount(){
    this.getUser()
  },
  watch:{
    $route (){
      this.getUser()
  }
} 
}
</script>