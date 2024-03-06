import "./App.css";
import Layout from "./components/layoutComponent/layout";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import Postpage from "./pages/Postpage";
import EditPage from "./pages/EditPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Postpage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
