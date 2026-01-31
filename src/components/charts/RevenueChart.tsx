import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types";

interface RevenueChartProps {
  data: RevenueDataPoint[];
  title?: string;
  className?: string;
  onClick?: () => void;
}

export function RevenueChart({
  data,
  title = "Revenue Overview",
  className,
  onClick,
}: RevenueChartProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] min-h-[300px] w-full cursor-pointer" onClick={onClick}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#16a34a"
                fill="#22c55e"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
