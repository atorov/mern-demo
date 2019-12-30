const shortid = require('shortid')

const HTTPError = require('../models/http-error')

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

function createPic(req, res, next) {
    const {
        title,
        // image: ... // TODO:
        meta,
        meta: {
            creatorId,
        } = {},
    } = req.body

    if (!title) {
        const error = new HTTPError('Title is not available in the request body!', 400)
        return next(error)
    }
    if (!meta) {
        const error = new HTTPError('Meta data is not available in the request body!', 400)
        return next(error)
    }
    if (!creatorId) {
        const error = new HTTPError('Creator ID is not available in the request body!', 400)
        return next(error)
    }

    const pic = {
        id: shortid.generate(),
        title,
        meta,
    }

    PICS.push(pic)

    return res.status(201)
        .json(pic)
}

function deletePic(req, res, next) {
    const pid = req.params.pid
    const picIndex = PICS.findIndex((p) => p.id === pid)

    if (picIndex === -1) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    PICS = PICS.filter((_, index) => index !== picIndex)

    return res.status(200).json()
}

function getAllPic(_, res) {
    return res.json(PICS)
}

function getPicById(req, res, next) {
    const pid = req.params.pid
    const pic = PICS.find((p) => p.id === pid)

    if (!pic) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    return res.json(pic)
}

function getPicsByUserId(req, res) {
    const uid = req.params.uid
    const pics = PICS.filter((p) => p.meta.creatorId === uid)
    res.json(pics)
}

function updatePic(req, res, next) {
    const pid = req.params.pid
    const picIndex = PICS.findIndex((p) => p.id === pid)

    if (picIndex === -1) {
        const error = new HTTPError('Could not find a pic for the provided ID!', 404)
        return next(error)
    }

    const { title } = req.body

    if (!title) {
        const error = new HTTPError('Title is not available in the request body!', 400)
        return next(error)
    }

    const prevPic = PICS[picIndex]
    const pic = {
        ...prevPic,
        title,
    }

    PICS[picIndex] = pic

    return res.status(200)
        .json(pic)
}

module.exports = {
    createPic,
    deletePic,
    getAllPic,
    getPicById,
    getPicsByUserId,
    updatePic,
}
