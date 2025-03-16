export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const formatDeadline = (deadline) => {
    if (!deadline || !deadline.toDate) return "No Deadline"; // Check if deadline is valid
    const date = deadline.toDate();
    return date.toLocaleDateString(); // Format the date
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-900 flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-white">Task Name: {task.title}</h3>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Status: {task.completed ? "Completed ✅" : "Pending ⏳"}</span>
        <span>Deadline: {formatDeadline(task.deadline)}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4"
          />
          <span className="text-white">{task.completed ? "Done" : "Mark as Done"}</span>
        </label>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}