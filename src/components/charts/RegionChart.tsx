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
import type { RegionDataPoint } from "@/types";

interface RegionChartProps {
  data: RegionDataPoint[];
  title?: string;
  className?: string;
  onClick?: () => void;
}

export function RegionChart({
  data,
  title = "Sales by Region",
  className,
  onClick,
}: RegionChartProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn("h-[300px] min-h-[300px] w-full", onClick && "cursor-pointer")}
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={handleKeyDown}
          aria-disabled={!onClick}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" width={120} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
              />
              <Legend />
              <Bar dataKey="value" name="Sales" fill="#22c55e">
                <LabelList dataKey="value" position="right" formatter={(value: number) => `$${(value / 1000).toFixed(0)}k`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
