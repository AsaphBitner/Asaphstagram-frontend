<template >
  <div @click.stop="toggleProfileMenu('close')" class="header-container">
    <div class="header-flex-wide-left"></div>
    <div class="header-flex-1">
    <h3 class="header-logo" @click="sendToFeed()">Asaphstagram</h3> 
    </div>
    <div class="header-flex-2">
    <input autocapitalize="none" type="search" class="header-search" placeholder="Search" @keyup="searchDiv()" v-model="searchBarContent"> 
    <!-- <input  class="XTCLo x3qfX" placeholder="Search" type="text" value=""></input> -->
  <div v-if="searchBarContent" class="app-header-search-results">
    <div class="search-triangle"></div>
    <div v-if="!searchResultUsers.length" class="header-search-nothing">Nothing Found...</div>
    <ul v-if="searchResultUsers.length">
      <li v-for="user in searchResultUsers" :key="user._id" @click="sendToProfilePage(user._id)">
        <div class="search-results-profile-img">
          <img :src="user.profileImgUrl" alt="">
        </div>
        <div class="search-results-names">
        <span>{{user.username}}</span>
        {{user.fullname}}
        </div>
          
      </li>
    </ul>
  </div>
    </div>


    <div class="header-flex-3">
      <router-link :to="'/'">
      <svg aria-label="Emoji" class="header-smiley header-icon" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
      </router-link> 
      
  <!-- <router-link :to="{ name: 'places', params: {placeName: detail.name } }">more..</router-link> -->
      <router-link :to="'/following-feed/'+userId">
      <svg aria-label="Home" class="header-home header-icon" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg>
      </router-link>
      
      <router-link :to="'/explore-feed/'+userId">
      <svg aria-label="Find People" class="header-explore header-icon" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg>
      </router-link>

      <span class="header-add-post-container" @click="addStory">
        <svg aria-label="New Post" class="header-add-post header-icon " fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path><path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path></svg>
      </span>

      
      <div class="header-profile-image-container header-icon" @click.stop="toggleProfileMenu('toggle')">
      <img :src="this.loggedInUser.profileImgUrl" alt="">

      <div v-if="headerMenuShown" class="header-profile-menu-and-triangle"> 
      <div class="profile-triangle"></div>
      <div class="header-profile-logout-menu">
        <div class="header-profile-to-profile" @click="sendToProfilePage(loggedInUser._id)">
          <svg aria-label="Profile" class="_8-yf5 " fill="#262626" height="16" role="img" viewBox="0 0 32 32" width="16"><path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg>
          Profile
        </div>
        <div class="header-profile-logout" @click.stop="logout">Log Out</div>
      </div>
      </div>

      </div>
    </div>
    <div class="header-flex-wide-right"></div>
    
    
    <!-- :to="{ name: 'places', params: {placeName: detail.name } } -->
    <!-- <p class="header-user-greeting">Hello, {{this.$store.state.loggedInUser.username}}</p> -->
   
    <!-- <router-link :to="'/login-signup'">
    Login-Signup
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: "app-header",

  data(){
    return{
      loggedInUser: {},
      userId: '',
      users: [],
      searchBarContent: '',
      searchResultUsers: [],
      // profileMenu: this.isProfileMenu,
    }
  },
  props:{
    headerMenuShown: Boolean,
  },

// computed:{
//   isProfileMenu: function(){
//     // return this.headerMenuShown ? true : false
//   return true
//   }
//   },

  methods:{
    addStory(){
      this.$emit('openNewStory')
    },
    sendToFeed(){
      this.$router.push('/following-feed/'+this.userId)
    }, 
    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
    },
  async setUsers(){
      await this.$store.dispatch('loadUsers')
    },
  loadUsers() {
        this.users = this.$store.state.users
      },
  searchDiv(){
    this.loadUsers()
    this.searchResultUsers.splice(0, this.searchResultUsers.length)
    let users2 = this.users.slice()
    users2.forEach(user => {
      if (user.username.toLowerCase().includes(this.searchBarContent.toLowerCase())){this.searchResultUsers.push(user)}    
      }
    )
  },
  sendToProfilePage(id){
    this.$router.push('/profile-page/'+id)
  },

  logout(){
    console.log('Sorry, can\'t log out right now')
  },

  toggleProfileMenu(order){
    if (order === 'open') {this.$emit('headerProfileTrue')} else if (order === 'close') {this.$emit('headerProfileFalse')}
    else if (order === 'toggle') {
      if (this.headerMenuShown === true) {this.$emit('headerProfileFalse')} else {this.$emit('headerProfileTrue')}
    }
  },


  },
  //===== END OF METHODS ==========
// watch:{

// },


  async created(){
    await this.getLoggedInUser()
    this.userId = this.loggedInUser._id
    this.setUsers()
    this.loadUsers()
    this.profileMenu = false
  },
}
</script>

<style>
</style>