export type UTMParams = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

const STORAGE_KEY = "landing-template-utm";

export function emptyUtmParams(): UTMParams {
  return {
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: ""
  };
}

function safeWindow() {
  if (typeof window === "undefined") {
    return null;
  }

  return window;
}

export function extractUtmFromLocation(): UTMParams {
  const win = safeWindow();

  if (!win) {
    return emptyUtmParams();
  }

  const params = new URLSearchParams(win.location.search);

  return {
    source: params.get("utm_source") ?? "",
    medium: params.get("utm_medium") ?? "",
    campaign: params.get("utm_campaign") ?? "",
    term: params.get("utm_term") ?? "",
    content: params.get("utm_content") ?? ""
  };
}

export function loadStoredUtmParams(): UTMParams {
  const win = safeWindow();

  if (!win) {
    return emptyUtmParams();
  }

  const stored = win.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return emptyUtmParams();
  }

  try {
    return {
      ...emptyUtmParams(),
      ...(JSON.parse(stored) as Partial<UTMParams>)
    };
  } catch {
    return emptyUtmParams();
  }
}

export function storeUtmParams(params: UTMParams) {
  const win = safeWindow();

  if (!win) {
    return;
  }

  win.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}

