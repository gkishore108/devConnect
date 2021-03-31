import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostEditor from "../Post/PostEditor";

import { getPost } from "../actions/post";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

import Post from "../Post/Post";
import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const [openEditor, setOpenEditor] = useState(false);

  const posts = useSelector((state) => state.post.posts);

  function setEditor() {
    setOpenEditor(true);
  }

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <div className="class">
      <h1>
        <i className="fa fa-user" aria-hidden="true" /> Welcome to the
        community!
      </h1>
      <button onClick={setEditor}>Add Video</button>
      {openEditor && <PostEditor setOpenEditor={setOpenEditor} />}
      <div>
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    </div>
  );
}

// Home.propTypes = {
//   getPost: PropTypes.func.isRequired,
//   post: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   post: state.post,
// });

export default Home;
