<template>
    <b-container>
    	<div class="row mt-5">

        <div class="col-md-4">

        <div class="text-center">


            <!-- <img src="@/assets/profil.jpg" class="img-fluid w-100 mb-3" /> -->
            <img :src="form.photoURL" class="img-fluid w-100 mb-3" />

            <div class="text-center">
                <h2>{{ form.nama }}</h2>
                <p>{{ user.email }}</p>
                <p>
                    <button @click="logout">Logout</button>
                </p>
            </div> 
        </div>  

      </div>
      <div class="col-md-8">
        
         

        
    
 

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <h2>Update your profile</h2>
      <b-form-group id="exampleInputGroup1"
                    label="Nama"
                    label-for="exampleInput1"
                    >
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="form.nama"
                      required
                      placeholder="Nama Anda">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Foto URL"
                    label-for="exampleInput2"
                    >
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.photoURL"
                      required
                      placeholder="URL">
        </b-form-input>
      </b-form-group> 
       
      <b-button type="submit" variant="primary">Simpan</b-button> 
    </b-form>
 

        
    


      </div>

    
    
    
  </div> 
    </b-container>
</template>

<script>

import firebase from "firebase";

export default {
	name: 'profile',

    data(){
        return {
            user:[],
            show:true,
            form: {
                nama: '',
                photoURL:''
              }, 
        }
    },
 
    created(){
        this.user = firebase.auth().currentUser; 

        this.form.nama = this.user.displayName
        this.form.photoURL = this.user.photoURL
    },
   
  	methods: {
        onSubmit (evt) {
        evt.preventDefault();
       // alert(JSON.stringify(this.form));

         

        var user = firebase.auth().currentUser;
        console.log(user)

        user.updateProfile({
          displayName: this.form.nama,
          photoURL: this.form.photoURL
        }).then(function() { 
          alert('Update successful.')
        }).catch(function(error) {
          alert("An error happened.")
        });



    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.password = ''; 
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
  		logout: function(){

        this.$swal({
                   title: 'keluar sekarang?',
                    text: "keluar dari sistem, beberapa menu memerlukan keanggotaan",
                    type: 'question',
                    showCancelButton: true,
                    //confirmButtonColor: '#3085d6',
                    //cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Batal',
                    //confirmButtonClass: 'btn btn-success',
                    //cancelButtonClass: 'btn btn-danger',
                    //buttonsStyling: false,
                    showLoaderOnConfirm: true,
                    reverseButtons: false,
                    closeOnConfirm: false 
                }).then((result) => {
                    
                  if (result.value) {

                    firebase.auth().signOut().then(() => {
                      this.$auth.destroy();
                      this.$router.replace('login')
                    });

                    
                     

                    /*this.$swal({
                        type:'success',
                        title: 'Deleted!',
                        showConfirmButton: false,
                        text: 'Your file has been deleted.',
                        timer: 2000 
                    })*/

                  // result.dismiss can be 'cancel', 'overlay',
                  // 'close', and 'timer'
                  }  else if (result.dismiss === 'cancel') {
                   /* this.$swal(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    )*/
                  }
                }) 


  			
  		}
  	}
     
}
</script>
