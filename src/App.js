import "./App.css";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { getUser } from "./Helpers";
import { Link } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// import React from 'react';
// import Nav from './Nav';

// const App = () => (

//   <div>
//     <Nav />
//     <h1>MERN CRUD</h1>

//   </div>

// );

// export default App;

const App = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        console.log(response);
        setPosts(response.data);
        console.log(axios);
        console.log("posts", posts);
        console.log("response.data", response.data[0]);
        console.log("process.env.REACT_APP_API", process.env.REACT_APP_API);
        // console.log("response.data.title", response.data.title);
        // console.log("response.data.content", response.data.content);
        // console.log("response.data.user", response.data.user);
        // console.log("response.data.createdAt", response.data.createdAt);
        // console.log("response.data.updatedAt", response.data.updatedAt);
        // console.log("response.data._id", response.data._id);
      })
      .catch((error) => {
        console.log(error.response);
        alert("Error fetching posts");
      });
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    // console.log('delete', slug, ' post');
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => alert("Error deleting post"));
  };

  //FORM WITH UPDATE
  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>MERN CRUD</h1>
      <hr />
      {posts.map((post, i) => (
        <div
          className="row"
          key={post._id}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div>ID: {post._id}</div>
          <div className="col pt-3 pb-2">
            <Link to={`/post/${post.slug}`}>
              <h2>Title: {post.title}</h2>
            </Link>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author: <span className="badge">{post.user}</span> Published on:{" "}
              <span className="badge">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
          {/* <div className="col-md-2">
                        <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                            Update
                        </Link>
                        <button
                            onClick={() => deleteConfirm(post.slug)}
                            className="btn btn-sm btn-outline-danger ml-1">
                            Delete
                        </button>
                    </div> */}
          {getUser() && (
            <div className="col-md-2">
              <Link
                to={`/post/update/${post.slug}`}
                className="btn btn-sm btn-outline-warning"
              >
                Update
              </Link>
              <button
                onClick={() => deleteConfirm(post.slug)}
                className="btn btn-sm btn-outline-danger ml-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;

//OLD FORM
// const App = () => (
//   <div>
// <Nav/>
//     <h1>MERN CRUD</h1>
//     {/* <h2>Hello World</h2>
//     <p>Test</p> */}

//   </div>

// );
// export default App;
