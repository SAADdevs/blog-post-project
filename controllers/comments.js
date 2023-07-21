const comment = require("../models/comments");
const { StatusCodes } = require("http-status-codes");
const blog = require("../models/blog");

const getComment = async (req, res) => {};

const creatComment = async (req, res) => {
  const { content, BlopPostID, commentersID } = req.body;
  const Blog = await blog.findById(BlopPostID);
  if (!Blog) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `there is no blog post  with this id ${BlopPostID} ` });
  }

  const Comment = await comment.creat(req.body);

  res.status(StatusCodes.OK).json({ msg: "created succusfully" },Comment);
};

const updateComment = async (req, res) => {
  res.send("updating comment");
};

const deleteComment = async (req, res) => {
  res.send("deleting comment");
};

module.exports = {
  getComment,
  creatComment,
  updateComment,
  deleteComment,
};
