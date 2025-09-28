import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard.jsx";
import { blogPosts } from "../Blog/BlogData.js";
import "../style/Blog.css";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Our Blog</h1>
        <p>
          Health tips, insights, and the latest news in pharmacy and medicine
        </p>
      </div>

      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <h3>No posts found in this category</h3>
          <button onClick={() => setSelectedCategory("All")}>
            View All Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
