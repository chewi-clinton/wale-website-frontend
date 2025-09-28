import React from "react";
import { Link } from "react-router-dom";
import "../style/Blog.css";

const BlogPagination = ({ currentId, posts }) => {
  const currentIndex = posts.findIndex((post) => post.id === currentId);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="blog-pagination">
      <div className="pagination-container">
        {prevPost && (
          <Link to={`/blog/${prevPost.id}`} className="pagination-btn prev">
            <span className="arrow">←</span>
            <span className="btn-text">Previous</span>
          </Link>
        )}

        <Link to="/blog" className="back-to-blog">
          Back to Blog
        </Link>

        {nextPost && (
          <Link to={`/blog/${nextPost.id}`} className="pagination-btn next">
            <span className="btn-text">Next</span>
            <span className="arrow">→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPagination;
