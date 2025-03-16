import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Auth Context
import { auth } from "../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ type, onCloseModal }) {
  const isSignIn = type === "signin";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      if (isSignIn) {
        // Sign in logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        login(token, userCredential.user); // Updates state in AuthContext
        navigate("/dashboard");
      } else {
        // Sign up logic (DO NOT log the user in immediately)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
        // Sign the user out immediately
        await auth.signOut();
      
        if (onCloseModal) onCloseModal(); // Close modal if applicable
        navigate("/signin", { state: { fromSignUp: true } }); // Navigate to sign-in page
      }
      
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md text-center"
    >
      <h2 className="text-3xl font-bold mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
        <button 
          type="submit" 
          className="bg-[#474973] hover:bg-[#161B33] text-white py-3 rounded-lg mt-4 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Processing..." : (isSignIn ? "Sign In" : "Sign Up")}
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="text-[#1E4DB7] hover:underline cursor-pointer" onClick={() => navigate(isSignIn ? "/signup" : "/signin")}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </motion.div>
  );
}