import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, createPost, updatePost } from "../api/posts";

export default function PostForm() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      getPostById(id).then(res => {
        setTitle(res.data.title);
        setAuthorId(res.data.authorId);
        setText(res.data.text);
      });
    }
  }, [id]);

  const handleSubmit = () => {
    const data = { title, authorId, text };

    if (id) {
      updatePost(id, data);
    } else {
      createPost(data);
    }
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={authorId} onChange={e => setAuthorId(e.target.value)} />
      <textarea value={text} onChange={e => setText(e.target.value)} />

      <button onClick={handleSubmit}>
        {id ? "Update" : "Create"}
      </button>
    </div>
  );
}