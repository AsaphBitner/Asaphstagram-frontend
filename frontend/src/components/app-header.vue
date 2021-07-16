<template>
  <div class="header-container">
    <h3 class="header-logo">Asaphstagram</h3> 
    <router-link :to="'/'">
    Landing-Page
    </router-link> 

    <router-link :to="'/following-feed'">
    Following Feed
    </router-link>
    
    <router-link :to="'/explore-feed'">
    Explore Feed
    </router-link>

    <router-link :to="'/profile-page'">
    User Profile
    </router-link>
   
    <!-- <router-link :to="'/login-signup'">
    Login-Signup
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: "app-header",
};
</script>

<style>
</style>