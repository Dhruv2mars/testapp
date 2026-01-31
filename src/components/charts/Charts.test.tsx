import { describe, it, expect, jest } from "bun:test";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RevenueChart } from "./RevenueChart";
import { CategoryChart } from "./CategoryChart";
import { UserGrowthChart } from "./UserGrowthChart";
import { FunnelChart } from "./FunnelChart";
import { RegionChart } from "./RegionChart";
import type {
  RevenueDataPoint,
  CategoryDataPoint,
  UserGrowthDataPoint,
  FunnelStage,
  RegionDataPoint,
} from "@/types";

// Mock recharts
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  LabelList: () => <div data-testid="label-list" />,
}));

describe("RevenueChart", () => {
  const mockData: RevenueDataPoint[] = [
    { month: "Jan", revenue: 50000, target: 45000 },
    { month: "Feb", revenue: 55000, target: 48000 },
  ];

  it("should render chart container", () => {
    const { container } = render(React.createElement(RevenueChart, { data: mockData }));
    expect(container.querySelector("[data-testid='responsive-container']")).toBeDefined();
    expect(container.querySelector("[data-testid='area-chart']")).toBeDefined();
  });

  it("should render chart with title", () => {
    const { container } = render(React.createElement(RevenueChart, { data: mockData, title: "Revenue" }));
    expect(container.textContent).toContain("Revenue");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { container } = render(React.createElement(RevenueChart, { data: mockData, onClick }));
    const chart = container.querySelector("[data-testid='area-chart']");
    expect(chart).toBeDefined();
    if (chart) {
      fireEvent.click(chart);
      expect(onClick).toHaveBeenCalled();
    }
  });

  it("should apply custom className", () => {
    const { container } = render(
      React.createElement(RevenueChart, { data: mockData, className: "custom-class" })
    );
    expect((container.firstChild as HTMLElement)?.classList.contains("custom-class")).toBe(true);
  });
});

describe("CategoryChart", () => {
  const mockData: CategoryDataPoint[] = [
    { category: "Electronics", value: 35000, percentage: 35 },
    { category: "Fashion", value: 25000, percentage: 25 },
  ];

  it("should render chart container", () => {
    const { container } = render(React.createElement(CategoryChart, { data: mockData }));
    expect(container.querySelector("[data-testid='responsive-container']")).toBeDefined();
    expect(container.querySelector("[data-testid='pie-chart']")).toBeDefined();
  });

  it("should render chart with title", () => {
    const { container } = render(React.createElement(CategoryChart, { data: mockData, title: "Categories" }));
    expect(container.textContent).toContain("Categories");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { container } = render(React.createElement(CategoryChart, { data: mockData, onClick }));
    const chart = container.querySelector("[data-testid='pie-chart']");
    expect(chart).toBeDefined();
    if (chart) {
      fireEvent.click(chart);
      expect(onClick).toHaveBeenCalled();
    }
  });
});

describe("UserGrowthChart", () => {
  const mockData: UserGrowthDataPoint[] = [
    { month: "Jan", users: 1200, newUsers: 300 },
    { month: "Feb", users: 1500, newUsers: 350 },
  ];

  it("should render chart container", () => {
    const { container } = render(React.createElement(UserGrowthChart, { data: mockData }));
    expect(container.querySelector("[data-testid='responsive-container']")).toBeDefined();
    expect(container.querySelector("[data-testid='line-chart']")).toBeDefined();
  });

  it("should render chart with title", () => {
    const { container } = render(React.createElement(UserGrowthChart, { data: mockData, title: "User Growth" }));
    expect(container.textContent).toContain("User Growth");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { container } = render(React.createElement(UserGrowthChart, { data: mockData, onClick }));
    const chart = container.querySelector("[data-testid='line-chart']");
    expect(chart).toBeDefined();
    if (chart) {
      fireEvent.click(chart);
      expect(onClick).toHaveBeenCalled();
    }
  });
});

describe("FunnelChart", () => {
  const mockData: FunnelStage[] = [
    { stage: "Visit", value: 10000, percentage: 100 },
    { stage: "Signup", value: 5000, percentage: 50 },
  ];

  it("should render chart container", () => {
    const { container } = render(React.createElement(FunnelChart, { data: mockData }));
    expect(container.querySelector("[data-testid='responsive-container']")).toBeDefined();
    expect(container.querySelector("[data-testid='bar-chart']")).toBeDefined();
  });

  it("should render chart with title", () => {
    const { container } = render(React.createElement(FunnelChart, { data: mockData, title: "Funnel" }));
    expect(container.textContent).toContain("Funnel");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { container } = render(React.createElement(FunnelChart, { data: mockData, onClick }));
    const chart = container.querySelector("[data-testid='bar-chart']");
    expect(chart).toBeDefined();
    if (chart) {
      fireEvent.click(chart);
      expect(onClick).toHaveBeenCalled();
    }
  });
});

describe("RegionChart", () => {
  const mockData: RegionDataPoint[] = [
    { region: "North America", value: 45000, growth: 15.5 },
    { region: "Europe", value: 38000, growth: 12.3 },
  ];

  it("should render chart container", () => {
    const { container } = render(React.createElement(RegionChart, { data: mockData }));
    expect(container.querySelector("[data-testid='responsive-container']")).toBeDefined();
    expect(container.querySelector("[data-testid='bar-chart']")).toBeDefined();
  });

  it("should render chart with title", () => {
    const { container } = render(React.createElement(RegionChart, { data: mockData, title: "Regions" }));
    expect(container.textContent).toContain("Regions");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    const { container } = render(React.createElement(RegionChart, { data: mockData, onClick }));
    const chart = container.querySelector("[data-testid='bar-chart']");
    expect(chart).toBeDefined();
    if (chart) {
      fireEvent.click(chart);
      expect(onClick).toHaveBeenCalled();
    }
  });
});
