const express = require("express");
const router = express.Router();

const { getProfile, toggleFollow } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);

router.put("/follow/:id", protect, toggleFollow);

module.exports = router;
