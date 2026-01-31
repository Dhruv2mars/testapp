import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FunnelStage } from "@/types";

interface FunnelChartProps {
  data: FunnelStage[];
  title?: string;
  className?: string;
  onClick?: () => void;
}

export function FunnelChart({
  data,
  title = "Conversion Funnel",
  className,
  onClick,
}: FunnelChartProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] min-h-[300px] w-full cursor-pointer" onClick={onClick}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={80} />
              <Tooltip
                formatter={(value: number) => [
                  value.toLocaleString(),
                  "Users",
                ]}
              />
              <Legend />
              <Bar dataKey="value" name="Users" fill="#3b82f6">
                <LabelList dataKey="percentage" position="right" formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
