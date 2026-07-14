import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );

      toast.success("Blog Deleted Successfully!");

    } catch (err) {
      console.log(err);
      toast.error("Failed to delete blog.");
    }
  };


  const userBlogs = blogs.filter(
    (blog) => blog.author === user.name
  );


  return (
    <div>

      <Navbar />


      <div className="dashboard-container">

        <h1>Admin Dashboard</h1>


        <Link to="/create-blog">
          <button className="create-btn">
            Create New Blog
          </button>
        </Link>


        <h2>Your Blogs</h2>


        {userBlogs.length > 0 ? (

          userBlogs.map((blog) => (

            <div className="blog-item" key={blog._id}>

              <h3>{blog.title}</h3>


              <div className="blog-actions">

                <Link to={`/edit-blog/${blog._id}`}>
                  <button>
                    Edit
                  </button>
                </Link>


                <button
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <div className="empty-icon">
              📝
            </div>


            <h3>
              You haven't published any blogs yet.
            </h3>


            <Link 
              to="/create-blog" 
              className="empty-create-btn"
            >
              Create Blog
            </Link>

          </div>

        )}


        <Footer />

      </div>

    </div>
  );
}

export default Dashboard;