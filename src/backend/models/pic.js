const mongoose = require('mongoose')

const picSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    meta: {
        creatorID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
})

const picModel = mongoose.model('Pic', picSchema)

module.exports = picModel
