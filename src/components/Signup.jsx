import React, {useState} from "react";
import {auth, googleProvider} from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {useNavigate, Link} from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle user sign-up with email and password
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create a new user with the provided email and password
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch (err) {
      // Handle errors and set the appropriate error message
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
    }
  };

  // Handle user sign-up with Google
  const handleGoogleSignup = async () => {
    try {
      // Sign in with Google and then redirect
      await signInWithPopup(auth, googleProvider);
      navigate("/main");
    } catch (err) {
      setError(err.message);
    }
  };

  // Translate Firebase auth error codes into user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className='auth-body'>
      <div className='auth-container'>
        <h2>Sign Up</h2>
        <button onClick={handleGoogleSignup} className='btn auth-google-btn'>
          <i className='fa-brands fa-google'></i>Sign in with Google
        </button>
        <div className='separator'>Or, create new account</div>
        <form onSubmit={handleSignup} className='auth-form'>
          <input type='email' placeholder='Work email' value={email} onChange={(e) => setEmail(e.target.value)} required className='auth-input' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='auth-input'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='auth-input'
          />
          <button type='submit' className='btn btn-auth'>
            Sign Up
          </button>
        </form>
        {error && <p className='auth-error'>{error}</p>}
        <p className='auth-link'>
          <br />
          Already have an account?{" "}
          <Link className='auth-link' to='/login'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
