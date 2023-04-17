const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Product extends Model {

    static async findUser(name){
        try {
            const item = await Product.findByPk(name)
            if(item.name == name){
                return item
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

}

Product.init({
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  sequelize, 
  modelName: 'Product'
});

module.exports = Product