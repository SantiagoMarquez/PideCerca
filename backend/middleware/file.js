//Modulos NodeJs
const multer = require("multer");

//ruta del directorio donde quedaron los archivos
const directorio = "./public";
//disckStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename)
  },
});

//Cargar archivos
const cargarArchivo = multer({
  storage: storage,
  fileFilter:(req, file, cb) =>{
   // console.log(file.mimetype)
    if (
      file.mimetype == "image/jpg" || 
      file.mimetype == "image/jpeg" || 
      file.mimetype == "image/png" || 
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Solo se acepta extenciones .jpg .png y .gif"))
    }
  }
})

//Exports
module.exports = cargarArchivo;