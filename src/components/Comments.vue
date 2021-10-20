<template>
    <form @submit.prevent="handlePosting" class="d-flex flex-column align-items-center">
        <div class="form-group w-75">
            <label class="d-none" for="textOfComment">Texte de votre commentaire</label>
            <textarea id="textOfComment" placeholder="Tapez votre commentaire ici" required v-model="newComment" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="py-3 px-5 mb-5 w-15 btn btn-dark my-2">Commenter</button>
    </form>

    <div class="d-flex flex-column align-items-center" v-for="(comment) in comments" :key="comment.id">
        <div class="comment card w-75 my-2" style="width: 18rem;">
            <div class="card-body p-2">
                <div class="mb-3 text-right">Posté par <router-link class="username" :to="{ name: 'Profile', params: { id: comment.user.id }}">{{comment.user.firstname}} {{comment.user.surname}}</router-link>, le {{comment.created_at}} à {{comment.hour}}h{{comment.minute}}</div>
                <p class="card-text text-left">{{comment.text}}</p>
                <button v-if="isAdmin || (userId == comment.user.id)" v-on:click="handleDeleteComment(comment.id)" class="mx-auto w-15 btn btn-danger my-2">supprimer</button>
            </div>
        </div>
    </div>

</template>
<script>

import axios from "axios";
import { mapState } from 'vuex'
import Swal from "sweetalert2";

export default {
    // on exporte notre composant avec le nom "Comments"
    name: 'Comments',
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
        getComments: function () {
            axios.get("http://localhost:3001/api/comments/" + this.$route.params.id, {headers: {Authorization: "Bearer " + this.token}})
            .then((response) => {
                    this.comments = response.data
                    console.log(response.data)
                    this.comments.forEach(comment => {
                        var commentDate = new Date(comment.created_at)
                        comment.hour = commentDate.getHours()
                        comment.minute = (commentDate.getMinutes()<10?'0':'') + commentDate.getMinutes()
                        comment.created_at = commentDate.toLocaleDateString() 
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
        handleDeleteComment: function (commentId) {
            Swal.fire({
            title: 'Suppression du commentaire',
            text: "Êtes-vous certain de vouloir supprimer le commentaire ?",
            showCancelButton: true,
            confirmButtonColor: '#b80000',
            cancelButtonColor: '#424242',
            confirmButtonText: 'Oui',
            cancelButtonText: "Non",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3001/api/comments/" + commentId)
                .then(()=>{
                    this.getComments()
                })
            
            }
            })
        },
    },
    beforeMount(){
        this.getComments()
    }

}
</script>
<style>
label.swal2-checkbox{
    height: 0px !important;
    margin: 0px
}
.swal2-checkbox {
    visibility:hidden!important;
    margin: 0px;
}
</style>