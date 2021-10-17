<template>

<h1 class="mt-5" >Fil d'Actualités</h1>
<button v-on:click="handlePosting" type="button" class="py-3 px-5 btn btn-dark mb-4 mt-3">Créer une nouvelle Publication</button>

<div class="d-flex flex-column align-items-center">
    <div class="card w-75 my-2 postcard" style="width: 18rem;" v-for="(post) in posts" :key="post.id">
        <div class="mr-2 mt-1 text-right">Posté par {{post.user.firstname}} {{post.user.surname}}, le  {{new Date(post.created_at).toLocaleDateString()}}</div>
        <img v-if="post.image_url" class="card-img-top" :src="post.image_url" alt="image de la publication">
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
    // head: {
    //     lang:"fr"
    // },
    // metaInfo: {
    //     htmlAttrs: {
    //     lang: 'fr',
    //     amp: true
    //     }
    // },
    methods: {
        handlePosting: () => {
            router.push("/NewPost");
        },
        getPosts: function () {
            axios.get("http://localhost:3001/api/posts/", {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                this.posts = response.data
                console.log(response.data)
                this.info = response
                router.push("/timeline");
            })
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
</style>