const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idClinic: {
        type: String,
        required: true
    },
    idDoctor: {
        type: String,
        required: true
    },
    idPatient: {
        type: String,
        required: false
    },
    dayName: {
        type: String,
        required: true
    },
    timePeriod: {
        type: String,
        required: true
    },
    SNILS: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    }
}, {collection: 'Appointments'});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);