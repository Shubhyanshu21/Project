const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.put("/like/:id", protect, toggleLike);
router.post("/comment/:id", protect, addComment);

module.exports = router;
