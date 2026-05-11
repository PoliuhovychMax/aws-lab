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
    <div>
      <h2>Edit Post #{id}</h2>
      <div>
        <label><strong>Author name:</strong></label>
        <p>{authorName}</p>
      </div>
      <div>
        <input value={authorPassword} onChange={handlePasswordChange} />
        {passwordError && (
          <p style={{ color: "red" }}>{passwordError}</p>
        )}
      </div>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea value={text} onChange={e => setText(e.target.value)} />
      </div>

      <button
        onClick={handleUpdate}
        disabled={
          authorPassword !== savedPassword ||
          authorPassword.trim() === ""
        }
      >
        Update
      </button>
    </div>
  );
}