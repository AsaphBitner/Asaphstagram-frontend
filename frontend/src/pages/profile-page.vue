<template>
  <div>
    <app-header></app-header>
  <h1>
    PROFILE PAGE!!!      
  </h1>
  </div>
</template>

<script>
import appHeader from '../components/app-header.vue'

export default {
components:{
appHeader,
},

data(){
  return{
    userId: this.$store.state.loggedInUser.id,
  }
}
}
</script>

<style>

</style>