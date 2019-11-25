const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ImgUrl: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    DoctorsList: {
        type: Array,
        required: true
    },
    HospitalRoomsList: {
        type: Array,
        required: true
    }
}, {collection: 'Clinics'});

module.exports = Clinic = mongoose.model('Clinic', ClinicSchema);