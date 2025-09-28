import React from "react";
import { Link } from "react-router-dom";
import "../style/Blog.css";

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">{post.date}</span>
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
