<template>
    <section v-if="story.text" class="single-story-text">
    <div
      class="small-profile-img-story-2-comment"
      @click="sendToProfilePage(story.owner._id)"
    >
      <img :src="story.owner.profileImgUrl" alt="ERROR!" />
    </div>
    <p>
      <span
        class="story-text-user-name"
        @click="sendToProfilePage(story.owner._id)"
        >{{ story.owner.username }}</span
      >
      {{ story.text }}
    </p>
  </section>

</template>

<script>
export default {
props: {
story: Object,
},

data(){
    return {
loggedInUser: {},

}
},
methods: {
async getLoggedInUser(){
    this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
},
sendToProfilePage(_id){
    this.$router.push('/profile-page/'+_id)
},

},

async created() {
   await this.getLoggedInUser()
},
}

</script>
