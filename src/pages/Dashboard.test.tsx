import { describe, it, expect, jest } from "bun:test";
import React from "react";
import { render } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { BrowserRouter } from "react-router-dom";

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

// Mock lucide-react
jest.mock("lucide-react", () => ({
  TrendingUp: () => <span data-testid="trend-up">Up</span>,
  TrendingDown: () => <span data-testid="trend-down">Down</span>,
  LayoutDashboard: () => <span data-testid="icon-dashboard">Dashboard</span>,
  BarChart3: () => <span data-testid="icon-analytics">Analytics</span>,
  FileText: () => <span data-testid="icon-reports">Reports</span>,
  Menu: () => <span data-testid="icon-menu">Menu</span>,
  Bell: () => <span data-testid="icon-bell">Bell</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  X: () => <span data-testid="icon-x">X</span>,
  Calendar: () => <span data-testid="icon-calendar">Calendar</span>,
  DollarSign: () => <span data-testid="icon-dollar">$</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  Activity: () => <span data-testid="icon-activity">Activity</span>,
}));

describe("Dashboard", () => {
  it("should render dashboard with layout", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Dashboard)
      )
    );
    expect(container.textContent).toContain("BI Dashboard");
  });

  it("should render KPI cards", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Dashboard)
      )
    );
    expect(container.textContent).toContain("Revenue");
    expect(container.textContent).toContain("Users");
    expect(container.textContent).toContain("Conversion Rate");
    expect(container.textContent).toContain("Active Sessions");
  });

  it("should render charts", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Dashboard)
      )
    );
    expect(container.querySelector("[data-testid='area-chart']")).toBeDefined();
    expect(container.querySelector("[data-testid='pie-chart']")).toBeDefined();
    expect(container.querySelector("[data-testid='line-chart']")).toBeDefined();
    expect(container.querySelector("[data-testid='bar-chart']")).toBeDefined();
  });

  it("should render sidebar navigation", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Dashboard)
      )
    );
    expect(container.textContent).toContain("BI Dashboard");
  });
});
