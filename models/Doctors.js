const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    accesscode: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    pwz: {type: Number, required: true},
    phonenumber: {type: String, required: true},
    address: {type: String, required: true},
})

const Doctors = mongoose.model("Doctors", doctorsSchema);
module.exports = Doctors;