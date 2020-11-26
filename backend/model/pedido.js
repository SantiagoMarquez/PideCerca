// modulos de node.js
const mongoose = require("mongoose");

//Esquema
const pedidoEsquema = new mongoose.Schema(
	{
		productos: [
			{
				producto: { type: Object, required: true },
				cantidad: { type: Number, required: true },
			},
		],
		estado: {
			type: String,
			required: true,
			enum: ["Creado", "Aceptado", "Completado", "Cancelado", "En curso"],
		},
		usuario: {
			nombre: {
				type: String,
				required: true,
			},
			direccion: {
				type: Object,
				required: true,
			},
			idUsuario: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "usuario",
			},
		},
		tienda: {
			nombre: {
				type: String,
				required: true,
			},
			idTienda: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "tienda",
			},
		},
	},
	{
		timestamps: true,
	}
);
const Pedido = mongoose.model("pedido", pedidoEsquema);
module.exports.Pedido = Pedido;