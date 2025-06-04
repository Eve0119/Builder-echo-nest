import { useState } from "react";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdate(task.id, editText);
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-sm",
        task.completed && "opacity-60",
      )}
    >
      {/* Checkbox */}
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="shrink-0"
      />

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="h-auto p-0 border-none shadow-none focus-visible:ring-0"
            autoFocus
          />
        ) : (
          <div className="space-y-1">
            <p
              className={cn(
                "text-sm break-words",
                task.completed && "line-through text-muted-foreground",
              )}
            >
              {task.text}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                Created {format(new Date(task.createdAt), "MMM d, HH:mm")}
              </span>
              {task.completed && task.completedAt && (
                <>
                  <span>•</span>
                  <span>
                    Completed{" "}
                    {format(new Date(task.completedAt), "MMM d, HH:mm")}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              disabled={task.completed}
            >
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit task</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
