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
    let postsArray = new Array()
    db.posts.findAll({ 
        include: {
            model: db.users,
            required: true,
            attributes: ["firstname", "surname", "id"]
        },
        limit: 100,
        // on organise les posts par ordre d'id décroissant, afin de les avoir du plus récent au plus vieux
        order: [
            ['id', 'DESC']
        ],
        
    })
    .then(function(rows) {
        rows.forEach(post => {
            postsArray.push(post.dataValues)
        })
        res.status(200).json(postsArray)
    })
    .catch(error => res.status(400).json({error}));
}

exports.getOnePost = async (req, res, next) => {
    // on récupère les paramètres
    const postId = req.params.id
    // on fait un findOne du post
    await db.posts.findOne({
        where: {
        id: postId
        }
    })
    // lorsque l'on a trouvé le post, on cherche les infos de l'utilisateur qui l'a créé
    .then(post => {
        if(post){
            post = post.dataValues
            // on fait un findOne sur les users where l'id correspond à la clef étrangère user_id qu'on a dans le post
            db.users.findOne({ where: {id: post.user_id} })
            .then(user => {
                // on crée un objet littéral
                let postInfos = {}
                // on met sous forme de clef-valeur l'utilisateur et le post dedans
                postInfos.user=user
                postInfos.post=post
                res.status(200).json(postInfos)
            })
        }
    })
    .catch(error => res.status(400).json({error})); 
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id
    db.posts.findOne({ where: {id: postId}})
    .then(result => {
        post = result.dataValues
        if(post.image_url){
            // pour supprimer un post, on veut aussi supprimer son image, on prend donc l'url de l'image stocké en base que l'on split sur le dossier /images/. On obtient donc un tableau dont l'index 0 est le chemin moins /images/, et l'index 1 est le nom de l'image
            const filename = post.image_url.split('/images/')[1];
            // on supprime donc l'image dont on a obtenu le nom de fichier ainsi
            fs.unlink(`images/${filename}`, () => {
                db.posts.destroy({
                where: {
                  id: postId
                }
              })
              .then(() => res.status(200).json({ message: 'Post effacé' }))
              .catch(error => res.status(400).json({error})); 
            })
        }else{
            db.posts.destroy({
                where: {
                  id: postId
                }
              })
              .then(() => res.status(200).json({ message: 'Post effacé' }))
              .catch(error => res.status(400).json({error})); 
        }
        
        
    })
    
}