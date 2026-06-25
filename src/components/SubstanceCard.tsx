import { useNavigate } from "react-router-dom";
import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { badgeStyle } from "../lib/categoryColors";
import { useCombos } from "../context/CombosContext";
import { tCategory, tDuration, tDescription } from "../lib/translate";
import MoleculeSVG from "./MoleculeSVG";

// Props interface for the SubstanceCard component.
type Props = {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
};

// SubstanceCard component - displays a clickable card for a single substance
// Navigates to the detailed substance page when clicked
function SubstanceCard({ id, name, category, duration, description }: Props) {
  const { t } = useTranslation();
  // Hook to navigate to the substance detail page on card click.
  const navigate = useNavigate();

  // Interaction-checker selection state.
  const { has, toggle, setOpen } = useCombos();
  const selected = has(id);

  // Add/remove this substance from the interaction checker. stopPropagation
  // keeps the card's navigation from firing. Opens the sidebar when adding.
  function handleToggle(e: MouseEvent) {
    e.stopPropagation();
    if (!selected) setOpen(true);
    toggle({ id, name, category });
  }

  return (
    // Card container with click handler to navigate to substance details
    <div className="card" onClick={() => navigate(`/substance/${id}`)}>
      {/* Add / remove from the interaction checker */}
      <button
        className={`addbtn ${selected ? "addbtn--on" : ""}`}
        onClick={handleToggle}
        title={selected ? t("remove_from_checker") : t("add_to_checker")}
        aria-pressed={selected}
      >
        {selected ? "✓" : "+"}
      </button>

      {/* Molecular structure (pre-rendered SVG, lazy-loaded) */}
      <div className="card__imgwrap">
        <MoleculeSVG
          id={id}
          alt={t("structure_alt", { name })}
          className="mol"
          placeholderClassName="card__img card__img--placeholder"
        />
      </div>

      {/* Substance name */}
      <h2 className="card__name">{name}</h2>

      {/* Category badge, color-coded by category */}
      <span className="badge" style={badgeStyle(category)}>
        {tCategory(category)}
      </span>

      {/* Duration of effects */}
      <p className="card__meta">
        <strong>{t("duration")}:</strong> {tDuration(duration)}
      </p>

      {/* Brief description */}
      <p className="card__desc">{tDescription(id, description)}</p>
    </div>
  );
}

export default SubstanceCard;
