const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blogId: req.params.blogId,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getComments,
  addComment,
};