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