<template>
  <div class="login-page-container">
      <app-header />
    <h1>login!!!!!</h1>
    <div class="login-page-img-container">
    <img src="https://res.cloudinary.com/asaphstagram2021/image/upload/v1629150338/Stock%20photos%20-%20NY/NY03_tl8jz8.jpg" alt="Sorry, no image here" />
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
  // localStorage.clear()
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