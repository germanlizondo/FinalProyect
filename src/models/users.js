var mongoose = require('mongoose');

var { Schema } = mongoose;

var User = new Schema({
    nom: String,
    email : String,
    password: String,
    portada: String,
    image: String
});


module.exports = mongoose.model('User',User);