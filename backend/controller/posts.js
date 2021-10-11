const Post = require('../models/post')

exports.createPost = async (req, res, next) => {
    const newPost = req.body
    await Post.create({
    title: newPost.title,
    text: newPost.text,
    user_id: newPost.user_id
    }, { fields: ['title', 'text', 'user_id'] })
    .then(() => res.status(201).json({ message: 'Post créé'}))
    .catch(error => res.status(400).json({error})); 
}

exports.getPosts = async (req, res, next) => {
    await Post.findAll()
    .then(posts => {
        console.log("posts: ", posts)
    })
    .then(() => res.status(201).json({ message: 'Posts trouvés' }))
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