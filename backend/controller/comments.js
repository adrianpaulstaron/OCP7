// const Comment = require('../models/comment')
const db = require('../models');

exports.createComment = async (req, res, next) => {
    const newComment = req.body
    console.log(newComment)
    await db.comments.create({
    text: newComment.text,
    user_id: newComment.user_id,
    post_id: newComment.post_id
    }, { fields: ['text', 'user_id', 'post_id'] })
    .then(() => res.status(201).json({ message: 'Commentaire créé'}))
    .catch(error => res.status(400).json({error}));
}

exports.getComments = async (req, res, next) => {
    const postId = req.params.post_id
    let commentsArray = new Array()
    db.comments.findAll({ 
        where: {
            post_id: postId
        },
        include: {
            model: db.users,
            required: true,
            attributes: ["firstname", "surname", "id"]
        },
        limit: 100,
        // on organise les posts par ordre d'id décroissant, afin de les avoir du plus récent au plus vieux
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(rows) {
        rows.forEach(comment => {
            commentsArray.push(comment.dataValues)
        })
        res.status(200).json(commentsArray)
    })
    .catch(error => res.status(400).json({error}));
}

exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.id
    console.log("id = " + commentId)
    await db.comments.destroy({
      where: {
        id: commentId
      }
    })
    .then(() => res.status(201).json({ message: 'Commentaire effacé' }))
    .catch(error => res.status(400).json({error})); 
}