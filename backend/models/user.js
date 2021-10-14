const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_HOST_PORT,
  dialect: 'mysql'
});

module.exports = 
    sequelize.define('users', {
        firstname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        }, {
            timestamps: false
        }
    )