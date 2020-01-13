const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String, required: true },
    pics: { type: String },
})

userSchema.plugin(uniqueValidator)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
