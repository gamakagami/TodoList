import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, getDoc, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import TaskList from "./TaskList";
import StatsCard from "./StatsCard";
import TaskModal from "./TaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTasks(currentUser.uid);
        fetchUserProfile(currentUser.uid);
      } else {
        setTasks([]);
        setFullName("");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTasks = async (userId) => {
    if (!userId) return;
    const tasksQuery = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(tasksQuery);
    const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  const fetchUserProfile = async (userId) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, "profile", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullName(userData["Full Name"] || "");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSaveTask = async (task) => {
    try {
      if (task.id) {
        await editTask(task);
      } else {
        await addTask(task);
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  const addTask = async (newTask) => {
    if (!user) return;
    try {
      // Validate and convert the deadline
      const deadline = newTask.deadline ? Timestamp.fromDate(new Date(newTask.deadline)) : null;
  
      const taskData = {
        title: newTask.title,
        completed: newTask.completed || false,
        priority: newTask.priority || "none",
        userId: user.uid,
        deadline: deadline, // Use the validated deadline
      };
  
      const docRef = await addDoc(collection(db, "tasks"), taskData);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...taskData }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  const editTask = async (updatedTask) => {
    try {
      // Validate and convert the deadline
      const deadline = updatedTask.deadline ? Timestamp.fromDate(new Date(updatedTask.deadline)) : null;
  
      await updateDoc(doc(db, "tasks", updatedTask.id), {
        title: updatedTask.title,
        completed: updatedTask.completed,
        priority: updatedTask.priority,
        deadline: deadline, // Use the validated deadline
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...updatedTask, deadline: deadline } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;

      await updateDoc(doc(db, "tasks", id), {
        completed: !task.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="p-6 sm:p-8 bg-[#3d3e6e] text-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E4DB7] mb-4 sm:mb-0">
          Welcome Back, <span className="text-[#F1DAC4]">{fullName || "User"}!</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <StatsCard title="All Tasks" count={totalTasks} bgColor="bg-[#161B33]" />
        <StatsCard title="Tasks Completed" count={completedTasks} bgColor="bg-[#161B33]" />
        <StatsCard title="Tasks Pending" count={pendingTasks} bgColor="bg-[#161B33]" />
      </div>
      <TaskList
        tasks={tasks}
        onAdd={() => {
          setSelectedTask(null);
          setIsModalOpen(true);
        }}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={handleEdit}
        onSave={handleSaveTask}
      />
      {isModalOpen && (
        <TaskModal
          editingTask={selectedTask}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}