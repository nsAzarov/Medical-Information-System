const initState = {
    clinics: [],
    doctorsInDB: [],
    selectedClinic: '',
    specializations: '',
    selectedDoctor: '',
    selectedVisitTime: '',
    confirmModalOpened: false,
    deleteModalOpened: false,
    removableClinic: {},
    removableDoctor: {}
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_CLINICS":
            return{
                ...state,
                clinics: action.clinics
            }  
        case "SET_DOCTORS":
            return{
                ...state,
                doctorsInDB: action.doctorsInDB
            }  
        case "SELECT_CLINIC":
            return{
                ...state,
                selectedClinic: action.clinic
            }  
        case "SET_SPECIALIZATIONS":
            return{
                ...state,
                specializations: action.specializationsArr
            }  
        case "SELECT_SPECIALIZATION":
            return{
                ...state,
                selectedSpecialization: action.specialization
            }
        case "SELECT_DOCTOR":
            return{
                ...state,
                selectedDoctor: action.doctor
            }
        case "SELECT_VISIT_TIME":
            return{
                ...state,
                selectedVisitTime: action.visitTime
            }
        case "SET_CONFIRM_MODAL_OPENED":
            return{
                ...state,
                confirmModalOpened: action.confirmModalOpened
            }
        case "SET_DELETE_MODAL_OPENED":
            return{
                ...state,
                deleteModalOpened: action.deleteModalOpened
            }
        case "SET_REMOVABLE_CLINIC":
            return{
                ...state,
                removableClinic: action.removableClinic
            }
        case "SET_REMOVABLE_DOCTOR":
            return{
                ...state,
                removableDoctor: action.removableDoctor
            }
        default:    
            return {
                ...state
            }
    }
}

export default rootReducer;