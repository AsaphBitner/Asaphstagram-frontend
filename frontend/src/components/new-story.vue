<template>
  
  <div class="new-story-menus-container">
    <div v-if="background" class="menu-background" @click="closeMenu">
    </div>
      <div v-if="screen1" class="story-upload-image screen1">
        <div class="story-upload-image-header">
          <span></span>
          New Post
          <span class="close-menu" @click="closeMenu">
            <svg aria-label="Close" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
          </span>
        </div>
        <div class="story-upload-image-body" >

          <span v-if="!isLoading"> 
            Drag Photos Here
          </span>
          <div v-if="isLoading" class="loading-gif" >
            <img src="img/img-loading-circle-of-circles-gif.gif" alt="">
          </div> 
          <label v-if="!isLoading" for="img-upload">
          <svg aria-label="Icon to represent media such as images or videos" class="_8-yf5 " fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"></path></svg>
          <h2>
          Or Select from Your Computer
          </h2>
          <input type="file" class="upload-img" id="img-upload" @change="onUploadImg">
        </label>
        </div>
      </div>

      <div v-if="screen2" class="story-add-caption screen2">
        <div class="add-caption-header">
          <span class="new-story-back" @click="switchToScreen('1')">
            <svg aria-label="Back" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg>
          </span>
          <h1>Compose</h1>
          <span class="close-menu" @click="closeMenu">
            <svg aria-label="Close" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
          </span>

        </div>
        <!-- ============== END OF HEADER ========= -->
        <div class="add-caption-body">
          <div class="img-container">
            <img :src="this.newImgUrl" alt="">
          </div>
          <div class="caption-container">
            <textarea v-model="newStoryText" name="" class="caption-text" cols="30" rows="10" placeholder="Add a caption...">
            </textarea>
              <!-- <span>
                <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
              </span> -->
            <button @click="addStory()">Publish</button>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import {uploadImg} from '@/services/img-upload-service.js'

export default {
  // components:{
  //   uploadImg,
  // },
// props: {

// },
//===========================
data(){
  return{
    loggedInUser: this.$store.state.loggedInUser,
    isLoading: false,
    background: true,
    screen1: true,
    screen2: false,
    newStoryText: '',
    newImgUrl: '',
  }
},
//===========================
methods:{
async onUploadImg(ev){
this.isLoading = true
const res = await uploadImg(ev)
this.isLoading = false
// console.log(res)
this.newImgUrl = res.url
this.switchToScreen('2')
},

switchToScreen(screen){
  if (screen === '1') {
    this.screen1 = true
    this.screen2 = false
    this.newImgUrl = ''
    }
  else{
    this.screen1 = false 
    this.screen2 = true
    this.newStoryText = ''
  }
},
closeMenu(){
this.$emit('close')
},
async addStory(){
  const payload = {
    id: '',
    txt: this.newStoryText,
    imgUrl: this.newImgUrl,
    createdAt: Date.now(),
    owner: {
      id: this.loggedInUser.id,
      fullname: this.loggedInUser.fullname,
      username: this.loggedInUser.username,
      imgUrl: this.loggedInUser.profileImgUrl,
    },
    comments: [],
    likedBy: [],
  }
  await this.$store.dispatch('addStory', payload)
  this.$emit('saved')    
},

created(){
  this.background = true
  this.screen1 = true
}

}
}
</script>



<style>

</style>

