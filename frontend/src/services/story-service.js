// import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'
import axios from 'axios'

const TOY_KEY = 'toyDB'
const TOY_URL = '//localhost:3000/api/toy'

export const storyService = {
    query,
    remove,
    save,
    getById,
    getEmptyToy,
    
}


function query(filterBy) {
    // return storageService.query(TOY_KEY)
    return axios.get(TOY_URL, { params: { filterBy } })
        .then(res => res.data)
}

function getById(id) {
    // return storageService.get(TOY_KEY, id)
    return axios.get(TOY_URL + '/' + id)
        .then(res => res.data)
}

function remove(id) {
    // return storageService.remove(TOY_KEY, id)
    return axios.delete(TOY_URL + '/' + id)
        .then(res => res.data)
}

async function save(toy) {
    // const toyToSave = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy)
    // return toyToSave   
    if (toy._id) {
        const putResult = await axios.put(TOY_URL, toy)
        return putResult.data
    } else {
        const postResult = await axios.post(TOY_URL, toy)
        return postResult.data
    }
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: null,
        type: '',
        createdAt: Date.now(),
        inStock: true
    }
}

// create test data
// _createtoys()





