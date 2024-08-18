import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import Welcome from "./pages/Welcome";
import MyPosts from "./pages/MyPosts";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<MainApp />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/my-posts' element={<ProtectedRoute element={MyPosts} />} />
        <Route path='/create-blog' element={<ProtectedRoute element={CreateBlog} />} />
      </Routes>
    </Router>
  );
};

export default App;
