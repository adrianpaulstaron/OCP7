<template>

<h1 class="mt-5" >Fil d'Actualités</h1>
<button v-on:click="handlePosting" type="button" class="py-3 px-5 btn btn-dark mb-4 mt-3">Créer une nouvelle Publication</button>

<div class="d-flex flex-column align-items-center">
    <div class="card w-75 my-2 postcard" style="width: 18rem;" v-for="(post) in posts" :key="post.id">
        <div class="mr-2 mt-1 text-right">Posté par 
            <router-link class="username" :to="{ name: 'Profile', params: { id: post.user.id }}">{{post.user.firstname}} {{post.user.surname}}</router-link>, le  {{new Date(post.created_at).toLocaleDateString()}} à {{ getExactTime(post.created_at) }}
        </div>
        <img v-if="post.image_url" class="card-img-top image" :src="post.image_url" alt="image de la publication">
        <div class="card-body p-2">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-text text-left text-truncate">{{ post.text }}</p>
            <router-link class="btn btn-secondary" :to="{ name: 'PostDetails', params: { id: post.id } }">Consulter</router-link>
        </div>
    </div>
</div>

</template>

<script>
import axios from "axios";
import router from "../router";
import { mapState } from 'vuex'


export default {
    name: 'Timeline',
    components: {
    },
    computed: mapState({
        isLoggedin: 'isLoggedin',
        firstname: 'firstname',
        surname: 'surname',
        email: 'email',
        token: 'token'
    }),
    data() {
        return {
            posts:[]
        }
    },
    methods: {
        handlePosting: () => {
            router.push("/NewPost");
        },
        getPosts: function () {
            axios.get("http://localhost:3001/api/posts/", {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                this.posts = response.data
                this.info = response
                router.push("/timeline");
            })
        },
        getExactTime: function (timestamp) {
            var date = new Date(timestamp)
            var hour = date.getHours()
            var minute = (date.getMinutes()<10?'0':'') + date.getMinutes()
            return (hour + "h" + minute)
        }
    },
    // on appelle notre méthode getPosts avant le mount
    beforeMount(){
        this.getPosts()
    }
}
</script>

<style>
    .postcard{
        background-color: #fff9f4!important;
    }
    .username{
        color: #820000!important
    }
    .image {
        max-width: 300px;
        margin: auto;
        margin-top: 20px
    }
</style>