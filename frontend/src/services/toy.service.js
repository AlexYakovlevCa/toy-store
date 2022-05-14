import axios from 'axios'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
// const STORAGE_KEY = 'toy'
const BASE_URL = '/api/toys/'
export const toyService = {
    query,
    getById,
    save,
    remove,
    getLabes
}


function query(filterBy) {
    return axios.get(BASE_URL, { params: {filterBy} }).then(res => res.data)
    // return storageService.query(STORAGE_KEY)



    // return axios.get(BASE_URL).then(res => res.data)
    // .then(toys => {
    //     if (filterBy.txt) {
    //         toys = toys.filter(toy =>
    //             toy.name.toLowerCase().includes(filterBy.txt.toLowerCase()))
    //     }
    //     switch (filterBy.inStock) {

    //         case 'in-stock':
    //             toys = toys.filter(toy => toy.inStock === true)
    //             break
    //         case 'no-stock':
    //             toys = toys.filter(toy => toy.inStock === false)
    //             break
    //         default:
    //             break
    //     }
    //     switch (filterBy.sort) {
    //         case 'name':
    //             toys.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    //             break
    //         case 'price':
    //             toys.sort((a, b) => (a.price - b.price))
    //             break
    //         case 'date':
    //             toys.sort((a, b) => (b.createdAt - a.createdAt))
    //             break
    //         default:
    //             break
    //     }
    //     if (filterBy.labels && filterBy.labels.length > 0) {
    //         toys = toys.filter(toy =>
    //             toy.labels.filter(label => filterBy.labels.includes(label)).length > 0)
    //     }
    //     return toys
    // })
}
function getById(toyId) {
    return axios.get(BASE_URL + toyId).then(res => res.data)

    // return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    console.log(BASE_URL+toyId)
    return axios.delete(BASE_URL+toyId).then(res=>res.data)
    // return Promise.reject('Not now!')
    // return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    console.log(toy)
    if (toy._id) {
        return axios.put(BASE_URL + toy._id, toy).then(res => res.data)
    } else {

        return axios.post(BASE_URL, toy).then(res => res.data)
    }

    // if (toy._id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     // when switching to backend - remove the next line
    //     toy.owner = userService.getLoggedinUser()
    //     return storageService.post(STORAGE_KEY, toy)
    // }
}
function getLabes() {
    return labels
}

// function getEmptyToy() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {
//     "name": utilService.makeLorem(1),
//     "price": utilService.getRandomIntInclusive(30, 100),
//     "labels": utilService.getRandomLables(),
//     "img":'../style/imgs/toy-1.png',
//     "createdAt": Date.now(),
//     "inStock": Math.random() > 0.5 ? true : false
// }).then(x => console.log(x))
// ../style/imgs/toy-basic-img.png
// const toy = {
//  "_id": "t101",
//  "name": "Talking Doll",
//  "price": 123,
//  "labels": ["Doll", "Battery Powered", "Baby"],
//  "createdAt": 1631031801011,
//  "inStock": true
// }
