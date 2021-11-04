import Vue from 'vue'
import VueRouter from 'vue-router'
// import landingPage from '../pages/landing-page.vue'
import exploreFeed from '../pages/explore-feed.vue'
import followingFeed from '../pages/following-feed.vue'
import loginSignup from '../pages/login-signup.vue'
import profilePage from '../pages/profile-page.vue'
import singleStory from '../pages/single-story.vue'
import LikedStories from '../pages/liked-stories-page.vue'

Vue.use(VueRouter)



const routes = [
    {
        path: '/',
        name: 'login-signup',
        component: loginSignup
    },
    {
        path: '/following-feed/:userId',
        name: 'following-feed', 
        component: followingFeed
    }, 
    {
        path: '/explore-feed/:userId',
        name: 'explore-feed', 
        component: exploreFeed
    },
    {
        path: '/liked-stories-page/:userId',
        name: 'liked-stories-page',
        component: LikedStories
    },
    {
        path: '/profile-page/:userId',
        name: 'profile-page',
        component: profilePage
    },
    {
        path: '/single-story/:storyId',
        name: 'single-story', 
        component: singleStory
    },
]

const router = new VueRouter({
    routes
})

export default router