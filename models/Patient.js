const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    SNILS: {
        type: String,
        required: true
    },
    availabilityOfInsurance: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: Array,
        required: true
    }
}, {collection: 'Patients'});

module.exports = Patient = mongoose.model('Patient', PatientSchema);