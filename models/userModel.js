const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = User;
