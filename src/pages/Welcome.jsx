import React from "react";
import {useNavigate} from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='welcome-container'>
      <div className='welcome-text'>
        <h2>Welcome</h2>
        <h3>Exploring Ideas, Unlock the Power of Knowledge</h3>
        <p>
          Delve into our blog to find content that is both enlightening and actionable. Each post is crafted to provide meaningful insights, practical
          tips, and fresh perspectives that support your journey toward continuous improvement and success.
        </p>
        <button onClick={() => navigate("/login")} className='btn btn-welcome'>
          Get started
        </button>
      </div>
    </div>
  );
}

export default Welcome;
