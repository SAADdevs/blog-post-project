const blog = require("../models/blog");
const { StatusCodes } = require("http-status-codes");

const getAllBlogs = async (req, res) => {
  const Blogs = await blog
    .find({ createdBy: req.user.userId })
    .sort("createdAt");
  res.status(StatusCodes.OK).json({ Blogs, count: Blogs.length });
};


const getBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobID },
  } = req;
  const Blog = await blog.findOne({
    _id: jobID,
    createdBy: userId,
  });

  if (!Blog) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "there no blog with this id " });
  }
  res.status(StatusCodes.OK).json({ Blog });
};


const creatBlog = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const Blog = await blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ Blog });
};


const updateBlog = async (req, res) => {
  const {
    body: { title, content },
    user: { userId },
    params: { id: jobID },
  } = req;

  if (!title === "" || !content === "") {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide the title and conotent" });
  }

  const Blog = await blog.findByIdAndUpdate(
    { _id: jobID, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ Blog });
};


const deletBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobID },
  } = req;

  const Blog = await blog.findByIdAndRemove({
    _id: jobID,
    createdBy: userId,
  });

  if (!Blog) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `there is no blog with this id ${jobID} ` });
  }
  res.status(StatusCodes.OK).json({ msg: "deleted succesfuly" });
};


module.exports = {
  getAllBlogs,
  getBlog,
  creatBlog,
  updateBlog,
  deletBlog,
};
