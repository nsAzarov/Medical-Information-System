const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    doctorsList: {
        type: Array,
        required: true
    },
    hospitalRoomsList: {
        type: Array,
        required: true
    }
}, {collection: 'Clinics'});

module.exports = Clinic = mongoose.model('Clinic', ClinicSchema);