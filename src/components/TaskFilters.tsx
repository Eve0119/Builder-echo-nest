import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskStatus, TaskFilters } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

const filterButtons: { label: string; value: TaskStatus; key: string }[] = [
  { label: "All", value: "all", key: "all" },
  { label: "Active", value: "active", key: "active" },
  { label: "Completed", value: "completed", key: "completed" },
];

export function TaskFilters({
  filters,
  onFiltersChange,
  stats,
}: TaskFiltersProps) {
  const getFilterCount = (status: TaskStatus) => {
    switch (status) {
      case "all":
        return stats.total;
      case "active":
        return stats.active;
      case "completed":
        return stats.completed;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.searchQuery}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchQuery: e.target.value })
          }
          placeholder="Search tasks..."
          className="pl-10"
        />
      </div>

      {/* Status Filter Buttons */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {filterButtons.map((button) => {
          const count = getFilterCount(button.value);
          const isActive = filters.status === button.value;

          return (
            <Button
              key={button.key}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() =>
                onFiltersChange({ ...filters, status: button.value })
              }
              className={cn(
                "flex-1 justify-center gap-2",
                isActive && "shadow-sm",
              )}
            >
              {button.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs font-medium",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground",
                )}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
