import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#3d3e6e] text-white p-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-[#1E4DB7]">Welcome Back!</h1>
        <p className="text-gray-300 mt-2">Here's what's happening today.</p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <StatCard title="Tasks Completed" value="12" />
          <StatCard title="Pending Tasks" value="5" />
          <StatCard title="Upcoming Meetings" value="2" />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#1E4DB7]">Quick Actions</h2>
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Add Task
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2 text-blue-400">{value}</p>
  </motion.div>
);