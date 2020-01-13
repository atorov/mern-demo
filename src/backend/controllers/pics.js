
const { validationResult } = require('express-validator')

const HTTPError = require('../models/http-error')
const Pic = require('../models/pic')

async function createPic(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('::: [create pic] Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }

    const pic = new Pic({
        title: req.body.title,
        image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // TODO:
        meta: {
            creatorId: req.body.meta.creatorId,
        },
    })

    try {
        await pic.save()
    }
    catch (reason) {
        console.error('::: [create pic] Errors:', reason)
        const error = new HTTPError('Creating pic failed!', 500)
        return next(error)
    }

    return res.status(201).json(pic)
}

async function deletePic(req, res, next) {
    let pic
    try {
        pic = await Pic.findById(req.params.pid)
    }
    catch (reason) {
        console.error('::: [delete pic] Error:', reason)
        const error = new HTTPError('Could not delete pic!', 500)
        return next(error)
    }

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    try {
        await pic.remove()
    }
    catch (reason) {
        console.error('::: [delete pic] Error:', reason)
        const error = new HTTPError('Could not delete pic!', 500)
        return next(error)
    }

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
    let pics
    try {
        pics = await Pic.find(
            { meta: { creatorId: req.params.uid } },
        )
    }
    catch (reason) {
        console.error('::: [get pics by user id] Error:', reason)
        const error = new HTTPError('Fetching pics failed!', 500)
        return next(error)
    }

    // if (!pics || !pics.length) {
    //     const error = new HTTPError('Could not find a pic for the provided user ID!', 404)
    //     return next(error)
    // }

    return res.json(pics.map((pic) => pic.toObject({ getters: true })))
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

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }


    pic.title = req.body.title

    try {
        await pic.save()
    }
    catch (reason) {
        console.error('::: [update pic] Errors:', reason)
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
