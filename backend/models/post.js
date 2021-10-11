
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_HOST_PORT,
  dialect: 'mysql'
});

module.exports = 
    sequelize.define('posts', {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
        }, {
            timestamps: false
        }
    )