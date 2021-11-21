<template>
  <section class="page-container" @click="headerProfileMenuChange(false)">
    <app-header :headerMenuShown="headerMenuShown" @menuTrue="headerProfileMenuChange(true)" @menuFalse="headerProfileMenuChange(false)" />
    <div class="stories-container">
      <ul class="story-list" v-for="story in this.storiesToShow" :key="story._id">
        <li>
          <div class="single-story-container">
            <storyUserPhotoName :story="story" @storyDeleted="reloadPage"/>
            <mainImageStory :story="story"/>
            <div class="story-after-photo">
              <storyFourIcons :story="story"/>
              <storyLikedBy :story="story"/>
              <storyText :story="story"/>              
              <storyComments :story="story"/>
              <storyHowLongAgo :story="story"/>
              <storyAddComment :story="story"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="storiesFollowing.length > numStoriesToShow" @click="LoadMoreStoreis" class="load-more-storeis"><h1>Load More Posts</h1></div>
  </section>
</template>

<script>
import appHeader from "@/components/app-header.vue";
import storyUserPhotoName from '@/components/story-timeline-cmps/story-user-photo-name.vue'
import mainImageStory from '@/components/story-timeline-cmps/main-image-story.vue'
import storyFourIcons from '@/components/story-timeline-cmps/story-four-icons.vue'
import storyLikedBy from '@/components/story-timeline-cmps/story-liked-by.vue'
import storyText from '@/components/story-timeline-cmps/story-text.vue'
import storyComments from '@/components/story-timeline-cmps/story-comments.vue'
import storyHowLongAgo from '@/components/story-timeline-cmps/story-how-long-ago.vue'
import storyAddComment from '@/components/story-timeline-cmps/story-add-comment.vue'

export default {
  components: {
    appHeader,
    storyUserPhotoName,
    mainImageStory,
    storyFourIcons,
    storyLikedBy,
    storyText,
    storyComments,
    storyHowLongAgo,
    storyAddComment,
  },

  data() {
    return {
      loggedInUser: {},
      numStoriesToShow: 6,
      stories: [],
      storiesFollowing: [],
      storiesToShow: [],
      users: [],
      headerMenuShown: false,
    };
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
    },
    
    async loadLimitedStories() {
      await this.loadStories()
      const currentUser = this.users.find(item => { return item._id === this.loggedInUser._id})
      this.storiesFollowing = this.stories.filter(item=> {
        return currentUser.following.find(user => {return user === item.owner._id}) })
    const storiesNew = this.storiesFollowing.slice(0, this.numStoriesToShow)
    this.storiesToShow = storiesNew.slice()
    },

    LoadMoreStoreis(){
      this.numStoriesToShow += 6
      this.loadLimitedStories()
    },

    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
    },

  sendToProfilePage(_id){
    this.$router.push('/profile-page/'+_id)
  },
  headerProfileMenuChange(status){
    this.headerMenuShown = status
  },

  reloadPage(){
    location.reload()
  },


  //======================END OF METHODS=================
    
  },
  
  async created() {
    await this.getLoggedInUser()
      if(!this.loggedInUser._id){this.$router.push('/')}

    const userId = this.$route.params.userId
    const loggedInId = this.loggedInUser._id
    if (userId !== loggedInId){
      console.log('user ID: ', userId, 'logged in ID: ', loggedInId)
      this.$router.push('/')
      }
    await this.setUsers()
    this.loadUsers()
    await this.setStories()
    this.loadLimitedStories()
  },
};
</script>

<style>
</style>