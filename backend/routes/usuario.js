//Modulos nodeJs
const express = require("express");
const router = express.Router();

//Modulos internos
const{ Usuario } = require("../model/usuario");
const cargarArchivo = require("../middleware/file");
const auth = require("../middleware/auth");
//Ruta
router.post("/", async(req, res) =>{
  let usuario = await Usuario.findOne({correo: req.body.correo});
  //Si encuentra el correo en bd
  if(usuario) return res.status(400).send("El correo ya esta registrado en esta Base de datos");
  
  let usuario2 = await Usuario.findOne({cedula: req.body.cedula});
  //Si encuentra la cedula en bd
   if(usuario2) return res.status(400).send("La cedula ya esta registrada en esta Base de datos");
  
  //Si no existe en bd
  usuario = new Usuario({
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    edad: req.body.edad,
    telefono: req.body.telefono,
    correo: req.body.correo,
    password: req.body.password
  })
  //Guardamos el usuario q se va a crear con jwt
  const result = await usuario.save();
  const jwtToken = usuario.generateJWT();
  res.status(200).send({jwtToken});
});

//actualizar usuario 
router.put("/editar", auth, async(req, res) =>{
  const user = await Usuario.findById(req.usuario._id);
  //Si no existe el usuario
  if(!user) return res.status(400).send("El usuario no existe en bd")
  //si el usuario existe
  const usuario = await Usuario.findByIdAndUpdate(req.usuario._id,
    {
      nombre: req.body.nombre,
      cedula: req.body.cedula,
      edad: req.body.edad,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      password: req.body.password
    },
    {
      new: true
    })

    if(!usuario) return res.status(400).send("error en update")
    res.status(200).send(usuario);
});

//actualizar usuario con imagen
router.put("/cargar", cargarArchivo.single("foto"), auth, async(req, res) =>{

  const url = req.protocol + "://" + req.get("host")

  const user = await Usuario.findById(req.usuario._id);
  //Si no existe el usuario
  if(!user) return res.status(400).send("El usuario no existe en bd")
  //si el usuario existe
  let rutaImagen = null;
  if(req.file.filename){
    rutaImagen = url + "/public" + req.file.filename;
  }else{
    rutaImagen = null;
  }
  const usuario = await Usuario.findByIdAndUpdate(req.usuario._id,
    {
      nombre: req.body.nombre,
      cedula: req.body.cedula,
      edad: req.body.edad,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      password: req.body.password,
      foto: rutaImagen,
    },
    {
      new: true
    })
    if(!usuario) return res.status(400).send("error en update")
    res.status(200).send(usuario);
});

//obetener el usuario
router.get("/perfil", auth, async(req, res) =>{
  const user = await Usuario.findById(req.usuario._id);
  //Si no existe el usuario
  if(!user) return res.status(400).send("El usuario no existe en bd")
  //si el usuario existe
  const usuario = await Usuario.findById(req.usuario._id)
  res.send(usuario)
})

//Exports
module.exports = router;