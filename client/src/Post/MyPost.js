import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

import "../components/Home.scss";

function MyPost() {
  const user = useSelector((state) => state.auth.user._id);
  let posts = useSelector((state) => state.post.posts);

  posts = posts.filter((post) => post.user === user);

  return (
    <div className="class">
      <h2 className="title">My Posts</h2>
      <div>
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    </div>
  );
}

export default MyPost;
