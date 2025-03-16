import PropTypes from "prop-types";

export default function TaskCard({ task = {}, onToggle, onDelete, onEdit }) {
  const priorityColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  // Ensure priority has a default value to prevent errors
  const priority = task.priority || "medium";

  // Convert Firestore timestamp to readable date
  // Improved deadline handling
const formattedDeadline = task.deadline ? 
(task.deadline.seconds ? 
  new Date(task.deadline.seconds * 1000).toLocaleDateString() :
  task.deadline instanceof Date ? 
    task.deadline.toLocaleDateString() : 
    task.deadline) : 
"No Deadline";

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
      <h3 className="text-lg font-semibold">{task.title || "Untitled Task"}</h3>

      <p>
        <strong>Status:</strong>{" "}
        <span className={task.completed ? "text-green-400" : "text-yellow-400"}>
          {task.completed ? "✅ Completed" : "⏳ Pending"}
        </span>
      </p>

      {/* Use formatted deadline */}
      <p><strong>Deadline:</strong> {formattedDeadline}</p>

      <p>
        <strong>Priority:</strong>{" "}
        <span className={priorityColors[priority] || "text-gray-400"}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </p>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => onToggle?.(task.id)}
          className={`px-3 py-1 rounded text-white transition ${
            task.completed
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {task.completed ? "Mark Pending" : "Mark Completed"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(task.id)}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


// Prop validation
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string, // Firestore ID is a string, not a number
    title: PropTypes.string,
    completed: PropTypes.bool,
    deadline: PropTypes.oneOfType([
      PropTypes.shape({
        seconds: PropTypes.number,
        nanoseconds: PropTypes.number,
      }),
      PropTypes.string, // Accept a string for default prop
    ]),
    priority: PropTypes.oneOf(["low", "medium", "high"]),
  }),
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

// Default props
TaskCard.defaultProps = {
  task: {
    title: "Untitled Task",
    completed: false,
    deadline: "No deadline",
    priority: "medium",
  },
  onToggle: () => {},
  onDelete: () => {},
  onEdit: () => {},
};
