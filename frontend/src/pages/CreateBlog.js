import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import "./CreateBlog.css";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handlePublish = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:5000/api/blogs", {
        title,
        description,
        content,
        author: JSON.parse(localStorage.getItem("user")).name,
      });

      toast.success("Blog Published Successfully!");

      setTitle("");
      setDescription("");
      setContent("");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish blog.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="create-blog-container">
        <h1>Create New Blog</h1>

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          rows="10"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handlePublish}>
          Publish Blog
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;
