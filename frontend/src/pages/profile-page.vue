<template>
  <h1>
    PROFILE PAGE!!!      
  </h1>
</template>

<script>
export default {
data(){
  return{
    userId: this.$store.state.loggedInUser.id,
  }
}
}
</script>

<style>

</style>