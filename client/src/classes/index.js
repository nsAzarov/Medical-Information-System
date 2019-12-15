class Clinic {
    constructor(idClinic, imgUrl, clinicName) {
        this.idClinic = idClinic;
        this.imgUrl = imgUrl;
        this.clinicName = clinicName;
    }
    doctorsList = [];
    hospitalRoomsList = [];
    addNewDoctorToList = (idDoctor) => {
        this.doctorsList.push(idDoctor);
    }
    removeFromDoctorsList = (tempObj, idDoctor) => {
        let tempDoctorsList = [];
        for(let i = 0; i < tempObj.doctorsList.length; i++) {
            if (tempObj.doctorsList[i] !== idDoctor) {
                tempDoctorsList.push(tempObj.doctorsList[i]);
            }
        }
        this.doctorsList = tempDoctorsList;
    }
    addNewHospitalRoom = (newHospitalRoomObject) => {
        this.hospitalRoomsList.push(newHospitalRoomObject)
    }
}
class HospitalRoom {
    constructor(idRoom, roomNumber, capacity, occupancy, patientList) {
        this.idRoom = idRoom;
        this.roomNumber = roomNumber;
        this.capacity = capacity; //вместимость
        this.occupancy = occupancy; //заполненность
        this.patientList = patientList; 
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
    active = false;
    setActive = () => {this.active = true};
    setNotActive = () => {this.active = false};
}

class Doctor {
    constructor(idDoctor, imgUrl, name, age, specialization, experience, schedule) {
        this.idDoctor = idDoctor;
        this.imgUrl = imgUrl;
        this.name = name;
        this.age = age;
        this.specialization = specialization;
        this.experience = experience;
        this.schedule = schedule; 
    }
}

class Patient {
    constructor(imgUrl, name, age, gender, SNILS, availabilityOfInsurance) {
        this.imgUrl = imgUrl;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.SNILS = SNILS;
        this.availabilityOfInsurance = availabilityOfInsurance;
    }
    medicalHistory = [];
}

class Appointment {
    constructor(idClinic, idDoctor, dayName, timePeriod, SNILS, patientName) {
        this.idClinic = idClinic;
        this.idDoctor = idDoctor;
        this.dayName = dayName;
        this.timePeriod = timePeriod;
        this.SNILS = SNILS;
        this.patientName = patientName;
    }
    idPatient = '';
}

class MedicalExamination {
    constructor(symptoms, inspectionResults, diagnosis, medicines, recommendations, referralToAdditionalExamination) {
        this.date = (new Date()).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        this.symptoms = symptoms;
        this.inspectionResults = inspectionResults;
        this.diagnosis = diagnosis;
        this.medicines = medicines;
        this.recommendations = recommendations;
        this.referralToAdditionalExamination = referralToAdditionalExamination;
    }
}

export {
    Appointment,
    Clinic,
    HospitalRoom,
    MedicalExamination,
    Visit,
    Doctor,
    Patient
}

export class APIService {
    async getResource(url) {
        const res = await fetch(`${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }
    async getAllClinics() {
        const Clinics = await this.getResource(`/Clinics`);
        return Clinics;
    }
    async getAllDoctors() {
        const Doctors = await this.getResource(`/Doctors`);
        return Doctors;
    }
    async getDoctor(idDoctor) {
        const Doctors = await this.getResource(`/Doctor/${idDoctor}`);
        return Doctors;
    }
    async getAppointmentsList(idDoctor) {
        const Appointments = await this.getResource(`/GetAppointmentsList/${idDoctor}`);
        return Appointments;
    }
    async getPatient(SNILS) {
        const Patient = await this.getResource(`/Patient/${SNILS}`);
        return Patient;
    }
}