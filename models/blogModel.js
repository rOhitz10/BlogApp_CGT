const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Blog = sequelize.define("Blogs", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Blog;
