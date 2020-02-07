const express = require('express')
const { check } = require('express-validator')

const usersController = require('../controllers/users')

const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/', checkAuth, usersController.getAllUsers)

router.post('/auth', usersController.auth)

router.post(
    '/sign-up',
    [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 }),
        check('name').notEmpty(),
    ],
    usersController.signUp,
)

router.get('/:uid', checkAuth, usersController.getUser)

module.exports = router
