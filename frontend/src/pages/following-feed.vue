<template>
  <div class="page-container">
    <h1>FOLLOWING FEED!!!</h1>
    
    
    <!-- <div class="story-container" v-for="(story, idx) in PhotoStoriesToShow" :key="story.id">
      <div class="story-user-photo-name">
        <img :src="getStoryImgUrl(idx)" alt="" />
        <p>{{ getUserForStory(this.photoStoriesToShow[idx].owner.id) }}</p>
        <p>{{idx}}</p>
      </div>
    </div> -->
    <div>{{this.photoStoriesToShow}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyText: this.$store.state.photoStories[0].txt,
      numStoriesToShow: 6,
      photoStories: [],
      PhotoStoriesToShow: [],
      users: this.getUsers,
    };
  },
  methods: {
    loadPhotoStories(){
    this.photoStories = this.$store.getters.getPhotoStories

    },
    getStoryImgUrl(idx) {
      return this.photoStoriesToShow[idx].imgUrl;
    },
    getUserForStory(ownerId) {
      return this.photoStoriesToShow.users.find((user) => user.id === ownerId).username;
    },
    getUsers(){
      return this.$store.getters.getUsers
    },
    
    loadLimitedPhotoStories() {
       this.photoStoriesToShow = this.photoStories.slice(0, this.numStoriesToShow);
    },
  },
  // computed: {
  // },
  created(){
    this.loadPhotoStories()
    this.loadLimitedPhotoStories()
  },
};
</script>

<style>
</style>