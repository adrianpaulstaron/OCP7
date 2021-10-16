<template>
<h1>Connexion</h1>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="handleLogin" class="w-75">
      <div class="form-group">
        <label for="exampleInputEmail1">Adresse e-mail</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="votre e-mail">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="votre mot de passe">
      </div>
      <button type="submit" class="btn btn-primary">Se Connecter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";
import store from "../store"
import { mapState } from 'vuex'


  export default{
    name: "login",
    data() {
      return {
        email:"",
        password:""
      }
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
          const user = response.data
          console.log(user)
          store.commit('login', user)
          router.push("/timeline");
        })
        .catch(function (error) {
          const codeError = error.message.split("code ")[1];
          let messageError = "";
          switch (codeError) {
            case "401":
              messageError = "Mot de passe erroné !";
              break;
            case "403":
              messageError =
                "Le compte associé à cette adresse email a été supprimé !";
              break;
            case "404":
              messageError = "Utilisateur non-trouvé !";
              break;
          }
          Swal.fire({
            title: "Une erreur est survenue",
            text: messageError || error.message,
            icon: "error",
            timer: 4000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        });
      }
    }
  }



</script>
