const express = require('express')
const cookieParser = require('cookie-parser')
const toyService = require('./services/toy.service.js')
const userService = require('./services/user.service.js')
const path = require('path')
// TODO Destructuring
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.static(path.join(__dirname, '../frontend/public')));

// app.use(express.static('public'))// listening to the front end 'public'
app.use(cookieParser())  // for using cookie parser 
app.use(express.json())  // forgot need to rewatch lesson


// ALL BUGS
app.get('/api/toys/', (req, res) => {
    const { filterBy } = req.query
    toyService.query(JSON.parse(filterBy)).then((toys) => {
        res.send(toys)
    })

})
//GET BUG BY ID
app.get('/api/toys/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.getById(toyId).then((toy) => {
        res.send(toy)
    })
})

// EDIT BUG 
app.put('/api/toys/:toyId', (req, res) => {
    // const { toyId } = req.params
    // const loggedUser = userService.validateToken(req.cookies.loggedUser)
    // if (!loggedUser) return res.status(401).send('Cannot add car')
    const toy = req.body
    toyService.save(toy).then((toy) => {
        res.send(toy)
    }).catch(err => {
        res.status(401).send('Not Premited!')
    })
})

// ADD BUG
app.post('/api/toys/', (req, res) => {
    const toy = req.body
    // const loggedUser = userService.validateToken(req.cookies.loggedUser)
    // if (!loggedUser) return res.status(401).send('Cannot add car')
    toyService.save(toy, loggedUser).then((toy) => {
        res.send(toy)
    })
})
// DELETE BUG
app.delete('/api/toys/:toyId', (req, res) => {
    const { toyId } = req.params
    // const loggedUser = userService.validateToken(req.cookies.loggedUser)
    // console.log(loggedUser)
    // if (!loggedUser) return res.status(401).send('Cannot add car')

    toyService.remove(toyId).then((toy) => {
        res.send(toy)
    }).catch((err) => res.status(401).send(err))
})
// LOGIN USER
app.post('/api/login', (req, res) => {
    const creditials = req.body
    console.log(creditials)
    userService.checkLogin(creditials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loggedUser', loginToken)
                res.send(user)
            } else {
                res.status(401).send('cannot loging')
            }
        })
})
app.post('/api/signup', (req, res) => {
    const creditials = req.body
    console.log(creditials)
    userService.signup(creditials)
        .then(user => {
            console.log(user)
            const loginToken = userService.getLoginToken(user)
            res.cookie('loggedUser', loginToken)
            res.send(user)
        })
})
app.post('/api/logout', (req, res) => {
    res.clearCookie('loggedUser')
    res.send('Logged out')

})
//  Fall Back
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'))
});
app.listen(PORT)

