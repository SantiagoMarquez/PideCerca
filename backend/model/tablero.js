//modulos internos node
const mongoose = require("mongoose");

const esquemaTablero = new mongoose.Schema({

    nombre:String,
    precio:String,
    sticker:String,
    
    
});
const Tablero= mongoose.model("tablero",esquemaTablero);

 module.exports.Tablero=Tablero;
 
