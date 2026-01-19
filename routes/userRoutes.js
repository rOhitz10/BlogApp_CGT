const express = require('express');
const { login, register } = require('../controllers/userController');

const upload = require('../middlewares/multer');
const router = express.Router();

router.post('/login',login)
router.post('/register',upload.single('avatar'),register)


module.exports = router;