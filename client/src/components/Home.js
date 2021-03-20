import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import VideoEditor from "./VideoEditor";

import "./Home.scss";

function Home() {
  const [postData, setPostData] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  function setEditor() {
    setOpenEditor(true);
  }

  async function getPost() {
    const postData = await axios.get("http://localhost:5000/api/videoCard");
    setPostData(postData.data);
  }

  function renderPosts() {
    return postData.map((post, i) => {
      return <PostCard key={i} postData={post} />;
    });
  }

  return (
    <div className='class'>
      <button onClick={setEditor}>Add Video</button>
      {openEditor && (
        <VideoEditor setOpenEditor={setOpenEditor} getPost={getPost} />
      )}

      <div className='card'>{renderPosts()}</div>
    </div>
  );
}

export default Home;
