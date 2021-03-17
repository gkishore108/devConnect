import React, { useState } from "react";
import axios from "axios";

import "./VideoEditor.scss";

function VideoEditor({ setOpenEditor, getPost }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  async function addPost(e) {
    e.preventDefault();
    console.log(title, link, description);

    try {
      const postData = {
        title,
        link,
        description,
      };

      await axios.post("http://localhost:5000/api/videoCard", postData);
      getPost();
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          console.log(err.response.data.errorMessage);
        }
      }
      return;
    }

    setTitle("");
    setLink("");
    setDescription("");
    setOpenEditor(false);
  }

  return (
    <div className='editor'>
      <form onSubmit={addPost}>
        <label htmlFor='input-title'>Title *</label>
        <input
          id='input-title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='input-link'>Youtube Link *</label>
        <input
          id='input-link'
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor='input-description'>Description</label>
        <textarea
          id='input-description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className='btn-cancel'
          type='button'
          onClick={() => setOpenEditor(false)}
        >
          Cancel
        </button>
        <button className='btn-submit' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
}

export default VideoEditor;
