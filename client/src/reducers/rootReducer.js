const initState = {
    selectedClinic: '',
    specializations: '',
    selectedDoctor: '',
    selectedVisitTime: ''
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
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
        default:    
            return {
                ...state
            }
    }
}

export default rootReducer;