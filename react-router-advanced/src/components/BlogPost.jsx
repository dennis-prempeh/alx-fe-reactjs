// src/components/Post.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  // useParams hook extracts dynamic segments from the URL
  const { postId } = useParams();

  return (
    <div>
      <h2>📝 Dynamic Content Page</h2>
      <p>This page is displaying the content for post with **ID:** **{postId}**.</p>
      <p>Example: /post/my-first-blog-entry</p>
    </div>
  );
};

export default Post;