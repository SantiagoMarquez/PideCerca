//Modulos de Node
const express = require("express");
const router = express.Router();

//Modulos internos
const { Usuario } = require("../model/usuario");

//Ruta
router.post("/", async(req, res) =>{
  //validamos que exista el correo
  const usuario = await Usuario.findOne({correo: req.body.correo});
  // si el correo no existe
  if(!usuario) return res.status(400).send("Correo o contraseña invalidos");
  //si el password no existe
  if(usuario.password !== req.body.password) return res.status(400).send("Correo o contraseña invalidos");
  //Generamos un jwt
  const jwtToken = usuario.generateJWT();
  res.status(200).send({jwtToken});
})

module.exports = router;
