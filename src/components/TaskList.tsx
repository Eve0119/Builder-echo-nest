import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./TaskItem";
import { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  hasCompletedTasks: boolean;
}

export function TaskList({
  tasks,
  onToggle,
  onUpdate,
  onDelete,
  onClearCompleted,
  hasCompletedTasks,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No tasks found
        </h3>
        <p className="text-sm text-muted-foreground">
          Add a task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Clear Completed Button */}
      {hasCompletedTasks && (
        <div className="flex justify-center pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Completed
          </Button>
        </div>
      )}
    </div>
  );
}
