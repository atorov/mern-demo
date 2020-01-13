const mongoose = require('mongoose')

const picSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    meta: {
        creatorId: { type: String, required: true },
    },
})

const picModel = mongoose.Model('Pic', picSchema)

module.exports = picModel
