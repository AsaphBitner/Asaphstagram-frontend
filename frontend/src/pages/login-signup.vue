<template>
  <div>
      <app-header />
    <h1>LANDING PAGE!!!</h1>
    <div class="img-container">
    <!-- <img src="img/Stock photos - NY/NY02.jpg" alt="Sorry, no image here" /> -->
  <router-link :to="'/following-feed/'+userId">FEED</router-link>
  <!-- this.$router.push('/car') -->


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
    loggedInUser: {},
    userId: '',

  }
},

methods:{
async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')

    },

},

async created(){
  localStorage.clear()
  await this.getLoggedInUser()
  this.userId = this.loggedInUser._id
  // console.log(this.loggedInUser)
  // this.$store.dispatch.loadUsers()
  // this.$store.dispatch.loadStories()
  // const userId = this.$store.state.loggedInUser.id
  // setTimeout(() => {
  //   this.$router.push('/following-feed/'+userId)
  // }, 2000);
}

}
</script>

<style>
</style>