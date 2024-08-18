import React, {useState} from "react";
import {auth, googleProvider} from "../firebaseConfig";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {useNavigate, Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle user login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch (err) {
      // Handle errors and set the appropriate error message
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
    }
  };

  // Handle user login with Google
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google and then redirect
      await signInWithPopup(auth, googleProvider);
      navigate("/main");
    } catch (err) {
      setError(err.message); // Set any error message encountered during Google sign-in
    }
  };

  // Translate Firebase auth error codes into user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Please enter a valid email address and password.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className='auth-body'>
      <div className='auth-container'>
        <h2>Welcome back !</h2>
        <button onClick={handleGoogleLogin} className='btn auth-google-btn'>
          <i className='fab fa-google'></i> Sign in with Google
        </button>
        <div className='separator'>Or, sign in with your email</div>
        <form onSubmit={handleLogin} className='auth-form'>
          <input type='email' placeholder='Work email' value={email} onChange={(e) => setEmail(e.target.value)} required className='auth-input' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='auth-input'
          />
          <div className='auth-options'>
            <Link to='/forgot-password' className='auth-link'>
              Forgot your password?
            </Link>
          </div>
          <button type='submit' className='btn btn-auth'>
            Sign in
          </button>
        </form>
        {error && <p className='auth-error'>{error}</p>}
        <Link to='/signup' className='auth-link'>
          <br />
          Don't have an account? Create one
        </Link>
      </div>
    </div>
  );
}

export default Login;
