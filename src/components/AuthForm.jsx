import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ type }) {
  const isSignIn = type === "signin";
  const navigate = useNavigate(); // React Router Navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace with actual authentication logic
    if (isSignIn) {
      console.log("User signed in! Redirecting...");
      navigate("/dashboard"); // Redirect to Dashboard after Sign In
    } else {
      console.log("User signed up!");
      navigate("/signin"); // Redirect to Sign In after Sign Up
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md text-center"
    >
      <h2 className="text-3xl font-bold mb-6">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
        {!isSignIn && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-4 cursor-pointer"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <a
          href={isSignIn ? "/signup" : "/signin"}
          className="text-blue-400 hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </a>
      </p>
    </motion.div>
  );
}
