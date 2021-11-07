<template>
  <div class="liked-stories-page-container" @click="headerProfileMenuChange(false)">
    <app-header :headerMenuShown="headerMenuShown" @menuTrue="headerProfileMenuChange(true)" @menuFalse="headerProfileMenuChange(false)" />
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
    <!-- ============================================================= -->

    <div class="liked-stories-page-headline">Hi {{pageOwner.username}}! Here are the posts you've "liked" so far:</div>
<!--  -->
      <div class="no-posts-yet" v-if="!this.storiesToShow.length">Oops! It seems you haven't "liked" any posts yet...</div>
      <ul v-if="this.storiesToShow.length" class="liked-stories-page-story-list">
        <li v-for="story in this.storiesToShow" :key="story._id">
          <div class="liked-stories-page-story-tile" @click="sendToSingleStory(story._id)">
            <div class="tile-background">
              <span class="tile-background-likes">
                <svg height="19" viewBox="0 0 48 48" width="19"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              {{story.likedBy.length || 0}}
              </span>
              <span class="tile-background-comments">
                <svg height="19" viewBox="0 0 48 48" width="19"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
              {{story.comments.length || 0}}
              </span>
            </div>
            <div class="tile-image">
            <img :src="story.imgUrl" alt="">
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import appHeader from '../components/app-header.vue'
import newStory from '../components/new-story.vue'

export default {
components:{
appHeader,
newStory,
},

data(){
  return{
    stories: [],
    loggedInUser: {},
    userId: '',
    pageOwner: {},
    pageOwnerFollowers: [],
    users: [],
    storiesToShow: [],
    backgroundDisplayed: false,
    newStoryOn: false,
    deleteMenuDisplayed: false,
    confirmMenuDisplayed: false,
    storyToDelete: {},
    headerMenuShown: false,
    editingNow: false,
    profileTextEdit: '',
    followBackground: false,
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
        // console.log('LOGGEDIN: ', this.loggedInUser)
      this.stories = this.$store.state.stories;
      // console.log(this.stories)
      const toShow = this.stories.filter(item => {return item.likedBy.find(like => {return like._id === this.loggedInUser._id})})
      this.storiesToShow = toShow
    // this.storiesToShow = this.stories
    },


    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')

    },
    upgradeLoggedInUser(){
      this.loggedInUser = this.users.find(item=>item._id === this.loggedInUser._id)
    },
    closeBackground(){
      this.backgroundDisplayed = false
      this.deleteMenuDisplayed = false
      this.confirmMenuDisplayed = false
    },
    storyByMe(){
      return (this.loggedInUser._id === this.pageOwner._id)
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
      if (result === 'yes update') {
        this.loadStories()
        }
    },
    setToDelete(story ) {
      this.storyToDelete = story
      this.openDeleteMenu();
    },
   async sendToProfilePage(id){
    // this.$router.reload()
    // localStorage.clear()
  this.pageOwner = this.users.find(user => {return user._id === id})
  this.loggedInUser = this.$store.state.loggedInUser
  this.userId = id
  await this.setUsers()
  await this.setStories()
  this.loadUsers()
  this.loadStories()
    this.$router.push('/profile-page/'+id)
    location.reload()
  },

  deleteConfirmed() {
        this.deleteStory();
        this.closeBackground();
      },

  async deleteStory() {
      const payload = this.storyToDelete;
      await this.$store.dispatch("deleteStory", payload);
      this.storyToDelete = {};
      this.loadStories();      
    },
  sendToSingleStory(id){
    this.$router.push('/single-story/'+id)
  },
  headerProfileMenuChange(status){
    this.headerMenuShown = status
  },

  async saveNewProfileText(newText){
    let user = this.pageOwner
    user.profileText = newText
    const checkSuccess = await this.$store.dispatch('saveNewProfileText', user)
    if (checkSuccess === 'SUCCESS') {this.pageOwner.profileText = newText;} else {console.log('PROBLEM WITH SAVING TEXT!')}
    this.editingNow = false
  },
  
  async addFollow(){
  this.loggedInUser.following.unshift(this.pageOwner._id)
  this.pageOwner.followers.unshift(this.loggedInUser._id)
  const payload = {
    follower: this.loggedInUser,
    following: this.pageOwner
  }
  const follow = await this.$store.dispatch('addFollow', payload)
  if (follow === 'SUCCESS') {console.log('SUCCESS FOLLOW!!!')}
  this.followBackground = false
  },
  async deleteFollow(){
  const followIdx = this.loggedInUser.following.findIndex(item=> item === this.pageOwner._id) 
  this.loggedInUser.following.splice(followIdx, 1)
  const followingIdx = this.pageOwner.followers.findIndex(item=> item === this.loggedInUser._id) 
  this.pageOwner.followers.splice(followingIdx, 1)
  const payload = {
    follower: this.loggedInUser,
    following: this.pageOwner
  }
  const follow = await this.$store.dispatch('deleteFollow', payload)
  if (follow === 'SUCCESS') {console.log('SUCCESS UNFOLLOW!!!')}
  this.followBackground = false
  },
  loggedInFollowing(){
    return this.loggedInUser.following.find(item=> item === this.pageOwner._id)
  },

},


async created(){
  // localStorage.clear()
  await this.getLoggedInUser()
  this.userId = this.$route.params.userId
  if(!this.loggedInUser._id){this.$router.push('/')}
  
  await this.setUsers()
  await this.setStories()
  this.loadUsers()
  this.loadStories()
  this.pageOwner = this.users.find(user => {return user._id === this.userId})
  this.upgradeLoggedInUser()
  this.profileTextEdit = this.pageOwner.profileText
}

}


</script>

<style>

</style>