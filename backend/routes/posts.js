const express = require('express')
const router = express.Router();
const postsCtrl = require('../controller/posts');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', auth, postsCtrl.getPosts)
router.get('/:id', auth, postsCtrl.getOnePost)
router.delete('/:id', postsCtrl.deletePost)
router.post('/', auth, multer, postsCtrl.createPost)

module.exports = router;