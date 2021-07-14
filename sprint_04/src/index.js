import Vue from 'vue'
import VueRouter from 'vue-router'



const routes = [
    {
        path: '/',
        name: 'landing-page',
        component: landingPage
    },
    {
        path: '/profile/:userId',
        name: 'profile-page',
        component: userPage
    },
    {
        path: '/feed-following/:userId',
        name: 'follow-feed-page', 
        component: followingFeed
    },
]

const router = new VueRouter({
    routes
})

export default router