// Educational, category-based interaction model.
// This is NOT medical advice or substance-specific data — it maps each
// substance's category to a broad pharmacological class and applies general
// harm-reduction-style rules between those classes.

export type RiskLevel = "dangerous" | "caution" | "low" | "unknown";

export const RISK_META: Record<
  RiskLevel,
  { label: string; color: string; rank: number }
> = {
  dangerous: { label: "Dangerous", color: "#f87171", rank: 3 },
  caution: { label: "Caution", color: "#fbbf24", rank: 2 },
  low: { label: "Low risk", color: "#34d399", rank: 1 },
  unknown: { label: "Unknown", color: "#9ca3af", rank: 0 },
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

type Interaction = { level: RiskLevel; note: string };

// Rules between broad classes. Order within a pair does not matter — the
// lookup key is built from the two class names sorted alphabetically.
const RULES: Array<[string, string, RiskLevel, string]> = [
  // CNS depressants
  ["depressant", "depressant", "dangerous",
    "Combining CNS depressants can dangerously suppress breathing and heart rate — a leading cause of overdose."],
  ["depressant", "dissociative", "dangerous",
    "Both depress the central nervous system; together they raise the risk of respiratory depression and blackout."],
  ["depressant", "stimulant", "caution",
    "Each can mask the other's effects, making it easy to overdose; they also place conflicting strain on the heart."],
  ["depressant", "empathogen", "caution",
    "Depressants can blunt the experience while adding sedation and dehydration risk."],
  ["depressant", "psychedelic", "caution",
    "Generally tolerable but can be disorienting; depressants may increase the chance of a confusing experience."],
  ["depressant", "cannabinoid", "caution",
    "Cannabis can intensify sedation, dizziness, and the risk of fainting."],
  ["depressant", "antipsychotic", "caution",
    "Additive sedation and a drop in blood pressure are likely."],

  // Stimulants
  ["stimulant", "stimulant", "caution",
    "Additive cardiovascular strain — high blood pressure, racing heart, overheating, and anxiety."],
  ["stimulant", "empathogen", "caution",
    "Stacking stimulants with MDMA increases the risk of overheating, dehydration, and heart strain."],
  ["stimulant", "psychedelic", "caution",
    "Stimulants can amplify anxiety and the physical load of a psychedelic."],
  ["stimulant", "dissociative", "caution",
    "Raised heart rate and blood pressure with unpredictable headspace."],
  ["stimulant", "cannabinoid", "caution",
    "Cannabis can sharpen stimulant anxiety and increase heart rate."],
  ["stimulant", "antipsychotic", "caution",
    "Antipsychotics may blunt stimulant effects; the combination can lower the seizure threshold."],

  // Serotonergic (SSRIs/SNRIs/etc.)
  ["serotonergic", "serotonergic", "caution",
    "Stacking serotonergic drugs raises the risk of serotonin syndrome."],
  ["serotonergic", "empathogen", "caution",
    "Antidepressants usually blunt MDMA's effects, and combining serotonergic drugs carries a serotonin-syndrome risk."],
  ["serotonergic", "psychedelic", "low",
    "SSRIs/SNRIs typically reduce the effects of classic psychedelics rather than causing harm."],
  ["serotonergic", "stimulant", "caution",
    "Possible additive serotonergic and cardiovascular effects."],
  ["serotonergic", "depressant", "caution",
    "Generally manageable but can add sedation; watch for excessive drowsiness."],

  // Psychedelics
  ["psychedelic", "psychedelic", "caution",
    "Strong, often unpredictable synergy; intensity and duration can stack."],
  ["psychedelic", "dissociative", "caution",
    "Powerful synergy that can become disorienting and hard to predict."],
  ["psychedelic", "empathogen", "caution",
    "A common but intense synergy ('candyflipping') with added cardiovascular load."],
  ["psychedelic", "cannabinoid", "caution",
    "Cannabis can strongly potentiate and destabilize a psychedelic experience."],
  ["psychedelic", "antipsychotic", "low",
    "Antipsychotics generally blunt or 'cancel' classic psychedelics."],

  // Dissociatives
  ["dissociative", "dissociative", "caution",
    "Additive dissociation and sedation; easy to lose track of redosing."],
  ["dissociative", "empathogen", "caution",
    "Synergistic but adds to cardiovascular and dehydration risk."],
  ["dissociative", "cannabinoid", "caution",
    "Cannabis can deepen dissociation and disorientation."],

  // Empathogens
  ["empathogen", "empathogen", "caution",
    "Redosing or stacking empathogens increases neurotoxicity and overheating risk."],
  ["empathogen", "cannabinoid", "caution",
    "Cannabis commonly intensifies MDMA but can increase anxiety and confusion."],

  // Cannabinoids
  ["cannabinoid", "cannabinoid", "low",
    "Generally low risk; effects are mostly additive."],
];

// Build a fast lookup keyed by the sorted class pair.
const RULE_MAP = new Map<string, Interaction>();
for (const [a, b, level, note] of RULES) {
  RULE_MAP.set([a, b].sort().join("+"), { level, note });
}

// Returns the interaction between two substance categories.
export function getInteraction(
  categoryA: string,
  categoryB: string
): Interaction {
  const classA = CATEGORY_CLASS[categoryA];
  const classB = CATEGORY_CLASS[categoryB];
  if (!classA || !classB) {
    return {
      level: "unknown",
      note: "Not enough information to assess this combination.",
    };
  }
  const hit = RULE_MAP.get([classA, classB].sort().join("+"));
  if (hit) return hit;
  return {
    level: "unknown",
    note: "No specific guidance for this combination — treat with caution.",
  };
}

// Returns the highest-severity level among a set of interactions.
export function highestRisk(levels: RiskLevel[]): RiskLevel {
  return levels.reduce<RiskLevel>(
    (worst, l) => (RISK_META[l].rank > RISK_META[worst].rank ? l : worst),
    "unknown"
  );
}
