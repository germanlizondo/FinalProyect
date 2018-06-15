var express = require('express');

var session = require('express-session');
var router = express.Router();
var User = require('./models/users');
var Publicacio = require('./models/publicacions');

router.get('/',(req,res)=>{

  res.sendFile(__dirname+'/public/index.html');

});


router.get('/users', async (req,res)=>{

  var users = await User.find();
  res.send(users);
});


router.post('/login', async (req,res)=>{
console.log(req.body);

User.findOne( {nom:req.body.nom,password: req.body.password }, function (err, result) {
  if(err) {throw err;}
  if (!result) {
      console.log("NO EXISTEIX")
     return res.status(404).send();
  }else{
    req.session.user = result;
    console.log(req.session);
    res.send(req.session.user);
  }
})




  
  
});

router.get('/login', async (req,res)=>{
  console.log(req.body);
  
 if(!req.session){
  console.log()
  res.send("NO ")
 }else{
  res.send(req.session)
 }
  
  
    
    
  });



router.post('/registro',async(req,res)=>{
    var newUser = new User();
    newUser.nom = req.body.nom;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.save(function (err){
      if(err) {throw err;}
      
      });
      
      res.end();
  console.log(newUser);
});



router.post('/publica',async(req,res,next)=>{
  var newPubli = new Publicacio();
  
 
  newPubli.titulo = req.body.titulo;
  newPubli.cuerpo = req.body.cuerpo;
  newPubli.autor = req.body.autor;
  newPubli.categoria = req.body.categoria;
  newPubli.date = new Date();
  newPubli.comments= 0;
  newPubli.respuesta = [
    {
      cuerpo: "",
      autor: "",
      likes:0,
      date : "",
     
    }
  ];
  newPubli.likes = 0;
  console.log(newPubli);
  newPubli.save(function (err){
    if(err) {throw err;}
    
    });
    next('/#/');
    res.end();

});
router.get('/publicacions', async (req,res)=>{

  var publicacions = await Publicacio.find();
  res.send(publicacions);
});
router.put('/respondepublicacio/:id', async (req,res)=>{
  var id = req.params.id;
  console.log(req.body.respuesta);
  Publicacio.findById(id,(err,publi)=>{
    if(err) throw err;
    publi.titulo = publi.titulo;
    publi.titulo = publi.titulo;
    publi.titulo = publi.titulo;
    publi.categoria = publi.categoria ;
    publi.date = publi.date;
    publi.comments = publi.comments +1;
    console.log(publi.comments);
    var respuesta_front  = new Object();
    respuesta_front["cuerpo"] = req.body.respuesta;
    respuesta_front["autor"] = "German";
    respuesta_front["likes"] = 0;
    respuesta_front["date"] = new Date();
     
      
 
    publi.respuesta.push(respuesta_front);
    publi.likes = publi.likes;

    Publicacio.findByIdAndUpdate({_id:id},{$push: {respuesta : respuesta_front}},{comments:publi.comments},(err,publi)=>{
      if(err) throw err;
      console.log("Respuesta hecha");
    })
    console.log(publi.respuesta);
  })

});



 



module.exports = router;