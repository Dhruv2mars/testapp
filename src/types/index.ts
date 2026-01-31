export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Sports"
  | "Books";

export type FunnelStageName =
  | "Visit"
  | "Signup"
  | "Trial"
  | "Paid"
  | "Retained";

export interface KPIData {
  title: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
}

export interface CategoryDataPoint {
  category: ProductCategory;
  value: number;
  percentage: number;
}

export interface UserGrowthDataPoint {
  month: string;
  users: number;
  newUsers: number;
}

export interface FunnelStage {
  stage: FunnelStageName;
  value: number;
  percentage: number;
}

export interface RegionDataPoint {
  region: string;
  value: number;
  growth: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface DashboardData {
  kpis: KPIData[];
  revenue: RevenueDataPoint[];
  categories: CategoryDataPoint[];
  userGrowth: UserGrowthDataPoint[];
  funnel: FunnelStage[];
  regions: RegionDataPoint[];
  dateRange: DateRange;
}

export type ChartType =
  | "revenue"
  | "categories"
  | "userGrowth"
  | "funnel"
  | "regions";
