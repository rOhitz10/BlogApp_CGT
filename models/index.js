const sequelize = require("../config/db");
const Blog = require("./blogModel");
const Comment = require("./comentModel");
const User = require("./userModel");

// Associations
User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
Blog.hasMany(Comment, { foreignKey: "blogId" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

Comment.hasMany(Comment, {
  as: "replies",
  foreignKey: "parentId",
});

Comment.belongsTo(Comment, {
  as: "parent",
  foreignKey: "parentId",
});

module.exports = {
  sequelize,
  User,
  Blog,
};
