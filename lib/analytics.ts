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
  props: Record<string, unknown> = {}
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

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", eventName, props);
  }
}

