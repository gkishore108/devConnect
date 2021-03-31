import React from "react";
import "./Post.scss";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deletePost } from "../actions/post";

function Post({ post }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <div className="resp-container">
        <iframe
          className="resp-iframe"
          title={post._id}
          src={post.link}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>{post.description}</p>

      <button onClick={(e) => dispatch(addLike(post._id))}>
        <i className="fa fa-thumbs-up" aria-hidden="true" />{" "}
        <span>
          {post.likes.length > 0 && <span> {post.likes.length} </span>}
        </span>
        Favourite
      </button>

      {auth && post.user === auth.user._id && (
        <button
          className="delete"
          onClick={(e) => dispatch(deletePost(post._id))}
        >
          <i className="fa fa-trash" aria-hidden="true" /> Delete
        </button>
      )}

      <p className="post-date">
        Posted by {post.userName}{" "}
        <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
      </p>
    </div>
  );
}

export default Post;
