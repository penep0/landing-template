import type { CSSProperties } from "react";

import type { MainPageTheme } from "@/content/main-page";

export function getMainPageThemeStyle(
  theme: MainPageTheme
): CSSProperties & Record<string, string> {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--panel": theme.panel,
    "--panel-strong": theme.panelStrong,
    "--border": theme.border,
    "--accent": theme.accent,
    "--accent-strong": theme.accentStrong,
    "--muted": theme.muted,
    "--glow": theme.glow,
    "--selection": theme.selection
  };
}

