import Navbar from "../components/Navbar";
import "./CreateBlog.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/${id}`
      );

      setTitle(res.data.title);
      setDescription(res.data.description);
      setContent(res.data.content);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !description || !content) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        {
          title,
          description,
          content,
        }
      );

      toast.success("Blog Updated Successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="create-blog-container">
        <h1>Edit Blog</h1>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          rows="10"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleUpdate}>
          Update Blog
        </button>
      </div>
    </div>
  );
}

export default EditBlog;