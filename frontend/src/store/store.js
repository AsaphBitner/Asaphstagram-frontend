import Vue from 'vue'
import Vuex from 'vuex'
import {storageService} from '@/services/storage-service.js'


Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,


    state: {
        //===================PHOTOS!!!=========================================================
        loggedInUser: {
            id: 'u11111',
            username: 'HomerS',
            password: 'Springfield',
            fullname: 'Homer Simpson',
            profileImgUrl: 'img/profile photos/IMG1.jpg',

        },
        photos: [
            {
                name: 'NY1',
                url: 'img/Stock photos - NY/NY01.jpg'
            },
            {
                name: 'NY2',
                url: 'img/Stock photos - NY/NY02.jpg'
            },
            {
                name: 'NY3',
                url: 'img/Stock photos - NY/NY03.jpeg'
            },
            {
                name: 'NY4',
                url: 'img/Stock photos - NY/NY04.jpg'
            },
            {
                name: 'NY5',
                url: 'img/Stock photos - NY/NY05.jpeg'
            },
            {
                name: 'NY6',
                url: 'img/Stock photos - NY/NY06.jpg'
            },
            {
                name: 'NY7',
                url: 'img/Stock photos - NY/NY07.jpg'
            },
        ],
        //=================================USERS!!!=========================================================

        users: [
            {
                id: 'u11111',
                username: 'HomerS',
                password: 'Springfield',
                fullname: 'Homer Simpson',
                birthDate: 410273492,
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                followers: [
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    }
                ],
                savedPhotoStoryIds: ['s111', 's112', 's113'],
            },
            {
                id: 'u22222',
                username: 'TonyS',
                password: 'NewJersey',
                fullname: 'Tony Soprano',
                birthDate: 410273421,
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        fullname: 'Homer Simpson',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    }
                ],
                followers: [
                    {
                        id: 'u11111',
                        fullname: 'Homer Simpson',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                savedPhotoStoryIds: ['s221', 's222', 's223'],
            },
            {
                id: 'u33333',
                username: 'JamesTK',
                password: 'Enterprise',
                fullname: 'James T. Kirk',
                birthDate: 510273421,
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        fullname: 'Homer Simpson',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    }
                ],
                followers: [
                    {
                        id: 'u11111',
                        fullname: 'Homer Simpson',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                savedPhotoStoryIds: ['s331', 's332', 's333'],
            }
        ],

        
        //=================================PHOTO STORIES!!!=========================================================

        
        photoStories: [
            //=================================PHOTO STORY 1=========================================================
            {
                id: 's111',
                txt: 'Best trip ever11111111',
                imgUrl: 'img/Stock photos - NY/NY01.jpg', //Can be an array if decide to support multiple imgs
                createdAt: 123543452,
                owner: {
                    id: 'u11111',
                    fullname: 'Homer Simpson',
                    username: 'HomerS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                loc: {
                    lat: 40.75249545209201, 
                    lng: -73.98568429583557,
                    name: 'New York'
                },
                comments: [
                    {
                        id: 'c1111',
                        by: {
                            id: 'u22222',
                            fullname: 'Tony Soprano',
                            username: 'TonyS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                        likedBy: [ // Optional
                           {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        ],
                    },
                    {
                        id: 'c22222',
                        by: {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'not good!',
                    }
                ],
                likedBy: [
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
            },
              //=================================PHOTO STORY 2=========================================================
              {
                id: 's222',
                txt: 'Best trip ever222222',
                imgUrl: 'img/Stock photos - NY/NY02.jpg', //Can be an array if decide to support multiple imgs
                createdAt: 123543452,
                owner: {
                    id: 'u11111',
                    fullname: 'Homer Simpson',
                    username: 'HomerS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                loc: {
                    lat: 40.75249545209201, 
                    lng: -73.98568429583557,
                    name: 'New York'
                },
                comments: [
                    {
                        id: 'c1111',
                        by: {
                            id: 'u22222',
                            fullname: 'Tony Soprano',
                            username: 'TonyS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                        likedBy: [ // Optional
                           {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        ],
                    },
                    {
                        id: 'c22222',
                        by: {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'not good!',
                    }
                ],
                likedBy: [
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
            },
              //=================================PHOTO STORY 3=========================================================
              {
                id: 's333',
                txt: 'Best trip ever333333',
                imgUrl: 'img/Stock photos - NY/NY03.jpeg', //Can be an array if decide to support multiple imgs
                createdAt: 123543452,
                owner: {
                    id: 'u11111',
                    fullname: 'Homer Simpson',
                    username: 'HomerS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                loc: {
                    lat: 40.75249545209201, 
                    lng: -73.98568429583557,
                    name: 'New York'
                },
                comments: [
                    {
                        id: 'c1111',
                        by: {
                            id: 'u22222',
                            fullname: 'Tony Soprano',
                            username: 'TonyS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                        likedBy: [ // Optional
                           {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        ],
                    },
                    {
                        id: 'c22222',
                        by: {
                            id: 'u33333',
                            fullname: 'James T. Kirk',
                            username: 'JamesTK',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        },
                        txt: 'not good!',
                    }
                ],
                likedBy: [
                    {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
            },
           //=================================PHOTO STORY 4=========================================================
           {
            id: 's444',
            txt: 'Best trip ever444444',
            imgUrl: 'img/Stock photos - NY/NY04.jpg', //Can be an array if decide to support multiple imgs
            createdAt: 123543452,
            owner: {
                id: 'u11111',
                fullname: 'Homer Simpson',
                username: 'HomerS',
                imgUrl: 'img/profile photos/IMG1.jpg'
            },
            loc: {
                lat: 40.75249545209201, 
                lng: -73.98568429583557,
                name: 'New York'
            },
            comments: [
                {
                    id: 'c1111',
                    by: {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                    likedBy: [ // Optional
                        {
                            id: 'u11111',
                            fullname: 'Homer Simpson',
                            username: 'HomerS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        }
                    ]
                },
                {
                    id: 'c22222',
                    by: {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'not good!',
                }
            ],
            likedBy: [
                {
                    id: 'u22222',
                    fullname: 'Tony Soprano',
                    username: 'TonyS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                {
                    id: 'u33333',
                    fullname: 'James T. Kirk',
                    username: 'JamesTK',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
            ],
        },
           //=================================PHOTO STORY 5=========================================================
           {
            id: 's555',
            txt: 'Best trip ever5555555',
            imgUrl: 'img/Stock photos - NY/NY05.jpeg', //Can be an array if decide to support multiple imgs
            createdAt: 123543452,
            owner: {
                id: 'u11111',
                fullname: 'Homer Simpson',
                username: 'HomerS',
                imgUrl: 'img/profile photos/IMG1.jpg'
            },
            loc: {
                lat: 40.75249545209201, 
                lng: -73.98568429583557,
                name: 'New York'
            },
            comments: [
                {
                    id: 'c1111',
                    by: {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                    likedBy: [ // Optional
                        {
                            id: 'u11111',
                            fullname: 'Homer Simpson',
                            username: 'HomerS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        }
                    ]
                },
                {
                    id: 'c22222',
                    by: {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'not good!',
                }
            ],
            likedBy: [
                {
                    id: 'u22222',
                    fullname: 'Tony Soprano',
                    username: 'TonyS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                {
                    id: 'u33333',
                    fullname: 'James T. Kirk',
                    username: 'JamesTK',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
            ],
        },
           //=================================PHOTO STORY 6=========================================================
           {
            id: 's666',
            txt: 'Best trip ever666666666',
            imgUrl: 'img/Stock photos - NY/NY06.jpg', //Can be an array if decide to support multiple imgs
            createdAt: 123543452,
            owner: {
                id: 'u11111',
                fullname: 'Homer Simpson',
                username: 'HomerS',
                imgUrl: 'img/profile photos/IMG1.jpg'
            },
            loc: {
                lat: 40.75249545209201, 
                lng: -73.98568429583557,
                name: 'New York'
            },
            comments: [
                {
                    id: 'c1111',
                    by: {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                    likedBy: [ // Optional
                        {
                            id: 'u11111',
                            fullname: 'Homer Simpson',
                            username: 'HomerS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        }
                    ]
                },
                {
                    id: 'c22222',
                    by: {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'not good!',
                }
            ],
            likedBy: [
                {
                    id: 'u22222',
                    fullname: 'Tony Soprano',
                    username: 'TonyS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                {
                    id: 'u33333',
                    fullname: 'James T. Kirk',
                    username: 'JamesTK',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
            ],
        },
           //=================================PHOTO STORY 7=========================================================
           {
            id: 's777',
            txt: 'Best trip ever77777777',
            imgUrl: 'img/Stock photos - NY/NY07.jpg', //Can be an array if decide to support multiple imgs
            createdAt: 123543452,
            owner: {
                id: 'u11111',
                fullname: 'Homer Simpson',
                username: 'HomerS',
                imgUrl: 'img/profile photos/IMG1.jpg'
            },
            loc: {
                lat: 40.75249545209201, 
                lng: -73.98568429583557,
                name: 'New York'
            },
            comments: [
                {
                    id: 'c1111',
                    by: {
                        id: 'u22222',
                        fullname: 'Tony Soprano',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
                    likedBy: [ // Optional
                        {
                            id: 'u11111',
                            fullname: 'Homer Simpson',
                            username: 'HomerS',
                            imgUrl: 'img/profile photos/IMG1.jpg'
                        }
                    ]
                },
                {
                    id: 'c22222',
                    by: {
                        id: 'u33333',
                        fullname: 'James T. Kirk',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    txt: 'not good!',
                }
            ],
            likedBy: [
                {
                    id: 'u22222',
                    fullname: 'Tony Soprano',
                    username: 'TonyS',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
                {
                    id: 'u33333',
                    fullname: 'James T. Kirk',
                    username: 'JamesTK',
                    imgUrl: 'img/profile photos/IMG1.jpg'
                },
            ],
        },

        ],
    },


    getters: {
        // getState(state){
        //     return state
        // },

        getUsers({users}){
            return users.slice()
        },
        getPhotoStories({photoStories}){
            return photoStories.slice()
        },
    },
    mutations: {
        removeLike(state, storyId){
            const storyIdx = state.photoStories.findIndex((element) => { return element.id === storyId})
            const toRemove = state.photoStories[storyIdx].likedBy.findIndex(item => {return item.id === state.loggedInUser.id})
            state.photoStories[storyIdx].likedBy.splice(toRemove, 1)

        },
        addLike(state, storyId){
            const likeToAdd = {
                id: state.loggedInUser.id,
                fullname: state.loggedInUser.fullname,
                username: state.loggedInUser.username,
                profileImgUrl: state.loggedInUser.profileImgUrl,
            }
            const storyIdx = state.photoStories.findIndex((element) => { return element.id === storyId})
            // console.log(storyIdx, storyId, state.photoStories[0].id)
            state.photoStories[storyIdx].likedBy.unshift(likeToAdd)
        },
        addCommentLike(state, payload){
            const likeToAdd = {
                id: state.loggedInUser.id,
                fullname: state.loggedInUser.fullname,
                username: state.loggedInUser.username,
                profileImgUrl: state.loggedInUser.profileImgUrl,
            }

            const storyIdx = state.photoStories.findIndex((element) => { return element.id === payload.storyId})
            const commentIdx = state.photoStories[storyIdx].comments.findIndex((element) => { return element.id === payload.commentId})
            if (!state.photoStories[storyIdx].comments[commentIdx].likedBy){
                state.photoStories[storyIdx].comments[commentIdx].likedBy = []
            }
            state.photoStories[storyIdx].comments[commentIdx].likedBy.unshift(likeToAdd)
            // console.log('added ', state.photoStories[0].comments[0].likedBy)
        },
        removeCommentLike(state, payload){
            // console.log('to remove ', state.photoStories[0].comments[0].likedBy)
            const storyIdx = state.photoStories.findIndex((element) => { return element.id === payload.storyId})
            const commentIdx = state.photoStories[storyIdx].comments.findIndex((element) => { return element.id === payload.commentId})
            const likeIdx = state.photoStories[storyIdx].comments[commentIdx].likedBy.findIndex((element) => { return element.id === state.loggedInUser.id})
            state.photoStories[storyIdx].comments[commentIdx].likedBy.splice(likeIdx, 1)
        },

        addComment(state, payload){
            // var x=storageService.makeId()
            // if (!x) return
            // console.log('store ', payload)
            var commentToAdd = {
                id: storageService.makeId(),
                by: {
                    id: state.loggedInUser.id,
                    fullname: state.loggedInUser.fullname,
                    username: state.loggedInUser.username,
                    profileImgUrl: state.loggedInUser.profileImgUrl,
                },
                txt: payload.txt,
            }
            // console.log(commentText)
            const storyIdx = state.photoStories.findIndex((element) => { return element.id === payload.id})
            state.photoStories[storyIdx].comments.unshift(commentToAdd)
        },
        removeComment(state, storyId, commentId){
            const storyIdx = state.photoStories.findIndex((element) => { return element.id === storyId})
            const commentIdx = state.photoStories[storyIdx].comments.find((element) => { return element.id === commentId})
            state.photoStories[storyIdx].comments.splice(commentIdx, 1)
        },

    },
    actions: {
    
    }
})
















