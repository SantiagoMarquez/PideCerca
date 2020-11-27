//Modulos nodeJs
const express = require("express");
const router = express.Router();
// modulos internos
const { Tienda } = require("../model/tienda");
const { Producto } = require("../model/producto");
const { UsuarioPedido } = require("../model/usuarioPedido");
const { Usuario } = require("../model/usuario");
const { Pedido } = require("../model/pedido");
const auth = require("../middleware/auth");

// ruta para agregar producto al carro
router.post("/agregarProducto", auth, async (req, res) => {
	//obtenemos el id del usuario autenticado
	const usuario = await Usuario.findById(req.usuario._id);
	// si el usuario no existe
	if (!usuario) return res.status(400).send("El usuario no existe");
	try {
		const productoId = req.body.productoId;
		let productoSeleccionado;
		if (!productoId) {
			const error = new Error("Producto no enviado");
			error.statusCode = 404;
			throw error;
		}
		const producto = await Producto.findById(productoId);
		productoSeleccionado = producto;
		UsuarioPedido.agregarAlPedidio(productoSeleccionado);
		res.status(200).send("Producto agregado corectamente al carro");
	} catch (error) {
		error.statusCode = 500;
		res.status(500).send("Error agregando productos al pedido");
	}
});
// ruta para conseguir el pedido
router.get("/listar", auth, async (req, res) => {
	//obtenemos el id del usuario autenticado
	const usuario = await Usuario.findById(req.usuario._id);
	// si el usuario no existe
    if (!usuario) return res.status(400).send("El usuario no existe");
    try {
        
    } catch (error) {
        
    }
	const usuarioPedidos = await UsuarioPedido.populate("pedido.productos.productoId").execPopulate();
	let totalPedido = 0;
	usuarioPedidos.forEach((producto) => {
		totalPedido = totalPedido + producto.cantidad * producto.productoId.precio;
	});
	res.send({ pedido: usuarioPedidos, totalPedido: totalPedido });
});

// ruta para crear el pedido
router.post("/");
