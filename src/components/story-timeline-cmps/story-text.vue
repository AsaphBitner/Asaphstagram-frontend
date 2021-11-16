<template>
    <div class="story-text" >
        <p>
            <span @click="sendToProfilePage(story.owner._id)">{{ story.owner.username }}</span>&nbsp;{{ story.text }}
        </p>
    </div>

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
