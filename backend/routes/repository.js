const Cart = require("../model/cart");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "nombre precio total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}