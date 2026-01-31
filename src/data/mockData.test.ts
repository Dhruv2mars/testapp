import { describe, it, expect } from "bun:test";
import {
  generateRevenueData,
  generateCategoryData,
  generateUserGrowthData,
  generateFunnelData,
  generateRegionData,
  generateKPIData,
  generateDashboardData,
  MONTHS,
  PRODUCT_CATEGORIES,
  FUNNEL_STAGES,
  REGIONS,
} from "./mockData";
import type { KPIData } from "@/types";

describe("mockData", () => {
  describe("generateRevenueData", () => {
    it("should generate 12 months of revenue data", () => {
      const data = generateRevenueData();
      expect(data).toHaveLength(12);
    });

    it("should include all months", () => {
      const data = generateRevenueData();
      const months = data.map((d) => d.month);
      expect(months).toEqual(MONTHS);
    });

    it("should have positive revenue values", () => {
      const data = generateRevenueData();
      data.forEach((d) => {
        expect(d.revenue).toBeGreaterThan(0);
        expect(d.target).toBeGreaterThan(0);
      });
    });

    it("should have realistic revenue ranges", () => {
      const data = generateRevenueData();
      data.forEach((d) => {
        expect(d.revenue).toBeGreaterThanOrEqual(30000);
        expect(d.revenue).toBeLessThanOrEqual(80000);
        expect(d.target).toBeGreaterThanOrEqual(25000);
        expect(d.target).toBeLessThanOrEqual(75000);
      });
    });
  });

  describe("generateCategoryData", () => {
    it("should generate data for all 5 product categories", () => {
      const data = generateCategoryData();
      expect(data).toHaveLength(5);
    });

    it("should include all product categories", () => {
      const data = generateCategoryData();
      const categories = data.map((d) => d.category);
      expect(categories).toEqual(PRODUCT_CATEGORIES);
    });

    it("should have positive values and valid percentages", () => {
      const data = generateCategoryData();
      data.forEach((d) => {
        expect(d.value).toBeGreaterThan(0);
        expect(d.percentage).toBeGreaterThan(0);
        expect(d.percentage).toBeLessThanOrEqual(100);
      });
    });

    it("should have percentages that sum to approximately 100", () => {
      const data = generateCategoryData();
      const totalPercentage = data.reduce((sum, d) => sum + d.percentage, 0);
      expect(totalPercentage).toBeGreaterThan(95);
      expect(totalPercentage).toBeLessThanOrEqual(100);
    });
  });

  describe("generateUserGrowthData", () => {
    it("should generate 12 months of user growth data", () => {
      const data = generateUserGrowthData();
      expect(data).toHaveLength(12);
    });

    it("should include all months", () => {
      const data = generateUserGrowthData();
      const months = data.map((d) => d.month);
      expect(months).toEqual(MONTHS);
    });

    it("should have positive user values", () => {
      const data = generateUserGrowthData();
      data.forEach((d) => {
        expect(d.users).toBeGreaterThan(0);
        expect(d.newUsers).toBeGreaterThanOrEqual(0);
      });
    });

    it("should have users greater than or equal to newUsers", () => {
      const data = generateUserGrowthData();
      data.forEach((d) => {
        expect(d.users).toBeGreaterThanOrEqual(d.newUsers);
      });
    });

    it("should show cumulative user growth", () => {
      const data = generateUserGrowthData();
      for (let i = 1; i < data.length; i++) {
        expect(data[i].users).toBeGreaterThanOrEqual(data[i - 1].users);
      }
    });
  });

  describe("generateFunnelData", () => {
    it("should generate data for all 5 funnel stages", () => {
      const data = generateFunnelData();
      expect(data).toHaveLength(5);
    });

    it("should include all funnel stages in order", () => {
      const data = generateFunnelData();
      const stages = data.map((d) => d.stage);
      expect(stages).toEqual(FUNNEL_STAGES);
    });

    it("should have decreasing values through the funnel", () => {
      const data = generateFunnelData();
      for (let i = 1; i < data.length; i++) {
        expect(data[i].value).toBeLessThanOrEqual(data[i - 1].value);
      }
    });

    it("should have decreasing percentages through the funnel", () => {
      const data = generateFunnelData();
      for (let i = 1; i < data.length; i++) {
        expect(data[i].percentage).toBeLessThanOrEqual(data[i - 1].percentage);
      }
    });

    it("should have first stage at 100%", () => {
      const data = generateFunnelData();
      expect(data[0].percentage).toBe(100);
    });
  });

  describe("generateRegionData", () => {
    it("should generate data for all regions", () => {
      const data = generateRegionData();
      expect(data.length).toBeGreaterThan(0);
    });

    it("should include all defined regions", () => {
      const data = generateRegionData();
      const regions = data.map((d) => d.region);
      REGIONS.forEach((region) => {
        expect(regions).toContain(region);
      });
    });

    it("should have positive values", () => {
      const data = generateRegionData();
      data.forEach((d) => {
        expect(d.value).toBeGreaterThan(0);
      });
    });

    it("should have valid growth percentages", () => {
      const data = generateRegionData();
      data.forEach((d) => {
        expect(d.growth).toBeGreaterThanOrEqual(-50);
        expect(d.growth).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("generateKPIData", () => {
    it("should generate 4 KPIs", () => {
      const data = generateKPIData();
      expect(data).toHaveLength(4);
    });

    it("should include all required KPIs", () => {
      const data = generateKPIData();
      const titles = data.map((kpi) => kpi.title);
      expect(titles).toContain("Revenue");
      expect(titles).toContain("Users");
      expect(titles).toContain("Conversion Rate");
      expect(titles).toContain("Active Sessions");
    });

    it("should have valid KPI structure", () => {
      const data = generateKPIData();
      data.forEach((kpi: KPIData) => {
        expect(kpi.title).toBeTruthy();
        expect(typeof kpi.value).toBe("number");
        expect(typeof kpi.change).toBe("number");
      });
    });

    it("should have revenue with $ prefix", () => {
      const data = generateKPIData();
      const revenueKpi = data.find((kpi) => kpi.title === "Revenue");
      expect(revenueKpi?.prefix).toBe("$");
    });

    it("should have conversion rate with % suffix", () => {
      const data = generateKPIData();
      const conversionKpi = data.find((kpi) => kpi.title === "Conversion Rate");
      expect(conversionKpi?.suffix).toBe("%");
    });
  });

  describe("generateDashboardData", () => {
    it("should generate complete dashboard data", () => {
      const data = generateDashboardData();
      expect(data.kpis).toHaveLength(4);
      expect(data.revenue).toHaveLength(12);
      expect(data.categories).toHaveLength(5);
      expect(data.userGrowth).toHaveLength(12);
      expect(data.funnel).toHaveLength(5);
      expect(data.regions.length).toBeGreaterThan(0);
      expect(data.dateRange).toBeDefined();
    });

    it("should have valid date range", () => {
      const data = generateDashboardData();
      expect(data.dateRange.start).toBeTruthy();
      expect(data.dateRange.end).toBeTruthy();
      expect(new Date(data.dateRange.start)).toBeValidDate();
      expect(new Date(data.dateRange.end)).toBeValidDate();
    });
  });
});
