import type { CSSProperties } from "react";

// Maps each substance category to an accent color used by the badge pills.
// Falls back to the brand violet for anything unmapped.
const CATEGORY_COLORS: Record<string, string> = {
  Stimulant: "#fbbf24", // amber
  Depressant: "#60a5fa", // blue
  Cannabinoid: "#34d399", // green
  "Sleep Aid": "#818cf8", // indigo
  Sedative: "#a5b4fc", // soft indigo
  SSRI: "#2dd4bf", // teal
  SNRI: "#5eead4", // light teal
  NDRI: "#22d3ee", // cyan
  Antidepressant: "#67e8f9", // light cyan
  "Wakefulness Promoter": "#facc15", // yellow
  Benzodiazepine: "#38bdf8", // sky
  Gabapentinoid: "#a3e635", // lime
  Opioid: "#f87171", // red
  Psychedelic: "#c084fc", // violet (brand)
  Empathogen: "#f472b6", // pink
  Dissociative: "#e879f9", // fuchsia
};

const FALLBACK = "#c084fc";

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? FALLBACK;
}

// Inline style for a badge pill in the given category's color.
export function badgeStyle(category: string): CSSProperties {
  const color = categoryColor(category);
  return {
    color,
    borderColor: `${color}66`, // ~40% alpha border
    background: `${color}1a`, // ~10% alpha fill
  };
}
