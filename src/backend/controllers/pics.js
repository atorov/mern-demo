const fs = require('fs')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HTTPError = require('../models/http-error')
const Pic = require('../models/pic')
const User = require('../models/user')

async function createPic(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('::: [create pic] Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }

    let user
    try {
        user = await User.findById(req.userData.userID)
    }
    catch (reason) {
        console.error('::: [create pic] Error:', reason)
        const error = new HTTPError('Creating pic failed!', 500)
        return next(error)
    }

    if (!user) {
        const error = new HTTPError('Creating pic failed! Creator not found!', 404)
        return next(error)
    }

    const pic = new Pic({
        title: req.body.title,
        image: req.file.path,
        meta: {
            creatorID: req.userData.userID,
        },
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await pic.save({ session })
        user.pics.push(pic)
        await user.save({ session })
        await session.commitTransaction()
    }
    catch (reason) {
        console.error('::: [create pic] Error:', reason)
        const error = new HTTPError('Creating pic failed!', 500)
        return next(error)
    }

    return res.status(201).json(pic.toObject({ getters: true }))
}

async function deletePic(req, res, next) {
    let pic
    try {
        pic = await Pic
            .findById(req.params.pid)
            .populate('meta.creatorID')
    }
    catch (reason) {
        console.error('::: [delete pic] Error:', reason)
        const error = new HTTPError('Could not delete pic!', 500)
        return next(error)
    }

    if (pic.meta.creatorID.id !== req.userData.userID) {
        const error = new HTTPError('Not allowed to delete this pic!', 403)
        return next(error)
    }

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    const imagePath = pic.image

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await pic.remove({ session })
        pic.meta.creatorID.pics.pull(pic)
        await pic.meta.creatorID.save({ session })
        await session.commitTransaction()
    }
    catch (reason) {
        console.error('::: [delete pic] Error:', reason)
        const error = new HTTPError('Could not delete pic!', 500)
        return next(error)
    }

    fs.unlink(imagePath, (fileError) => {
        if (fileError) {
            console.error('::: [file] Error:', fileError)
        }
    });

    return res.json({ message: 'Pic deleted successfully' })
}

async function getPicById(req, res, next) {
    let pic
    try {
        pic = await Pic.findById(req.params.pid)
    }
    catch (reason) {
        console.error('::: [get pic by id] Error:', reason)
        const error = new HTTPError('Could not find pic!', 500)
        return next(error)
    }

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    return res.json(pic.toObject({ getters: true }))
}

async function getPicsByUserId(req, res, next) {
    // let pics
    // try {
    //     pics = await Pic.find(
    //         { meta: { creatorID: mongoose.Types.ObjectId(req.params.uid) } },
    //     )
    // }
    // catch (reason) {
    //     console.error('::: [get pics by user id] Error:', reason)
    //     const error = new HTTPError('Fetching pics failed!', 500)
    //     return next(error)
    // }

    // // if (!pics || !pics.length) {
    // //     const error = new HTTPError('Could not find a pic for the provided user ID!', 404)
    // //     return next(error)
    // // }

    // return res.json(pics.map((pic) => pic.toObject({ getters: true })))

    let user
    try {
        user = await User
            .findById(req.params.uid)
            .populate('pics')
    }
    catch (reason) {
        console.error('::: [get pics by user id] Error:', reason)
        const error = new HTTPError('Fetching pics failed!', 500)
        return next(error)
    }

    if (!user || !user.pics) {
        const error = new HTTPError('Could not find a user for the provided user ID!', 404)
        return next(error)
    }

    return res.json(user.pics.map((pic) => pic.toObject({ getters: true })))
}

async function updatePic(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('::: [update pic] Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }

    let pic
    try {
        pic = await Pic.findById(req.params.pid)
    }
    catch (reason) {
        console.error('::: [update pic] Error:', reason)
        const error = new HTTPError('Could not update pic!', 500)
        return next(error)
    }

    if (pic.meta.creatorID.toString() !== req.userData.userID) {
        const error = new HTTPError('Not allowed to edit this pic!', 403)
        return next(error)
    }

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }


    pic.title = req.body.title

    try {
        await pic.save()
    }
    catch (reason) {
        console.error('::: [update pic] Error:', reason)
        const error = new HTTPError('Could not update pic!', 500)
        return next(error)
    }

    return res.json(pic.toObject({ getters: true }))
}

module.exports = {
    createPic,
    deletePic,
    getPicById,
    getPicsByUserId,
    updatePic,
}
