<template>
<HomeNav></HomeNav>

  <div class="signup">
    <h1>Inscription</h1>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="handleSignup" class="w-75">
        <div class="form-group">
          <label for="inputFirstname">Prénom</label>
          <input required v-model="firstname" class="form-control" id="inputFirstname" type="text" placeholder="votre prénom">
        </div>
        <div class="form-group">
          <label for="inputSurname">Nom</label>
          <input required v-model="surname" class="form-control" id="inputSurname" type="text" placeholder="votre nom">
        </div>
        <div class="form-group">
          <label for="inputEmail">Adresse e-mail</label>
          <input required v-model="email" type="email" class="form-control" id="inputEmail" placeholder="votre adresse e-mail">
        </div>
        <div class="form-group">
          <label for="inputPassword">Mot de passe</label>
          <input required v-model="password" type="password" class="form-control" id="inputPassword" aria-describedby="pwdHelp" placeholder="votre mot de passe">
          <small id="pwdHelp" class="form-text text-muted">Votre mot de passe doit contenir au moins une lettre et un chiffre, et faire au moins 8 caractères.</small>
        </div>
        <button required type="submit" class="btn btn-dark">S'Inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import router from "../router";
  import Swal from "sweetalert2";
  import store from "../store"
  import HomeNav from '@/components/HomeNav.vue'
  import { mapState } from 'vuex'
  
  export default{
    name: "inscription",
    components: {
      HomeNav
    },
    data() {
      return {
        firstname:"",
        surname:"",
        email:"",
        password:""
      }
    },
    computed: mapState({
      isLoggedin: 'isLoggedin',
    }),
    methods: {
      handleSignup: function () {
        let pwdRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
        if(pwdRegex.test(this.password)){
          axios.post("http://localhost:3001/api/users/signup", { 
          firstname: this.firstname, 
          surname: this.surname, 
          email: this.email, 
          password: this.password
        })
        .then(()=> {
            axios.post("http://localhost:3001/api/users/login", { 
              email: this.email, 
              password: this.password
          })
            .then((response) => {
              const user = response.data
              console.log(user)
              store.commit('storeUser', user)
              router.push("/timeline");
            })
          })
          .catch(function () {
            Swal.fire({
              title: "Cet email est déjà utilisé",
              confirmButtonColor: '#b80000',
              confirmButtonText: 'OK',
            });
          })
        }else{
          Swal.fire({
              title: "Votre mot de passe est trop simple.",
              confirmButtonColor: '#b80000',
              timerProgressBar: true,
            });
        }
        
      },
    },
    beforeMount(){
      if(this.isLoggedin){
        router.push("/TimeLine");
      }
    }
  }
</script>