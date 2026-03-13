"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";

type TrackedAnchorProps = {
  href: string;
  className?: string;
  eventName: string;
  trackingProps?: Record<string, unknown>;
  children: React.ReactNode;
};

export function TrackedAnchor({
  href,
  className,
  eventName,
  trackingProps,
  children
}: TrackedAnchorProps) {
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

