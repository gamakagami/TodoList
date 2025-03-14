import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-full md:w-1/2 flex justify-center items-center h-full text-center mt-10 md:mt-0"
    >
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
        Welcome To <br /> My Todolist!
      </h1>
    </motion.div>
  );
}
