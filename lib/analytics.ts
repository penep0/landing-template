import { track } from "@vercel/analytics";

export type AnalyticsEventProps = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, unknown>;
      }
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  props: AnalyticsEventProps = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer?.push({
    event: eventName,
    ...props
  });

  window.plausible?.(eventName, {
    props
  });

  track(eventName, props);

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", eventName, props);
  }
}
