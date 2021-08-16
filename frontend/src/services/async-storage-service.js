// import axios from "axios"
// import {store} from '@/store/store.js'

import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000';


// console.log(store)

export const storageService = {
    // _get,
    // post,
    // put,
    // remove,
    // _delete,
    query,
    _save,
    _makeId,
    _loadStories,
    _toggleLike,
    getLoggedInUser,
    addComment,
    deleteComment,
    addStory,
    deleteStory,
    _loadUsers
}

var gLoggedInUser = {
    _id: '6112f6116376cf1087265293',
    username: 'Homer_Simpson',
    fullname: 'Homer Simpson',
    profileImgUrl: 'https://res.cloudinary.com/asaphstagram2021/image/upload/v1628445913/Homer%20Simpson/Homer_Simpson_2006_veqnka.png',

}

// _save('loggedInUser', gLoggedInUser)



async function query(entityType, payload = null) {
    // var entities = JSON.parse(localStorage.getItem(entityType)) || []
    let entities
    if (entityType === '/story' || entityType === '/user' || entityType === '/username')
    {entities = await axios.get(entityType+'/'+payload)}
    else if (entityType === '/userAll' || entityType === '/storyAll')
    {entities = await axios.get(entityType)}
    // return new Promise((resolve)=>{
    //     setTimeout(()=>{
    //         resolve(entities)
    //     }, delay)
    // })
    // console.log('Query: ', entities)
    if (entityType === '/storyAll'){
        const sort = JSON.parse(JSON.stringify(entities.data)).sort((a,b)=> {
            // console.log(typeof a.createdAt , typeof b.createdAt)
            // console.log(a.createdAt > b.createdAt)
            return a.createdAt < b.createdAt ? 1 : -1
        })
        
        // sort.forEach(element => {
        //     console.log(element.createdAt)
        // });
        return Promise.resolve(JSON.parse(JSON.stringify(sort)))
    }

    return Promise.resolve(JSON.parse(JSON.stringify(entities.data)))
}

function getLoggedInUser(){
    return gLoggedInUser
}

async function _toggleLike(payload){
    const stories = await query('/storyAll')
    // console.log('PAYLOAD :', payload)
    const storyIdx = stories.findIndex((element) => { return element._id === payload.story._id})
    var sendBack = payload
    sendBack.storyIdx = storyIdx

    if (payload.request === 'add'){
        var likeToAdd = {
            _id: gLoggedInUser._id,
            username: gLoggedInUser.username,
            profileImgUrl: gLoggedInUser.profileImgUrl,
        }
        
        // var likeToAdd = gLoggedInUser._id
        
        sendBack.likeToAdd = likeToAdd
        if (payload.entityType === 'story'){
            stories[storyIdx].likedBy.unshift(JSON.parse(JSON.stringify(likeToAdd)))
        }
        else {
            stories[storyIdx].comments[payload.commentIdx].likedBy.unshift(likeToAdd._id)
        }
    }
    else{
        var removeIdx = -100
        if (payload.entityType === 'story'){
            removeIdx = stories[storyIdx].likedBy.findIndex(item => {return item._id === gLoggedInUser._id})
            stories[storyIdx].likedBy.splice(removeIdx, 1)
        }
        else{
            removeIdx = stories[storyIdx].comments[payload.commentIdx].likedBy.findIndex(item => {return item === gLoggedInUser._id})
            stories[storyIdx].comments[payload.commentIdx].likedBy.splice(removeIdx, 1)
        }

        sendBack.removeIdx = removeIdx
    }
    const storyToSend = JSON.parse(JSON.stringify(stories[storyIdx]))
    await axios.put('/story', storyToSend)
    return sendBack
}


