const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Product = require('../models/Product')
const User = require('../models/Product')


class UserProducts extends Model {

  
}

UserProducts.init({
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize, 
  modelName: 'User'
});

User.belongsToMany(Product, {through: {model: "UserProducts", unique: false}, as: "products"});
Product.belongsToMany(User, {through: {model: "UserProducts", unique: false}, as: "users"});
module.exports = User