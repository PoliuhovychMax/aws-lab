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
  <div className="min-h-screen bg-[#1a1a1a] text-[#ddd] font-mono py-10 px-4">
    <div className="max-w-2xl mx-auto">

      <div className="bg-[#111] border border-[#333] shadow-2xl">

        <div className="border-b border-[#222] px-6 py-4">
          <h1 className="text-3xl text-[#ff9900] font-bold tracking-wider">
            CREATE POST
          </h1>

          <p className="text-[#777] text-sm mt-1">
            posting terminal
          </p>
        </div>

        <div className="p-6 flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-[#888] text-sm">
              TITLE  
            </label>

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Thread title"
              className="
                bg-[#1a1a1a]
                border border-[#444]
                px-4 py-3
                outline-none
                focus:border-[#ff9900]
                transition
                w-full
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#888] text-sm">
              NAME  
            </label>

            <input
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Usename"
              className="
                bg-[#1a1a1a]
                border border-[#444]
                px-4 py-3
                outline-none
                focus:border-[#ff9900]
                transition
                w-full
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#888] text-sm">
              PASSWORD  
            </label>

            <input
              type="password"
              value={authorPassword}
              onChange={e => setAuthorPassword(e.target.value)}
              placeholder="Password"
              className="
                bg-[#1a1a1a]
                border border-[#444]
                px-4 py-3
                outline-none
                focus:border-[#ff9900]
                transition
                w-full
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#888] text-sm">
              MESSAGE  
            </label>

            <div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write your message"
                rows={10}
                className="
                  bg-[#1a1a1a]
                  border border-[#444]
                  px-4 py-3
                  outline-none
                  focus:border-[#ff9900]
                  transition
                  resize-none
                  w-full
                "
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="
              bg-[#ff9900]
              text-black
              font-bold
              py-3
              mt-2
              hover:opacity-90
              transition
            "
          >
            SUBMIT POST
          </button>

        </div>
      </div>
    </div>
  </div>
);
}