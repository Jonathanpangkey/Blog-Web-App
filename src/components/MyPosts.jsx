import React, {useState, useEffect} from "react";
import {auth, firestore, storage} from "../firebaseConfig";
import {collection, query, where, getDocs, deleteDoc, doc} from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (user) {
        try {
          const postsCollection = collection(firestore, "blogs");
          const q = query(postsCollection, where("author", "==", user.email)); // Assuming "author" is stored as email
          const querySnapshot = await getDocs(q);
          const postsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMyPosts(postsList);
        } catch (err) {
          console.error("Error fetching my posts:", err.message);
        } finally {
          setLoading(false); // Ensure loading state is updated even if there's an error
        }
      }
    };
    fetchMyPosts(); // This is called whenever `user` changes.
  }, [user]); // Add `fetchMyPosts` to the dependency array

  const handleDelete = async (id, imagePath) => {
    try {
      console.log("Attempting to delete image at path:", imagePath);

      // Delete the post document from Firestore
      await deleteDoc(doc(firestore, "blogs", id));

      // If there's an imagePath, delete the image from Cloud Storage
      if (imagePath) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        console.log("Image deleted:", imagePath);
      }

      // Update the state to remove the deleted post
      setMyPosts(myPosts.filter((post) => post.id !== id));
      console.log("Post deleted:", id);
    } catch (err) {
      console.error("Error deleting post:", err.message);
    }
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className='main-container'>
        <h1>
          <span>My</span> Posts
        </h1>

        {loading ? (
          <p>
            {" "}
            <br /> <br /> Loading posts...
          </p>
        ) : (
          <ul className='blog-list'>
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <li key={post.id} className='blog-item'>
                  <div className='left my-post'>
                    <div onClick={() => handleBlogClick(post.id)}>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <p className='muted'>Author: {post.author}</p>
                      <p className='muted'>
                        Created At:
                        {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Unknown"}
                      </p>
                    </div>
                    <button className='btn delete-btn' onClick={() => handleDelete(post.id, post.coverImageUrl)}>
                      Delete
                    </button>
                  </div>
                  {post.coverImageUrl && <img src={post.coverImageUrl} alt={post.title} className='cover-image' />}
                </li>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPosts;
