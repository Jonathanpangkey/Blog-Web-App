import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {firestore} from "../firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "../components/Navbar";

function BlogDetail() {
  const {id} = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = doc(firestore, "blogs", id);
        const blogSnap = await getDoc(blogDoc);
        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          console.log("No such blog!");
        }
      } catch (err) {
        console.error("Error fetching blog:", err.message);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='blog-detail-container'>
        <button onClick={() => navigate("/main")} style={{background: "none", border: "none", padding: 0, color: "blue", cursor: "pointer"}}>
          Home
        </button>
        <br /> <br />
        {blog && (
          <div className='blog-detail'>
            <h2>{blog.title}</h2>
            {blog.coverImageUrl && <img src={blog.coverImageUrl} alt={blog.title} className='cover-image' />}
            <div className=''>
              <p className='muted'>Author: {blog.author}</p>
              <p className='muted'>
                Created At:
                {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleString() : "Unknown"}
              </p>
            </div>
            <div className='blog-content'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
