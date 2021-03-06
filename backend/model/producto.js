//modulos de node.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//schema
const esquemaProducto = new Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		descripcion: {
			type: String,
			required: false,
		},
		precio: {
			type: Number,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);
//se crea el expostador del modulo
const Producto = mongoose.model("producto", esquemaProducto);
module.exports.Producto = Producto;
