"use client";

import { useEffect } from "react";
import { initAttributionFromLocation } from "@/lib/attribution";

/** Captures UTM / landing / session once per mount. */
export function AnalyticsBootstrap() {
  useEffect(() => {
    initAttributionFromLocation();
  }, []);
  return null;
}
