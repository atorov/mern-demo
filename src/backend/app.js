const express = require('express')
const bodyParser = require('body-parser')
// // const uuidv4 = require('uuid/v4')

const HTTPError = require('./models/http-error')

const picsRoutes = require('./routes/pics')

const app = express()

app.use(bodyParser.json())

app.use('/api/pics', picsRoutes)

app.use(() => {
    const error = new HTTPError('Could not find this route!', 404)
    throw error
})

app.use((err, _, res, next) => {
    if (res.headerSent) {
        return next(err)
    }

    res.status(err.code || 500)
    return res.json({ message: err.message || 'An unknown error ocurred!' })
})

// const DUMMY_PRODUCTS = []

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//     )
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PATCH, DELETE, OPTIONS',
//     )
//     next()
// })

app.listen(5000)
