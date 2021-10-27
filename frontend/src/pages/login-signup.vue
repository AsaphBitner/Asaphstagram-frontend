
<template>
  <div class="login-page-container">
    <!-- <h1 style="fontsize: 100px; background: red;">login!!!!!</h1> -->
    <div class="login-page-background-img-container">
    <img src="https://res.cloudinary.com/asaphstagram2021/image/upload/v1629247438/Boston_Skyline__SONY_NEX-5_Panorama_Mode__4765830049_krt0me.jpg" alt="Sorry, no image here" />
    </div>
    <h1 class="login-page-first-headline"><span>Asaphstagram</span></h1>
    <div class="login-inputs-container">
    <form action="submit" @submit.prevent="login(usernameInput, passwordInput)">
      <div class="login-password-inputs">
      <input type="text" class="username-input" placeholder="User Name" v-model="usernameInput">
      <input type="password" class="password-input" placeholder="Password" v-model="passwordInput">
      </div>
      <button class="login-submit">Log In</button>
      
    </form>   
    </div>
    <div class="login-for-guests-container">
    <h2>Or Log In As:</h2>
    <div class="login-3-photos">
    <div class="login-bugs-bunny login-character-image" @click.stop="login('Bugs_Bunny', 'bugsbunnypassword')">
      <img src="https://res.cloudinary.com/asaphstagram2021/image/upload/v1628445908/Bugs%20Bunny/Bugsbunny2011_wwesmc.png" alt="" style="background: white;">
      <h1>Bugs_Bunny</h1>
    </div>
    <div class="login-wonder-woman login-character-image" @click.stop="login('Wonder_Woman', 'wonderwomanpassword')">
      <img src="https://res.cloudinary.com/asaphstagram2021/image/upload/v1628446001/Wonder%20Woman/Wonder_Woman_Annual_Vol_5_1_a00h1m.png" alt="">
      <h1>Wonder_Woman</h1>
    </div>
    <div class="login-yoda login-character-image" @click.stop="login('Yoda', 'yodapassword')">
      <img src="https://res.cloudinary.com/asaphstagram2021/image/upload/v1628446008/Yoda/Yoda_Attack_of_the_Clones_gxl5dl.png" alt="">
      <h1>Yoda</h1>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
// import appHeader from '../components/app-header.vue'

export default {
  // components:{
  //   <app-header />
  //   appHeader,
// },
data(){
  return{
    loggedInUser: {},
    users: [],
    usernameInput: '',
    passwordInput: '',

  }
},

methods:{
async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
        if (this.loggedInUser._id){this.sendToFeed(this.loggedInUser._id)}
    },
sendToFeed(id){
    this.$router.push('/following-feed/'+id)
  },
async setUsers(){
      await this.$store.dispatch('loadUsers')
},
loadUsers() {
  this.users = this.$store.state.users;
},
async login(username, password){
  // console.log(this.usernameInput, this.passwordInput)
  const payload = {
    username: username,
    password: password,
  }
  const loggedInUser = await this.$store.dispatch('login', payload)
  if (loggedInUser) {
  this.usernameInput = ''
  this.passwordInput = ''
  // console.log(loggedInUser)
  this.$router.push('/following-feed/'+loggedInUser._id)
  }
},

},

async created(){
  // localStorage.clear()
  await this.getLoggedInUser()
  await this.setUsers()
  this.loadUsers()
}

}
</script>

<style>
</style>