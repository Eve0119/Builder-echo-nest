import { CheckCircle, Circle, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    completionRate: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const statItems = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: Target,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Active",
      value: stats.active,
      icon: Circle,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {stats.completionRate}%
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {statItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center space-y-1">
                  <Icon className={`h-5 w-5 mx-auto ${item.color}`} />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
