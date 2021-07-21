import Vue from 'vue'
import Vuex from 'vuex'
import {storageService} from '@/services/async-storage-service.js'
// import {storyService} from '@/services/story-service.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,


    state: {
        loggedInUser: {
            id: 'u11111',
            username: 'HomerS',
            password: 'Springfield',
            fullname: 'Homer Simpson',
            profileImgUrl: 'img/profile photos/IMG1.jpg',

        },
        
    },


    getters: {
        // getState(state){
        //     return state
        // },

        getUsers({users}){
            return users.slice()
        },
        getStories({stories}){
            // console.log( 'getters: ', stories)
            return stories.slice()
        },
    },
    mutations: {
        async loadStories(state){
            const stories = await storageService._loadStories()
            state.stories = stories; 
            // console.log('loadStories: ', state.stories)
            return state.stories
        },

        toggleLike(state, payload){
            if (payload.details.request === 'add'){
                state.stories[payload.details.storyIdx].likedBy.unshift(payload.details.likeToAdd)
            }
            else {
                state.stories[payload.details.storyIdx].likedBy[payload.details.removeIdx].splice(payload.details.removeIdx, 1)
            }
        },
    //     sendBack.request = 'add'
    //     sendBack.storyIdx = storyIdx
    //     sendBack.likeToAdd = likeToAdd
    // }
    // else{
    //     const removeIdx = stories[storyIdx].likedBy.findIndex(item => {return item.id === this.$store.this.$store.state.loggedInUser.id})
    //     stories[storyIdx].likedBy.splice(removeIdx, 1)
    //     sendBack.request = 'remove'
    //     sendBack.storyIdx = storyIdx
    //     sendBack.removeIdx = removeIdx
            
            // const storyIdx = state.stories.findIndex((element) => { return element.id === storyId})
            // if (removeOrAdd = 'add'){
            //     const likeToAdd = {
            //         id: state.loggedInUser.id,
            //         fullname: state.loggedInUser.fullname,
            //         username: state.loggedInUser.username,
            //         profileImgUrl: state.loggedInUser.profileImgUrl,
            //     }
            //     state.stories[storyIdx].likedBy.unshift(likeToAdd)
            // }
            // else{
            //     const toRemove = state.stories[storyIdx].likedBy.findIndex(item => {return item.id === state.loggedInUser.id})
            //     state.stories[storyIdx].likedBy.splice(toRemove, 1)
            // }
            

        
        addCommentLike(state, payload){
            const likeToAdd = {
                id: state.loggedInUser.id,
                fullname: state.loggedInUser.fullname,
                username: state.loggedInUser.username,
                profileImgUrl: state.loggedInUser.profileImgUrl,
            }

            const storyIdx = state.stories.findIndex((element) => { return element.id === payload.storyId})
            const commentIdx = state.stories[storyIdx].comments.findIndex((element) => { return element.id === payload.commentId})
            if (!state.stories[storyIdx].comments[commentIdx].likedBy){
                state.stories[storyIdx].comments[commentIdx].likedBy = []
            }
            state.stories[storyIdx].comments[commentIdx].likedBy.unshift(likeToAdd)
            // console.log('added ', state.stories[0].comments[0].likedBy)
        },
        removeCommentLike(state, payload){
            // console.log('to remove ', state.stories[0].comments[0].likedBy)
            const storyIdx = state.stories.findIndex((element) => { return element.id === payload.storyId})
            const commentIdx = state.stories[storyIdx].comments.findIndex((element) => { return element.id === payload.commentId})
            const likeIdx = state.stories[storyIdx].comments[commentIdx].likedBy.findIndex((element) => { return element.id === state.loggedInUser.id})
            state.stories[storyIdx].comments[commentIdx].likedBy.splice(likeIdx, 1)
        },

        addComment(state, payload){
            
            var commentToAdd = {
                id: storageService._makeId(),
                by: {
                    id: state.loggedInUser.id,
                    fullname: state.loggedInUser.fullname,
                    username: state.loggedInUser.username,
                    profileImgUrl: state.loggedInUser.profileImgUrl,
                },
                txt: payload.txt,
            }
            // console.log(commentText)
            const storyIdx = state.stories.findIndex((element) => { return element.id === payload.id})
            state.stories[storyIdx].comments.unshift(commentToAdd)
        },
        removeComment(state, storyId, commentId){
            const storyIdx = state.stories.findIndex((element) => { return element.id === storyId})
            const commentIdx = state.stories[storyIdx].comments.find((element) => { return element.id === commentId})
            state.stories[storyIdx].comments.splice(commentIdx, 1)
        },
    },

    actions: {
        async toggleLike({commit}, payload){
            const details = await storageService._toggleLike(payload)
            commit({type: 'toggleLike', details: details})
        },
    }
})

















