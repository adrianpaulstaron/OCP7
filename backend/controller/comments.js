const Comment = require('../models/comment')

exports.createComment = async (req, res, next) => {
    const newComment = req.body
    console.log(newComment)
    await Comment.create({
    text: newComment.text,
    user_id: newComment.user_id,
    post_id: newComment.post_id
    }, { fields: ['text', 'user_id', 'post_id'] })
    .then(() => res.status(201).json({ message: 'Commentaire créé'}))
    .catch(error => res.status(400).json({error}));
}

exports.getComments = async (req, res, next) => {
    const postId = req.params.post_id
    await Comment.findAll({
        where: {
        post_id: postId
        }
    })
    .then(comments => {
        console.log("comments: ", comments)
    })
    .then(() => res.status(200).json({ message: 'Commentaires trouvés' }))
    .catch(error => res.status(400).json({error}));

}

exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.id
    console.log("id = " + commentId)
    await Comment.destroy({
      where: {
        id: commentId
      }
    })
    .then(() => res.status(201).json({ message: 'Commentaire effacé' }))
    .catch(error => res.status(400).json({error})); 
}