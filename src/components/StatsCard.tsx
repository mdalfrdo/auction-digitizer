import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "blue" | "green" | "orange" | "red";
}

const variantStyles = {
  blue: "bg-info text-info-foreground",
  green: "bg-success text-success-foreground",
  orange: "bg-warning text-warning-foreground",
  red: "bg-danger text-danger-foreground",
};

export function StatsCard({ title, value, subtitle, icon: Icon, variant = "blue" }: StatsCardProps) {
  return (
    <Card className={`p-6 ${variantStyles[variant]} shadow-lg relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-xs opacity-75 flex items-center gap-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="opacity-20">
          <Icon className="h-16 w-16" />
        </div>
      </div>
    </Card>
  );
}
