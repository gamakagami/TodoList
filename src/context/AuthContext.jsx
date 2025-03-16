import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create context
const AuthContext = createContext();

// Hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // User is signed in
          const userToken = await currentUser.getIdToken();
          localStorage.setItem("authToken", userToken);
          setUser(currentUser);
          setToken(userToken);
        } else {
          // User is signed out
          localStorage.removeItem("authToken");
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const login = async (token, user) => {
    // Update isLoggedIn state and store user data
    setUser(user);
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    // This should just trigger Firebase signOut
    auth.signOut().catch(error => {
      console.error("Error signing out:", error);
    });
  };

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isLoggedIn,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}