import React, { useState } from "react";
import { addPost } from "../actions/post";
import { useDispatch } from "react-redux";

import "./PostEditor.scss";

function PostEditor({ setOpenEditor }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const formData = {
    title,
    link,
    description,
  };

  async function submitPost(e) {
    e.preventDefault();
    await dispatch(addPost(formData));
    setTitle("");
    setLink("");
    setDescription("");
    setOpenEditor(false);
  }

  return (
    <div className="editor">
      <form onSubmit={submitPost}>
        <label htmlFor="input-title">Title *</label>
        <input
          id="input-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="input-link">Youtube Link *</label>
        <input
          id="input-link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="input-description">Description</label>
        <textarea
          id="input-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="btn-cancel"
          type="button"
          onClick={() => setOpenEditor(false)}
        >
          Cancel
        </button>
        <button className="btn-submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default PostEditor;
