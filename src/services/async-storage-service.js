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
    // _toggleLike,
    query,
    _save,
    _makeId,
    _loadStories,
    getLoggedInUser,
    addComment,
    deleteComment,
    addStory,
    deleteStory,
    _loadUsers,
    getRandomIntInclusive,
    saveNewProfileText,
    updateFollow,
    login,
    logout,
    addStoryLike,
    removeStoryLike,
    addCommentLike,
    removeCommentLike,
    getSingleStory,
}

// var gLoggedInUser = {
//     _id: '',
//     // '6112f6116376cf1087265293',
//     username: '',
//     // 'Homer_Simpson',
//     fullname: '', 
//     // 'Homer Simpson',
//     profileImgUrl: '', 
//     // 'https://res.cloudinary.com/asaphstagram2021/image/upload/v1628445913/Homer%20Simpson/Homer_Simpson_2006_veqnka.png',

// }
// let gLoggedInUser = {}
// _save('loggedInUser', gLoggedInUser)



async function query(entityType, payload = null) {
    let entities
    if (entityType === '/story' || entityType === '/user' || entityType === '/username')
    {entities = await axios.get(entityType+'/'+payload)}
    else if (entityType === '/userAll' || entityType === '/storyAll')
    {entities = await axios.get(entityType)}
    if (entityType === '/storyAll'){
        const sort = JSON.parse(JSON.stringify(entities.data)).sort((a,b)=> {
            return a.createdAt < b.createdAt ? 1 : -1
        })
        
        return Promise.resolve(JSON.parse(JSON.stringify(sort)))
    }

    return Promise.resolve(JSON.parse(JSON.stringify(entities.data)))
}

function getLoggedInUser(){
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    return loggedInUser
}

async function addStoryLike(payload){
    const loggedInUser = getLoggedInUser()
    let story = await query('/story', payload)
    let likeToAdd = {
        _id: loggedInUser._id,
        username: loggedInUser.username,
        profileImgUrl: loggedInUser.profileImgUrl,
    }
    story.likedBy.unshift(likeToAdd)
    let sendBack = {}
    sendBack.storyId = payload
    sendBack.likeToAdd = likeToAdd
    const storyToSend = JSON.parse(JSON.stringify(story))
    await axios.put('/story', storyToSend)
    return sendBack
}

async function removeStoryLike(payload){
    const loggedInUser = getLoggedInUser()
    let story = await query('/story', payload)
    let likeIdx = story.likedBy.findIndex((element) => { return element._id === loggedInUser._id})
    let sendBack = {storyId: payload,
                    likeIdx: likeIdx
                    }
    story.likedBy.splice(likeIdx, 1)
    const storyToSend = JSON.parse(JSON.stringify(story))
    await axios.put('/story', storyToSend)
    return sendBack
}

async function addCommentLike(payload){
    const loggedInUser = getLoggedInUser()
    let story = await query('/story', payload.storyId)
    let commentIdx = story.comments.findIndex((element) => { return element._id === payload.commentId})
    // let comment = story.comments[commentIdx]
    let sendBack = payload
    sendBack.commentIdx = commentIdx
    story.comments[commentIdx].likedBy.unshift(loggedInUser._id)
    const storyToSend = JSON.parse(JSON.stringify(story))
    await axios.put('/story', storyToSend)
    return sendBack
}

async function removeCommentLike(payload){
    const loggedInUser = getLoggedInUser()
    let story = await query('/story', payload.storyId)
    let commentIdx = story.comments.findIndex((element) => { return element._id === payload.commentId})
    let commentLikeIdx = story.comments[commentIdx].likedBy.findIndex((element) => { return element === loggedInUser._id})
    // let comment = story.comments[commentIdx]
    let sendBack = payload
    sendBack.commentIdx = commentIdx
    sendBack.commentLikeIdx = commentLikeIdx
    story.comments[commentIdx].likedBy.splice(commentLikeIdx, 1)
    const storyToSend = JSON.parse(JSON.stringify(story))
    await axios.put('/story', storyToSend)
    return sendBack
}

// async function _toggleLike(payload){
//     const loggedInUser = getLoggedInUser()
//     const stories = await query('/storyAll')
//     // console.log('PAYLOAD :', payload)
//     const storyIdx = stories.findIndex((element) => { return element._id === payload.story._id})
//     var sendBack = payload
//     sendBack.storyIdx = storyIdx

