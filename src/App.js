import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import Welcome from "./components/Welcome";
import MyPosts from "./components/MyPosts";
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
