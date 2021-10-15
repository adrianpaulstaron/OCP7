const fs = require('fs');
const db = require('../models');


exports.createPost = async (req, res, next) => {
    var imageUrl = null
    if(req.file){
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    const newPost = req.body
    db.posts.create({
        title: newPost.title,
        text: newPost.text,
        user_id: newPost.user_id,
        image_url: imageUrl
    }, { fields: ['title', 'text', 'user_id', 'image_url'] })
    .then(() => res.status(201).json({ message: 'Post créé'}))
    .catch(error => res.status(400).json({error})); 
}

exports.getPosts = (req, res, next) => {
    db.posts.findAll({ limit: 10 }).then(function(rows) {
        let postsArray = new Array()
        rows.forEach(post => {
            postsArray.push(post.dataValues)
        })
    })
    .then(() => res.status(200).json({ message: 'Posts trouvés' }))
    .catch(error => res.status(400).json({error}));
}

exports.getOnePost = async (req, res, next) => {
    const postId = req.params.id
    console.log("post id : " + postId)
    await Post.findOne({
        where: {
        id: postId
        }
    })
    .then(post => {
        if(post){
        console.log("post: ", post)
        }
    })
    .then(() => res.status(201).json({ message: 'Post trouvé'}))
    .catch(error => res.status(400).json({error})); 
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id
    console.log("id = " + postId)
    await Post.destroy({
      where: {
        id: postId
      }
    })
    .then(() => res.status(201).json({ message: 'Post effacé' }))
    .catch(error => res.status(400).json({error})); 
}