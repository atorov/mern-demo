
const { validationResult } = require('express-validator')

const HTTPError = require('../models/http-error')
const Pic = require('../models/pic')

let PICS = [
    {
        id: 'p1',
        title: 'Empire State Building',
        image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creatorId: 'uid-1',
        },
    },
    {
        id: 'p2',
        title: 'Bridge',
        image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creatorId: 'uid-3',
        },
    },
    {
        id: 'p3',
        title: 'Plane',
        image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        meta: {
            creatorId: 'uid-1',
        },
    },
    {
        id: 'p4',
        title: 'Plane #2',
        image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        meta: {
            creatorId: 'uid-1',
        },
    },
    {
        id: 'p6',
        title: 'Paper Map',
        image: 'https://images.pexels.com/photos/2678301/pexels-photo-2678301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creatorId: 'uid-1',
        },
    },
]

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

function deletePic(req, res, next) {
    const pid = req.params.pid
    const picIndex = PICS.findIndex((p) => p.id === pid)

    if (picIndex === -1) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    PICS = PICS.filter((_, index) => index !== picIndex)

    return res.json()
}

function getAllPic(_, res) {
    return res.json(PICS)
}

async function getPicById(req, res, next) {
    let pic
    try {
        pic = await Pic.findById(req.params.pid)
    }
    catch (reason) {
        console.error('::: [get pic by id] Error:', reason)
        const error = new HTTPError('Could not find a pic!', 500)
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

function updatePic(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error('Errors:', errors)
        const error = new HTTPError('Invalid inputs passed, please check your data!', 422)
        return next(error)
    }

    const pid = req.params.pid
    const picIndex = PICS.findIndex((p) => p.id === pid)

    if (picIndex === -1) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    const prevPic = PICS[picIndex]
    const pic = {
        ...prevPic,
        title: req.body.title,
    }

    PICS[picIndex] = pic

    return res.json(pic)
}

module.exports = {
    createPic,
    deletePic,
    getAllPic,
    getPicById,
    getPicsByUserId,
    updatePic,
}
