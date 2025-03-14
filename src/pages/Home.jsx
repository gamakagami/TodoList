import FloatingBalls from "../components/FloatingBalls";
import WelcomeSection from "../components/WelcomeSection";
import QuoteSection from "../components/QuoteSection";
import FeaturesSection from "../components/FeaturesSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative bg-[#3d3e6e] min-h-screen text-white flex flex-col lg:flex-row items-center px-6 overflow-hidden">
      <FloatingBalls />

      {/* Left Section (Welcome Message) */}
      <WelcomeSection />

      {/* Right Section (Quote + Features) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex flex-col justify-start items-center h-full px-4 py-10"
      >
        <div className="mb-7">
        <QuoteSection/>
        </div>
        <FeaturesSection />
      </motion.div>
    </div>
  );
}
