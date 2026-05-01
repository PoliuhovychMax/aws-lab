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
      <h2>Posts</h2>

      {/* 🔹 КНОПКА СТВОРЕННЯ */}
      <Link to="/PostForm">
        <button>Create Post</button>
      </Link>

      {posts.map(p => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.authorId}</p>
          <p>{p.text}</p>

          {/* 🔹 КНОПКА РЕДАГУВАННЯ */}
          <button onClick={() => navigate(`/PostItem/${p.id}`)}>
            Edit
          </button>

          {/* 🔹 ВИДАЛЕННЯ */}
          <button onClick={() => deletePost(p.id).then(load)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}