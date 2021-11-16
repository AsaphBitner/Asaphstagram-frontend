<template>
    <section class="story-liked-by">
        <p v-if="story.likedBy.length ">
            Liked by&nbsp;<span @click="sendToProfilePage(story.likedBy[0])">{{ latestLiker() }}</span
            >&nbsp;{{ likedByMessage() }}
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
latestLiker() {
    if (!this.story.likedBy.length) return;
    if (this.story.likedBy[0]._id === this.$store.state.loggedInUser._id) {
    return "you";
    } else {
    return this.story.likedBy[0].username;
    }
},
likedByMessage() {
    if (!this.story.likedBy.length) return;
    if (this.story.likedBy.length === 1) {
    return "";
    } else if (this.story.likedBy.length === 2) {
    return `and 1 other`;
    } else {
    return `and ${this.story.likedBy.length - 1} others`;
    }
},

},
// computed:{
//     likedByMe() {
//         if (!this.story.likedBy.length) return false 
//         const likedOrNot = this.story.likedBy.find((item) => {
//         return item._id === this.loggedInUser._id
//         })
//         // console.log(this.story.likedBy)
//         return likedOrNot
//     },
    
// },
async created() {
   await this.getLoggedInUser()
},
}

</script>
