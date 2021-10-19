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

.routerlink{
  color: black!important;
  }
  
</style>