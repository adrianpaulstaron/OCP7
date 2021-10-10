const User = require('../models/user')
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
    const newUser = req.body
    bcrypt.hash(req.body.password, 10)
    .then (async hash => {
      await User.create({
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email,
        password: hash,
      }, { fields: ['firstname', 'surname', 'email', 'password'] });
    })
    .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
    .catch(error => res.status(400).json({error})); 
}

exports.login = async (req, res, next) => {
  const user = req.body
  User.findAll({
    where: {
      email: user.email
    }
  })
  .then(user => {
    // lorsque l'utilisateur n'est pas trouvé, sequelize renvoie un string vide
    if(user != ""){
      console.log("user: " + user)
      res.status(200).json({ message: 'Utilisateur trouvé'})
    }else{
      res.status(200).json({ error: 'Utilisateur non trouvé'})
    }
  })
  .catch(error => res.status(400).json({error})); 
}

exports.getOneUser = async (req, res, next) => {
    
}

exports.deleteUser = async (req, res, next) => {
    
}