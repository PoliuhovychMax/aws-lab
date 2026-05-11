import { useState } from "react";
import { createPost } from "../api/posts";

export default function PostForm({ initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [authorName, setAuthorName] = useState(initial?.authorName || "");
  const [authorPassword, setAuthorPassword] = useState(initial?.authorPassword || "");
  const [text, setText] = useState(initial?.text || "");

  const handleSubmit = async () => {
    try {
      const newPost = {
        title,
        authorName,
        authorPassword,
        text
      };

      const result = await createPost(newPost);
      console.log("Created:", result);

      setTitle("");
      setAuthorName("");
      setAuthorPassword("");
      setText("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>

      <div>
        <input
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="Author Name"
              />
      </div>

      <div>
        <input
                value={authorPassword}
                onChange={e => setAuthorPassword(e.target.value)}
                placeholder="Author Password"
              />
      </div>

      <div>
        <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Text"
            />
      </div>

      <div>
        <button onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}