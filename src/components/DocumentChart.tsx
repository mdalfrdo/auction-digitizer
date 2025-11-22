import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", documents: 45, approved: 38, pending: 7 },
  { month: "Feb", documents: 52, approved: 45, pending: 7 },
  { month: "Mar", documents: 61, approved: 55, pending: 6 },
  { month: "Apr", documents: 58, approved: 52, pending: 6 },
  { month: "May", documents: 70, approved: 63, pending: 7 },
  { month: "Jun", documents: 75, approved: 68, pending: 7 },
  { month: "Jul", documents: 82, approved: 75, pending: 7 },
  { month: "Aug", documents: 88, approved: 81, pending: 7 },
  { month: "Sep", documents: 92, approved: 85, pending: 7 },
  { month: "Oct", documents: 92, approved: 85, pending: 7 },
];

export function DocumentChart() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Document Upload Trend</h3>
          <p className="text-sm text-muted-foreground">Monthly document statistics</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
            <Line 
              type="monotone" 
              dataKey="documents" 
              stroke="hsl(var(--info))" 
              strokeWidth={2}
              name="Total Documents"
              dot={{ fill: 'hsl(var(--info))' }}
            />
            <Line 
              type="monotone" 
              dataKey="approved" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="Approved"
              dot={{ fill: 'hsl(var(--success))' }}
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              name="Pending"
              dot={{ fill: 'hsl(var(--warning))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
