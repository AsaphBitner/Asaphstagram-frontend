import Vue from 'vue'
import Vuex from 'vuex'
import {storageService} from '@/services/async-storage-service.js'
// import {storyService} from '@/services/story-service.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,


    state: {
        // loggedInUser: 
        // {
        //     id: 'u11111',
        //     username: 'HomerS',
        //     password: 'Springfield',
        //     fullname: 'Homer Simpson',
        //     profileImgUrl: 'img/profile photos/IMG1.jpg',

        // },
        
    },


    getters: {
        // getState(state){
        //     return state
        // },

        getUsers({users}){
            return users
        },
        getStories({stories}){
            // console.log( 'getters: ', stories)
            return stories
        },
    },
    mutations: {
        loadStories(state, {payload}){
            state.stories = payload.slice(); 
            // console.log('mutations: ', state.stories)
        },
        // setLoggedInUser(state, payload){
        //     state.loggedInUser = payload
        // },
        loadUsers(state, {users}){
            state.users = users.slice()
            // console.log('USERS: ', state.users)
        },

        toggleLike(state, {payload}){
            // const payload = payloadInitial.payload
            const storyIdx = state.stories.findIndex((element) => { return element._id === payload.story._id})
            
            const commentIdx = payload.commentIdx
            if (payload.request === 'add'){
                if (payload.entityType === 'story'){ 
                    state.stories[storyIdx].likedBy.unshift(payload.likeToAdd)
                }
                else {
                    state.stories[storyIdx].comments[commentIdx].likedBy.unshift(payload.likeToAdd._id)
                }
            }
            else {
                const removeIdx = payload.removeIdx
                if (payload.entityType === 'story'){
                    state.stories[storyIdx].likedBy.splice(removeIdx, 1)
                }
                else {
                    state.stories[storyIdx].comments[commentIdx].likedBy.splice(removeIdx, 1)
                }
            }
        },

        addComment(state, {payload}){
           const storyIdx = state.stories.findIndex((element) => { return element._id === payload.story._id})
           state.stories[storyIdx].comments.push(payload.newComment)
        },
        deleteComment(state, {payload}){
           const storyIdx = state.stories.findIndex((element) => { return element._id === payload.story._id})
           state.stories[storyIdx].comments.splice(payload.commentIdx, 1)

        },
        deleteStory(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => { return element._id === payload._id})
            state.stories.splice(storyIdx, 1)
            const userIdx = state.users.findIndex((item)=> {return item._id === state.loggedInUser._id})
            // console.log(state.users)
            const removeFromUserIdx = state.users[userIdx].ownedStories.findIndex(item => {return item === payload._id})
            state.users[userIdx].ownedStories.splice(removeFromUserIdx, 1)
        },
        addStory(state, {payload}){
            state.stories.unshift(payload)
        },
        getLoggedInUser(state, {payload}){
            state.loggedInUser = payload
        },
        saveNewProfileText(state, {user}){
            const userIdx = state.users.findIndex(item => item._id === user._id)
            state.users[userIdx].profileText = user.profileText 
        },
    },

    actions: {
        async loadStories({commit}){
            const stories = await storageService._loadStories()

            commit({type: 'loadStories', payload: stories})
        },
        async loadUsers(){
            const users = await storageService._loadUsers()
            this.commit({type: 'loadUsers', users: users})
        },
        async toggleLike({commit}, payload){
            const details = await storageService._toggleLike(payload)
            commit({type: 'toggleLike', payload: details})
        },

        async addComment({commit}, payload){

         const newComment = await storageService.addComment(payload)
         payload.newComment = newComment
         commit({ type: 'addComment', payload: payload})

        }, 

        async deleteComment({commit}, payload){
            await storageService.deleteComment(payload)
            await commit({type: 'deleteComment', payload: payload})
        },
        async deleteStory({commit}, payload){
            if (!payload.idx) {payload.idx = null}
            await storageService.deleteStory(payload)
            commit({type: 'deleteStory', payload: payload})
        },

        async addStory({commit}, payload){
            const newStory = await storageService.addStory(payload)
            commit({type: 'addStory', payload: newStory})
        },
        async getLoggedInUser({commit}){
            const loggedInUser = await storageService.getLoggedInUser()
            // console.log('STORE: ', loggedInUser)
            commit({type: 'getLoggedInUser', payload: loggedInUser})
            return loggedInUser
        },

        async saveNewProfileText({commit}, user){
            const saveText = await storageService.saveNewProfileText(user)
            if (saveText === 'SUCCESS')
            {commit({type: 'saveNewProfileText', user: user})
            return 'SUCCESS'}
        },
 
        // async getLoggedInUser({commit}){
        //     var payload = await storageService.query('loggedInUser')
        //     commit({type: 'setLoggedInUser', payload: payload})
        // },
    }
})

















