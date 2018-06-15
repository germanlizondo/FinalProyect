var mongoose = require('mongoose');

var { Schema } = mongoose;

var Publicacio = new Schema({
    categoria: String,
    titulo: String,
    cuerpo : String,
    autor: String,
    date : String,
    comments: Number,
    likes: Number,
    respuesta: [
        {
            cuerpo: String,
            autor: String,
            likes:Number,
            date : String,
           
        }
    ],
    
});


module.exports = mongoose.model('Publicacio',Publicacio);