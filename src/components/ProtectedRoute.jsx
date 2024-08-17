import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {auth} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";

function ProtectedRoute({element: Element, ...rest}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner or similar here
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to='/login' />;
}

export default ProtectedRoute;
