import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/PostForm" element={<PostForm />} />
        <Route path="/PostItem" element={<PostItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;