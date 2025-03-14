import { motion } from "framer-motion";

export default function FeatureCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-10 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      <p className="text-gray-300 mt-3">{description}</p>
    </motion.div>
  );
}
