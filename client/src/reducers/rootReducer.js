const initState = {
    cartProducts: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return{
                ...state,
                cartProducts: state.cartProducts.concat(action.product)
            }
        case "INCREASE_QUANTITY":
            const newArr = state.cartProducts;
            newArr.forEach(p => {
                if(p._id === action.productId) {
                    p.quantity++
                }})
            return{
                ...state,
                cartProducts: newArr
            }
        default:    
            return {
                ...state
            }
    }
}

export default rootReducer;