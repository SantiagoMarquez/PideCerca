// modulos de node.js
const mongoose = require("mongoose");
const infoEntrega = {
	direccion: String,
	telefono: Number,
	lat: Number,
	lng: Number,
};
// esquema del pedido del usuario
const esquemaUsuarioPedido = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
			required: true,
		},
		direccion: infoEntrega,
		idUsuario: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "usuario" },
		pedido: {
			productos: [
				{
					_id: false,
					productoId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "producto",
						required: true,
					},
					cantidad: { type: Number, required: true },
				},
			],
		},
	},
	{ timestamps: true }
);

// metodo para agregar elementos al pedido
esquemaUsuarioPedido.methods.agregarAlPedidio = function (producto) {
	const indiceProductoPedido = this.pedido.productos.findIndex((elemento) => {
		return elemento.productoId.toString() === producto._id.toString();
	});
	let nuevaCantidad = 1;
	const actualizarProductosPedido = [...this.pedido.productos];

	if (indiceProductoPedido >= 0) {
		nuevaCantidad = this.pedido.productos[indiceProductoPedido].cantidad + 1;
		actualizarProductosPedido[indiceProductoPedido].cantidad = nuevaCantidad;
	} else {
		actualizarProductosPedido.push({
			productoId: producto._id,
			cantidad: nuevaCantidad,
		});
	}
	const actualizarPedido = {
		productos: actualizarProductosPedido,
	};
	this.pedido = actualizarPedido;
	return this.save();
};

//metodo para eliminar cantidad de productos al pedido
esquemaUsuarioPedido.methods.eliminarCantidad = function (productoId) {
	const nuevoPedido = this.pedido.productos.map((producto) => {
		if (producto.productoId.toString() === productoId.toString())
			return {
				...producto.toObject(),
				cantidad: producto.cantidad - 1,
			};
		return producto.toObject();
	});
	const nuevoPedidoCompleto = nuevoPedido.filter((producto) => {
		return producto.cantidad > 0;
	});
	this.pedidio.productos = nuevoPedidoCompleto;
	return this.save();
};
// metodo para eliminar productos del pedido
esquemaUsuarioPedido.methods.eliminarDelPedido = function (productoId) {
	const productosPedidoActualizados = this.pedido.productos.filter((producto) => {
		return producto.productoId.toString() !== productoId.toString();
	});
	this.pedido.productos = productosPedidoActualizados;
	return this.save();
};

//metodo para reiniciar el pedido
esquemaUsuarioPedido.methods.limpiarPedido = function () {
	this.pedido = { productos: [] };
	return this.save();
};
// crear los exports
const UsuarioPedido = mongoose.model("usuarioPedido", esquemaUsuarioPedido);
module.exports.UsuarioPedido = UsuarioPedido;
