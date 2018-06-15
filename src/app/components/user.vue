<template>

<div>


<div id="content" class="content" >
   

<div class="portada" v-bind:style="{ backgroundImage: 'url(' + log.portada + ')' }">
    <div class=" profile-user text-center">
      <div class="user-card-pb card__image--fence" v-bind:style="{ backgroundImage: 'url(' + log.image + ')' }"></div>
<div class="card-profile " >
    
    <h3 >{{log.nom}}</h3>
  <h6>{{log.email}}</h6>
<router-link to="/settings"><i class="fas fa-cogs"></i></router-link>
</div>
</div>
</div>
    
    <div id="content" class="content">
       
    <div  class="section-publicacions">
     
      
        
    </div>
      
      <div  class="section-publicacions2">
                 <button class="buton-write" v-on:click="show = !show">
              <div style="font-size:3em; color:white">
    <i class="fas fa-pen-square"></i>
</div>
  
  </button>
        <transition
    name="custom-classes-transition"
    enter-active-class="animated bounceInLeft"
    leave-active-class="animated bounceOutRight"
  >
    <div v-if="show" class="container publi">
            <div id="form-publicacio">
             <form @submit.prevent="addPublicacio">
            
  <div class="form-group">
  
  
    <input type="text" name="titulo" class="form-control" id="exampleFormControlInput1" placeholder="titol" v-model="publicacio.titulo">
  </div>
  <div class="form-group">


    <input type="text" name="categoria" class="form-control" id="exampleFormControlInput1" placeholder="Categoria" v-model="publicacio.categoria">
  </div>
  
  <div class="form-group">
   
   
    <textarea name="cuerpo" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Comparteix alguna cosa!"  v-model="publicacio.cuerpo"></textarea>
  </div>
    <button class="btn btn-lg  btn-block publica-boton" type="submit" >Publica</button>

</form>
</div>
        </div>
  </transition>
     <div class="publicacion" v-for="publi of publicacions" :key="publi">
    <div class="publicacion-div ">
     
    <div class="publicacion-usuario">
      
        <div ><b>{{publi.autor}}</b>,<small>{{publi.date}}</small> </div>
        <div >{{publi.categoria}}</div>
        <p>{{publi.cuerpo}}</p>
        <div class="down-part">
        
        <p >{{publi.titulo}}</p>
    <hr>
   <p> <i class="far fa-comments"> {{publi.comments}}</i></p>
        </div>
        </div>
        <div class="respon">
         <form @submit.prevent="respondePublicacion(publi._id)" style="padding:1em;">
             <div class="row">
                 <div class="col-md-8">
    <textarea class="form-control input-sm res" id="inputsm" type="text" placeholder="Respon"  v-model="publicacio.respuesta"></textarea>
       </div>
       <div class="col-md-4 text-center">
        <button class="responde" type="submit" >Respon</button>
           </div>
</div>
    </form>
    <div  class="show-respuesta">
          <div v-for="resp of publi.respuesta" :key="resp">
      <p><b>{{resp.autor}}</b> <small>{{resp.date}}</small></p>
      <div style="padding-left:2em;padding-right :2em;"> <p> {{resp.cuerpo}}</p></div>
         
              <p></p>
</div>
      </div>
      </div>
      </div>
  
    
    
  </div>
 
   </div>
  
  



    
    
        </div>
        </div>
</div>
  
</template>

<script>

class Publicacio{
    constructor(categoria,titulo,cuerpo,autor,respuesta) {
       this.categoria = categoria;
    this.titulo= titulo;
    this.cuerpo = cuerpo;
    this.autor = autor;
        this.respuesta = respuesta;
    }
}

export default {
    data(){
        return{
            publicacio: new Publicacio(),
             show: false,
            publicacions:[],
              log: [],
              id_user: this.$route.params.id,
              
        }
    },
    created(){
        
      this.getLogin(this.id_user);
      this.getAllPublicacions(this.id_user);
    console.log(this.log);
    },
    methods:{
           getLogin(id_user){
         
            fetch('/user/'+id_user)
            .then(res => res.json())
            .then(data =>{
                this.log = data;
               console.log(data.nom)
       this.user_name=data.nom;

            } )
        },
        addPublicacio(){
            
           fetch('/publica',{
               method: 'POST',
               body: JSON.stringify(this.publicacio),
               headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.go(this.$router.currentRoute))

            this.publicacio = new Publicacio();
        },
        
        getAllPublicacions(autor_publi){
            console.log(autor_publi);
            fetch('/publicacionsbusca/'+autor_publi)
            .then(res => res.json())
            .then(data =>{
             
                this.publicacions = data;
             this.publicacions.reverse();
           
            } )
        },
        respondePublicacion(id){
           fetch('/respondepublicacio/'+id,{
               method: 'PUT',
                body: JSON.stringify(this.publicacio),
                headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           })
          .then(res => res.json()).then(data=> {
            this.publicacions = data;
             this.publicacions.reverse();
         
             }).then(this.$router.go(this.$router.currentRoute))
        }
    }
}
</script>
