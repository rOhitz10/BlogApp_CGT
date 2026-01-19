const { Blog, User } = require("../models/index");

const createBlog = async (req, res) => {
  console.log("reqq.body", req.body);
  const { userId } = req.params;
  const { title, description } = req.body;
  const images = req.files;

  const imageArr = images.map((file) => file.filename);

  if (!userId || !title || !description) {
    return res.status(400).json({
      msg: " empty data!",
    });
  }
  try {
    const userExist = await User.findByPk(userId);
    if (!userExist) {
      return res.status(404).json({
        msg: "user not found!",
        success: false,
      });
    }

    const newBlog = await userExist.createBlog({
      title: title,
      description: description,
      author: userExist.name,
      images: imageArr,
    });

    res.status(201).json({
      msg: "successfully Created!",
      success: true,
      newBlog,
    });
  } catch (err) {
    console.error("blog creation failed!", err);
    res.status(400).json({
      msg: "blog creation failed!",
      success: false,
      err,
    });
  }
};

const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, description, deletedImg } = req.body;
  const images = req.files;

  console.log(
    req.body,
    images,
    "===================+++++++++++++++++++======="
  );

  const newImgPath = images?.map((file) => file.path);

  if (!blogId) {
    return res.status(401).json({
      msg: "missing field",
      success: false,
    });
  }

  try {
    const existBlog = await Blog.findByPk(blogId);

    if (!existBlog) {
      return res.status(401).json({
        success: false,
        msg: "Blog not Found!",
      });
    }

    let currentImages = existBlog.images || [];
    if (deletedImg !== undefined) {
      currentImages = currentImages.filter((_, i) => i !== deletedImg);
      console.log("deletedImg");
    }

    console.log(existBlog.images, "img", [
      ...(currentImages ?? []),
      ...(newImgPath ?? []),
    ]);

    if (newImgPath !== undefined) {
      existBlog.images = [...(currentImages ?? []), ...(newImgPath ?? [])];
    }

    if (title !== undefined) existBlog.title = title;

    if (description !== undefined) existBlog.description = description;

    await existBlog.save();

    res.status(201).json({
      success: true,
      msg: "Updated successfully",
      existBlog,
    });
  } catch (err) {
    console.error("blog updation failed!", err);
    res.status(400).json({
      msg: "blog updation failed!",
      success: false,
      err,
    });
  }
};

const getSingleBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(400).json({ success: false, msg: "empty field" });
  }

  try {
    const blog = await Blog.findByPk(blogId, {
      include: [
        {
          model: User,
          attributes: ["name", "avatar"],
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({ success: false, msg: "blog not found!" });
    }

    res.status(200).json({
      success: true,
      msg: "Blog found",
      blog,
    });
  } catch (err) {
    console.error("blog fetching failed!", err);
    res.status(500).json({
      success: false,
      msg: "Failed to access blog!",
    });
  }
};

const getAllUserBlogs = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      msg: "empty field",
    });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        msg: "user not found!",
        success: false,
      });
    }

    const blogs = await Blog.findAll({
      where: { userId: userId },
      include: [{ model: User, attributes: ["name", "avatar"] }],
    });
    if (blogs.length === 0) {
      return res.status(204).json({
        msg: "user has no blogs yet!",
      });
    }

    res.status(200).json({
      msg: "All user blogs",
      success: true,
      blogs,
    });
  } catch (err) {
    console.error("get all blogs failed!", err);
    res.status(500).json({
      msg: "Failed to access blogs!",
      success: false,
    });
  }
};

const getAllBlogs = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      msg: "empty field",
    });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        msg: "user not found!",
        success: false,
      });
    }

    const Blogs = await Blog.findAll({
      include: [{ model: User, attributes: ["name", "avatar"] }],

      order: [["createdAt", "DESC"]],
    });
    console.log("blogs", Blogs);

    res.status(200).json({
      msg: "All user blogs",
      success: true,
      Blogs,
    });
  } catch (err) {
    console.error("get all blogs failed!", err);
    res.status(500).json({
      msg: "Failed to access blogs!",
      success: false,
    });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllUserBlogs,
  getAllBlogs,
};
