const mongoose = require('mongoose')

const recipesSchema = new mongoose.Schema({
    barcodenumber: {type: String, required: true},
    dateofissuedata: {type: String, required: true},
    recipescontentinfo: {type: String, required: true},
    patient: {type: String, required: true},
    doctorsname: {type: String, required: true},
    doctorssurname: {type: String, required: true},
    doctorsaccesscode: {type: Number, required: true},
    doctorspwz: {type: Number, required: true},
    doctorsphonenumber: {type: String, required: true},
    doctorsaddress: {type: String, required: true},
    patientsystemnumber: {type: Number, required: true},
})

const Recipes = mongoose.model("Recipes", recipesSchema)
module.exports = Recipes