//     if (payload.request === 'add'){
//         var likeToAdd = {
//             _id: loggedInUser._id,
//             username: loggedInUser.username,
//             profileImgUrl: loggedInUser.profileImgUrl,
//         }
        
//         // var likeToAdd = gLoggedInUser._id
        
//         sendBack.likeToAdd = likeToAdd
//         if (payload.entityType === 'story'){
//             stories[storyIdx].likedBy.unshift(JSON.parse(JSON.stringify(likeToAdd)))
//         }
//         else {
//             stories[storyIdx].comments[payload.commentIdx].likedBy.unshift(likeToAdd._id)
//         }
//     }
//     else{
//         var removeIdx = -100
//         if (payload.entityType === 'story'){
//             removeIdx = stories[storyIdx].likedBy.findIndex(item => {return item._id === loggedInUser._id})
//             stories[storyIdx].likedBy.splice(removeIdx, 1)
//         }
//         else{
//             removeIdx = stories[storyIdx].comments[payload.commentIdx].likedBy.findIndex(item => {return item === loggedInUser._id})
//             stories[storyIdx].comments[payload.commentIdx].likedBy.splice(removeIdx, 1)
//         }

//         sendBack.removeIdx = removeIdx
//     }
//     const storyToSend = JSON.parse(JSON.stringify(stories[storyIdx]))
//     await axios.put('/story', storyToSend)
//     return sendBack
// }


async function addComment(payload){
    const loggedInUser = getLoggedInUser()
    const newComment =  {
        _id: _makeId(),
        by: {
            _id: loggedInUser._id,
            username: loggedInUser.username,
            profileImgUrl: loggedInUser.profileImgUrl
        },
        text: payload.text,
        likedBy: [],
    }
    let story = await query('/story', payload.storyId)
    story.comments.push(newComment)
    payload.newComment = newComment
    // _save('stories', stories)
    await axios.put('/story', story)
    return payload
}

async function deleteComment(payload){
    let story = await query('/story', payload.storyId)
    let commentIdx = story.comments.findIndex((item) => item._id === payload.commentId)
    story.comments.splice(commentIdx, 1)
    await axios.put('/story', story)
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


async function deleteStory(payload){
    const loggedInUser = getLoggedInUser()
    await axios.delete('/story/'+payload)
    
    var currentUser = await query('/user', loggedInUser._id)
    var deleteFromUserIdx = currentUser.ownedStories.findIndex(item => {return item === payload})
    if (deleteFromUserIdx < 0 || deleteFromUserIdx === undefined){console.log('ERROR! CANNOT DELETE FROM USER OWNED STORIES!!!'); return}
    currentUser.ownedStories.splice(deleteFromUserIdx, 1)
    
    await axios.put('/user', currentUser)
    
}

async function addStory(story){
    let newStory = await axios.post('/story', story)
    var user = await query('/user', newStory.data.owner._id)
    user.ownedStories.unshift(newStory.data._id)
    await axios.put('/user', user)
    return newStory.data
}

async function _loadStories() {
    let stories = await query('/storyAll')
    return JSON.parse(JSON.stringify(stories))
}

async function getSingleStory(payload){
    let story = await query('/story', payload)
    // console.log('IN STORAGE SERVIECE: ', story)
    return JSON.parse(JSON.stringify(story))
}


async function _loadUsers(){
        let users = await query('/userAll')
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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

async function saveNewProfileText(user){
    const updateUser = await axios.put('/user', user)
    if(updateUser.status === 200){return 'SUCCESS'}
}

async function updateFollow(payload){
    const update1 = await axios.put('/user', payload.follower)
    const update2 = await axios.put('/user', payload.following)

    if(update1.status === 200 && update2.status === 200){return 'SUCCESS'}
}

async function login(attempt){
    const verified = await axios.post('/login', attempt)
    if (verified.status === 200) {
        let loggedInUser = {}
        loggedInUser._id = verified.data._id
        loggedInUser.username = verified.data.username
        loggedInUser.fullname = verified.data.fullname
        loggedInUser.profileImgUrl = verified.data.profileImgUrl
        _save('loggedInUser', loggedInUser)
        return verified.data}
    else {return null}
}
function logout(){
    let loggedInUser = {}
    _save('loggedInUser', loggedInUser)
}

