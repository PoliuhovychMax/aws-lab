import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/posts";

export default function PostItem() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorPassword, setAuthorPassword] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [savedPassword, setSavedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(id);
        setTitle(res.data.title);
        setAuthorName(res.data.authorName);
        setText(res.data.text);
        setSavedPassword(res.data.authorPassword || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setAuthorPassword(value);

    if (value === savedPassword) {
      setPasswordError("");
    } else {
      setPasswordError("wrong password");
    }
  };

  const handleUpdate = async () => {
    if(authorPassword !== savedPassword){
      setPasswordError("wrong password")
      return
    }
    try {
      await updatePost(id, { title, text });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#ddd] font-mono py-10 px-4">

      <div className="max-w-2xl mx-auto">

        <div className="bg-[#111] border border-[#333] shadow-2xl">

          <div className="border-b border-[#222] px-6 py-4">
            <h1 className="text-3xl text-[#ff9900] font-bold tracking-wider">
              EDIT POST #{id}
            </h1>

            <p className="text-[#777] text-sm mt-1">
              restricted editing
            </p>
          </div>

          <div className="p-6 flex flex-col gap-5">

            <div>
              <p className="text-[#888] text-sm mb-2">
                AUTHOR
              </p>

              <div className="bg-[#1a1a1a] border border-[#333] px-4 py-3 text-[#8dc63f]">
                {authorName}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#888] text-sm">
                PASSWORD
              </label>

              <input
                type="password"
                value={authorPassword}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                className="
                  w-full
                  bg-[#1a1a1a]
                  border border-[#444]
                  px-4 py-3
                  outline-none
                  focus:border-[#ff9900]
                  transition
                "
              />

              {passwordError && (
                <p className="text-red-500 text-sm">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#888] text-sm">
                TITLE
              </label>

              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="
                  w-full
                  bg-[#1a1a1a]
                  border border-[#444]
                  px-4 py-3
                  outline-none
                  focus:border-[#ff9900]
                  transition
                "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#888] text-sm">
                MESSAGE
              </label>
            </div>
            <div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={10}
                className="
                  w-full
                  bg-[#1a1a1a]
                  border border-[#444]
                  px-4 py-3
                  outline-none
                  focus:border-[#ff9900]
                  transition
                  resize-none
                "
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={
                authorPassword !== savedPassword ||
                authorPassword.trim() === ""
              }
              className="
                bg-[#ff9900]
                text-black
                font-bold
                py-3
                mt-2
                hover:opacity-90
                transition
                disabled:opacity-40
              "
            >
              UPDATE POST
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}