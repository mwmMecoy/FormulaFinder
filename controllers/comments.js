const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        brands: req.body.brands,
        types: req.body.types,
        post: req.params.id,
        user: req.user.id,
      });
      console.log("Inventory update has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Inventory Update");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.render("comment.ejs", { comment: comment, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
};
