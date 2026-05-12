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
    <div className="min-h-screen bg-[#1a1a1a] text-[#ddd] font-mono p-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8 border-b border-[#333] pb-4">
          <div>
            <h1 className="text-4xl text-[#ff9900] font-bold tracking-widest">
              POSTS BOARD
            </h1>

            <p className="text-[#777] text-sm mt-1">
              posting system
            </p>
          </div>

          <Link to="/post-form">
            <button className="bg-[#222] border border-[#555] px-5 py-3 hover:bg-[#2d2d2d]">
              + Create Post
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          {posts.map(p => (
            <div
              key={p.id}
              className="bg-[#111] border border-[#333] shadow-lg"
            >
              <div className="border-b border-[#222] px-4 py-3 flex gap-4 text-sm">
                <span className="text-[#8dc63f] font-bold">
                  {p.authorName}
                </span>
              </div>
              <div>
                <span className="text-[#666]">
                  #{p.id}
                </span>
              </div>

              <div className="p-5">
                <h2 className="text-[#ff9900] text-2xl mb-3">
                  {p.title}
                </h2>

                <p className="text-[#d0d0d0] whitespace-pre-line leading-relaxed">
                  {p.text}
                </p>

                <div className="mt-4">

                  <button
                    onClick={() => navigate(`/post-item/${p.id}`)}
                    className="border border-[#444] px-4 py-2 hover:bg-[#222] mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/post-details/${p.id}`)}
                    className="border border-[#444] px-4 py-2 hover:bg-[#222] mr-3"
                  >
                    Inspect
                  </button>

                  <button
                    onClick={() => deletePost(p.id).then(load)}
                    className="border border-red-900 px-4 py-2 hover:bg-red-950"
                  >
                    Delete
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}