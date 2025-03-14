import { motion } from "framer-motion";

export default function FloatingBalls() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: 50 + i * 10,
            height: 50 + i * 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
}
