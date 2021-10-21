<template>
  <HomeNav></HomeNav>

  <h1>Connexion</h1>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="handleLogin" class="w-75">
      <div class="form-group">
        <label for="exampleInputEmail1">Adresse e-mail</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="votre e-mail">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="votre mot de passe">
      </div>
      <button type="submit" class="btn btn-dark">Se Connecter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";
import store from "../store"
import { mapState } from 'vuex'
import HomeNav from '@/components/HomeNav.vue'

  export default{
    name: "login",
    data() {
      return {
        email:"",
        password:""
      }
    },
    components: {
      HomeNav
    },
    computed: mapState({
      isLoggedin: 'isLoggedin',
    }),
    methods: {
      handleLogin: function () {
        axios.post("http://localhost:3001/api/users/login", { 
          email: this.email, 
          password: this.password
        })
        .then((response) => {
          // on stringify notre réponse pour obtenir un user stockable dans le localStorage
          let stringifiedUser = JSON.stringify(response.data)
          // on set l'item User du localstorage sur cette valeur
          localStorage.setItem('User', stringifiedUser)
          const user = response.data
          store.commit('storeUser', user)
          router.push("/timeline");
        })
        .catch(function (error) {
          const codeError = error.message.split("code ")[1];
          let messageError = "";
          switch (codeError) {
            case "401":
              messageError = "Mot de passe erroné";
              break;
            case "404":
              messageError = "Utilisateur non-trouvé";
              break;
          }
          Swal.fire({
            title: messageError || error.message,
            showConfirmButton: true,
            confirmButtonColor: '#b80000',
            confirmButtonText: 'OK'
          });
        });
      }
    },
    beforeMount(){
      if(this.isLoggedin){
        router.push("/TimeLine");
      }
    }
  }
</script>

