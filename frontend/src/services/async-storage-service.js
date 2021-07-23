
// import {store} from '@/store/store.js'

// console.log(store)

export const storageService = {
    query,
    _get,
    _save,
    post,
    put,
    remove,
    _makeId,
    _loadStories,
    _toggleLike,
    gLoggedInUser,
    addComment,
    deleteComment,
    _delete,
}

var gLoggedInUser = {
    id: 'u11111',
    username: 'HomerS',
    password: 'Springfield',
    fullname: 'Homer Simpson',
    profileImgUrl: 'img/profile photos/IMG1.jpg',

}

_save('loggedInUser', gLoggedInUser)



function query(entityType, delay=0) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(entities)
        }, delay)
    })
}

async function _toggleLike(payload){
    const stories = await query('stories')
    // const storyIdx = stories.findIndex((element) => { return element.id === payload.story.id})
    var sendBack = payload
    
    if (payload.request === 'add'){
        var likeToAdd = {
            id: gLoggedInUser.id,
            fullname: gLoggedInUser.fullname,
            username: gLoggedInUser.username,
            profileImgUrl: gLoggedInUser.profileImgUrl,
        }
        sendBack.likeToAdd = likeToAdd
        if (payload.entityType === 'story'){
            stories[payload.storyIdx].likedBy.unshift(likeToAdd)
        }
        else {
            stories[payload.storyIdx].comments[payload.commentIdx].likedBy.unshift(likeToAdd)
        }
    }
    else{
        var removeIdx = -100
        if (payload.entityType === 'story'){
            removeIdx = stories[payload.storyIdx].likedBy.findIndex(item => {return item.id === gLoggedInUser.id})
            stories[payload.storyIdx].likedBy.splice(removeIdx, 1)
        }
        else{
            removeIdx = stories[payload.storyIdx].comments[payload.commentIdx].likedBy.findIndex(item => {return item.id === gLoggedInUser.id})
            stories[payload.storyIdx].comments[payload.commentIdx].likedBy.splice(removeIdx, 1)
        }

        sendBack.removeIdx = removeIdx
    }
    _save('stories', stories)
    return sendBack
}

async function addComment(payload){
    const newComment = await {
        id: _makeId(),
        by: {
            id: gLoggedInUser.id,
            fullname: gLoggedInUser.fullname,
            username: gLoggedInUser.username,
            imgUrl: gLoggedInUser.profileImgUrl
        },
        txt: payload.text,
        likedBy: [],
    }
    const stories = await query('stories')
    // console.log(payload.story.comments, stories)
    stories[payload.storyIdx].comments.unshift(newComment)
    _save('stories', stories)
    return newComment
}

async function deleteComment(payload){
    const stories = await query('stories')
    stories[payload.storyIdx].comments.splice(payload.commentIdx, 1)
    _save('stories', stories)
}


function _get(entityType, entityId) {
    return query(entityType)
    .then(entities => entities.find(entity => entity._id === entityId))
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
    .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

async function _delete(entityType, entity, entityIdx = null){
    const entities = await query(entityType)
    if (entityIdx >= 0){
        entities.splice(entityIdx, 1)
    }
    else {entityIdx = entities.findindex(item => item.id === entity.id)
    entities.splice(entityIdx, 1)
    }
    _save(entityType, entities)
    // console.log

}



function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _loadStories() {
    var stories = JSON.parse(localStorage.getItem('stories'))
    if (!stories || !stories.length) {
        stories = [
            //=================================PHOTO STORY 1=========================================================
            {
                id: 's111',
                txt: 'Best trip ever11111111',
                imgUrl: 'img/Stock photos - NY/NY01.jpg', //Can be an array if decide to support multiple imgs
                createdAt: 1624123543452,
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
                createdAt: 1624123543452,
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
                createdAt: 1624123543452,
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
            createdAt: 1624123543452,
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
            createdAt: 1624123543452,
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
            createdAt: 1624123543452,
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
            createdAt: 1624123543452,
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

        ]
        localStorage.setItem('stories', JSON.stringify(stories))
    }
    return Promise.resolve(stories);
}
