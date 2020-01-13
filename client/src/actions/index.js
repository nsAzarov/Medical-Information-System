export function addToCart(product) {
    return {type: "ADD_TO_CART", product}
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

export function increaseQuantity(productId) {
    return {type: "INCREASE_QUANTITY", productId}
}