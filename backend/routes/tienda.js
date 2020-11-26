//modulos de node.js
const express = require("express");
const router = express.Router();
// modulos internos

const { Tienda } = require("../model/tienda");

// listar tiendas
router.get("/lista", async (req, res) => {
    const tienda = await Tienda.find().exec();
    console.log(tienda);
	res.send(tienda);
});
router.post("/", async (req, res) => {
    const tienda = new Tienda({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
    });
    const result = await tienda.save();
    res.status(200).send(result);
})
module.exports = router;