<template>
              <section class="story-user-photo-name" >
                <div class="small-profile-img-story" @click="sendToProfilePage(story.owner._id)">
                  <img :src="story.owner.profileImgUrl" alt="ERROR!" />
                </div>
                  <div class="story-owner-username" @click="sendToProfilePage(story.owner._id)">
                  {{ story.owner.username }}
                  </div>
              <span
                class="story-options"
                @click="setToDelete('Post', story)"
              >
                <svg
                aria-label="More options"
                  class=""
                  fill="#262626"
                  height="16"
                  role="img"
                  viewBox="0 0 48 48"
                  width="16"
                >
                  <circle
                    clip-rule="evenodd"
                    cx="8"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clip-rule="evenodd"
                    cx="24"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clip-rule="evenodd"
                    cx="40"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                  ></circle>
                </svg>
              </span>
            </section>
</template>

<script>
export default {
props: {
story: Object,
},

data(){
    return {
example: 'EXAMPLE',

}
},
methods: {
sendToProfilePage(_id){
    this.$router.push('/profile-page/'+_id)
  },
  
  async deleteStory() {
    const payload = {
      _id: this.story._id
    }
    await this.$store.dispatch("deleteStory", payload);
    this.$emit('storyDeleted')
  },

},


created:{

},
}
</script>

<style>

</style>