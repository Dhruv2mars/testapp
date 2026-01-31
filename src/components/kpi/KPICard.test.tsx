import { describe, it, expect } from "bun:test";
import React from "react";
import { render } from "@testing-library/react";
import { KPICard } from "./KPICard";
import type { KPIData } from "@/types";

describe("KPICard", () => {
  const mockKPI: KPIData = {
    title: "Revenue",
    value: 125000,
    change: 12.5,
    prefix: "$",
  };

  it("should render KPI title", () => {
    const { container } = render(React.createElement(KPICard, { data: mockKPI }));
    expect(container.textContent).toContain("Revenue");
  });

  it("should render KPI value with prefix", () => {
    const { container } = render(React.createElement(KPICard, { data: mockKPI }));
    expect(container.textContent).toContain("$125,000");
  });

  it("should render KPI value with suffix", () => {
    const kpiWithSuffix: KPIData = {
      title: "Conversion Rate",
      value: 3.5,
      change: -2.1,
      suffix: "%",
    };
    const { container } = render(React.createElement(KPICard, { data: kpiWithSuffix }));
    expect(container.textContent).toContain("3.5%");
  });

  it("should render positive change with upward indicator", () => {
    const { container } = render(React.createElement(KPICard, { data: mockKPI }));
    expect(container.textContent).toContain("+12.5%");
    expect(container.querySelector("[data-testid='trend-up']")).toBeDefined();
  });

  it("should render negative change with downward indicator", () => {
    const negativeKPI: KPIData = {
      title: "Users",
      value: 5000,
      change: -5.2,
    };
    const { container } = render(React.createElement(KPICard, { data: negativeKPI }));
    expect(container.textContent).toContain("-5.2%");
    expect(container.querySelector("[data-testid='trend-down']")).toBeDefined();
  });

  it("should render without prefix or suffix", () => {
    const plainKPI: KPIData = {
      title: "Active Sessions",
      value: 1234,
      change: 8.3,
    };
    const { container } = render(React.createElement(KPICard, { data: plainKPI }));
    expect(container.textContent).toContain("1,234");
  });

  it("should apply custom className", () => {
    const { container } = render(
      React.createElement(KPICard, { data: mockKPI, className: "custom-class" })
    );
    expect((container.firstChild as HTMLElement)?.classList.contains("custom-class")).toBe(true);
  });

  it("should handle zero change", () => {
    const zeroChangeKPI: KPIData = {
      title: "Metric",
      value: 100,
      change: 0,
    };
    const { container } = render(React.createElement(KPICard, { data: zeroChangeKPI }));
    expect(container.textContent).toContain("0%");
  });
});
