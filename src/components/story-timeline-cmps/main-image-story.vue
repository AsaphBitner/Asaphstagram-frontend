<template>
        <section class="main-image-story" @click="openSingleStory(story._id)">
        <img :src="story.imgUrl" alt="ERROR!" />
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
openSingleStory(_id){
    this.$router.push('/single-story/'+_id)
  },

},


created(){

},
}
</script>

<style>

</style>