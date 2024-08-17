import React, {useState, useEffect} from "react";
import {firestore} from "../firebaseConfig";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

function MainApp() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(firestore, "blogs"); // Reference to the "blogs" collection
        const blogsSnapshot = await getDocs(blogsCollection); // Fetch all documents in the "blogs" collection
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Map documents to a list of blog objects
        setBlogs(blogsList); // Update state with the fetched blogs
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      } finally {
        setLoading(false); // Ensure loading state is updated even if there's an error
      }
    };
    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once

  // Handle blog click to navigate to the blog's detail page
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className='main-container'>
        <h1>
          <span>Happy</span> Reading !!
        </h1>

        {loading ? (
          <p>
            {" "}
            <br /> <br /> Loading posts...
          </p>
        ) : (
          <ul className='blog-list'>
            {blogs.map((blog) => (
              <li key={blog.id} className='blog-item' onClick={() => handleBlogClick(blog.id)}>
                <div className='left'>
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <p className='muted'>Author: {blog.author}</p>
                  <p className='muted'>Created At: {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleString() : "Unknown"}</p>
                </div>
                {blog.coverImageUrl && <img src={blog.coverImageUrl} alt={blog.title} className='cover-image' />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MainApp;
