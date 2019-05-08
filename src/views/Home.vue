<template>
  <b-container>
<div class="row mt-5"> 
        <div class="col-md-12">


          

          <b-spinner variant="primary" label="Spinning" v-if="isLoading"></b-spinner>

  <div class="chat-box">
    <p v-for="(item, index) in posts" class="mb-4">
      <strong>{{ item.nama }}</strong> 
      <small style="float: right"><i class="text-muted">{{ item.tanggal | moment("dddd, Do MMMM YYYY H:mm") }}</i></small> 
      <br>
        {{ item.isi }}
    </p>
  </div>
          
  <br> 

  <b-form @submit="onSubmit" @reset="onReset">
            

    
        <b-form-textarea id="exampleInput2"
                      type="text"
                      v-model="form.isi" 
                      rows="3" v-on:keyup.13="onSubmit"
                    max-rows="6"  class="mb-2"
                      placeholder="ketik pesan">
        </b-form-textarea>
     
       
      <p class="text-right">
        <b-button type="submit" variant="primary" class="mb-4">Kirim</b-button> 
      </p>
    </b-form> 
              
                
              

              

              
            

             

        </div>

         

    </div>

  </b-container>
    
</template>

<script>
     import firebase from "firebase"; 

export default {
  name: 'Home',
   
  
  data () {
    return { 
         
          isLoading:false, 
    posts: [],
        form: {
                nama: "Guest",
                isi:'' 
              }, 
    }
  },
   created(){

    var user = firebase.auth().currentUser; 

    if(user){
      this.form.nama = user.displayName
      this.form.photoURL = user.photoURL
    }
    

    console.log("created")
    var listNews = firebase.database().ref().child('posts');

     listNews.once("value", notes => {
      notes.forEach(note => {
        this.posts.push({
          id: note.ref.key,
          nama: note.child("nama").val(),
          isi: note.child("isi").val(),
          tanggal: note.child("tanggal").val()
        });
      });
    });

     /* eslint-disable no-console */
    // value = snapshot.val() | id = snapshot.key
    listNews.on("child_added", snapshot => {
     // console.log("note was added: ", { ...snapshot.val(), id: snapshot.key });
      this.posts.push({
          id: snapshot.key,
          nama: snapshot.val().nama, 
          isi: snapshot.val().isi ,
          tanggal: snapshot.val().tanggal 
        });

      var container = this.$el.querySelector(".chat-box");
      container.scrollTop = container.scrollHeight;
      console.log("susu")
    });
 
    listNews.on("child_removed", snapshot => {
      const deletedNote = this.posts.find(note => note.id === snapshot.key);
      console.log("note was removed: ", deletedNote);
 
      const index = this.posts.indexOf(deletedNote);
      this.posts.splice(index, 1);
      this.index = this.index === 0 ? 0 : index - 1;
    });
 
    listNews.on("child_changed", snapshot => {
      const updatedNote = this.posts.find(note => note.id === snapshot.key);
      updatedNote.isi = snapshot.val().isi; 
      console.log("note was updated: ", updatedNote);
    });
    /* eslint-enable no-console */


   },
  methods:{
    modeAddNews(){
        
    },
     onSubmit (evt) {
        evt.preventDefault();
        
        if(this.writeNewPost(this.form.nama,this.form.isi,"tanggal")){
            this.resetForm();
           
        }


    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.resetForm();
      
    },
    resetForm(){
        this.form.title = '';
        this.form.isi = ''; 
    },
     
    writeNewPost(name, body,tanggal) { 

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = { 
            nama: name,
            isi: body,
            tanggal: firebase.database.ServerValue.TIMESTAMP
          };
  
        return firebase.database().ref().update(updates);
    }

      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-box{
  max-height: 400px;
  overflow: auto;
  border:1px solid #ccc;
  padding:20px;
}

.chat-box p{
  background-color: #fafafa;
  padding: 10px;
  border:1px solid #eaeaea;
}
</style>
