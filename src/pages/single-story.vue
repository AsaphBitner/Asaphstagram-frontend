<template>
  <div
    class="single-page-story-container"
    @click="headerProfileMenuChange(false)"  >
    <app-header :headerMenuShown="headerMenuShown" @menuTrue="headerProfileMenuChange(true)" @menuFalse="headerProfileMenuChange(false)" />
    <div class="single-story-on-page-container">
      <mainImageStory :story="story" />

      <div class="single-story-not-the-image">
        <storyUserPhotoName :story="story"/>
        <storyText :story="story"/>
        <storyComments :story="story"/>
        <div class="story-after-comments">
          <storyFourIcons :story="story"/>
          <storyLikedBy :story="story"/>
          <storyHowLongAgo :story="story"/>
          <storyAddComment :story="story"/>
        </div>
      </div>
    </div>
  </div>
</template>


//  =========== END OF TEMPLATE!!! ================================================


<script>
import appHeader from "@/components/app-header.vue";
import mainImageStory from '@/components/single-story-cmps/main-image-story.vue'
import storyUserPhotoName from '@/components/single-story-cmps/story-user-photo-name.vue'
import storyText from '@/components/single-story-cmps/story-text.vue'
import storyComments from '@/components/single-story-cmps/story-comments.vue'
import storyFourIcons from '@/components/single-story-cmps/story-four-icons.vue'
import storyLikedBy from '@/components/single-story-cmps/story-liked-by.vue'
import storyHowLongAgo from '@/components/single-story-cmps/story-how-long-ago.vue'
import storyAddComment from '@/components/single-story-cmps/story-add-comment.vue'
import {storageService} from '@/services/async-storage-service.js' 

export default {
  components: {
    appHeader,
    mainImageStory,
    storyUserPhotoName,
    storyText,
    storyComments,
    storyFourIcons,
    storyLikedBy,
    storyHowLongAgo,
    storyAddComment,
   },

  data() {
    return {
      story: {},
      stories: [],
      users: [],
      loggedInUser: {},
      headerMenuShown: false,
    };
  },
  methods: {
    async setStories(){
      await this.$store.dispatch('loadStories')
      this.stories = this.$store.state.stories
    },
    async setUsers(){
      await this.$store.dispatch('loadUsers')
    },
    
    loadUsers() {
      this.users = this.$store.state.users;
    },

    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
    },

    async getStory(){
      const storyId = this.$route.params.storyId   
      let story = await storageService.getSingleStory(storyId)
      this.story = story
      // console.log(storyId)
      // console.log(storyId)
      // console.log(storyId)
      // console.log(storyId)
      // this.story = await this.$store.dispatch('getSingleStory', storyId)
    //   let story = this.stories.find(item => {return item._id === storyId})
    // if (!story) {
    //   console.log('No Story, it might have been deleted')
    //   this.router.push('/following-feed/'+this.loggedInUser._id)
    // }
    // this.story = JSON.parse(JSON.stringify(story))
    // console.log(this.story)
    // console.log(this.story)
    // console.log(this.story)
    // console.log(this.story)
    // console.log(this.story)
    },

  headerProfileMenuChange(status){
    this.headerMenuShown = status
  },
  //======================END OF METHODS=================
  },
  async created() {
    await this.getLoggedInUser()
    if(!this.loggedInUser._id){this.$router.push('/')}
    await this.setStories()
    await this.setUsers()
    this.loadUsers()
    await this.getStory()
  },
};

</script>



<style>
</style>

