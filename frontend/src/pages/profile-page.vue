<template>
  <div class="profile-page-container" @click="headerProfileMenuChange(false)">
    <app-header @openNewStory="openNewStory()" @headerProfileTrue="headerProfileMenuChange(true)" @headerProfileFalse="headerProfileMenuChange(false)" :headerMenuShown="headerMenuShown" />
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
  <div class="profile-page-upper-part">
    <div class="profile-page-profile-photo">
      <img :src="this.pageOwner.profileImgUrl" alt="">
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
          <div><span>{{pageOwner.ownedStories.length || 0}}</span> Posts</div>
          <div><span>{{pageOwner.followers.length || 0}}</span> Followers</div>
          <div><span>{{pageOwner.following.length || 0}}</span> Following</div>
        </div>

        <div class="fullname">
          {{pageOwner.fullname}}
        </div>

        <div v-if="!editingNow" class="profile-text">
          {{pageOwner.profileText}}
          <span v-if="pageOwner._id === loggedInUser._id" class="edit-profile-text" @click="editingNow = true">Edit Text</span>
        </div>
        <div class="profile-text-editing-area" v-if="editingNow">
          <textarea name="" id="" v-model="profileTextEdit"></textarea>
          <span v-if="pageOwner.profileText !== profileTextEdit" class="save-edit-profile-text" @click="saveNewProfileText(profileTextEdit)">Save</span>
          <span v-if="pageOwner.profileText === profileTextEdit" class="cancel-edit-profile-text" @click="editingNow = false">Cancel</span>
        </div>

      <div class="followers-detailed">
        <div v-if="pageOwnerFollowers.length">Followed by&nbsp;<span @click="sendToProfilePage(pageOwnerFollowers[0]._id)">{{pageOwnerFollowers[0].username}}</span> 
        </div>
        <div v-if="pageOwnerFollowers.length === 2">&nbsp;and&nbsp;<span @click="sendToProfilePage(pageOwnerFollowers[1]._id)">{{pageOwnerFollowers[1].username}}</span></div>

        <div v-if="pageOwnerFollowers.length === 3">&nbsp;, <span @click="sendToProfilePage(pageOwnerFollowers[1]._id)">{{pageOwnerFollowers[1].username}}</span>, and 1 other</div>
        <div v-if="pageOwnerFollowers.length > 3">&nbsp;, <span @click="sendToProfilePage(pageOwnerFollowers[1]._id)">{{pageOwnerFollowers[1].username}}</span>, and <span>{{pageOwnerFollowers.length - 2}}</span> others</div> 
      </div>
    </div>
    </div>
  <!-- ========== END OF UPPER PART ============ -->
    <div class="profile-page-lower-part">
      <div class="dividing-line"></div>
      <div class="profile-page-lower-part-title">
      <span>
        <svg height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
        <path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path>
        Posts
      </span>
      </div>
        

      <div class="no-posts-yet" v-if="!this.storiesToShow.length">No Posts yet...</div>
      <ul v-if="this.storiesToShow.length" class="profile-page-story-list">
        <li v-for="story in this.storiesToShow" :key="story._id">
          <div class="profile-page-story-tile" @click="sendToSingleStory(story._id)">
            <div class="tile-background">
              <span class="tile-background-options" @click.stop="setToDelete(story)">
                <svg aria-label="Comment Options" class="_8-yf5 " fill="#262626" height="16" role="img" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
              </span>

              <!-- END OF OPTIONS -->
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
    editingNow: true,
    profileTextEdit: '',
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
      this.storiesToShow = this.stories.filter(item => {return item.owner._id === this.userId})
    },

    filterFollowers(){
    // console.log(this.pageOwner.followers)
    const followerIds = this.pageOwner.followers.filter(item=>{ 
    return item !== this.pageOwner._id})
    
    this.pageOwnerFollowers = this.users.filter(user => {return followerIds.find(item=>item === user._id)})
    // if (!followerList.length) {return ''}
    // else if (followerList.length === 1) {return `Followed by ${followerList[0].username}`}
    // else if (followerList.length === 2) {return `Followed by ${followerList[0].username} and ${followerList[1].username}`}
    // else if (followerList.length === 3) {return `Followed by ${followerList[0].username}, ${followerList[1].username} and 1 other`}
    // else if (followerList.length > 3) {return `Followed by ${followerList[0].username}, ${followerList[1].username} and ${followerList.length - 2} others`}
 
    },

    // openBackground(){
    //   },

    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
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
  this.filterFollowers()
    this.$router.push('/profile-page/'+id)
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

},



// computed: {
//   // storiestoShow: 

// },

async created(){
  // localStorage.clear()
  await this.getLoggedInUser()
  this.userId = this.$route.params.userId
  await this.setUsers()
  await this.setStories()
  this.loadUsers()
  this.loadStories()
  this.pageOwner = this.users.find(user => {return user._id === this.userId})
  this.filterFollowers()
  this.profileTextEdit = this.pageOwner.profileText
  // console.log(this.pageOwnerFollowers)
}

}


</script>

<style>

</style>