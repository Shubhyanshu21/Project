const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFollow = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    const isFollowing = currentUser.following.includes(
      targetUser._id
    );

    if (isFollowing) {
      // unfollow
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
    } else {
      // follow
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "Follow status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

