import React from "react";

import "./PostCard.scss";

function PostCard({ postData }) {
  return (
    <div className='post-card'>
      <h2>{postData.title}</h2>
      <div className='resp-container'>
        <iframe
          className='resp-iframe'
          title={postData._id}
          src={postData.link}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
      <p>{postData.description}</p>
      <button>Like</button>
    </div>
  );
}

export default PostCard;
