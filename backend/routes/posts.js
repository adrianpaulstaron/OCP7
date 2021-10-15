const express = require('express')
const router = express.Router();
const postsCtrl = require('../controller/posts');
const multer = require('../middleware/multer-config');

router.get('/', postsCtrl.getPosts)
router.get('/:id', postsCtrl.getOnePost)
router.delete('/:id', postsCtrl.deletePost)
router.post('/', multer, postsCtrl.createPost)

module.exports = router;