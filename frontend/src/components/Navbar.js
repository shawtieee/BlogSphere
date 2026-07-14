import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h1>
        <Link to="/" className="logo">
          BlogSphere
        </Link>
      </h1>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/blogs">
          Blogs
        </Link>


        {token && (
          <>

            <Link to="/dashboard">
              Dashboard
            </Link>


            <div className="profile">

              <button
                className="user-name"
                onClick={() => setOpen(!open)}
              >
                {user?.name?.split(" ")[0]} ▼
              </button>


              {open && (

                <div className="dropdown">
                  <Link to="/create-blog">
                    Create Blog
                  </Link>

                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!token && (
          <>

            <Link to="/login">
              Login
            </Link>
            
            <Link to="/register">
              Register
            </Link>

          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;