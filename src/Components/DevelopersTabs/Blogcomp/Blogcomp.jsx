import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./Blogcomp.css"; 

const Blogcomp = ({ data }) => {
  console.log("Received data in Blogcomp:", data);

  const blogPosts =data?.Blog || [];

  return (
    <div className="total-blogcontainer">
      <div className="blog-container">
        <h2 className="blog-title">📚 Latest Blog Posts</h2>
        <div className="blog-list">
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
              <div key={index} className="blog-item">
                <MenuBookIcon className="blog-icon" />
                <div className="blog-texts">
                  <a href={post.BlogLink} target="_blank" rel="noopener noreferrer">
                    {post.BlogTitle}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No blog posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogcomp;
