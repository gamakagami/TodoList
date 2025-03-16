export default function StatsCard({ title, count, bgColor }) {
    return (
      <div className={`p-6 rounded-lg shadow-md ${bgColor} text-white text-center`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2">{count}</p>
      </div>
    );
  }
  