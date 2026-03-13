"use client";

import { useEffect } from "react";

import { type AnalyticsEventProps, trackEvent } from "@/lib/analytics";

type PageViewTrackerProps = {
  eventName: string;
  props?: AnalyticsEventProps;
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
