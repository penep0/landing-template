"use client";

import Link from "next/link";

import { type AnalyticsEventProps, trackEvent } from "@/lib/analytics";

type TrackedAnchorProps = {
  href: string;
  className?: string;
  eventName: string;
  trackingProps?: AnalyticsEventProps;
  children: React.ReactNode;
};

export function TrackedAnchor({
  href,
  className,
  eventName,
  trackingProps,
  children
}: TrackedAnchorProps) {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          trackEvent(eventName, trackingProps);

          const targetId = href.slice(1);
          const targetElement = document.getElementById(targetId);

          if (!targetElement) {
            return;
          }

          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          window.history.replaceState(null, "", href);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent(eventName, trackingProps);
      }}
    >
      {children}
    </Link>
  );
}
