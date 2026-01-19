const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
 const header = req.headers['authorization'];

  const token = header.split(' ')[1];

 if(!token){
  return res.status(401).json({
   msg:"authorization failed token missing"
  })
 }
 
 try {
  
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

 } catch (error) {
  console.error("Authorization failed",error);
  return res.status(400).json({
   msg:"Authorization failed",
   success:false,
   error
  })
  
 }

next();
}

module.exports = auth;