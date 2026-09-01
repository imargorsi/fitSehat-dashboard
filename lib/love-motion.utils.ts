export const LOVE_BURST_EVENT = "fitsehat-love-burst";

export function dispatchLoveBurst() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(LOVE_BURST_EVENT));
}
