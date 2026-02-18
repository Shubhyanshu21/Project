const Post = require("../models/Post");


exports.createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;

    const post = await Post.create({
      user: req.user.id,
      image,
      caption,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
