const express = require('express')
const router = express.Router();
const usersCtrl = require('../controller/users');

router.post('/signup', usersCtrl.signup)
router.post('/login', usersCtrl.login)
router.get('/:id', usersCtrl.getOneUser)
router.delete('/:id', usersCtrl.deleteUser)

module.exports = router;