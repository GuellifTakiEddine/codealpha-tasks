const User = require("../models/User");
const Post = require("../models/Post");

// Get logged-in user
const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        const posts = await Post.find({
            user: req.user.id
        })
            .populate("user", "username")
            .sort({ createdAt: -1 });

        res.json({
            user,
            posts
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Get all users
const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get one user profile
const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user)
            return res.status(404).json({
                message: "User not found"
            });

        const posts = await Post.find({
            user: req.params.id
        })
            .populate("user", "username")
            .sort({ createdAt: -1 });

        res.json({
            user,
            posts
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Follow
const followUser = async (req, res) => {

    try {

        if (req.user.id === req.params.id)
            return res.status(400).json({
                message: "You can't follow yourself."
            });

        const me = await User.findById(req.user.id);

        const target = await User.findById(req.params.id);

        if (!target)
            return res.status(404).json({
                message: "User not found."
            });

        if (me.following.includes(req.params.id))
            return res.status(400).json({
                message: "Already following."
            });

        me.following.push(req.params.id);

        target.followers.push(req.user.id);

        await me.save();

        await target.save();

        res.json({
            message: "Followed successfully."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Unfollow
const unfollowUser = async (req, res) => {

    try {

        const me = await User.findById(req.user.id);

        const target = await User.findById(req.params.id);

        if (!target)
            return res.status(404).json({
                message: "User not found."
            });

        me.following = me.following.filter(
            id => id.toString() !== req.params.id
        );

        target.followers = target.followers.filter(
            id => id.toString() !== req.user.id
        );

        await me.save();

        await target.save();

        res.json({
            message: "Unfollowed successfully."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {

    getCurrentUser,
    getUsers,
    getUserById,
    followUser,
    unfollowUser

};