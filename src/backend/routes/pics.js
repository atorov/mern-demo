const express = require('express')
const { check } = require('express-validator')

const picsControllers = require('../controllers/pics')

const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')

const router = express.Router()

router.use(checkAuth)

router.post(
    '/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('creatorID').not().isEmpty(),
    ],
    picsControllers.createPic,
)

router.get('/user/:uid', picsControllers.getPicsByUserId)

router.delete('/:pid', picsControllers.deletePic)
router.get('/:pid', picsControllers.getPicById)
router.patch(
    '/:pid',
    check('title').not().isEmpty(),
    picsControllers.updatePic,
)

module.exports = router
