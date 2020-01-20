const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const xsettings = require('./private/xsettings')

const HTTPError = require('./models/http-error')

const picsRoutes = require('./routes/pics')
const usersRoutes = require('./routes/users')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/api/pics', picsRoutes)

app.use('/api/users', usersRoutes)

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

mongoose.set('useCreateIndex', true);
(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${xsettings.mongodb.user}:${xsettings.mongodb.password}@cluster0-pp2gz.mongodb.net/mern_stack_demo?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        )
    }
    catch (reason) {
        console.error('::: [db/connect] Error:', reason)
    }

    app.listen(5000)
})()
