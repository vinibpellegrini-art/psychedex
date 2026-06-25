import { useTranslation } from "react-i18next";
import { tRoute } from "../lib/translate";

// Gradient dose spectrum: a green-to-red bar with the five dose tiers
// (threshold/light/common/strong/heavy) labelled above and their values below.
// Renders nothing if the substance has no dose data.

type Props = {
  route?: string | null;
  unit?: string | null;
  threshold?: number | null;
  light?: number | null;
  common?: number | null;
  strong?: number | null;
  heavy?: number | null;
};

const TIERS = [
  { key: "dose_threshold", color: "#2dd4bf" },
  { key: "dose_light", color: "#34d399" },
  { key: "dose_common", color: "#fbbf24" },
  { key: "dose_strong", color: "#fb923c" },
  { key: "dose_heavy", color: "#f87171" },
];

// Format a number without trailing ".0" noise.
function fmt(n: number) {
  return String(n);
}

function DoseBar({
  route,
  unit,
  threshold,
  light,
  common,
  strong,
  heavy,
}: Props) {
  const { t } = useTranslation();
  // Need a unit and all five tiers to draw a meaningful bar.
  if (
    !unit ||
    threshold == null ||
    light == null ||
    common == null ||
    strong == null ||
    heavy == null
  ) {
    return null;
  }

  const values = [threshold, light, common, strong, heavy];
  const summary = TIERS.map(
    (tier, i) => `${t(tier.key)} ${fmt(values[i])}${unit}`
  ).join(", ");

  return (
    <div className="dose">
      <div className="dose__head">
        <span className="dose__title">
          {t("dosage")}
          {route ? ` · ${tRoute(route)}` : ""} ({unit})
        </span>
        <span className="dose__note">{t("dose_note")}</span>
      </div>

      {/* Tier names, aligned to the start of each band */}
      <div className="dose__tiers">
        {TIERS.map((tier) => (
          <span
            key={tier.key}
            className="dose__tier"
            style={{ color: tier.color }}
          >
            {t(tier.key)}
          </span>
        ))}
      </div>

      {/* The gradient spectrum */}
      <div
        className="dose__bar"
        role="img"
        aria-label={`Dosage${route ? ` for ${route} use` : ""} in ${unit}: ${summary} and above`}
      />

      {/* Lower-bound value for each tier */}
      <div className="dose__values">
        {TIERS.map((tier, i) => (
          <span key={tier.key} className="dose__value">
            {fmt(values[i])}
            {i === TIERS.length - 1 ? "+" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default DoseBar;
