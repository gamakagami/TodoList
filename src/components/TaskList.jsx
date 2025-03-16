import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function TaskList({ tasks, onAdd, onToggle, onDelete, onEdit, onSave }) {
  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed" && !task.completed) return false;
    if (filter === "Pending" && task.completed) return false;
    if (priorityFilter !== "All" && task.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#1E4DB7]">Your Tasks</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#A69CAC] text-black px-4 py-2 rounded-lg hover:bg-[#F1DAC4] text-[#1E4DB7] w-full sm:w-auto"
        >
          Add Task
        </button>
      </div>

      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={onSave}
          editingTask={editingTask}
        />
      )}

      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
        {["All", "Completed", "Pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
              filter === type ? "bg-[#F1DAC4] text-[#1E4DB7]" : "bg-[#A69CAC] text-black"
            }`}
          >
            {type}
          </button>
        ))}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 pr-3 rounded-lg text-sm sm:text-base bg-[#A69CAC] text-black border border-gray-400"
        >
          <option value="All">All Priorities</option>
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={(task) => {
                setEditingTask(task);
                setShowModal(true);
              }}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-3 text-center mt-4">No tasks available</p>
        )}
      </div>
    </div>
  );
}