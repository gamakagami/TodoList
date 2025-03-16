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
    // Listen for Firebase auth state changes
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

  // Maintain these methods for backward compatibility
  const login = (userToken, userData) => {
    localStorage.setItem("authToken", userToken);
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    // This should just trigger Firebase signOut
    // The actual state cleanup happens in onAuthStateChanged
    auth.signOut().catch(error => {
      console.error("Error signing out:", error);
    });
  };

  // Expose both user and token based auth status for consistency
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