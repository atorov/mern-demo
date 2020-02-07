const jwt = require('jsonwebtoken')

const HTTPError = require('../models/http-error')
const xsettings = require('../private/xsettings')

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            throw new Error('Authentication failed!')
        }

        const decodedToken = jwt.verify(token, xsettings.secretKey)
        req.userData = { userID: decodedToken.userID }
        return next()
    }
    catch (reason) {
        const error = new HTTPError('Authentication failed!', 401)
        return next(error)
    }
}

module.exports = checkAuth
