const express = require('express')
const router = express.Router();
const commentsCtrl = require('../controller/comments');
const auth = require('../middleware/auth');

router.get('/:post_id', auth, commentsCtrl.getComments)
router.delete('/:id', commentsCtrl.deleteComment)
router.post('/', auth, commentsCtrl.createComment)

module.exports = router;