const mongoose = require('mongoose')

const activeprofileSchema = new mongoose.Schema({
    accesscode: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    pwz: {type: Number, required: true},
    phonenumber: {type: String, required: true},
    address: {type: String, required: true},
})

const Activeprofile = mongoose.model("Activeprofile", activeprofileSchema)
module.exports = Activeprofile