const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
  User.findOne({
    where: {
      email: user.email
    }
  })
  .then(user => {
    if(user){
      console.log("user: ", user)
      // on utilise bcrypt pour comparer les mots de passe hachés respectivement entré par l'utilisateur et stocké en base
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
            // si le mot de passe est mauvais, on renvoie une erreur adaptée
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe erroné'});
            }
            res.status(200).json({
                // si le mot de passe est bon, on envoie un token d'identification au client grâce à jsonwebtoken, dans lequel on met l'user id
                userId: user.id,
                token: jwt.sign(
                    // le token contient l'user id, la clef (chaîne de caractères), et la durée avant expiration du token
                    { userId: user.id },
                    process.env.CRYPT_KEY,
                    { expiresIn: '24h'}
                )
            });
        })
    }else{
      res.status(200).json({ error: 'Utilisateur non trouvé'})
    }
  })
  .catch(error => res.status(400).json({error})); 
}

exports.getOneUser = async (req, res, next) => {
  const userId = req.params.id
  console.log("id = " + userId)
  await User.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    if(user){
      console.log("user: ", user)
    }
  })
  .then(() => res.status(201).json({ message: 'Utilisateur trouvé'}))
  .catch(error => res.status(400).json({error})); 
}

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id
  console.log("id = " + userId)
  await User.destroy({
    where: {
      id: userId
    }
  })
  .then(() => res.status(201).json({ message: 'Utilisateur effacé'}))
  .catch(error => res.status(400).json({error})); 
}