export function setClinicsLoading(clinicsLoading) {
    return {type: "SET_CLINICS_LOADING", clinicsLoading}
}

export function setDoctorsLoading(doctorsLoading) {
    return {type: "SET_DOCTORS_LOADING", doctorsLoading}
}

export function setClinics(clinics) {
    return {type: "SET_CLINICS", clinics}
}

export function setDoctors(doctorsInDB) {
    return {type: "SET_DOCTORS", doctorsInDB}
}

export function selectClinic(clinic) {
    return {type: "SELECT_CLINIC", clinic}
}

export function setSpecializations(specializationsArr) {
    return {type: "SET_SPECIALIZATIONS", specializationsArr}
}

export function selectSpecialization(specialization) {
    return {type: "SELECT_SPECIALIZATION", specialization}
}

export function selectDoctor(doctor) {
    return {type: "SELECT_DOCTOR", doctor}
}

export function selectVisitTime(visitTime) {
    return {type: "SELECT_VISIT_TIME", visitTime}
}

export function setConfirmModalOpened(confirmModalOpened) {
    return {type: "SET_CONFIRM_MODAL_OPENED", confirmModalOpened}
}

export function setDeleteModalOpened(deleteModalOpened) {
    return {type: "SET_DELETE_MODAL_OPENED", deleteModalOpened}
}

export function setRemovableClinic(removableClinic) {
    return {type: "SET_REMOVABLE_CLINIC", removableClinic}
}

export function setRemovableDoctor(removableDoctor) {
    return {type: "SET_REMOVABLE_DOCTOR", removableDoctor}
}
