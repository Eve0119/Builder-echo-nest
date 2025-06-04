export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskStatus = "all" | "active" | "completed";

export interface TaskFilters {
  status: TaskStatus;
  searchQuery: string;
}
