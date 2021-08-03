
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
    addStory,
    _loadUsers
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
    const storyIdx = stories.findIndex((element) => { return element.id === payload.story.id})
    var sendBack = payload
    sendBack.storyIdx = storyIdx
    var users = await _loadUsers()
    var userIdx = users.findIndex(item => {return item.id === gLoggedInUser.id})

    if (payload.request === 'add'){
        var likeToAdd = {
            id: gLoggedInUser.id,
            fullname: gLoggedInUser.fullname,
            username: gLoggedInUser.username,
            profileImgUrl: gLoggedInUser.profileImgUrl,
        }
        sendBack.likeToAdd = likeToAdd
        if (payload.entityType === 'story'){
            stories[storyIdx].likedBy.unshift(likeToAdd)
            users[userIdx].likesGiven.unshift(payload.story.id)

        }
        else {
            stories[storyIdx].comments[payload.commentIdx].likedBy.unshift(likeToAdd)
        }
    }
    else{
        var removeIdx = -100
        if (payload.entityType === 'story'){
            removeIdx = stories[storyIdx].likedBy.findIndex(item => {return item.id === gLoggedInUser.id})
            stories[storyIdx].likedBy.splice(removeIdx, 1)
            var removeFromUserIdx = users[userIdx].likesGiven.findIndex(item => {return item === payload.story.id}) 
            users[userIdx].likesGiven.splice(removeFromUserIdx, 1)
        }
        else{
            removeIdx = stories[storyIdx].comments[payload.commentIdx].likedBy.findIndex(item => {return item.id === gLoggedInUser.id})
            stories[storyIdx].comments[payload.commentIdx].likedBy.splice(removeIdx, 1)
        }

        sendBack.removeIdx = removeIdx
    }
    _save('stories', stories)
    _save('users', users)
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
    const storyIdx = stories.findIndex((element) => { return element.id === payload.story.id})
    stories[storyIdx].comments.push(newComment)
    _save('stories', stories)
    return newComment
}

async function deleteComment(payload){
    const stories = await query('stories')
    const storyIdx = stories.findIndex((element) => { return element.id === payload.story.id})
    stories[storyIdx].comments.splice(payload.commentIdx, 1)
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
    entityIdx = entities.findIndex(item => item.id === entity.id)

    entities.splice(entityIdx, 1)
    
    if (entityType === 'story'){
        var users = await query('users')
        var loggedInIdx = users.findIndex(user => {return user.id === gLoggedInUser.id})
        var deleteFromUserIdx = users[loggedInIdx].ownedStories.findIndex(item => {item === entity.id} )
        users[loggedInIdx].ownedStories.splice(deleteFromUserIdx, 1)
        _save('users', users)
    }
    _save(entityType, entities)
    // console.log

}

async function addStory(newStory){
    var stories = await query('stories')
    // console.log(stories)
    newStory.id = _makeId()
    stories.unshift(newStory)
    _save('stories', stories)

    var users = await query('users')
    var loggedInIdx = users.findIndex(user => {return user.id === gLoggedInUser.id})
    users[loggedInIdx].ownedStories.unshift(newStory.id)
    _save('users', users)

    return newStory
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

async function _loadStories() {
    // var stories = JSON.parse(localStorage.getItem('stories'))
    var stories = await query('stories')
    if (!stories || !stories.length) {
        stories = [
            //=================================PHOTO STORY 1=========================================================
            {
                id: 's111',
                txt: 'Best trip ever11111111 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                        txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                        likedBy: [],                        
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
                txt: 'Best trip ever222222  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                        txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                        likedBy: [],
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
                txt: 'Best trip ever333333  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                        txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                        likedBy: [],
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
            txt: 'Best trip ever444444 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                    txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                    likedBy: [],
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
            txt: 'Best trip ever5555555  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                    txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                    likedBy: [],
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
            txt: 'Best trip ever666666666  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                    txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                    likedBy: [],
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
            txt: 'Best trip ever77777777 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
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
                    txt: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
                    likedBy: [],
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
        // localStorage.setItem('stories', JSON.stringify(stories))
        _save('stories', stories)
    }
    return Promise.resolve(stories);
}





async function _loadUsers(){
    var users = await query('users')
    if (!users || !users.length) {
        users = [
            {
                id: 'u11111',
                username: 'HomerS',
                password: 'Springfield',
                fullname: 'Homer Simpson',
                birthDate: 410273492,
                profileText: 'Hello hi everybody, Homer Simpson here, I live in Springfield USA, my wife is marge and my kids are bart, lisa and maggie',
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                followers: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                ownedStories: ['s111', 's222', 's333', 's444', 's555', 's666', 's777'],
            },
            {
                id: 'u22222',
                username: 'TonyS',
                password: 'NewJersey',
                fullname: 'Tony Soprano',
                birthDate: 410273421,
                profileText: 'Hello hi I am Tony Soprano humble construction/garbage disposal businessman fron New Jersey',
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                followers: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                ownedStories: ['s001', 's002', 's003'],
            },
            {
                id: 'u33333',
                username: 'JamesTK',
                password: 'Enterprise',
                fullname: 'James T. Kirk',
                birthDate: 510273421,
                profileText: 'Hello Hello I am James Kirk Starfleet Enterprize captain hi hows it going?',
                profileImgUrl: 'img/profile photos/IMG1.jpg',
                likesGiven: ['p36788', 'p00845'],
                following: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                followers: [
                    {
                        id: 'u11111',
                        username: 'HomerS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u22222',
                        username: 'TonyS',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                    {
                        id: 'u33333',
                        username: 'JamesTK',
                        imgUrl: 'img/profile photos/IMG1.jpg'
                    },
                ],
                ownedStories: ['004', 's005', 's006'],
            }
        ]

}
_save('users', users)
return Promise.resolve(users);
}