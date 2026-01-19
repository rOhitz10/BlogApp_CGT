const express = require('express');
const upload = require('../middlewares/multer');
const {createBlog, updateBlog, getAllUserBlogs, getSingleBlog, getAllBlogs} = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const { addComment, getAllComments } = require('../controllers/commentController');
const BlogRouter = express.Router();

BlogRouter.post('/create-blog/:userId',upload.array('images',10),createBlog)
BlogRouter.put('/update-blog/:blogId',upload.array('images',10),updateBlog);
BlogRouter.get('/getAllUserBlog/:userId',auth, getAllUserBlogs);
BlogRouter.get('/:blogId',auth,getSingleBlog);
BlogRouter.get('/getAllBlogs/:userId',auth,getAllBlogs)

//////////commented Routes////////////
BlogRouter.post('/add-comments/:blogId',auth,addComment);
BlogRouter.get('/get-comments/:blogId',auth,getAllComments);


module.exports = BlogRouter;
