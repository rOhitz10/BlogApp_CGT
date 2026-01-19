const multer  = require('multer')
// const upload = multer({ dest: '../uploads/' }); ///default


const storage = multer.diskStorage({
 destination:(req,file,cb)=>{
  cb(null, './uploads'); 
 },
 filename:(req,file,cb)=>{
  cb(null, Date.now() + '-' + file.originalname)
 }
})

const upload = multer({
 storage:storage
})

module.exports = upload;