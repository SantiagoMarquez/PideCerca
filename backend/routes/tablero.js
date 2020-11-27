// API a funcionar nos llega por metodo POST desde angular los campos que registro el usuario 
const express= require("express");
const router= express.Router();

//modulos internos creados por el desarrollador
// Tablero donde guardar
const { Tablero }  = require("../model/tablero");
// usuario es el que hace el registro para hacer una actividad

const cargarArchivo= require("../middleware/file")


// Listar actividades del usuario con GET 
// autenticación pasar por el proceso de middleware para verificar usuario
router.get("/lista",  async (req, res) => {
   // Buscamos el usuario por id
 
   const tablero = await Tablero.find()
    res.send(tablero)
});   
   

// PARA LAS RUTAS SE RECOMIENDA  utilizar ASYNC - AWAY mientras para conexiones con DB el then()catch()


//Crear actividad con imagen
//.single sticker el archivo viene desde angular
router.post("/cargarArchivo",  cargarArchivo.single("sticker"),   async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    
    // la variable rutaImagen se puede declarar null xq es para multer
    let rutaImagen = null;
    // req.file es objecto que nos proporciona información del objecto que se esta subiendo
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
    } else {
      rutaImagen = null;
    }
    // Guardar la actividad con imagen en BD
    const tablero = new Tablero({
      
      nombre: req.body.nombre,
      precio: req.body.precio,
      sticker: rutaImagen,
    
    });
    // Enviamos resultado
    const result = await tablero.save();
    res.status(200).send(result);
  }
);

router.get("/lista/:_id",  async (req, res) => {
  // Buscamos el usuario por id

  const tablero = await Tablero.find(req.params._id)
   res.send(tablero)
});   

//Actualizar actividad 

router.put("/lista",  async (req, res) => {
   // Buscamos el usuario por id
  
   const tablero = await Tablero.findByIdAndUpdate(
     req.body._id,
     {
       
       nombre: req.body.nombre,
       precio: req.body.precio,
       
     },
     {
       new: true,
     }
   );
   if (!tablero)
     return res.status(400).send("No hay actividad asignada a este usuario");
   res.status(200).send(tablero);
 });
 // Eliminar el usuario , traemos un parametro del id de la tarea
 router.delete("/lista/:_id",  async (req, res) => {
  
   const tablero = await Tablero.findByIdAndDelete(req.params._id);
   if (!tablero)
   return res.status(400).send("No se encuentra tarea a eliminar");
   // message: estable comunicacion con el front le da la orden a Angular de borrar en html
    res.status(200).send({message:"Actividad eliminada"});
});



module.exports = router;