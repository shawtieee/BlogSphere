const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController");

console.log("deleteBlog:", deleteBlog);
console.log("Type:", typeof deleteBlog);

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.put("/:id/like", likeBlog);

module.exports = router;