const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "loginn check");

  if (!email || !password) {
    res.status(400).json({
      msg: "missing fields",
    });
    return;
  }
  try {
    const userExist = await User.findOne({
      where: { email: email },
    });
    if (!userExist) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const match = await bcrypt.compare(password, userExist.password);

    if (!match) {
      res.status(400).json({
        msg: "Wrong Password!",
        success:false
      });
      return;
    }

    const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      msg: "Successfully logined",
      success:true,
      userExist,
      token,
    });

    console.log("loginnnn");
  } catch (error) {
    console.error("Login Failed!");
  }
};

const register = async (req, res) => {
  const { name, email, gender, password, date_of_birth } = JSON.parse(
    req.body.data
  );
  const avatar = req.file?.filename;

  if (!name || !email || !gender || !date_of_birth || !password) {
    res.status(400).json({
      msg: "missing fields",
    });
    return;
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      date_of_birth: date_of_birth,
      gender: gender,
      avatar: avatar,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      msg: "Register Successfully!",
      success: true,
      newUser,
      token,
    });
  } catch (error) {
    console.error("Register Failed!", error);
  }
};

module.exports = { login, register };
