class Clinic {
    constructor(idClinic, imgUrl, clinicName) {
        this.idClinic = idClinic;
        this.imgUrl = imgUrl;
        this.clinicName = clinicName;
    }
    doctorsList = [];
    wardsNumber = 0;
    addNewDoctorToList = (doctorObj) => {
        this.doctorsList.push(doctorObj);
    }
}
class HospitalWard extends Clinic {
    constructor(idWard, capacity, occupancy, patientList) {
        super();
        this.idWard = idWard;
        this.capacity = capacity; //вместимость
        this.occupancy = occupancy; //заполненность
        this.patientList = patientList; //[] id
    }
}

class Visit {
    constructor(idDoctor, idPatient, date, timePeriodNumber) {
        this.idDoctor = idDoctor;
        this.idPatient = idPatient;
        this.date = date;
        this.timePeriodNumber = timePeriodNumber;
    }
    info = () => {
        console.log(this.name);
    }
}

class Doctor {
    constructor(idDoctor, name, age, specialization, experience, schedule) {
        this.idDoctor = idDoctor;
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
    HospitalWard,
    Visit,
    Doctor,
    Patient
}
//const clinic = new Clinic('qwerty');
//clinic.info();