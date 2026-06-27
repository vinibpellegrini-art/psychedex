// Educational, category-based interaction model.
// This is NOT medical advice or substance-specific data — it maps each
// substance's category to a broad pharmacological class and applies general
// harm-reduction-style rules between those classes. Note text is resolved via
// i18n (keys like `ix_depressant_depressant`); see src/i18n.ts.

export type RiskLevel = "dangerous" | "caution" | "low" | "unknown";

export const RISK_META: Record<
  RiskLevel,
  { color: string; rank: number }
> = {
  dangerous: { color: "#f87171", rank: 3 },
  caution: { color: "#fbbf24", rank: 2 },
  low: { color: "#34d399", rank: 1 },
  unknown: { color: "#9ca3af", rank: 0 },
};

// Maps the fine-grained substance categories to broad interaction classes.
const CATEGORY_CLASS: Record<string, string> = {
  Depressant: "depressant",
  Opioid: "depressant",
  Benzodiazepine: "depressant",
  Sedative: "depressant",
  Gabapentinoid: "depressant",
  "Sleep Aid": "depressant",
  Antihistamine: "depressant",
  Stimulant: "stimulant",
  "Wakefulness Promoter": "stimulant",
  SSRI: "serotonergic",
  SNRI: "serotonergic",
  NDRI: "serotonergic",
  Antidepressant: "serotonergic",
  Empathogen: "empathogen",
  Psychedelic: "psychedelic",
  Dissociative: "dissociative",
  Cannabinoid: "cannabinoid",
  Antipsychotic: "antipsychotic",
};

type Interaction = { level: RiskLevel; noteKey: string };

// Broad interaction classes, in display order.
export const INTERACTION_CLASSES = [
  "depressant",
  "stimulant",
  "serotonergic",
  "empathogen",
  "psychedelic",
  "dissociative",
  "cannabinoid",
  "antipsychotic",
] as const;

// Risk level for each broad-class pair. Order doesn't matter — the lookup key
// is the two class names sorted alphabetically. The note text lives in i18n
// under `ix_<sorted_pair>`.
const RULES: Array<[string, string, RiskLevel]> = [
  // CNS depressants
  ["depressant", "depressant", "dangerous"],
  ["depressant", "dissociative", "dangerous"],
  ["depressant", "stimulant", "caution"],
  ["depressant", "empathogen", "caution"],
  ["depressant", "psychedelic", "caution"],
  ["depressant", "cannabinoid", "caution"],
  ["depressant", "antipsychotic", "caution"],
  // Stimulants
  ["stimulant", "stimulant", "caution"],
  ["stimulant", "empathogen", "caution"],
  ["stimulant", "psychedelic", "caution"],
  ["stimulant", "dissociative", "caution"],
  ["stimulant", "cannabinoid", "caution"],
  ["stimulant", "antipsychotic", "caution"],
  // Serotonergic
  ["serotonergic", "serotonergic", "caution"],
  ["serotonergic", "empathogen", "caution"],
  ["serotonergic", "psychedelic", "low"],
  ["serotonergic", "stimulant", "caution"],
  ["serotonergic", "depressant", "caution"],
  // Psychedelics
  ["psychedelic", "psychedelic", "caution"],
  ["psychedelic", "dissociative", "caution"],
  ["psychedelic", "empathogen", "caution"],
  ["psychedelic", "cannabinoid", "caution"],
  ["psychedelic", "antipsychotic", "low"],
  // Dissociatives
  ["dissociative", "dissociative", "caution"],
  ["dissociative", "empathogen", "caution"],
  ["dissociative", "cannabinoid", "caution"],
  // Empathogens
  ["empathogen", "empathogen", "caution"],
  ["empathogen", "cannabinoid", "caution"],
  // Cannabinoids
  ["cannabinoid", "cannabinoid", "low"],
];

// pairKey ("a+b" sorted) -> level
const RULE_MAP = new Map<string, RiskLevel>();
for (const [a, b, level] of RULES) {
  RULE_MAP.set([a, b].sort().join("+"), level);
}

// Interaction between two broad classes.
function lookupClasses(classA: string, classB: string): Interaction {
  const sorted = [classA, classB].sort();
  const level = RULE_MAP.get(sorted.join("+"));
  if (level) {
    return { level, noteKey: `ix_${sorted.join("_")}` };
  }
  return { level: "unknown", noteKey: "ix_no_guidance" };
}

// Returns the interaction between two substance categories.
export function getInteraction(
  categoryA: string,
  categoryB: string
): Interaction {
  const classA = CATEGORY_CLASS[categoryA];
  const classB = CATEGORY_CLASS[categoryB];
  if (!classA || !classB) {
    return { level: "unknown", noteKey: "ix_insufficient" };
  }
  return lookupClasses(classA, classB);
}

export type ClassInteraction = Interaction & { className: string };

// Interaction profile of one category against every broad class — used on the
// substance detail page.
export function classInteractions(category: string): ClassInteraction[] {
  const cls = CATEGORY_CLASS[category];
  if (!cls) return [];
  return INTERACTION_CLASSES.map((other) => ({
    className: other,
    ...lookupClasses(cls, other),
  }));
}

// Returns the highest-severity level among a set of interactions.
export function highestRisk(levels: RiskLevel[]): RiskLevel {
  return levels.reduce<RiskLevel>(
    (worst, l) => (RISK_META[l].rank > RISK_META[worst].rank ? l : worst),
    "unknown"
  );
}
