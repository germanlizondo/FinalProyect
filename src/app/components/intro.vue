<template>
<div >

    






        <div class="section1"  >
            <div class="contentsection1">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div style="padding-top: 15em; text-align: center;">
                                <h1>Benvingut!</h1>
                                 <div class="iniciasesio">
            <form  @submit.prevent="loginUser" class="form-signin">

                <img width="72" height="72" class="mb-4" alt="" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg">

                <div class="group">
                    <input type="text" name="nom" v-model="usuariologin.nom"  required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="labelregistrer">Nom</label>
                </div>

                <div class="group">
                    <input type="password" name="password" v-model="usuariologin.password" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="labelregistrer">Contrasenya</label>
                </div>




                <button type="submit" class="btn btn-lg ">
                    Inicia Sesió
                </button>
                  </form>
        </div>
                            </div>
                        </div>
                        <div class="col-md-6 text-center">
                            <div  style="padding-top: 15em; padding-bottom: 15em;">
                                <form @submit.prevent="addUser"  class="form-signin">

                                    <img width="72" height="72" class="mb-4" alt="" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg">
                                    <h1  class="h3 mb-3 font-weight-normal">Registra't</h1>
                                    <div class="group">
                                        <input type="text" name="nom" v-model="usuario.nom" >
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="labelregistrer">Nom</label>
                                    </div>
                                    <div class="group">
                                        <input type="text" name="email" v-model="usuario.email" >
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="labelregistrer">Email</label>
                                    </div>
                                    <div class="group">
                                        <input type="password" name="password" v-model="usuario.password" >
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="labelregistrer">Contrasenya</label>
                                    </div>
                                  



                                 
                                    <button class="btn btn-lg  btn-block" type="submit">Registra't</button>
                             </form>
                            </div>


                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section2">
           <div class="search text-center">

               <h1>Comunitat!</h1>

               <div class="row">
                   <div class="col-2"></div>
                   <div class="col-8">
  <input type="search" class="search-box form-control" v-model="filerusuario" />
  </div>
  <div class="col-2"></div>
</div>

<ul class="cards">
  
  <li  class="user-card-item" v-for="user of filterRecipie" >
    <div class="user-card" style="cursor:pointer;" ><router-link :to="{ name: 'user', params: { id: user._id }}">
      <div class="user-card-pb card__image--fence" v-bind:style="{ backgroundImage: 'url(' + user.image + ')' }"></div>
      <div class="user-card-img" v-bind:style="{ backgroundImage: 'url(' + user.portada + ')' }"></div>
      <div class="user-card-cont">
        <div class="user-card-title">{{user.nom}}</div>
       
        <p class="user-card-text">{{user.email}}</p>
      </div>
      </router-link>
    </div>   
    
    
  </li>
 
   
  
  
</ul>
</div>
        </div>
    </div>
  
   

  
</template>

<script>

class Usuario{
    constructor(nom,email,password) {
        this.nom= nom;
        this.email=email;
        this.password=password;
        
    }
}
class UsuarioLogin{
    constructor(nom,password) {
        this.nom= nom;
        
        this.password=password;
        
    }
}
export default {
    data(){
        return{
            usuario: new Usuario(),
            usuariologin: new UsuarioLogin(),
            usuarios:[],
            log:[],
            filerusuario : ''
        }
    },  computed: {
   filterRecipie () {
    const search = this.filerusuario.toLowerCase()
    if(search =='') return this.usuarios;
   	return this.usuarios.filter((query)=>{
           return query.nom == this.filerusuario.toLowerCase();
           
       });
   }
 },
    created(){
        this.getAllUsers();
        this. getLogin();
    },
    methods:{
        addUser(){
           fetch('/registro',{
               method: 'POST',
               body: JSON.stringify(this.usuario),
               headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.push({name: 'home'}))
          
            
            
        },
         loginUser(){
           fetch('/login',{
               method: 'POST',
               body: JSON.stringify(this.usuariologin),
               headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.push({name: 'home'}))
            
        },  getLogin(){
           console.log("HOLA");
            fetch('/sesion')
            .then(res => res.json())
            .then(data =>{
                this.log = data;
           console.log(this.log)
            } )
        },
        getAllUsers(){
            fetch('/users')
            .then(res => res.json())
            .then(data =>{
                this.usuarios = data;
             
            } )
        }
    }
}
</script>
