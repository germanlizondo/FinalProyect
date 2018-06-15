<template>
    <div >
        <div class="container text-center" style="padding-top:5em;">
            
        <h1>SETTINGS</h1>
        <div class="row">
        <div class="col-md-6">
         <form @submit.prevent="editaUsuario(log._id)">
  <div class="form-group">
    
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Edita Nom" v-model="usereditad.nom" required>
  </div>
  <div class="form-group">
    
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Edita email" v-model="usereditad.email" required>
  </div>
 <div class="form-group">
    
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Edita Contrasenya" v-model="usereditad.password" required>
  </div>
  
  <button  type="submit" class=" actualiza-boton">Guarda Canvis</button>
</form>
</div>
  <div class="col-md-6">
         <form @submit.prevent="editImage(log._id)">
             <h3>Imatge de perfil</h3>
  <select id="gender" class="form-control"  v-model="usereditad.image">
  <option value="/img/man.jpg">Default</option>
  <option value="/img/tigre.jpg">Tigre</option>
  <option value="/img/flower.jpg">Flower</option>
  <option value="/img/thewitcher.jpg">The Witcher</option>
</select>  <br>
  <h3>Imatge de portada</h3>
 <select id="gender" class="form-control"  v-model="usereditad.portada">
  <option value="/img/space.jpg">Space</option>
  <option  value="/img/nature.jpg" >Nature</option>
  <option  value="/img/sea.jpg">Sea</option>
</select> 
  
  <button  type="submit" class=" actualiza-boton">Guarda Canvis</button>
</form>
</div>
<button @click="eliminaUsuario(log._id)" type="button" class="elimina-boton">Elimina Usuari</button>
</div>
    </div>
    </div>
</template>

<script>

class UserEditad{
    constructor(nom,email,password,portada,image) {
        this.nom= nom,
     this.email = email,
     this.password= password,
     this.portada=portada,
     this.image = image
    }
}

export default {
    data(){
        return{
            usereditad: new UserEditad(),
          
        
              log:JSON,
        }
    },
    created(){
       
      this.getLogin();
    },
    methods:{
           getLogin(){
      
            fetch('/sesion')
            .then(res => res.json())
            .then(data =>{
                this.log = data;
               
           console.log(this.log)
            } )
        },
       editaUsuario(id){
           console.log(id);
          fetch('/editauser/'+id,{
               method: 'PUT',
                body: JSON.stringify(this.usereditad),
                headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.push({ name: 'user', params: { id: id }}))
        },
          editImage(id){
           console.log("id: "+id);
          fetch('/editImage/'+id,{
               method: 'PUT',
                body: JSON.stringify(this.usereditad),
                headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.push({ name: 'user', params: { id: id }}))
        },
          eliminaUsuario(id){
             
              if(confirm("Estas segur de eliminar?")){
                 fetch('/eliminauser/'+id,{
               method: 'DELETE',
                headers:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           }).then(this.$router.push({name: 'intro'}))
              }
              
           console.log(id);
        
        }
     
     
    }
}
</script>
