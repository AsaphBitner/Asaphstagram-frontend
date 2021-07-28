<template>
  <div>
      <app-header />
    <h1>LANDING PAGE!!!</h1>
    <div class="img-container">
    <!-- <img src="img/Stock photos - NY/NY02.jpg" alt="Sorry, no image here" /> -->
  <router-link :to="'/following-feed/'+userId">FEED</router-link>



    </div>
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
},

created(){
  // this.$store.dispatch.loadUsers()
  // this.$store.dispatch.loadStories()
}

}
</script>

<style>
</style>