<template>
    <div id="app">






         
            <!-- <div class="sidenav">
        <nav class="navbar navbar-dark bg-dark sidebar">

            <div class="exit">

                <i id="x" class="fas fa-times fa-2x"></i>

            </div>




        </nav>
        <div class="routing" style="padding-top:3em;">
<router-link to="/home"><i class="fas fa-home"></i><h3>HOME</h3></router-link>

<router-link to="/user"><i class="fas fa-user-circle"></i><h3>PROFILE</h3></router-link>




        </div>
      
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


      


    </div> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Xarxa Social
</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"> <router-link to="/home"><i class="fas fa-home"></i>Home</router-link> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link :to="{ name: 'user', params: { id: log._id }}">User</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/"><i class="fas fa-sign-out-alt"></i></router-link></a>
      </li>
    
     
    </ul>
    
  </div>
</nav>
   

<transition name="router-anim"     enter-active-class="animated bounceInLeft"
    leave-active-class="animated bounceOutRight">
 <router-view></router-view>
</transition>
    </div>
     
</template>


<script>


export default {
    data(){
        return{
           
            log:JSON,
            sesion: Boolean
        }
    },
    created(){
       
        this. getLogin();
    },
    methods:{
        getLogin(){
          
            fetch('/sesion')
            .then(res => res.json())
            .then(data =>{
                this.log = data;
              
          
            } )
        },
     
    }
}
</script>
