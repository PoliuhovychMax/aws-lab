import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/post-item/:id" element={<PostItem />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;