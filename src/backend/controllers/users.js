const { validationResult } = require('express-validator')

const HTTPError = require('../models/http-error')
const User = require('../models/user')

async function auth(req, res, next) {
    let user
    try {
        user = await User.findOne({ email: req.body.email })
    }
    catch (reason) {
        console.error('::: [auth user] Error:', reason)
        const error = new HTTPError('Could not authenticate user!', 500)
        return next(error)
    }

    if (!user || user.password !== req.body.password) {
        const error = new HTTPError('Could not authenticate user!', 401)
        return next(error)
    }

    return res.json({ message: 'Authenticated' })
}

async function getAllUsers(req, res, next) {
    let users
    try {
        // users = await User.find({}, 'email name')
        users = await User.find({}, '-password')
    }
    catch (reason) {
        console.error('::: [read all users] Error:', reason)
        const error = new HTTPError('Could not fetch users!', 500)
        return next(error)
    }

    return res.json(users.map((user) => user.toObject({ getters: true })))
}

async function signUp(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('::: [sign up] Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }


    let existingUser
    try {
        existingUser = await User.findOne({ email: req.body.email })
    }
    catch (reason) {
        console.error('::: [create user] Error:', reason)
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
        pics: [],
    })

    try {
        await user.save()
    }
    catch (reason) {
        console.error('::: [create user] Error:', reason)
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
