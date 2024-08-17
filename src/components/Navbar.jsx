import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../firebaseConfig";
import {onAuthStateChanged, signOut} from "firebase/auth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener on component(navbar) mount/render.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update state based on auth status
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();

    // Run this effect only once when the component mounts
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <h3>Halo!</h3>
      </div>
      <button className='menu-toggle' onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <button onClick={() => navigate("/main")}>Home</button>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <button onClick={() => navigate("/my-posts")}>My Posts</button>
            </li>
            <li>
              <button onClick={() => navigate("/create-blog")}>Create New Blog</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </li>
            <li>
              <button onClick={() => navigate("/login")}>Login</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
