const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Product = require('../models/Product')


class User extends Model {

    static async findUser(username, password){
        try {
            const user = await User.findByPk(username)
            if(user && user.password === password){
                return user
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

}

User.init({
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  sequelize, 
  modelName: 'User'
});

User.hasMany(Product, {
  foreignKey: 'username'
});
Product.belongsTo(User)

module.exports = User