import React from "react";
import { useParams } from "react-router-dom";
import BlogPagination from "./BlogPagination.jsx";
import { blogPosts } from "../Blog/BlogData.js";
import "../style/Blog.css";

const BlogPost = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="back-btn">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-header">
        <div className="blog-post-image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="blog-post-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">{post.date}</span>
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-author">
          <span>By {post.author}</span>
        </div>
      </div>

      <div className="blog-post-content">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="blog-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <BlogPagination currentId={postId} posts={blogPosts} />
    </div>
  );
};

export default BlogPost;
