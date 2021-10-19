<template>
    <img id="groupomaniaLogo" src="../assets/icon-above-font.svg" alt="logo de Groupomania">
  <div id="nav">
  <router-link id="connexion" class="routerlink" to="/">Connexion</router-link> |
  <router-link id="inscription" class="routerlink" to="/inscription">Inscription</router-link>
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
  nav li:hover,
  .router-link-active,
  nav li.router-link-exact-active {
    color: #eb0000!important;
    cursor: pointer;
  }
</style>
