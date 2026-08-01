const Comment = require("../models/Comment");

// Create Comment
const createComment = async (req, res) => {
  try {
    const { post, text } = req.body;

    const comment = await Comment.create({
      post,
      user: req.user.id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Comments for a Post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username profilePicture")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};