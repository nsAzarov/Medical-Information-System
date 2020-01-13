export function addToCart(product) {
    return {type: "ADD_TO_CART", product}
}

export function increaseQuantity(productId) {
    return {type: "INCREASE_QUANTITY", productId}
}