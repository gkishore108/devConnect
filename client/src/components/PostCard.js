import React from "react";

function PostCard({ postData }) {
  return (
    <div className='class'>
      <h2>{postData.title}</h2>
      <iframe
        title={postData._id}
        width='550'
        height='315'
        src={postData.link}
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
      <textarea value={postData.description} readOnly={true} />
    </div>
  );
}

export default PostCard;
