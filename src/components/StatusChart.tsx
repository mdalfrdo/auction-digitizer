import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", process: 12, complete: 28, cancel: 5 },
  { month: "Feb", process: 15, complete: 32, cancel: 5 },
  { month: "Mar", process: 18, complete: 38, cancel: 5 },
  { month: "Apr", process: 14, complete: 39, cancel: 5 },
  { month: "May", process: 20, complete: 45, cancel: 5 },
  { month: "Jun", process: 17, complete: 53, cancel: 5 },
];

export function StatusChart() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Purchase Request Status</h3>
          <p className="text-sm text-muted-foreground">Status distribution over time</p>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar dataKey="process" fill="hsl(var(--status-process))" name="In Process" />
            <Bar dataKey="complete" fill="hsl(var(--status-complete))" name="Completed" />
            <Bar dataKey="cancel" fill="hsl(var(--status-cancel))" name="Cancelled" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
