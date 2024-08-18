import React, {useState} from "react";
import {auth, firestore, storage} from "../firebaseConfig";
import {useNavigate} from "react-router-dom";
import {collection, addDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import remarkGfm from "remark-gfm";
import Navbar from "../components/Navbar";

function CreateBlog() {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDescription, setNewBlogDescription] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [coverImage, setCoverImage] = useState(null); // State for cover image
  const navigate = useNavigate();

  const handleCreateBlog = async () => {
    if (newBlogTitle.trim() === "" || newBlogDescription.trim() === "" || newBlogContent.trim() === "") return;

    let coverImageUrl = "";
    if (coverImage) {
      const imageRef = ref(storage, `coverImages/${coverImage.name}`);
      await uploadBytes(imageRef, coverImage);
      coverImageUrl = await getDownloadURL(imageRef); // Get image URL
    }

    try {
      const blogsCollection = collection(firestore, "blogs");
      await addDoc(blogsCollection, {
        title: newBlogTitle,
        description: newBlogDescription,
        content: newBlogContent,
        coverImageUrl, // Save image URL
        createdAt: new Date(),
        author: auth.currentUser.email,
      });
      setNewBlogTitle("");
      setNewBlogDescription("");
      setNewBlogContent("");
      setCoverImage(null); // Clear image input
      console.log("Blog created successfully");
      navigate("/main");
    } catch (err) {
      console.error("Error creating blog:", err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='create-blog-container'>
        <h2>Create a New Blog</h2>
        <input
          type='text'
          value={newBlogTitle}
          onChange={(e) => setNewBlogTitle(e.target.value)}
          placeholder='Blog Title'
          className='blog-title-input'
        />
        <input
          type='text'
          value={newBlogDescription}
          onChange={(e) => setNewBlogDescription(e.target.value)}
          placeholder='Blog Description'
          className='blog-description-input'
        />
        <input type='file' onChange={(e) => setCoverImage(e.target.files[0])} className='cover-image-input' />
        <MarkdownEditor
          value={newBlogContent}
          style={{height: "200px"}}
          onChange={({text}) => setNewBlogContent(text)}
          renderHTML={(text) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
          placeholder='Write your blog here...'
          className='blog-textarea'
        />
        <button onClick={handleCreateBlog} className='btn btn-create'>
          Create Blog
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;
