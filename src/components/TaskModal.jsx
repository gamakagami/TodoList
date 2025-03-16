import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

export default function TaskModal({ onClose, onSave, editingTask }) {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    title: "",
    deadline: "",
    completed: false,
    priority: "none",
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        ...editingTask,
        deadline: editingTask.deadline
          ? new Date(editingTask.deadline.seconds * 1000).toISOString().split("T")[0]
          : "",
      });
    } else {
      setTask({ title: "", deadline: "", completed: false, priority: "none" });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!task.title.trim()) return alert("Task name is required!");
  
    setLoading(true);
    try {
      // Validate and format the deadline
      const deadline = task.deadline ? new Date(task.deadline).toISOString() : null;
  
      const taskToSave = {
        ...task,
        deadline: deadline, // Pass the ISO string instead of raw input
      };
  
      await onSave(taskToSave);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add New Task"}</h2>
        <label className="block mb-2">Task Name:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 rounded-md text-white bg-[#474973]"
          placeholder="Enter task name"
        />
        <label className="block mt-2">Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={task.deadline || ""}
          onChange={handleChange}
          className="w-full p-2 rounded-md text-white bg-[#474973]"
        />
        <label className="block mt-2">Priority:</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-2 rounded-md text-white bg-[#474973]"
        >
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="mr-2"
          />
          Mark as Completed
        </label>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#F1DAC4] text-[#A69CAC] px-4 py-2 rounded-lg hover:bg-[#E5C4A8]"
            disabled={loading}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}