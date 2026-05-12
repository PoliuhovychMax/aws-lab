import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#ddd] font-mono p-6">
  <div className="max-w-4xl mx-auto bg-[#111] border border-[#333]">

    <div className="border-b border-[#222] p-4 flex gap-4 text-sm">
      <span className="text-[#8dc63f] font-bold">
        {post.authorName}
      </span>
    </div>
    <div>
      <span className="text-[#666]">
        #{post.id}
      </span>
    </div>

    <div className="p-6">
      <h1 className="text-[#ff9900] text-4xl mb-6">
        {post.title}
      </h1>

      <p className="leading-relaxed whitespace-pre-line text-[#ddd]">
        {post.text}
      </p>
    </div>

  </div>
</div>
  );
}