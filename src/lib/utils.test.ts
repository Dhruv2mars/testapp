import { describe, it, expect } from "bun:test";
import { cn, formatCurrency, formatNumber, formatPercentage } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      const result = cn("base", false && "hidden", true && "visible");
      expect(result).toBe("base visible");
    });

    it("should handle undefined and null", () => {
      const result = cn("base", undefined, null, "end");
      expect(result).toBe("base end");
    });

    it("should merge tailwind classes correctly", () => {
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });

  describe("formatCurrency", () => {
    it("should format positive numbers with $", () => {
      expect(formatCurrency(125000)).toBe("$125,000");
    });

    it("should format zero", () => {
      expect(formatCurrency(0)).toBe("$0");
    });

    it("should format negative numbers", () => {
      expect(formatCurrency(-5000)).toBe("-$5,000");
    });

    it("should format large numbers", () => {
      expect(formatCurrency(1250000)).toBe("$1,250,000");
    });

    it("should format decimal numbers", () => {
      expect(formatCurrency(1250.5)).toBe("$1,251");
    });
  });

  describe("formatNumber", () => {
    it("should format positive numbers", () => {
      expect(formatNumber(5000)).toBe("5,000");
    });

    it("should format zero", () => {
      expect(formatNumber(0)).toBe("0");
    });

    it("should format negative numbers", () => {
      expect(formatNumber(-1500)).toBe("-1,500");
    });

    it("should format large numbers", () => {
      expect(formatNumber(1000000)).toBe("1,000,000");
    });

    it("should format decimal numbers", () => {
      expect(formatNumber(1234.56)).toBe("1,235");
    });
  });

  describe("formatPercentage", () => {
    it("should format positive percentage", () => {
      expect(formatPercentage(12.5)).toBe("+12.5%");
    });

    it("should format negative percentage", () => {
      expect(formatPercentage(-5.2)).toBe("-5.2%");
    });

    it("should format zero percentage", () => {
      expect(formatPercentage(0)).toBe("0%");
    });

    it("should format with specified decimal places", () => {
      expect(formatPercentage(12.56, 1)).toBe("+12.6%");
      expect(formatPercentage(12.56, 2)).toBe("+12.56%");
    });

    it("should handle large percentages", () => {
      expect(formatPercentage(150)).toBe("+150%");
    });
  });
});