async function addComment(payload){
    const newComment =  {
        _id: _makeId(),
        by: {
            _id: gLoggedInUser._id,
            username: gLoggedInUser.username,
            imgUrl: gLoggedInUser.profileImgUrl
        },
        text: payload.text,
        likedBy: [],
    }
    const stories = await query('/storyAll')
    const storyIdx = stories.findIndex((element) => { return element._id === payload.story._id})
    stories[storyIdx].comments.push(newComment)
    // _save('stories', stories)
    await axios.put('/story', stories[storyIdx])
    return newComment
}

async function deleteComment(payload){
    const stories = await query('/storyAll')
    const storyIdx = stories.findIndex((element) => { return element._id === payload.story._id})
    stories[storyIdx].comments.splice(payload.commentIdx, 1)
    await axios.put('/story', stories[storyIdx])
    // _save('stories', stories)
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


async function deleteStory(payload){
    // let x = await axios.get('/story'+'?storyId='+'611489856c7bd25886f70f54')
    // console.log('X Data: ', x.data)
    // const stories = await query('/storyAll')
    // const storyIdx = stories.findIndex(item => item._id === payload._id)
    // stories.splice(storyIdx, 1)
    // _save('stories', stories)
    await axios.delete('/story'+'/'+payload._id)

    var currentUser = await query('/user', gLoggedInUser._id)
    // var loggedInIdx = users.data.findIndex(user => {return user._id === gLoggedInUser._id})
    var deleteFromUserIdx = currentUser.ownedStories.findIndex(item => {item === payload._id} )
    currentUser.ownedStories.splice(deleteFromUserIdx, 1)
    await axios.put('/user', currentUser)
    // _save('/users', users)
    
}

async function addStory(story){
    // var stories = await query('/storyAll')
    // console.log(stories)
    // newStory._id = _makeId()
    // _save('stories', stories)
    // stories.unshift(newStory)
    let newStory = await axios.post('/story', story)
    console.log(newStory.data)

    var user = await query(`/user/${newStory.data.owner._id}`)
    // var loggedInIdx = users.findIndex(user => {return user._id === gLoggedInUser._id})
    // users[loggedInIdx].ownedStories.unshift(newStory._id)
    user.ownedStories.unshift(newStory.data._id)
    // _save('/users', users[loggedInIdx])
    await axios.put('/user', user)
    return newStory.data
}

async function _loadStories() {
    // var stories = JSON.parse(localStorage.getItem('stories'))
    var stories = await query('/storyAll')
    return stories
}




async function _loadUsers(){
        let users = await query('/userAll')
        // console.log('Frontend loadUsers: ', users.data)
        return users
}

function _makeId(length = 7) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}




// function _get(entityType, entityId) {
//     return query(entityType)
//     .then(entities => entities.find(entity => entity._id === entityId))
// }

// function post(entityType, newEntity) {
//     newEntity._id = _makeId()
//     return query(entityType)
//     .then(entities => {
//             entities.push(newEntity)
//             _save(entityType, entities)
//             return newEntity
//         })
// }

// function put(entityType, updatedEntity) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//             entities.splice(idx, 1, updatedEntity)
//             _save(entityType, entities)
//             return updatedEntity
//         })
// }

// function remove(entityType, entityId) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex(entity => entity._id === entityId)
//             if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
//             entities.splice(idx, 1)
//             _save(entityType, entities)
//         })
// }

// async function _delete(entityType, entity){
//     const entities = await query(entityType)
//     const entityIdx = entities.findIndex(item => item._id === entity._id)

//     entities.splice(entityIdx, 1)
    
//     if (entityType === '/story'){
//         var users = await query('/users')
//         var loggedInIdx = users.findIndex(user => {return user._id === gLoggedInUser._id})
//         var deleteFromUserIdx = users[loggedInIdx].ownedStories.findIndex(item => {item === entity._id} )
//         users[loggedInIdx].ownedStories.splice(deleteFromUserIdx, 1)
//         _save('/users', users)
//     }
//     _save(entityType, entities)
//     // console.log
// }



