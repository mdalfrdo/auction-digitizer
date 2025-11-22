import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  variant?: "blue" | "green" | "red";
  onClick?: () => void;
}

const variantStyles = {
  blue: "bg-info hover:bg-info/90",
  green: "bg-success hover:bg-success/90",
  red: "bg-danger hover:bg-danger/90",
};

export function QuickActionCard({ title, icon: Icon, variant = "blue", onClick }: QuickActionCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <Button
        onClick={onClick}
        variant="ghost"
        className="w-full h-auto flex flex-col items-center gap-4 p-4 hover:bg-transparent"
      >
        <div className={`p-4 rounded-lg ${variantStyles[variant]} text-white`}>
          <Icon className="h-8 w-8" />
        </div>
        <span className="font-medium text-foreground">{title}</span>
      </Button>
    </Card>
  );
}
