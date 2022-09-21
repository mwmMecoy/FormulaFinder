const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.post("/createComment/:id",upload.single("file"), commentsController.createComment);

router.delete("/deletePost/:id", commentsController.deletePost);

module.exports = router;
