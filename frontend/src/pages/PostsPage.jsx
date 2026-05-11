import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";
import { Link, useNavigate } from "react-router-dom";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    getPosts().then(res => setPosts(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Link to="/post-form">
        <button>Create Post</button>
      </Link>
      <h2>Posts</h2>
      {posts.map(p => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.authorName}</p>
          <p>{p.text}</p>

          <button onClick={() => navigate(`/post-item/${p.id}`)}>
            Edit
          </button>
          <button onClick={() => navigate(`/post-details/${p.id}`)}>
            Inspect
          </button>
          <button onClick={() => deletePost(p.id).then(load)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}