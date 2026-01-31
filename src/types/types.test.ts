import { describe, it, expect } from "bun:test";
import type {
  KPIData,
  RevenueDataPoint,
  CategoryDataPoint,
  UserGrowthDataPoint,
  FunnelStage,
  RegionDataPoint,
  DateRange,
  DashboardData,
  ProductCategory,
  FunnelStageName,
} from "./index";

describe("Types", () => {
  describe("KPIData", () => {
    it("should accept valid KPI data", () => {
      const kpi: KPIData = {
        title: "Revenue",
        value: 125000,
        change: 12.5,
        prefix: "$",
        suffix: "",
      };
      expect(kpi.title).toBe("Revenue");
      expect(kpi.value).toBe(125000);
      expect(kpi.change).toBe(12.5);
      expect(kpi.prefix).toBe("$");
    });

    it("should accept KPI data without optional fields", () => {
      const kpi: KPIData = {
        title: "Users",
        value: 5000,
        change: -5.2,
      };
      expect(kpi.prefix).toBeUndefined();
      expect(kpi.suffix).toBeUndefined();
    });
  });

  describe("RevenueDataPoint", () => {
    it("should accept valid revenue data point", () => {
      const data: RevenueDataPoint = {
        month: "Jan",
        revenue: 50000,
        target: 45000,
      };
      expect(data.month).toBe("Jan");
      expect(data.revenue).toBe(50000);
      expect(data.target).toBe(45000);
    });
  });

  describe("CategoryDataPoint", () => {
    it("should accept valid category data point", () => {
      const data: CategoryDataPoint = {
        category: "Electronics",
        value: 35000,
        percentage: 35,
      };
      expect(data.category).toBe("Electronics");
      expect(data.value).toBe(35000);
      expect(data.percentage).toBe(35);
    });
  });

  describe("UserGrowthDataPoint", () => {
    it("should accept valid user growth data point", () => {
      const data: UserGrowthDataPoint = {
        month: "Jan",
        users: 1200,
        newUsers: 300,
      };
      expect(data.month).toBe("Jan");
      expect(data.users).toBe(1200);
      expect(data.newUsers).toBe(300);
    });
  });

  describe("FunnelStage", () => {
    it("should accept valid funnel stage", () => {
      const stage: FunnelStage = {
        stage: "Visit",
        value: 10000,
        percentage: 100,
      };
      expect(stage.stage).toBe("Visit");
      expect(stage.value).toBe(10000);
      expect(stage.percentage).toBe(100);
    });

    it("should accept all funnel stage names", () => {
      const stages: FunnelStageName[] = [
        "Visit",
        "Signup",
        "Trial",
        "Paid",
        "Retained",
      ];
      stages.forEach((stageName) => {
        const stage: FunnelStage = {
          stage: stageName,
          value: 1000,
          percentage: 50,
        };
        expect(stage.stage).toBe(stageName);
      });
    });
  });

  describe("RegionDataPoint", () => {
    it("should accept valid region data point", () => {
      const data: RegionDataPoint = {
        region: "North America",
        value: 45000,
        growth: 15.5,
      };
      expect(data.region).toBe("North America");
      expect(data.value).toBe(45000);
      expect(data.growth).toBe(15.5);
    });
  });

  describe("DateRange", () => {
    it("should accept valid date range", () => {
      const range: DateRange = {
        start: "2024-01-01",
        end: "2024-12-31",
      };
      expect(range.start).toBe("2024-01-01");
      expect(range.end).toBe("2024-12-31");
    });
  });

  describe("DashboardData", () => {
    it("should accept valid dashboard data", () => {
      const data: DashboardData = {
        kpis: [
          {
            title: "Revenue",
            value: 125000,
            change: 12.5,
            prefix: "$",
          },
        ],
        revenue: [
          {
            month: "Jan",
            revenue: 50000,
            target: 45000,
          },
        ],
        categories: [
          {
            category: "Electronics",
            value: 35000,
            percentage: 35,
          },
        ],
        userGrowth: [
          {
            month: "Jan",
            users: 1200,
            newUsers: 300,
          },
        ],
        funnel: [
          {
            stage: "Visit",
            value: 10000,
            percentage: 100,
          },
        ],
        regions: [
          {
            region: "North America",
            value: 45000,
            growth: 15.5,
          },
        ],
        dateRange: {
          start: "2024-01-01",
          end: "2024-12-31",
        },
      };
      expect(data.kpis).toHaveLength(1);
      expect(data.revenue).toHaveLength(1);
      expect(data.categories).toHaveLength(1);
      expect(data.userGrowth).toHaveLength(1);
      expect(data.funnel).toHaveLength(1);
      expect(data.regions).toHaveLength(1);
      expect(data.dateRange.start).toBe("2024-01-01");
    });
  });

  describe("ProductCategory", () => {
    it("should accept all product categories", () => {
      const categories: ProductCategory[] = [
        "Electronics",
        "Fashion",
        "Home",
        "Sports",
        "Books",
      ];
      expect(categories).toHaveLength(5);
      expect(categories).toContain("Electronics");
      expect(categories).toContain("Fashion");
      expect(categories).toContain("Home");
      expect(categories).toContain("Sports");
      expect(categories).toContain("Books");
    });
  });
});
