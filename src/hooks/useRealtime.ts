import { useState, useEffect, useCallback } from "react";
import type { KPIData } from "@/types";

interface UseRealtimeOptions {
  initialData: KPIData[];
  interval?: number;
  fluctuationRange?: number;
  paused?: boolean;
}

interface UseRealtimeReturn {
  data: KPIData[];
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
}

export function useRealtime({
  initialData,
  interval = 15000,
  fluctuationRange = 5,
  paused = false,
}: UseRealtimeOptions): UseRealtimeReturn {
  const [data, setData] = useState<KPIData[]>(initialData);
  const [isPaused, setIsPaused] = useState(paused);

  const fluctuateValue = useCallback(
    (value: number): number => {
      const fluctuation = (Math.random() - 0.5) * 2 * (fluctuationRange / 100);
      return Math.round(value * (1 + fluctuation));
    },
    [fluctuationRange]
  );

  const updateData = useCallback(() => {
    if (isPaused) return;

    setData((currentData) =>
      currentData.map((kpi) => ({
        ...kpi,
        value: fluctuateValue(kpi.value),
        change: kpi.change + (Math.random() - 0.5) * 2,
      }))
    );
  }, [isPaused, fluctuateValue]);

  useEffect(() => {
    const timer = setInterval(updateData, interval);
    return () => clearInterval(timer);
  }, [updateData, interval]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { data, isPaused, pause, resume };
}