// async function _loadStorieszzzzzzzzzzzzzzzzzzzzzzzzzzzz() {
//     // var stories = JSON.parse(localStorage.getItem('stories'))
//     var stories = await query('/storyAll')
//     if (!stories || !stories.length) {
//         stories = [
//             //=================================PHOTO STORY 1=========================================================
//             {
//                 _id: 's111',
//                 text: 'Best trip ever11111111 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//                 imgUrl: 'img/Stock photos - NY/NY01.jpg', //Can be an array if dec_ide to support multiple imgs
//                 createdAt: 1624123543452,
//                 owner: {
//                     _id: 'u11111',
//                     fullname: 'Homer Simpson',
//                     username: 'HomerS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 loc: {
//                     lat: 40.75249545209201, 
//                     lng: -73.98568429583557,
//                     name: 'New York'
//                 },
//                 comments: [
//                     {
//                         _id: 'c1111',
//                         by: {
//                             _id: 'u22222',
//                             username: 'TonyS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                         likedBy: [ // Optional
//                            {
//                             _id: 'u33333',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         ],
//                     },
//                     {
//                         _id: 'c22222',
//                         by: {
//                             _id: 'u33333',
//                             fullname: 'James T. Kirk',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                         likedBy: [],                        
//                     }
//                 ],
//                 likedBy: [
//                     {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//             },
//               //=================================PHOTO STORY 2=========================================================
//               {
//                 _id: 's222',
//                 text: 'Best trip ever222222  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//                 imgUrl: 'img/Stock photos - NY/NY02.jpg', //Can be an array if dec_ide to support multiple imgs
//                 createdAt: 1624123543452,
//                 owner: {
//                     _id: 'u11111',
//                     fullname: 'Homer Simpson',
//                     username: 'HomerS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 loc: {
//                     lat: 40.75249545209201, 
//                     lng: -73.98568429583557,
//                     name: 'New York'
//                 },
//                 comments: [
//                     {
//                         _id: 'c1111',
//                         by: {
//                             _id: 'u22222',
//                             fullname: 'Tony Soprano',
//                             username: 'TonyS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                         likedBy: [ // Optional
//                            {
//                             _id: 'u33333',
//                             fullname: 'James T. Kirk',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         ],
//                     },
//                     {
//                         _id: 'c22222',
//                         by: {
//                             _id: 'u33333',
//                             fullname: 'James T. Kirk',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                         likedBy: [],
//                     }
//                 ],
//                 likedBy: [
//                     {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//             },
//               //=================================PHOTO STORY 3=========================================================
//               {
//                 _id: 's333',
//                 text: 'Best trip ever333333  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//                 imgUrl: 'img/Stock photos - NY/NY03.jpeg', //Can be an array if dec_ide to support multiple imgs
//                 createdAt: 1624123543452,
//                 owner: {
//                     _id: 'u11111',
//                     fullname: 'Homer Simpson',
//                     username: 'HomerS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 loc: {
//                     lat: 40.75249545209201, 
//                     lng: -73.98568429583557,
//                     name: 'New York'
//                 },
//                 comments: [
//                     {
//                         _id: 'c1111',
//                         by: {
//                             _id: 'u22222',
//                             fullname: 'Tony Soprano',
//                             username: 'TonyS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                         likedBy: [ // Optional
//                            {
//                             _id: 'u33333',
//                             fullname: 'James T. Kirk',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         ],
//                     },
//                     {
//                         _id: 'c22222',
//                         by: {
//                             _id: 'u33333',
//                             fullname: 'James T. Kirk',
//                             username: 'JamesTK',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         },
//                         text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                         likedBy: [],
//                     }
//                 ],
//                 likedBy: [
//                     {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//             },
//            //=================================PHOTO STORY 4=========================================================
//            {
//             _id: 's444',
//             text: 'Best trip ever444444 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//             imgUrl: 'img/Stock photos - NY/NY04.jpg', //Can be an array if dec_ide to support multiple imgs
//             createdAt: 1624123543452,
//             owner: {
//                 _id: 'u11111',
//                 fullname: 'Homer Simpson',
//                 username: 'HomerS',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg'
//             },
//             loc: {
//                 lat: 40.75249545209201, 
//                 lng: -73.98568429583557,
//                 name: 'New York'
//             },
//             comments: [
//                 {
//                     _id: 'c1111',
//                     by: {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                     likedBy: [ // Optional
//                         {
//                             _id: 'u11111',
//                             fullname: 'Homer Simpson',
//                             username: 'HomerS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         }
//                     ]
//                 },
//                 {
//                     _id: 'c22222',
//                     by: {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                     likedBy: [],
//                 }
//             ],
//             likedBy: [
//                 {
//                     _id: 'u22222',
//                     fullname: 'Tony Soprano',
//                     username: 'TonyS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 {
//                     _id: 'u33333',
//                     fullname: 'James T. Kirk',
//                     username: 'JamesTK',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//             ],
//         },
//            //=================================PHOTO STORY 5=========================================================
//            {
//             _id: 's555',
//             text: 'Best trip ever5555555  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//             imgUrl: 'img/Stock photos - NY/NY05.jpeg', //Can be an array if dec_ide to support multiple imgs
//             createdAt: 1624123543452,
//             owner: {
//                 _id: 'u11111',
//                 fullname: 'Homer Simpson',
//                 username: 'HomerS',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg'
//             },
//             loc: {
//                 lat: 40.75249545209201, 
//                 lng: -73.98568429583557,
//                 name: 'New York'
//             },
//             comments: [
//                 {
//                     _id: 'c1111',
//                     by: {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                     likedBy: [ // Optional
//                         {
//                             _id: 'u11111',
//                             fullname: 'Homer Simpson',
//                             username: 'HomerS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         }
//                     ]
//                 },
//                 {
//                     _id: 'c22222',
//                     by: {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                     likedBy: [],
//                 }
//             ],
//             likedBy: [
//                 {
//                     _id: 'u22222',
//                     fullname: 'Tony Soprano',
//                     username: 'TonyS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 {
//                     _id: 'u33333',
//                     fullname: 'James T. Kirk',
//                     username: 'JamesTK',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//             ],
//         },
//            //=================================PHOTO STORY 6=========================================================
//            {
//             _id: 's666',
//             text: 'Best trip ever666666666  aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//             imgUrl: 'img/Stock photos - NY/NY06.jpg', //Can be an array if dec_ide to support multiple imgs
//             createdAt: 1624123543452,
//             owner: {
//                 _id: 'u11111',
//                 fullname: 'Homer Simpson',
//                 username: 'HomerS',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg'
//             },
//             loc: {
//                 lat: 40.75249545209201, 
//                 lng: -73.98568429583557,
//                 name: 'New York'
//             },
//             comments: [
//                 {
//                     _id: 'c1111',
//                     by: {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                     likedBy: [ // Optional
//                         {
//                             _id: 'u11111',
//                             fullname: 'Homer Simpson',
//                             username: 'HomerS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         }
//                     ]
//                 },
//                 {
//                     _id: 'c22222',
//                     by: {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                     likedBy: [],
//                 }
//             ],
//             likedBy: [
//                 {
//                     _id: 'u22222',
//                     fullname: 'Tony Soprano',
//                     username: 'TonyS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 {
//                     _id: 'u33333',
//                     fullname: 'James T. Kirk',
//                     username: 'JamesTK',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//             ],
//         },
//            //=================================PHOTO STORY 7=========================================================
//            {
//             _id: 's777',
//             text: 'Best trip ever77777777 aaaaaaa bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg hhhhhhhh iiiiiiiii jjjjjjj kkkkkkk llllllll mmmmmmmmmm nnnnnnn oooooooooo pppppppppppp qqqqq rrr sss ttttt uuuu vvvv wwww xxxxx yyyy zzzzz',
//             imgUrl: 'img/Stock photos - NY/NY07.jpg', //Can be an array if dec_ide to support multiple imgs
//             createdAt: 1624123543452,
//             owner: {
//                 _id: 'u11111',
//                 fullname: 'Homer Simpson',
//                 username: 'HomerS',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg'
//             },
//             loc: {
//                 lat: 40.75249545209201, 
//                 lng: -73.98568429583557,
//                 name: 'New York'
//             },
//             comments: [
//                 {
//                     _id: 'c1111',
//                     by: {
//                         _id: 'u22222',
//                         fullname: 'Tony Soprano',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'good one! wow great so great amazing wow wow wow love it amazing wonderful wow 11111 222222 333333 4444444 555555 66666 77777 8888 9999999',
//                     likedBy: [ // Optional
//                         {
//                             _id: 'u11111',
//                             fullname: 'Homer Simpson',
//                             username: 'HomerS',
//                             profileImgUrl: 'img/profile photos/IMG1.jpg'
//                         }
//                     ]
//                 },
//                 {
//                     _id: 'c22222',
//                     by: {
//                         _id: 'u33333',
//                         fullname: 'James T. Kirk',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     text: 'not good! no not at all not good bad very bad wowo so bad oh no 11111 22222 33333 4444444 55555 6666666 77777777 8888888 9999999!',
//                     likedBy: [],
//                 }
//             ],
//             likedBy: [
//                 {
//                     _id: 'u22222',
//                     fullname: 'Tony Soprano',
//                     username: 'TonyS',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//                 {
//                     _id: 'u33333',
//                     fullname: 'James T. Kirk',
//                     username: 'JamesTK',
//                     profileImgUrl: 'img/profile photos/IMG1.jpg'
//                 },
//             ],
//         },

