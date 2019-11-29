const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idDoctor: {
        type: String,
        required: true
    },
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
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    schedule: {
        type: Array,
        required: true
    }
}, {collection: 'Doctors'});

module.exports = Doctor = mongoose.model('Doctor', DoctorSchema);