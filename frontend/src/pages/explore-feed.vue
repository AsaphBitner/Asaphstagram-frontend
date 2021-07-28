<template>
  <div>
        <app-header @openNewStory="openNewStory()" />

    <h1>Explore Feed!!!</h1>
    <div class="img-container">
      <img
        src="img/Stock photos - NY/NY01.jpg"
        alt="Sorry, no image here"
      />
    </div>
  </div>
</template>

<script>
import appHeader from '../components/app-header.vue'

export default {
components:{
appHeader,
}

}
</script>

<style>
</style>