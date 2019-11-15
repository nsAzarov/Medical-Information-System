class Clinic {
    constructor(idClinic, imgUrl, clinicName) {
        this.idClinic = idClinic;
        this.imgUrl = imgUrl;
        this.clinicName = clinicName;
    }
    doctorsList = [];
    hospitalRoomsList = [];
    addNewDoctorToList = (doctorObj) => {
        this.doctorsList.push(doctorObj);
    }
}
class HospitalRoom {
    constructor(idRoom, roomNumber, capacity, occupancy, patientList) {
        this.idRoom = idRoom;
        this.roomNumber = roomNumber;
        this.capacity = capacity; //вместимость
        this.occupancy = occupancy; //заполненность
        this.patientList = patientList; //[] id
    }
}

class Visit {
    constructor(idVisit, dayName, timePeriod) {
        this.idVisit = idVisit;
        this.dayName = dayName;
        this.timePeriod = timePeriod;
    }
    idDoctor = '';
    idPatient = '';
    data = '';
    timePeriodNumber = 0;
    info = () => {
        console.log(this.name);
    }
}

class Doctor {
    constructor(idDoctor, imgUrl, name, age, specialization, experience, schedule) {
        this.idDoctor = idDoctor;
        this.imgUrl = imgUrl;
        this.name = name;
        this.age = age;
        this.specialization = specialization;
        this.experience = experience;
        this.schedule = schedule; //массив объектов. каждый день отдельный объект. поля: дата, время начала, время окончания работы
    }
}

class Patient {
    constructor(id, name, age, gender, medicalHistory) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.medicalHistory = medicalHistory;
    }
}

export {
    Clinic,
    HospitalRoom,
    Visit,
    Doctor,
    Patient
}
//const clinic = new Clinic('qwerty');
//clinic.info();