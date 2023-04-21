const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Product extends Model {

    static async findProduct(id){
        try {
            const item = await Product.findByPk(id)
            if(item.id == id){
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
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
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
  sold: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  shippingDate: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  sequelize, 
  modelName: 'Product'
});

module.exports = Product