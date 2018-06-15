var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var validator = require('express-validator');
var User = require('./models/users');
var Publicacio = require('./models/publicacions');
var cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/xarxa-social')
.then(db => console.log('Conected to Mongo OK!'))
.catch(err=> console.error(err));



//Settings
app.set('port',process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(validator());
app.use(session({secret: 'uitisawesome'}));
//Routes


app.get('/',(req,res)=>{

  res.sendFile(__dirname+'/public/index.html');

});

app.post('/login', async (req,res)=>{
    console.log(req.body);
    
     User.findOne( {nom:req.body.nom,password: req.body.password }, function (err, result) {
      if(err) {throw err;}
      if (!result) {
          console.log("NO EXISTEIX")
          return res.status(404).send();
          res.end('done');
      }else{
        req.session.user = result;
        console.log(req.session);
       
        return res.status(200).send();
        res.end('done');
        console.log(req.session);
    res.send(req.session.user);
    console.log(req.session.user)
       }
     })
    
    
    
    
    
    
      
      
    });
app.get('/users', async (req,res)=>{

  var users = await User.find();
  res.send(users);
});

app.get('/sesion', async (req,res)=>{ //SESIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON
    console.log(req.session);
 
    User.findOne({nom: 'german'}, (err,user)=> { 
       
        if(err) {throw err;}
        console.log(user);
        res.send(user);
    
    });

   
  });

  app.get('/user/:id', async (req,res)=>{ //SESIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON
    var id = req.params.id;
 
    User.findOne({_id:id}, (err,user)=> { 
       
        if(err) {throw err;}
        console.log("USUARIOOO:"+user);
        res.send(user);
    
    });

   
  });






app.post('/registro',async(req,res)=>{
    var newUser = new User();
    newUser.nom = req.body.nom;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.portada = "/img/space.jpg";
    newUser.image = "/img/man.jpg";
    newUser.save(function (err){
      if(err) {throw err;}
      
      });
      
      res.end();
  console.log(newUser);
});



app.post('/publica',async(req,res,next)=>{
  var newPubli = new Publicacio();
  
 
  newPubli.titulo = req.body.titulo;
  newPubli.cuerpo = req.body.cuerpo;
  newPubli.autor = "german";  //SESIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON
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
app.get('/publicacions', async (req,res)=>{

  var publicacions = await Publicacio.find();
  res.send(publicacions);
});

app.get('/publicacionsbusca/:autor', async (req,res)=>{
    var autor_publi = req.params.autor;
    console.log("AUTOOOOR: "+ autor_publi)
   
    var user = await User.findOne({
        _id:autor_publi
    },(err,user)=>{
        if(err) throw err;
        console.log(user.nom)
       
    
    
    })
        
    var publicacions = await Publicacio.find({
        autor: user.nom 
     });
     res.send(publicacions);
   
   
  });


app.put('/editauser/:id',async (req,res)=>{
    var id = req.params.id;
    console.log(req.body);
    console.log(id);
    User.findByIdAndUpdate({_id:id},{
        nom: req.body.nom,
        email:req.body.email,
        password:req.body.password,
       
    },(err,user)=>{
        if(err) throw err;
        console.log("O'RIGHT!")
    })
});

app.put('/editImage/:id',async (req,res)=>{
    var id = req.params.id;
    console.log(req.body);
    console.log(id);
    User.findByIdAndUpdate({_id:id},{
        image:req.body.image,
       portada:req.body.portada
    },(err,user)=>{
        if(err) throw err;
        console.log("Iamtges O'RIGHT!")
    })
});
app.put('/respondepublicacio/:id', async (req,res)=>{
  var id = req.params.id;

    
Publicacio.findByIdAndUpdate({_id:id},{
    
     $push:{
         respuesta: 
{
                 cuerpo: req.body.respuesta,
                 autor: "german",  //SESIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON
                 likes: 0,
                 date : new Date(),
               
             }
         ,
     },
    
      $inc: { comments: 1 } 
 },(err,publicacion)=>{
     if(err) throw err;
     console.log("O'RIGHT!")
     console.log(publicacion.comments);
    //  console.log(publicacion);
 }) 


});
 
app.delete('/eliminauser/:id',async (req,res)=>{
    var id = req.params.id;
    console.log(req.body);
    console.log(id);
    User.deleteOne({_id:id},(err,user)=>{
        if(err) throw err;
        console.log("ELIMINAT!")
    })
});


//Static files
app.use(express.static(__dirname+'/public'));


//Server Listen
app.listen(app.get('port'),()=>{
    console.log('Port',app.get('port'));
})