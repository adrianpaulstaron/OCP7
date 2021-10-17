<template>
    <div class="d-flex flex-column align-items-center">
        <div class="card w-75 my-2 postcard mb-5 mt-5" style="width: 18rem;">
            <div class="mr-2 mt-1 text-right">Posté par {{user.firstname}} {{user.surname}}, le  {{post.created_at}}</div>
            <img class="card-img-top" :src="post.image_url" >
            <div class="card-body p-2">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text text-left">{{ post.text }}</p>
                    <button v-if="isAdmin || (userId == user.id)" v-on:click="handleDeletePost" class="mx-auto w-15 btn btn-danger my-2">supprimer</button>
            </div>
        </div>
    </div>

    <form @submit.prevent="handlePosting" class="d-flex flex-column align-items-center">
        <div class="form-group w-75">
            <textarea required v-model="newComment" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="submit" class="py-3 px-5 mb-5 w-15 btn btn-success my-2">Commenter</button>
    </form>

    <div class="d-flex flex-column align-items-center" v-for="(comment) in comments" :key="comment.id">
        <div class="comment card w-75 my-2" style="width: 18rem;">
            <div class="card-body p-2">
                <div class="mb-3 text-right">Posté par {{comment.user.firstname}} {{comment.user.surname}}, le  {{comment.created_at}}</div>
                <p class="card-text text-left">{{comment.text}}</p>
                <button v-if="isAdmin || (userId == comment.user.id)" v-on:click="handleDeleteComment(comment.id)" class="mx-auto w-15 btn btn-danger my-2">supprimer</button>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import { mapState } from 'vuex'
import router from "../router";
import Swal from "sweetalert2";

export default {
    name: 'PostDetails',
    components: {
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
        getComments: function () {
            axios.get("http://localhost:3001/api/comments/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                this.comments = response.data
                this.comments.forEach(comment => {
                comment.created_at = new Date(comment.created_at).toLocaleDateString()
                })
            })
        },
        handlePosting: function () {
            axios.post("http://localhost:3001/api/comments/", {
                text : this.newComment,
                post_id: this.$route.params.id,
                user_id: this.userId
            },
            {headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                this.getComments(),
                this.resetInput()
            })
            .catch(error => { console.log(error) })
        },
        resetInput() {
            this.newComment = ""
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
                .then(()=> {
                Swal.fire(
                'Publication effacée.',
                )
                .then(()=>{
                    router.push("/TimeLine");
                })
                }) 
            }
            })
        },
        handleDeleteComment: function (commentId) {
            Swal.fire({
            title: 'Suppression du commentaire',
            text: "Êtes-vous certain de vouloir supprimer le commentaire ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: "Non"
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3001/api/comments/" + commentId)
                .then(()=> {
                Swal.fire(
                'Commentaire effacé.',
                )
                .then(()=>{
                   this.getComments()
                })
                }) 
            }
            })
        }
    },
    // on appelle notre méthode getPosts avant le mount
    beforeMount(){
        this.getPost(),
        this.getComments()
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