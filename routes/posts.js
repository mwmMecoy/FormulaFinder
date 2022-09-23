const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", postsController.createPost);

// Favorite a snippet
router.post('/selectFavorite', postsController.selectFavorite)

// Unfavorite a snippet
router.post('/deselectFavorite', postsController.deselectFavorite)

module.exports = router;
