import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { KPICard } from "@/components/kpi/KPICard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { UserGrowthChart } from "@/components/charts/UserGrowthChart";
import { FunnelChart } from "@/components/charts/FunnelChart";
import { RegionChart } from "@/components/charts/RegionChart";
import { useRealtime } from "@/hooks/useRealtime";
import { generateDashboardData } from "@/data/mockData";
import type { ChartType } from "@/types";

export function Dashboard() {
  const navigate = useNavigate();
  const initialData = useMemo(() => generateDashboardData(), []);
  const { data: kpiData } = useRealtime({
    initialData: initialData.kpis,
    interval: 15000,
  });

  const handleChartClick = (chartType: ChartType) => {
    navigate(`/analytics?chart=${chartType}`);
  };

  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={`${kpi.title}-${index}`} data={kpi} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart
            data={initialData.revenue}
            onClick={() => handleChartClick("revenue")}
          />
          <CategoryChart
            data={initialData.categories}
            onClick={() => handleChartClick("categories")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserGrowthChart
            data={initialData.userGrowth}
            onClick={() => handleChartClick("userGrowth")}
          />
          <FunnelChart
            data={initialData.funnel}
            onClick={() => handleChartClick("funnel")}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RegionChart
            data={initialData.regions}
            onClick={() => handleChartClick("regions")}
          />
        </div>
      </div>
    </Layout>
  );
}
