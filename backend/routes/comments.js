const express = require('express')
const router = express.Router();
const commentsCtrl = require('../controller/comments');

router.get('/:post_id', commentsCtrl.getComments)
router.delete('/:id', commentsCtrl.deleteComment)
router.post('/', commentsCtrl.createComment)

module.exports = router;