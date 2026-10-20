export function clampProgress(value: number, maximum: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(maximum) || maximum <= 0) return 0;
  return Math.min(1, Math.max(0, value / maximum));
}
export function formatProgress(value: number): string {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(Math.max(0, value));
}