//         ]
//         // localStorage.setItem('stories', JSON.stringify(stories))
//         _save('stories', stories)
//     }
//     return Promise.resolve(stories);
// }





// async function _loadUsers(){
//     var users = await query('/users')
//     if (!users || !users.length) {
//         users = [
//             {
//                 _id: 'u11111',
//                 username: 'HomerS',
//                 password: 'Springfield',
//                 fullname: 'Homer Simpson',
//                 birthDate: 410273492,
//                 profileText: 'Hello hi everybody, Homer Simpson here, I live in Springfield USA, my wife is marge and my k_ids are bart, lisa and maggie',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg',
//                 likesGiven: ['p36788', 'p00845'],
//                 following: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 followers: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 ownedStories: ['s111', 's222', 's333', 's444', 's555', 's666', 's777'],
//             },
//             {
//                 _id: 'u22222',
//                 username: 'TonyS',
//                 password: 'NewJersey',
//                 fullname: 'Tony Soprano',
//                 birthDate: 410273421,
//                 profileText: 'Hello hi I am Tony Soprano humble construction/garbage disposal businessman fron New Jersey',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg',
//                 likesGiven: ['p36788', 'p00845'],
//                 following: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 followers: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 ownedStories: ['s001', 's002', 's003'],
//             },
//             {
//                 _id: 'u33333',
//                 username: 'JamesTK',
//                 password: 'Enterprise',
//                 fullname: 'James T. Kirk',
//                 birthDate: 510273421,
//                 profileText: 'Hello Hello I am James Kirk Starfleet Enterprize captain hi hows it going?',
//                 profileImgUrl: 'img/profile photos/IMG1.jpg',
//                 likesGiven: ['p36788', 'p00845'],
//                 following: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 followers: [
//                     {
//                         _id: 'u11111',
//                         username: 'HomerS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u22222',
//                         username: 'TonyS',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                     {
//                         _id: 'u33333',
//                         username: 'JamesTK',
//                         profileImgUrl: 'img/profile photos/IMG1.jpg'
//                     },
//                 ],
//                 ownedStories: ['004', 's005', 's006'],
//             }
//         ]

// }
// _save('/users', users)
// return Promise.resolve(users);
// }