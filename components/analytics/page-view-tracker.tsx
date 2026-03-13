"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

type PageViewTrackerProps = {
  eventName: string;
  props?: Record<string, unknown>;
};

export function PageViewTracker({
  eventName,
  props = {}
}: PageViewTrackerProps) {
  useEffect(() => {
    trackEvent(eventName, props);
  }, [eventName, props]);

  return null;
}

