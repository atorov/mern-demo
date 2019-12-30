const express = require('express')

const picsControllers = require('../controllers/pics')

const router = express.Router()

router.get('/', picsControllers.getAllPic)
router.post('/', picsControllers.createPic)

router.get('/user/:uid', picsControllers.getPicsByUserId)

router.delete('/:pid', picsControllers.deletePic)
router.get('/:pid', picsControllers.getPicById)
router.patch('/:pid', picsControllers.updatePic)

module.exports = router
