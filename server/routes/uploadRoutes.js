const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "posts" },
      (error, result) => {
        if (error) return res.status(500).json(error);
        res.json({ imageUrl: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
