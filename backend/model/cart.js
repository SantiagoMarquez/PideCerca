const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productos",
    },
    cantidad: {
        type: Number,
        required: true,
        min: [1, 'La cantidad no puede ser menor a 1.']
    },
    precio: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('cart', CartSchema);