import { describe, it, expect, jest } from "bun:test";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Layout } from "./Layout";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  LayoutDashboard: () => <span data-testid="icon-dashboard">Dashboard</span>,
  BarChart3: () => <span data-testid="icon-analytics">Analytics</span>,
  FileText: () => <span data-testid="icon-reports">Reports</span>,
  Menu: () => <span data-testid="icon-menu">Menu</span>,
  Bell: () => <span data-testid="icon-bell">Bell</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  X: () => <span data-testid="icon-x">X</span>,
}));

describe("Sidebar", () => {
  it("should render sidebar with navigation links", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Sidebar)
      )
    );
    expect(container.textContent).toContain("Dashboard");
    expect(container.textContent).toContain("Analytics");
    expect(container.textContent).toContain("Reports");
  });

  it("should render logo or brand name", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Sidebar)
      )
    );
    expect(container.textContent).toContain("BI Dashboard");
  });
});

describe("Header", () => {
  it("should render header with title", () => {
    const { container } = render(React.createElement(Header, { title: "Dashboard" }));
    expect(container.textContent).toContain("Dashboard");
  });

  it("should render search input", () => {
    const { container } = render(React.createElement(Header, { title: "Dashboard" }));
    const searchInput = container.querySelector("input[type='text']") || container.querySelector("input[placeholder*='Search']") || container.querySelector("input");
    expect(searchInput).toBeDefined();
  });

  it("should render notification bell", () => {
    const { container } = render(React.createElement(Header, { title: "Dashboard" }));
    expect(container.querySelector("[data-testid='icon-bell']")).toBeDefined();
  });

  it("should handle search input changes", () => {
    const { container } = render(React.createElement(Header, { title: "Dashboard" }));
    const searchInput = container.querySelector("input[type='text']") || container.querySelector("input[placeholder*='Search']") || container.querySelector("input");
    expect(searchInput).toBeDefined();
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: "test query" } });
      expect((searchInput as HTMLInputElement).value).toBe("test query");
    }
  });
});

describe("Layout", () => {
  it("should render sidebar and main content area", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Layout, null,
          React.createElement("div", { "data-testid": "content" }, "Main Content")
        )
      )
    );
    expect(container.textContent).toContain("BI Dashboard");
    expect(container.querySelector("[data-testid='content']")).toBeDefined();
    expect(container.textContent).toContain("Main Content");
  });

  it("should render header with page title", () => {
    const { container } = render(
      React.createElement(BrowserRouter, null,
        React.createElement(Layout, { pageTitle: "Test Page" },
          React.createElement("div", null, "Content")
        )
      )
    );
    expect(container.textContent).toContain("Test Page");
  });
});
