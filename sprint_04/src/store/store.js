import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    //   modules: {
    //     userStore,
    //     socketStore,
    //     reviewStore
    //   },
    // photosOwned: [
    //     {
    //         id: 'p10392',
    //         description: 'Lorem ipsum! Wow! what a great story Mark',
    //         photoUrl: 'https://asaphstagram/p-10' 
    //     },
    // ],
    state: {
        photos: [
            {
            name: 'NY1',
            url: ''
        }
        ],
        users: [
            {
                id: 'u12345',
                username: 'HomerS',
                password: 'Springfield',
                fullname: 'Homer Simpson',
                birthDate: 410273492,
                profileImgUrl: 'http://some-img',
                isFollowing: ['u12236', 'u14455', 'u79003'],
                followers: ['u44236', 'u13225', 'u79003'],
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u106',
                        fullname: 'Dob',
                        imgUrl: 'http://some-img'
                    },
                ],
                followers: [
                    {
                        id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'http://some-img'
                    },
                ],
                savedPhotoStoryIds: ['s104', 's111', 's123'],
            }
        ],


    },

    getters: {
    },
    mutations: {
    },
    actions: {
    }
})
















