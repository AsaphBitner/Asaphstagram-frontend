<template>
  <div class="profile-page-container">
    <app-header @openNewStory="openNewStory()" />
    <new-story v-if="newStoryOn" @close="closeNewStory('no update')" @saved="closeNewStory('yes update')"
     />
    <div v-if="backgroundDisplayed" class="menu-background"
      @click="closeBackground()"
    >
      <div
        v-if="this.deleteMenuDisplayed"
        class="delete-menu"
      >
        <span v-if="storyByMe()" class="menu-option-delete" @click.stop="openComfirmMenu()"
          >Delete Post</span
        >
        <span class="menu-option-cancel" @click.stop="closeBackground()"
          >Cancel</span
        >
      </div>
      <div
        v-if="confirmMenuDisplayed"
        class="are-you-sure-menu"
      >
        <span class="confirmation">Are you sure?</span>
        <span class="yesNo"
          ><span class="yes" @click.stop="deleteConfirmed()">Yes, delete</span
          ><span class="no" @click.stop="closeBackground()"
            >No, cancel</span
          ></span
        >
      </div>
    </div>
  <!-- <h1>

    PROFILE PAGE!!!      
  </h1> -->
  <div class="profile-page-upper-part">
    <div class="profile-page-profile-photo">
      <img :src="this.pageOwner.profileImgUrl" alt="" style="max-width: 2rem">
      <!-- INLINE STYLE DONT FORGET TO REMOVE!!!!! -->
    </div>
    <div class="profile-page-texts-container">
        <div class="profile-page-username-options">
          <span class="profile-page-username">{{pageOwner.username}}</span>
        <span class="profile-page-options">
        <svg aria-label="Options" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>  
        </span>
        </div>
        <!-- END OF USERNAME-OPTIONS -->
        <div class="post-follower-following-count">
          <!-- <span>{{pageOwner.ownedStories.length || 0}} Posts</span>
          <span>{{pageOwner.followers.length || 0}} Followers</span>
          <span>{{pageOwner.following.length || 0}} Following</span> -->
        </div>

        <div class="fullname">
          {{pageOwner.fullname}}
        </div>

        <div class="profile-text">{{pageOwner.profileText}}</div>

        <div class="followers-detailed">{{getFollowersDetails()}}</div>
    </div>
    </div>
  <!-- ========== END OF UPPER PART ============ -->
    <div class="profile-page-story-list">
      <ul :v-for="story in this.stories">
        <li>
          
          <img :src="story.imgUrl" alt="" style="max-width: 2rem;">
                 <!-- INLINE STYLE DONT FORGET TO REMOVE!!!!! -->
        </li>
      </ul>

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
    stories: [],
    loggedInUser: {},
    userId: '',
    pageOwner: {},
    users: [],
    storiesToShow: [],
    backgroundDisplayed: false,
    newStoryOn: false,
    deleteMenuDisplayed: false,
    confirmMenuDisplayed: false,
    storyToDelete: {},
  }
},

methods: {
    async setStories(){
      await this.$store.dispatch('loadStories')
    },
    async setUsers(){
      await this.$store.dispatch('loadUsers')
    },
      loadUsers() {
        this.users = this.$store.state.users;
      },
      
    loadStories() {
      this.stories = this.$store.state.stories;
      // console.log(this.stories)
      this.storiesToShow = this.stories.filter(item => {return item.owner.id === this.userId})
    },

    getFollowersDetails(){
    console.log(this.pageOwner.followers)
    const followerList = this.pageOwner.followers.filter(item => {return item.id !== this.loggedInUser.id})
    
    if (!followerList.length) {return ''}
    else if (followerList.length === 1) {return `Followed by ${followerList[0].username}`}
    else if (followerList.length === 2) {return `Followed by ${followerList[0].username} and ${followerList[1].username}`}
    else if (followerList.length === 3) {return `Followed by ${followerList[0].username}, ${followerList[1].username} and 1 other`}
    else if (followerList.length > 3) {return `Followed by ${followerList[0].username}, ${followerList[1].username} and ${followerList.length - 2} others`}
 
    },

    // openBackground(){
    //   },
    closebackground(){
      this.backgroundDisplayed = false
      this.deleteMenuDisplayed = false
      this.confirmMenuDisplayed = false
    },
    storyByMe(){
      return (this.loggedInUser.id === this.pageOwner.id)
    },
    openDeleteMenu(){
      this.backgroundDisplayed = true
      this.deleteMenuDisplayed = true
    },
    openComfirmMenu(){
      this.deleteMenuDisplayed = false
      this.confirmMenuDisplayed = true
    },

    openNewStory(){
      this.newStoryOn = true
    },
    closeNewStory(result){
      this.newStoryOn = false
      if (result === 'yes update') {console.log(result)}
    },
    setToDelete(story ) {
      this.storyToDelete = story
      this.openDeleteMenu();
    },


},


// computed: {
//   // storiestoShow: 

// },

async created(){
  this.loggedInUser = this.$store.state.loggedInUser
  this.userId = this.$route.params.userId
  await this.setUsers()
  await this.setStories()
  this.loadUsers()
  this.loadStories()
  this.pageOwner = this.users.find(user => {return user.id === this.userId})
}

}


</script>

<style>

</style>