import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import type { KPIData } from "@/types";

interface KPICardProps {
  data: KPIData;
  className?: string;
}

export function KPICard({ data, className }: KPICardProps) {
  const { title, value, change, prefix, suffix } = data;
  const isPositive = change >= 0;

  const formatValue = () => {
    if (prefix === "$") return formatCurrency(value);
    if (suffix === "%") return `${value.toFixed(1)}%`;
    return formatNumber(value);
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue()}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp
              data-testid="trend-up"
              className="mr-1 h-4 w-4 text-green-500"
            />
          ) : (
            <TrendingDown
              data-testid="trend-down"
              className="mr-1 h-4 w-4 text-red-500"
            />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {formatPercentage(change)}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
