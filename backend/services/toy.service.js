const fs = require('fs')
const gToys = require('../data/toys.json')
const PAGE_SIZE = 10
const utilService = require('./util.service')


module.exports = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    var toys = gToys
    if (filterBy.txt) {

        toys = toys.filter(toy => new RegExp(filterBy.txt, 'i').test(toy.name))
    }
    switch (filterBy.inStock) {

        case 'in-stock':
            toys = toys.filter(toy => toy.inStock === true)
            break
        case 'no-stock':
            toys = toys.filter(toy => toy.inStock === false)
            break
        default:
            break
    }
    switch (filterBy.sort) {
        case 'name':
            toys.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            break
        case 'price':
            toys.sort((a, b) => (a.price - b.price))
            break
        case 'date':
            toys.sort((a, b) => (b.createdAt - a.createdAt))
            break
        default:
            break
    }
    if (filterBy.labels && filterBy.labels.length > 0) {
        toys = toys.filter(toy =>
            toy.labels.filter(label => filterBy.labels.includes(label)).length > 0)
    }

    const startIdx = filterBy.pageIdx * PAGE_SIZE || 0
    toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
    return Promise.resolve(toys)
}
function getById(toyId) {
    return new Promise((resolve, reject) => {
        if (!toyId) reject('id is undefined')
        toy = gToys.find(({ _id }) => _id === toyId)
        resolve(toy)

    })
}
function save(toy, loggedinUser) {
    return new Promise((resolve, reject) => {
        if (toy._id) {
            // if (toy.creator._id !== loggedinUser._id) reject('No Premison')
            const idx = gToys.findIndex(({ _id }) => _id === toy._id)
            gToys[idx] = toy
        } else {
            // toy.creator = loggedinUser
            toy._id = utilService.makeId()
            toy.createdAt = Date.now()
            gToys.push(toy)
        }
        return _savetoysToFile()
            .then(() => resolve(toy))
            .catch((err) => reject(err))
    })

}

function remove(toyId, loggedinUser) {
    return new Promise((resolve, reject) => {
        getById(toyId).then((currtoy) => {
            // if (currtoy.creator._id !== loggedinUser._id) return reject('No Premison') // dosent work without the return


            const idx = gToys.findIndex((toy) => toy._id === toyId)
            if (idx === -1) reject('no such toy')
            gToys.splice(idx, 1)
            return _savetoysToFile()
                .then(() => resolve(toyId))
                .catch((err) => reject(err))



        })
    })

}

function _savetoysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data/toys.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) {
                console.log(err)
                reject('cannot write file')
            } else {
                console.log('wrote new file')
                resolve()
            }
        })

    })
}
