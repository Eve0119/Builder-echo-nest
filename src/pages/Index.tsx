import { useState } from "react";
import { ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskList } from "@/components/TaskList";
import { TaskStats } from "@/components/TaskStats";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTasks } from "@/hooks/useTasks";
import { TaskFilters as TaskFiltersType } from "@/types/task";

const Index = () => {
  const {
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
    getFilteredTasks,
    stats,
  } = useTasks();

  const [filters, setFilters] = useState<TaskFiltersType>({
    status: "all",
    searchQuery: "",
  });

  const filteredTasks = getFilteredTasks(filters);
  const hasCompletedTasks = stats.completed > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <ListTodo className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Personal Task Tracker</h1>
                <p className="text-sm text-muted-foreground">
                  Stay organized and get things done
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats Card */}
          <TaskStats stats={stats} />

          {/* Add Task Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <AddTaskForm onAddTask={addTask} />
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskFilters
                filters={filters}
                onFiltersChange={setFilters}
                stats={stats}
              />
            </CardContent>
          </Card>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {filters.status === "all" && "All Tasks"}
                {filters.status === "active" && "Active Tasks"}
                {filters.status === "completed" && "Completed Tasks"}
                {filters.searchQuery && ` matching "${filters.searchQuery}"`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onClearCompleted={clearCompleted}
                hasCompletedTasks={hasCompletedTasks}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Built with React, TypeScript, and TailwindCSS. Data is saved
              locally in your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
