import { useState } from "react";

export default function PostForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [authorId, setAuthorId] = useState(initial?.authorId || "");
  const [text, setText] = useState(initial?.text || "");

  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        value={authorId}
        onChange={e => setAuthorId(e.target.value)}
        placeholder="Author ID"
      />

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Text"
      />

      <button onClick={() => onSubmit({ title, authorId, text })}>
        Save
      </button>
    </div>
  );
}