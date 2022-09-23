const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const favorites = await Post.find({ _id: { $in: req.user.favorites}})
      res.render("profile.ejs", { posts: posts, user: req.user, favorites: favorites});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, favorites: req.user.favorites});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.body.company, req.body.address)
    try {
      await Post.create({
        company: req.body.company,
        address: req.body.address,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  selectFavorite: async (req,res) => {
      try {
          await User.updateOne(
              {_id: req.user.id},
              { $push: { favorites : req.body.postId}}
          )
          res.json('Location Favorited')
      } catch (error) {
          console.log(error)
      }
  },
  deselectFavorite: async(req, res) => {
      try {
          await User.updateOne(
              {_id: req.user.id},
              { $pull: { favorites : req.body.postId}}
          )
          res.json('Location Unfavorited')
      } catch (error) {
          console.log(error)
      }
  }
};
