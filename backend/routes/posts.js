const express = require('express')
const router = express.Router();
const postsCtrl = require('../controller/posts');

router.get('/', postsCtrl.getPosts)
router.get('/:id', postsCtrl.getOnePost)
router.delete('/:id', postsCtrl.deletePost)
router.post('/', postsCtrl.createPost)

module.exports = router;