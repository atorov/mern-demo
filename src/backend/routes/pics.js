const express = require('express')
const { check } = require('express-validator')

const picsControllers = require('../controllers/pics')

const router = express.Router()

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('meta.creatorId').not().isEmpty(),
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
