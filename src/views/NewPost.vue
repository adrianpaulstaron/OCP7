<template>
<h1 class="mt-5">Création d'une nouvelle publication en tant que {{ firstname }}</h1>
<div class="d-flex justify-content-center">
    <form @submit.prevent="handlePosting" class="w-75">
        <div class="form-group">
            <label for="exampleFormControlInput1">Titre</label>
            <input v-model="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="titre">
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Texte</label>
            <textarea v-model="text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="input-group mb-3">
        <!-- <div class="custom-file">
            <input type="file" class="custom-file-input" @change="onFileChange" id="inputGroupFile02">
            <label class="custom-file-label" for="inputGroupFile02">Choisissez une image</label>
        </div> -->
        </div>
        <!-- on vérifie si on a une image -->
        <div v-if="!image">
            <h2>Selectionner une image (png, jpg, jpeg ou gif)</h2>
            <!-- on n'autorise que certains fichiers, et on précise qu'on appelle la fonction onFileChange lorsque l'on change le fichier  -->
            <input class="btn btn-info my-2" accept="image/png, image/jpeg, image/gif, image/jpg" type="file" @change="onFileChange">
        </div>
        <div v-else>
            <img class="preview" :src="image" />
            <button class="btn btn-danger my-2" @click="removeImage">Supprimer l'image</button>
        </div>
        <button type="submit" class="btn btn-success my-2">Poster</button>
    </form>
</div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapState } from 'vuex'

export default {
    name: 'NewPost',
    data() {
      return {
        title:"",
        text:"",
        image:"",
        file:""
      }
    },
    computed: mapState({
        user_id: 'userId',
        firstname: 'firstname',
        token: 'token'
    }),
    methods: {
        handlePosting: function () {
            // pour envoyer une image, on a besoin d'un formdata
            let data = new FormData();
            // on met nos clefs-valeur
            data.append('user_id', this.user_id)
            data.append('title', this.title)
            data.append('text', this.text)
            data.append('image', this.file)
            // on fait notre requête avec le formdata en deuxième argument
            axios.post("http://localhost:3001/api/posts/", data, {headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                router.push("/TimeLine");
            })
        },
        // on a un on file change afin de déclencher ce comportement au chargement du fichier
        onFileChange(e) {
            // on stocke le contenu du fichier dans une variable files
            var files = e.target.files || e.dataTransfer.files;
            // si il n'y a pas de fichier, on s'arrête là
            if (!files.length)
                return;
            // s'il y a un fichier, on envoie le fichier à la fonction createImage
            this.createImage(files[0]);
            // pour notre futur envoi en bdd, on met le fichier dans la this.file (donc dans data)
            this.file = e.target.files[0]
        },
        // on définit une méthode createImage, pour l'affichage de l'aperçu
        createImage(file) {
            // on crée un file reader
            var reader = new FileReader();
            // on crée un écouteur d'évènement qui met ce que nous retourne le file reader dans this.image
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            // on lance la lecture du fichier par le file reader
            reader.readAsDataURL(file);
        },
        // on crée une fonction qui vide this.image, qu'on appelle lorsque l'on clique sur le bouton correspondant
        removeImage: function () {
            this.image = '';
        }
    },
}
</script>

<style>
    .preview {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
    }
</style>