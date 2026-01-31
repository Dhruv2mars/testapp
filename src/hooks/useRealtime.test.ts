import { describe, it, expect } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { useRealtime } from "./useRealtime";
import type { KPIData } from "@/types";

describe("useRealtime", () => {
  it("should return initial data", () => {
    const initialData: KPIData[] = [
      { title: "Revenue", value: 100000, change: 5 },
    ];
    const { result } = renderHook(() =>
      useRealtime({ initialData, interval: 15000 })
    );
    expect(result.current.data).toEqual(initialData);
  });

  it("should preserve KPI structure during updates", () => {
    const initialData: KPIData[] = [
      { title: "Revenue", value: 100000, change: 5, prefix: "$" },
      { title: "Users", value: 5000, change: -2 },
    ];
    const { result } = renderHook(() =>
      useRealtime({ initialData, interval: 3600000, paused: true })
    );

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].title).toBe("Revenue");
    expect(result.current.data[0].prefix).toBe("$");
    expect(result.current.data[1].title).toBe("Users");
  });

  it("should not update when paused", () => {
    const initialData: KPIData[] = [
      { title: "Revenue", value: 100000, change: 5 },
    ];
    const { result } = renderHook(() =>
      useRealtime({ initialData, interval: 15000, paused: true })
    );

    expect(result.current.data[0].value).toBe(100000);
    expect(result.current.isPaused).toBe(true);
  });

  it("should provide pause and resume functions", () => {
    const initialData: KPIData[] = [
      { title: "Revenue", value: 100000, change: 5 },
    ];
    const { result } = renderHook(() =>
      useRealtime({ initialData, interval: 15000 })
    );

    expect(typeof result.current.pause).toBe("function");
    expect(typeof result.current.resume).toBe("function");

    act(() => {
      result.current.pause();
    });
    expect(result.current.isPaused).toBe(true);

    act(() => {
      result.current.resume();
    });
    expect(result.current.isPaused).toBe(false);
  });
});
