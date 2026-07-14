import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/${id}`
      );

      setBlog(res.data);
      setLikes(res.data.likes || 0);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/blogs/${id}/like`
      );

      setLikes(res.data.likes);

      toast.success("Blog liked ❤️");

    } catch (error) {
      console.log(error);
      toast.error("Failed to like blog");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${id}`
      );

      setComments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/comments", {
        blogId: id,
        author: user ? user.name : "Guest",
        text: comment,
      });

      toast.success("Comment Added!");

      setComment("");

      fetchComments();

    } catch (err) {
      console.log(err);
      toast.error("Failed to add comment.");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="blog-details-container">

        <h1>{blog.title}</h1>

        <p>
          <strong>By:</strong> {blog.author}
        </p>

        <p>{blog.content}</p>


        {/* Like Section */}
        <div className="like-section">

          ❤️ {likes} Likes

          <button onClick={handleLike}>
            Like
          </button>

        </div>


        <hr />

        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div className="comment-card" key={c._id}>
              <strong>{c.author}</strong>
              <p>{c.text}</p>
            </div>
          ))
        )}


        <textarea
          rows="4"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />


        <button onClick={handleComment}>
          Post Comment
        </button>

      </div>

      <Footer />
    </>
  );
}

export default BlogDetails;
