import { describe, it, expect } from "bun:test";
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render without crashing", () => {
    const { container } = render(React.createElement(App));
    expect(container).toBeDefined();
  });

  it("should have router provider", () => {
    const { container } = render(React.createElement(App));
    expect(container.querySelector("[data-router]")).toBeDefined();
  });
});
