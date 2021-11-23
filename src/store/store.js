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
            state.stories = []
            state.stories = payload 
            // console.log('mutations: ', state.stories)
        },
        // setLoggedInUser(state, payload){
        //     state.loggedInUser = payload
        // },
        loadUsers(state, {users}){
            state.users = users.slice()
            // console.log('USERS: ', state.users)
        },

        addStoryLike(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => {return element._id === payload.storyId})
            state.stories[storyIdx].likedBy.unshift(payload.likeToAdd)
        },

        removeStoryLike(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => {return element._id === payload.storyId})
            state.stories[storyIdx].likedBy.splice(payload.likeIdx, 1)
        },
        addCommentLike(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => {return element._id === payload.storyId})
            state.stories[storyIdx].comments[payload.commentIdx].likedBy.unshift(state.loggedInUser._id)
        },
        removeCommentLike(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => {return element._id === payload.storyId})
            state.stories[storyIdx].comments[payload.commentIdx].likedBy.splice(payload.commenLikeIdx, 1)
        },


        addComment(state, {payload}){
           const storyIdx = state.stories.findIndex((element) => { return element._id === payload.storyId})
           state.stories[storyIdx].comments.push(payload.newComment)
        },
        deleteComment(state, {payload}){
           const storyIdx = state.stories.findIndex((element) => { return element._id === payload.storyId})
           const commentIdx = state.stories[storyIdx].comments.findIndex((element) => { return element._id === payload.commentId})
           state.stories[storyIdx].comments.splice(commentIdx, 1)

        },
        deleteStory(state, {payload}){
            const storyIdx = state.stories.findIndex((element) => { return element._id === payload})
            state.stories.splice(storyIdx, 1)
            const userIdx = state.users.findIndex((item)=> {return item._id === state.loggedInUser._id})
            const removeFromUserIdx = state.users[userIdx].ownedStories.findIndex(item => {return item === payload})
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
        addFollow(state, {payload}){
        const loggedInIdx = state.users.findIndex(item=>item._id === payload.follower._id)
        const pageOwnerIdx = state.users.findIndex(item=>item._id === payload.following._id)
        state.users[loggedInIdx].following.unshift(payload.following._id)
        state.users[pageOwnerIdx].followers.unshift(payload.follower._id)
        },
        deleteFollow(state, {payload}){
        const loggedInIdx = state.users.findIndex(item=>item._id === payload.follower._id)
        const pageOwnerIdx = state.users.findIndex(item=>item._id === payload.following._id)
        const removeIdxFollow = state.users[loggedInIdx].following.findIndex(item=>item === payload.following._id)
        const removeIdxFollowing = state.users[pageOwnerIdx].followers.findIndex(item=>item === payload.follower._id)
        state.users[loggedInIdx].following.splice(removeIdxFollow, 1)
        state.users[pageOwnerIdx].followers.splice(removeIdxFollowing, 1)
        },
        login(state, {payload}){
            // console.log('!!!!!!!!!!' ,payload)
            state.loggedInUser = {}
            state.loggedInUser._id = payload._id
            state.loggedInUser.username = payload.username
            state.loggedInUser.fullname = payload.fullname
            state.loggedInUser.profileImgUrl = payload.profileImgUrl
        },
        logout(state){
            state.loggedInUser._id = ''
            state.loggedInUser.username = ''
            state.loggedInUser.fullname = ''
            state.loggedInUser.profileImgUrl = ''
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
        async addStoryLike({commit}, payload){
            const details = await storageService.addStoryLike(payload)
            commit({type: 'addStoryLike', payload: details})
        },
        async removeStoryLike({commit}, payload){
            const details = await storageService.removeStoryLike(payload)
            commit({type: 'removeStoryLike', payload: details})
        },
        async addCommentLike({commit}, payload){
            const details = await storageService.addCommentLike(payload)
            commit({type: 'addCommentLike', payload: details})
        },
        async removeCommentLike({commit}, payload){
            const details = await storageService.removeCommentLike(payload)
            commit({type: 'removeCommentLike', payload: details})
        },

        async addComment({commit}, payload){
         const newPayload = await storageService.addComment(payload)
         commit({ type: 'addComment', payload: newPayload})

        }, 

        async deleteComment({commit}, payload){
            await storageService.deleteComment(payload)
            commit({type: 'deleteComment', payload: payload})
        },
        async deleteStory({commit}, payload){
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
        async addFollow({commit}, payload){
            const updateConfirm = await storageService.updateFollow(payload)
            if (updateConfirm === 'SUCCESS')
            {commit({type: 'addFollow', payload: payload})
            return 'SUCCESS'}
        },
        async deleteFollow({commit}, payload){
            const updateConfirm = await storageService.updateFollow(payload)
            if (updateConfirm === 'SUCCESS')
            {commit({type: 'deleteFollow', payload: payload})
            return 'SUCCESS'}
        },
        async login({commit}, payload){
            const loggedInUser = await storageService.login(payload)
            if (loggedInUser) {
                commit({type: 'login', payload: loggedInUser})
                return loggedInUser
            }
            else {return ''}
        },
        async logout({commit}){
            await storageService.logout()
            commit({type: 'logout'})
        },
        // async getSingleStory(payload){
        //     console.log(payload)
        //     let story = await storageService.getSingleStory(payload)
        //     return story
        // },

        // async getLoggedInUser({commit}){
        //     var payload = await storageService.query('loggedInUser')
        //     commit({type: 'setLoggedInUser', payload: payload})
        // },
    }
})

















