'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  // on filtre les fichiers js dans models
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // on require un fichier js et on le met dans une constante model
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // on range dans l'indice qui correspond au nom du model, le model
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users.js")(sequelize, Sequelize)
db.posts = require("./posts.js")(sequelize, Sequelize)
db.comments = require("./comments.js")(sequelize, Sequelize)

db.comments.belongsTo(db.posts, {foreignKey: "post_id"})
db.comments.belongsTo(db.users, {foreignKey: "user_id"})
db.posts.belongsTo(db.users, {foreignKey: "user_id"})

module.exports = db;
