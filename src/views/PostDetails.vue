<template>
    <div class="d-flex flex-column align-items-center">
        <div class="card w-75 my-2 postcard mb-5 mt-5" style="width: 18rem;">
            <div class="mr-2 mt-1 text-right">Posté par {{user.firstname}} {{user.surname}}, le  {{post.created_at}}</div>
            <img alt="image de la publication" v-if="post.image_url" class="card-img-top" :src="post.image_url" >
            <div class="card-body p-2">
                <h1 class="card-title">{{ post.title }}</h1>
                <p class="card-text text-left">{{ post.text }}</p>
                    <button v-if="isAdmin || (userId == user.id)" v-on:click="handleDeletePost" class="mx-auto w-15 btn btn-danger my-2">supprimer</button>
            </div>
        </div>
    </div>

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
    computed: mapState({
        userId: 'userId',
        firstname: 'firstname',
        isAdmin: 'isAdmin',
        token: 'token'
    }),
    data() {
        return {
            post: "",
            user: "",
            comments: "",
            newComment: ""
        }
    },
    methods: {
        getPost: function () {
            axios.get("http://localhost:3001/api/posts/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                this.post = response.data.post
                this.user = response.data.user
                this.post.created_at = new Date(this.post.created_at).toLocaleDateString()
            })
        },
        handleDeletePost: function () {
            Swal.fire({
            title: 'Suppression de la publication',
            text: "Êtes-vous certain de vouloir supprimer la publication ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: "Non"
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3001/api/posts/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
                .then(()=>{
                    router.push("/TimeLine");
                })
            }
            })
        }
    },
    // on appelle notre méthode getPosts avant le mount
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
</style>