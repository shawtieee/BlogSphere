import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

import "./Home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data.slice(0, 3));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

      <section className="hero">
        <h1>Share Your Stories With The World</h1>

        <p>
          Read, write and discover amazing blogs built using the MERN Stack.
        </p>

        <Link to="/blogs">
          <button className="hero-btn">
            Explore Blogs
          </button>
        </Link>
      </section>

      <section className="latest-blogs">
        <h2>Latest Blogs</h2>

        <div className="blog-container">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              createdAt={blog.createdAt}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;