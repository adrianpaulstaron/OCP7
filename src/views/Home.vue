<template>
    <HomeNav></HomeNav>
    <Connection></Connection>
    
</template>

<script>
import Connection from '@/views/Connection.vue'
import HomeNav from '@/components/HomeNav.vue'

export default {
  name: 'Home',
  components: {
    HomeNav,
    Connection
  }
}
</script>

<style>
  /* a {
  color: red;
}
a:hover {
   color: #00F
} */

/* .router-link{
  color: rgb(240, 20, 20)
} */

.routerlink{
  color: black!important;
  }
  
</style>