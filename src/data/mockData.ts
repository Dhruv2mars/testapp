import type {
  KPIData,
  RevenueDataPoint,
  CategoryDataPoint,
  UserGrowthDataPoint,
  FunnelStage,
  RegionDataPoint,
  DashboardData,
  ProductCategory,
  FunnelStageName,
} from "@/types";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Books",
];

export const FUNNEL_STAGES: FunnelStageName[] = [
  "Visit",
  "Signup",
  "Trial",
  "Paid",
  "Retained",
];

export const REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRevenueData(): RevenueDataPoint[] {
  return MONTHS.map((month) => ({
    month,
    revenue: randomInRange(30000, 80000),
    target: randomInRange(25000, 75000),
  }));
}

export function generateCategoryData(): CategoryDataPoint[] {
  const total = randomInRange(80000, 150000);
  const percentages = [35, 25, 20, 15, 5];

  return PRODUCT_CATEGORIES.map((category, index) => ({
    category,
    value: Math.round((total * percentages[index]) / 100),
    percentage: percentages[index],
  }));
}

export function generateUserGrowthData(): UserGrowthDataPoint[] {
  let cumulativeUsers = randomInRange(800, 1200);

  return MONTHS.map((month) => {
    const newUsers = randomInRange(100, 500);
    cumulativeUsers += newUsers;
    return {
      month,
      users: cumulativeUsers,
      newUsers,
    };
  });
}

export function generateFunnelData(): FunnelStage[] {
  const baseValue = randomInRange(8000, 12000);
  const conversionRates = [100, 50, 30, 15, 10];

  return FUNNEL_STAGES.map((stage, index) => ({
    stage,
    value: Math.round((baseValue * conversionRates[index]) / 100),
    percentage: conversionRates[index],
  }));
}

export function generateRegionData(): RegionDataPoint[] {
  return REGIONS.map((region) => ({
    region,
    value: randomInRange(15000, 60000),
    growth: randomInRange(-10, 40) + Math.random() * 10,
  }));
}

export function generateKPIData(): KPIData[] {
  return [
    {
      title: "Revenue",
      value: randomInRange(100000, 150000),
      change: randomInRange(-10, 25) + Math.random() * 5,
      prefix: "$",
    },
    {
      title: "Users",
      value: randomInRange(4000, 8000),
      change: randomInRange(-5, 20) + Math.random() * 5,
    },
    {
      title: "Conversion Rate",
      value: randomInRange(2, 6) + Math.random(),
      change: randomInRange(-2, 5) + Math.random(),
      suffix: "%",
    },
    {
      title: "Active Sessions",
      value: randomInRange(800, 2000),
      change: randomInRange(-15, 30) + Math.random() * 5,
    },
  ];
}

export function generateDashboardData(): DashboardData {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  return {
    kpis: generateKPIData(),
    revenue: generateRevenueData(),
    categories: generateCategoryData(),
    userGrowth: generateUserGrowthData(),
    funnel: generateFunnelData(),
    regions: generateRegionData(),
    dateRange: {
      start: startOfYear.toISOString().split("T")[0],
      end: endOfYear.toISOString().split("T")[0],
    },
  };
}
