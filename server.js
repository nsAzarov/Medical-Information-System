const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Clinic = require('./models/Clinic');

app.post('/AddClinic', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    var clinic = new Clinic(req.body);
    clinic._id = mongoose.Types.ObjectId();
    clinic.save((err, clinic) => {
        if (err) return console.error(err);
        console.log("Клиника " + clinic.name + " сохранена в коллекцию clinics.");
    })
})

app.post('/AddToDoctorsList', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    Clinic.findOneAndUpdate(
        {_id: req.body._id}, 
        {$push: {doctorsList: req.body.idDoctor}}, 
        {new: true}, 
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
})

app.post('/RemoveFromDoctorsList', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    Clinic.findOneAndUpdate(
        {_id: req.body._id}, 
        {$pull: {doctorsList: {$in: [req.body.idDoctor]}}}, 
        {new: true},
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
})

app.post('/AddNewHospitalRoom', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    Clinic.findOneAndUpdate(
        {_id: req.body._id}, 
        {$push: {hospitalRoomsList: req.body.idRoom}}, 
        {new: true}, 
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
})

app.post('/DeleteClinic', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    Clinic.deleteOne({_id: req.body._id}, (err, res) => {
        if(err) {
            if (err) return console.error(err);
            console.log(res);
        }
    });
})

const Doctor = require('./models/Doctor');

app.post('/AddDoctor', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    var doctor = new Doctor(req.body);
    doctor._id = mongoose.Types.ObjectId();
    doctor.save((err, doctor) => {
        if (err) return console.error(err);
        console.log("Врач " + doctor.name + " сохранён в коллекцию doctors.");
    })
})

app.post('/DeleteDoctor', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    Doctor.deleteOne({_id: req.body._id}, (err, res) => {
        if(err) {
            if (err) return console.error(err);
            console.log(res);
        }
    });
})

app.post('/SaveSchedule', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    
    Doctor.findOneAndUpdate(
        {_id: req.body._id}, 
        {schedule: req.body.schedule}, 
        {new: true}, 
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
})

const Appointment = require('./models/Appointment');

app.post('/MakeAppointment', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    
    var appointment = new Appointment(req.body);
    appointment._id = mongoose.Types.ObjectId();
    appointment.save((err, appointment) => {
        if (err) return console.error(err);
        console.log("Новая запись к врачу на " + appointment.dayName + appointment.timePeriod + " сохранена в коллекцию appointments.");
    })
})

const Patient = require('./models/Patient');

app.post('/RegisterNewPatient', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    
    var patient = new Patient(req.body);
    patient._id = mongoose.Types.ObjectId();
    patient.medicalHistory = [];
    patient.save((err, patient) => {
        if (err) return console.error(err);
        console.log("Пациент " + patient.name + " сохранён в коллекцию patients.");
    })
    res.send("Пациент зарегистрирован.")
})

app.post('/CreateNewExaminationResults', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    console.log(req.body)
    Patient.findOneAndUpdate(
        {_id: req.body.idPatient}, 
        {$push: {medicalHistory: req.body.newExamination}}, 
        {new: true}, 
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
    });
})

app.get('/GetAppointmentsList/:id', (req, res) => {
    let ID = new mongoose.Types.ObjectId(req.params.id);
    Appointment.find({idDoctor: ID})
        .then(appointments => res.json(appointments))
        .catch(err => console.log(err));
})

app.get('/Clinics', (req, res) => {
    Clinic.find({})
        .then(clinics => res.json(clinics))
        .catch(err => console.log(err));
})

app.get('/Doctors', (req, res) => {
    Doctor.find({})
        .then(doctors => res.json(doctors))
        .catch(err => console.log(err));
})

app.get('/Clinic/:id', (req, res) => {
    let ObjID = new mongoose.Types.ObjectId(req.params.id);
    Clinic.findOne({ _id: ObjID })
        .then(clinic => res.json(clinic))
        .catch(err => console.log(err));
})

app.get('/Doctor/:id', (req, res) => {
    let ObjID = new mongoose.Types.ObjectId(req.params.id);
    Doctor.findOne({ _id: ObjID })
        .then(doctor => res.json(doctor))
        .catch(err => console.log(err));
})

app.get('/Patient/:id', (req, res) => {
    Patient.findOne({ SNILS: req.params.id })
        .then(patient => res.json(patient))
        .catch(err => console.log(err));
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));