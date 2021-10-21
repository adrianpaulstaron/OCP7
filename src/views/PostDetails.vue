<template>
    <!-- on crée une card pour le post -->
    <div class="d-flex flex-column align-items-center">
        <div class="card w-75 my-2 postcard mb-5 mt-5" style="width: 18rem;">
            <div class="mr-2 mt-1 text-right">Posté par <router-link class="username" :to="{ name: 'Profile', params: { id: user.id }}">{{user.firstname}} {{user.surname}}</router-link>, le {{post.created_at}} à {{post.hour}}h{{post.minute}}</div>
            <img id="postImage" alt="image de la publication" v-if="post.image_url" class="card-img-top" :src="post.image_url" >
            <div class="card-body p-2">
                <h1 class="card-title">{{ post.title }}</h1>
                <p class="card-text text-left">{{ post.text }}</p>
                    <button v-if="isAdmin || (userId == user.id)" v-on:click="handleDeletePost" class="mx-auto w-15 btn btn-danger my-2">supprimer</button>
            </div>
        </div>
    </div>
    <!-- on appelle le composant Comments -->
    <Comments></Comments>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex'
import router from "../router";
import Swal from "sweetalert2";
import Comments from '@/components/Comments.vue'

export default {
    name: 'PostDetails',
    components: {
        Comments
    },
    // on récupère les données du store
    computed: mapState({
        userId: 'userId',
        firstname: 'firstname',
        isAdmin: 'isAdmin',
        token: 'token'
    }),
    // on initialise le data dont on va avoir besoin
    data() {
        return {
            post: "",
            user: "",
            comments: "",
            newComment: ""
        }
    },
    methods: {
        // on crée une méthode getPost qui va chercher un post
        getPost: function () {
            // elle requête la route get posts, avec en paramères l'id du post qu'on a récupéré en url, et on mets en header le token qu'on a récupéré du store
            axios.get("http://localhost:3001/api/posts/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                // on met le post dans le data post qu'on a créé plus tôt, et l'user dans le data user
                this.post = response.data.post
                this.user = response.data.user
                // on édite le created_at pour avoir une date au format français
                var postTimestamp = new Date(this.post.created_at)
                this.post.hour = postTimestamp.getHours()
                this.post.minute = (postTimestamp.getMinutes()<10?'0':'') + postTimestamp.getMinutes()
                this.post.created_at = postTimestamp.toLocaleDateString()
            })
        },
        // on crée une fonction pour effacer un post
        handleDeletePost: function () {
            // on commence par afficher une alerte à l'aide du plugin swal
            Swal.fire({
            title: 'Suppression de la publication',
            text: "Êtes-vous certain de vouloir supprimer la publication ?",
            showCancelButton: true,
            confirmButtonColor: '#b80000',
            cancelButtonColor: '#424242',
            confirmButtonText: 'Oui',
            cancelButtonText: "Non"
            }).then((result) => {
            if (result.isConfirmed) {
                // si l'utilisateur a confirmé la suppression dans l'alterte, on va sur la route delete posts
                axios.delete("http://localhost:3001/api/posts/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
                .then(()=>{
                    // une fois le post effacé, on redirige sur le fil d'actualités
                    router.push("/TimeLine");
                })
            }
            })
        }
    },
    // on appelle notre méthode getPosts avant le mount, afin de charger la page avec le post dedans
    beforeMount(){
        this.getPost()
    }
}

</script>

<style>
    .comment{
        background-color: #f5e4d9!important;
    }
    .postcard{
        background-color: #fff9f4!important;
    }
    .username{
        color: #820000!important
    }
</style>