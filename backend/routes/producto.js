//modulos de node.js
const express = require("express");
const router = express.Router();
// modulos internos

const { Producto } = require("../model/producto");

// listar tiendas
router.get("/lista", async (req, res) => {
    const producto = await Producto.find().exec();
	res.send(producto);
});
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const producto = await Producto.findById(req.params.id);
	res.send(producto);
});
router.post("/", async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
    });
    const result = await producto.save();
    res.status(200).send(result);
})
module.exports = router;