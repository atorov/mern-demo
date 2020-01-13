const { validationResult } = require('express-validator')

const HTTPError = require('../models/http-error')
const User = require('../models/user')

async function auth() {
    // try {
    //     await pic.save()
    // }
    // catch (reason) {
    //     console.error('::: [create pic] Errors:', reason)
    //     const error = new HTTPError('Creating pic failed!', 500)
    //     return next(error)
    // }

    // return res.status(201).json(pic)

    // const {
    //     email,
    //     password,
    // } = req.body

    // const user = USERS.find((u) => u.email === email)

    // if (!user || user.password !== password) {
    //     const error = new HTTPError('Could not identify user, credentials seems to be wrong!', 401)
    //     return next(error)
    // }

    // return res.json({ message: 'Authenticated' })
}

function getAllUsers() {
    // res.json(USERS)
}

async function signUp(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }


    let existingUser
    try {
        existingUser = await User.findOne({ email: req.body.email })
    }
    catch (reason) {
        console.error('::: [create user] Errors:', reason)
        const error = new HTTPError('Creating user failed!', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HTTPError('User already exists!', 422)
        return next(error)
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password, // TODO:
        name: req.body.name,
        pics: req.body.pics,
    })

    try {
        await user.save()
    }
    catch (reason) {
        console.error('::: [create user] Errors:', reason)
        const error = new HTTPError('Creating user failed!', 500)
        return next(error)
    }

    return res.status(201).json(user.toObject({ getters: true }))
}

module.exports = {
    auth,
    getAllUsers,
    signUp,
}
