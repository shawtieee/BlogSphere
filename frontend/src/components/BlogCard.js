import { Link } from "react-router-dom";
import "./BlogCard.css";

function BlogCard({
  id,
  title,
  description,
  author,
  createdAt,
}) {
  return (
    <div className="blog-card">
      <h3>{title}</h3>

      <p className="blog-description">
        {description}
      </p>

      <div className="blog-meta">
        <span>{author}</span>
        <span>•</span>
        <span>
          {createdAt
            ? new Date(createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "No date"}
        </span>
      </div>

      <Link to={`/blogs/${id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default BlogCard;