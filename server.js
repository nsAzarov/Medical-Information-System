const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Doctor = require('./models/Doctor');

app.post('/AddDoctor', (req, response) => {
    if(!req.body) return response.sendStatus(400);
    var doctor = new Doctor(req.body);
    doctor._id = mongoose.Types.ObjectId();
    doctor.save((err, doctor) => {
        if (err) return console.error(err);
        console.log("Врач " + doctor.Name + " сохранён в коллекцию doctors.");
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));