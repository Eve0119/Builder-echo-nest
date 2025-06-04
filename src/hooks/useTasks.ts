import { useMemo } from "react";
import { Task, TaskStatus, TaskFilters } from "@/types/task";
import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task,
      ),
    );
  };

  const updateTask = (id: string, text: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: text.trim() } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const getFilteredTasks = (filters: TaskFilters) => {
    return tasks.filter((task) => {
      // Filter by status
      if (filters.status === "active" && task.completed) return false;
      if (filters.status === "completed" && !task.completed) return false;

      // Filter by search query
      if (filters.searchQuery) {
        return task.text
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
      }

      return true;
    });
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
    getFilteredTasks,
    stats,
  };
}
