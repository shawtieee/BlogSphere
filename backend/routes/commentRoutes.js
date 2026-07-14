const express = require("express");
const router = express.Router();

const {
  getComments,
  addComment,
} = require("../controllers/commentController");

router.get("/:blogId", getComments);

router.post("/", addComment);

module.exports = router;