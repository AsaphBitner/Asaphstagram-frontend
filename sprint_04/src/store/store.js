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
                url: '../../../Stock photos - NY/NY01.jpg'
            },
            {
                name: 'NY2',
                url: '../../../Stock photos - NY/NY02.jpg'
            },
            {
                name: 'NY3',
                url: '../../../Stock photos - NY/NY03.jpeg'
            },
            {
                name: 'NY4',
                url: '../../../Stock photos - NY/NY04.jpg'
            },
            {
                name: 'NY5',
                url: '../../../Stock photos - NY/NY05.jpeg'
            },
            {
                name: 'NY6',
                url: '../../../Stock photos - NY/NY06.jpg'
            },
            {
                name: 'NY7',
                url: '../../../Stock photos - NY/NY07.jpg'
            },
        ],
        users: [
            {
                id: 'u12345',
                username: 'HomerS',
                password: 'Springfield',
                fullname: 'Homer Simpson',
                birthDate: 410273492,
                profileImgUrl: 'http://some-img',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        fullname: 'Tony Soprano',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u22222',
                        fullname: 'James T. Kirk',
                        imgUrl: 'http://some-img'
                    },
                ],
                followers: [
                    {
                        id: 'u11111',
                        fullname: 'Tony Soprano',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u22222',
                        fullname: 'James T. Kirk',
                        imgUrl: 'http://some-img'
                    }
                ],
                savedPhotoStoryIds: ['s104', 's111', 's123'],
            },
            {
                id: 'u11111',
                username: 'TonyS',
                password: 'NewJersey',
                fullname: 'Tony Soprano',
                birthDate: 410273421,
                profileImgUrl: 'http://some-img',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u12345',
                        fullname: 'Homer Simpson',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u22222',
                        fullname: 'James T. Kirk',
                        imgUrl: 'http://some-img'
                    }
                ],
                followers: [
                    {
                        id: 'u12345',
                        fullname: 'Homer Simpson',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u22222',
                        fullname: 'James T. Kirk',
                        imgUrl: 'http://some-img'
                    },
                ],
                savedPhotoStoryIds: ['s204', 's211', 's223'],
            },
            {
                id: 'u22222',
                username: 'JamesTK',
                password: 'Enterprise',
                fullname: 'James T. Kirk',
                birthDate: 510273421,
                profileImgUrl: 'http://some-img',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u12345',
                        fullname: 'Homer Simpson',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u11111',
                        fullname: 'Tony Soprano',
                        imgUrl: 'http://some-img'
                    }
                ],
                followers: [
                    {
                        id: 'u12345',
                        fullname: 'Homer Simpson',
                        imgUrl: 'http://some-img'
                    },
                    {
                        id: 'u11111',
                        fullname: 'Tony Soprano',
                        imgUrl: 'http://some-img'
                    },
                ],
                savedPhotoStoryIds: ['s304', 's311', 's323'],
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
















