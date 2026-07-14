import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/blogs"
      );

      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="latest-blogs">
        <h1>All Blogs</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="blog-container">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                description={blog.description}
                author={blog.author}
                createdAt={blog.createdAt}
              />
            ))
          ) : (
            <h2>No blogs found.</h2>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Blogs;