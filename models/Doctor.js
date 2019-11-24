const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ImgUrl: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: String,
        required: true
    },
    Specialization: {
        type: String,
        required: true
    },
    Experience: {
        type: String,
        required: true
    },
    Schedule: {
        type: Array,
        required: true
    }
}, {collection: 'Doctors'});

module.exports = Doctor = mongoose.model('Doctor', DoctorSchema);