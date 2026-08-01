const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    getCurrentUser,
    getUsers,
    getUserById,
    followUser,
    unfollowUser

} = require("../controllers/userController");

router.get("/", authMiddleware, getUsers);

router.get("/me", authMiddleware, getCurrentUser);

router.get("/:id", authMiddleware, getUserById);

router.put("/follow/:id", authMiddleware, followUser);

router.put("/unfollow/:id", authMiddleware, unfollowUser);

module.exports = router;