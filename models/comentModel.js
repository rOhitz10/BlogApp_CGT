const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define('comments',{
content:{
 type:DataTypes.TEXT,
 allowNull:false
}
})

module.exports = Comment;