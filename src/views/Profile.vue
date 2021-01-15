<template>
<v-app>
  <loader v-if="dialog.value ===true"></loader>
  <v-row justify="center" class="mt-14" v-if="user">
    <v-col cols="10" md="8" lg="4" >
      <v-card max-width="344">
        <v-img :src="user.photoUrl" contain height="180px" class="grey"></v-img>
        <v-card-title class="justify-center">
          {{user.name}}
        </v-card-title>
        <v-card-subtitle>
          Email : {{user.email}} <br>
          Id : {{user.id}}
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-file-input accept="image/*" label="Escoger" color="primary" ref="file"
                        @change="handleImage" @click:clear="clearInput">
          </v-file-input>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!imageUrlTemp || dialog.value===true" @click="onUploadImage">
            Subir Imagen
          </v-btn>
        </v-card-actions>
        <v-img v-if="imageUrlTemp !==null" :src="imageUrlTemp" max-width="344" max-height="180">
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import Loader from "@/components/Loader";
export default {
name: "Profile",
components: {
  Loader
},
computed:{
  ...mapGetters({
    user: 'user'
  }),
  ...mapState(['dialog'])
},
methods: {
  ...mapActions(['uploadImage']),
  ...mapMutations(['setImage']),
  handleImage(event){
    if (!event) {
      return;
    }
    /*this.file = event*/
    this.createImage(event)
    this.setImage(event)

  },
  createImage(fileObject){
    const reader = new FileReader()
    reader.onload = (e) =>{
      this.imageUrlTemp = e.target.result
      console.log(this.imageUrlTemp)
    }
    reader.readAsDataURL(fileObject)
  },
  clearInput(){
    this.setImage(null)
    this.imageUrlTemp = null
    console.log('se limpio')
    console.log(this.imageUrlTemp)
  },
  onUploadImage(){
    this.uploadImage()
    this.imageUrlTemp = null
    this.$refs.file.value=null
  }
},
data(){
  return {
    imageUrlTemp: null
  }
}
}
</script>