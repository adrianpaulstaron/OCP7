<template>
    <img id="groupomaniaLogo" src="../assets/icon-above-font.svg" alt="logo de Groupomania">
  <div id="nav">
  <router-link class="routerlink" to="/">Connexion</router-link> |
  <router-link class="routerlink" to="/inscription">Inscription</router-link>
  </div>
</template>

<script>
  export default{
        name:"homenav"  
        }
</script>

<style>
    .routerlink{
    color: black!important;
    }
    #groupomaniaLogo {
    width: 500px;
    margin-top: -100px;
    margin-bottom: -150px;
    }

    @media all and (max-width: 500px){
    #groupomaniaLogo {
        width: 250px;
        margin-top: -25px;
        margin-bottom: -70px;
    }
    }
</style>
