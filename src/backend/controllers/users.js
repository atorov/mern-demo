const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const HTTPError = require('../models/http-error')
const User = require('../models/user')
const xsettings = require('../private/xsettings')

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

    if (!user) {
        const error = new HTTPError('Could not authenticate user!', 403)
        return next(error)
    }

    let isPasswordValid = false
    try {
        isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    }
    catch (reason) {
        console.error('::: [auth user] Error:', reason)
        const error = new HTTPError('Could not authenticate user!', 500)
        return next(error)
    }

    if (!isPasswordValid) {
        const error = new HTTPError('Could not authenticate user!', 403)
        return next(error)
    }

    if (!xsettings.secretKey) {
        const error = new HTTPError('Secret key not found!', 500)
        return next(error)
    }

    let token
    try {
        token = jwt.sign(
            {
                userID: user.id,
                email: user.email,
            },
            xsettings.secretKey,
            { expiresIn: '1h' },
        )
    }
    catch (reason) {
        console.error('::: [auth user] Error:', reason)
        const error = new HTTPError('Could not authenticate user!', 500)
        return next(error)
    }

    return res.json({
        userID: user.id,
        email: user.email,
        token,
    })
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

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 1)
    }
    catch (reason) {
        console.error('::: [create user] Error:', reason)
        const error = new HTTPError('Could not create user!', 500)
        return next(error)
    }

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
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

    if (!xsettings.secretKey) {
        const error = new HTTPError('Secret key not found!', 500)
        return next(error)
    }

    let token
    try {
        token = jwt.sign(
            {
                userID: user.id,
                email: user.email,
            },
            xsettings.secretKey,
            { expiresIn: '1h' },
        )
    }
    catch (reason) {
        console.error('::: [create user] Error:', reason)
        const error = new HTTPError('Signing up failed!', 500)
        return next(error)
    }

    return res.status(201).json({
        userID: user.id,
        email: user.email,
        token,
    })
}

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.uid)
    }
    catch (reason) {
        console.error('::: [get user by id] Error:', reason)
        const error = new HTTPError('Could not find user!', 500)
        return next(error)
    }

    if (!user) {
        const error = new HTTPError('Could not find a user for the provided ID!', 404)
        return next(error)
    }

    return res.json(user.toObject({ getters: true }))
}

module.exports = {
    auth,
    getAllUsers,
    getUser,
    signUp,
}
