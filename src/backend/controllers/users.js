const { validationResult } = require('express-validator')
const shortid = require('shortid')

const HTTPError = require('../models/http-error')

const USERS = [
    {
        id: 'uid-1',
        email: 'user1@example.com',
        password: 'password1',
        name: 'Robert Doe',
        pics: 3,
    },
    {
        id: 'uid-2',
        email: 'user2@example.com',
        password: 'password2',
        name: 'Darwin',
        pics: 0,
    },
    {
        id: 'uid-3',
        email: 'user3@example.com',
        password: 'password3',
        name: 'Jane Doe',
        pics: 1,
    },
]

function auth(req, res, next) {
    const {
        email,
        password,
    } = req.body

    const user = USERS.find((u) => u.email === email)

    if (!user || user.password !== password) {
        const error = new HTTPError('Could not identify user, credentials seems to be wrong!', 401)
        return next(error)
    }

    return res.json({ message: 'Authenticated' })
}

function getAllUsers(_, res) {
    res.json(USERS)
}

function signUp(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }

    const {
        email,
        password,
        name,
    } = req.body

    const isEmailDuplicated = !!USERS.find((u) => u.email === email)
    if (isEmailDuplicated) {
        const error = new HTTPError('Could not create user, email already exists!', 422)
        return next(error)
    }

    const user = {
        id: shortid.generate(),
        email,
        password,
        name,
    }

    USERS.push(user)

    return res.status(201)
        .json(user)
}

module.exports = {
    auth,
    getAllUsers,
    signUp,
}
