import Vue from 'vue'
import Vuex from 'vuex'
import {storageService} from '@/services/async-storage-service.js'
// import {storyService} from '@/services/story-service.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,


    state: {
        loggedInUser: 
        {
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
            return stories
        },
    },
    mutations: {
        async loadStories(state){
            const stories = await storageService._loadStories()
            state.stories = stories; 
            // console.log('loadStories: ', state.stories)
            return state.stories
        },
        // setLoggedInUser(state, payload){
        //     state.loggedInUser = payload
        // },

        toggleLike(state, payloadInitial){
            // const details = payload.details
            const payload = payloadInitial.payload
            // console.log('payload ',payload)
            const storyIdx = payload.storyIdx
            const commentIdx = payload.commentIdx
            if (payload.request === 'add'){
                if (payload.entityType === 'story'){ 
                    state.stories[storyIdx].likedBy.unshift(payload.likeToAdd)
                }
                else {
                    // console.log(commentIdx)
                    state.stories[storyIdx].comments[commentIdx].likedBy.unshift(payload.likeToAdd)
                }
            }
            else {
                const removeIdx = payload.removeIdx
                if (payload.entityType === 'story'){
                    state.stories[storyIdx].likedBy.splice(removeIdx, 1)
                }
                else {
                    // console.log(state.stories[storyIdx].comments[commentIdx].likedBy)
                    state.stories[storyIdx].comments[commentIdx].likedBy.splice(removeIdx, 1)
                }
            }
        },

        addComment(state, {payload}){
            const storyIdx = payload.storyIdx
            state.stories[storyIdx].comments.unshift(payload.newComment)
        },
        deleteComment(state, {payload}){
            state.stories[payload.storyIdx].comments.splice(payload.commentIdx, 1)

        },
        deleteStory(state, {payload}){
            state.stories.splice(payload.idx, 1)
            // console.log(state.stories[0])
        }
    },

    actions: {
        async toggleLike({commit}, payload){
            const details = await storageService._toggleLike(payload)
            commit({type: 'toggleLike', payload: details})
        },

        async addComment({commit}, payload){
            // console.log('in actions, payload: ', payload)

         const newComment = await storageService.addComment(payload)
         payload.newComment = newComment
         commit({ type: 'addComment', payload: payload})

        }, 

        async deleteComment({commit}, payload){
            await storageService.deleteComment(payload)
            await commit({type: 'deleteComment', payload: payload})
        },
        async deleteStory({commit}, payload){
            await storageService._delete('stories', payload.story, payload.idx)
            commit({type: 'deleteStory', payload: payload})
        }

        // async getLoggedInUser({commit}){
        //     var payload = await storageService.query('loggedInUser')
        //     commit({type: 'setLoggedInUser', payload: payload})
        // },
    }
})

















