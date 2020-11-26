// modulos de node.js
const mongoose = require("mongoose");

const esquemaTienda = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		categoria: {
			type: String,
			required: true,
		},
		descripcion: {
			type: String,
			required: true,
		},
		direccion: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const Tienda = mongoose.model("tienda", esquemaTienda);

module.exports.Tienda = Tienda;
