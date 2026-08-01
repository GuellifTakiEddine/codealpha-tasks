const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    const post = await Post.create({
      user: req.user.id,
      text,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Like / Unlike Post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {

    try{

        const post = await Post.findById(req.params.id);

        if(!post)
            return res.status(404).json({
                message:"Post not found"
            });

        if(post.user.toString() !== req.user.id)
            return res.status(403).json({
                message:"Unauthorized"
            });

        await post.deleteOne();

        res.json({
            message:"Post deleted"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  deletePost,
};