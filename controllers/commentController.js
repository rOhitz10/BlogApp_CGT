const { Blog, User } = require("../models");
const Comment = require("../models/comentModel");

const addComment = async (req,res) => {
  const {blogId} = req.params;
 const {content,parentId,userId} = req.body;

//  parentId !== undefined ? parentId : null;
 console.log(parentId,"fhgjkljhgfbjhjgfg===================>>>>>>>>>>>>>>>>>>>>>>>");

if(!content){
 return res.status(400).json({
  msg:"content is empty",
  success:false,
 })
}
 try {

  // check user exist 
  const user = await User.findByPk(userId);
   if(!user){
   return res.status(404).json({
    msg:"user not found!",
    success:false
   })
  }
  const blog = await Blog.findByPk(blogId);  //if user exist then find blog 
  if(!blog){
   return res.status(404).json({
    msg:"blog not found!",
    success:false
   })
  }
  console.log("new Commnet:");


  const newComment = await blog.createComment({
      content, 
      userId,
      parentId,
    })

  

  res.status(200).json({
   msg:"Added successfully!",
   success:true,
   newComment
  })
  
 } catch (err) {
    console.error("add comment failed!", err);
    res.status(400).json({
      msg: "comment creation failed!",
      success: false,
      err,
    });
 }
}

const getAllComments = async (req,res) => {

 const {blogId} = req.params;
 
 if(!blogId){
  return res.status(400).json({
   msg:"blog ID is required!",
   success:false
  })
 }
 try {
  const blog = await Blog.findByPk(blogId);  //if user exist then find blog 
  if(!blog){
   return res.status(404).json({
    msg:"blog not found!",
    success:false
   })
  }

const commentsTree = await Comment.findAll({
      where: {
        blogId,
        parentId: null
      },
      include: [
        {
          model: User,
          attributes: ["name", "avatar"]
        },
        {
          model: Comment,
          as: "replies",
          include: [
            {
              model: User,
              attributes: ["name", "avatar"]
            },
            {
              model: Comment,
              as: "replies",
              include: [
                {
                  model: User,
                  attributes: ["name", "avatar"]
                }
              ]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

res.status(200).json({
  msg:"successfully fetched all Comments",
  commentsTree,
  success:true
})

  
 } catch (err) {
    console.error("Failed to getting comments!", err);
    res.status(500).json({
      msg: "Failed to getting comments!",
      success: false,
      err,
    });
 }
}

module.exports = {addComment,getAllComments}