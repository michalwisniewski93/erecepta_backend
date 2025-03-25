const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    pesel: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    postcode: {type: String, required: true},
    country: {type: String, required: true},
    patientsystemnumber: {type: Number, required: true},

});

const Patients = mongoose.model("Patients", patientsSchema);
module.exports = Patients;