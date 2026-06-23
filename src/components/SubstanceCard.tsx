import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { badgeStyle } from "../lib/categoryColors";
import { useCombos } from "../context/CombosContext";

// Props interface for the SubstanceCard component.
// Accepts a PubChem CID so the component can render a molecular structure image.
type Props = {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
  cid?: number;
};

// How many times to retry a failed structure image before giving up.
// PubChem rate-limits bursts of requests (~5/sec) and returns 503 when the
// whole grid loads at once; retrying with backoff lets those recover.
const MAX_RETRIES = 4;

// SubstanceCard component - displays a clickable card for a single substance
// Navigates to the detailed substance page when clicked
function SubstanceCard({
  id,
  name,
  category,
  duration,
  description,
  cid,
}: Props) {
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

  // Retry counter for the structure image, and a flag for permanent failure.
  const [retry, setRetry] = useState(0);
  const [failed, setFailed] = useState(false);
  // Holds the pending retry timer so it can be cleared on unmount.
  const retryTimer = useRef<number | null>(null);

  // Clear any pending retry timer when the card unmounts.
  useEffect(() => {
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, []);

  // Build the PubChem image URL from the CID if one is available.
  // The `&r=` param changes on each retry so the browser re-requests instead
  // of reusing a cached failed response.
  const imageUrl = cid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=250x250&r=${retry}`
    : null;

  // On image load error, retry with exponential backoff (0.5s, 1s, 2s, 4s)
  // before falling back to the "not available" image.
  function handleError() {
    if (retry < MAX_RETRIES) {
      const delay = 500 * 2 ** retry;
      retryTimer.current = window.setTimeout(
        () => setRetry((n) => n + 1),
        delay
      );
    } else {
      setFailed(true);
    }
  }

  return (
    // Card container with click handler to navigate to substance details
    <div className="card" onClick={() => navigate(`/substance/${id}`)}>
      {/* Add / remove from the interaction checker */}
      <button
        className={`addbtn ${selected ? "addbtn--on" : ""}`}
        onClick={handleToggle}
        title={
          selected
            ? "Remove from interaction checker"
            : "Add to interaction checker"
        }
        aria-pressed={selected}
      >
        {selected ? "✓" : "+"}
      </button>

      {/* Structure image on a tinted panel. loading="lazy" avoids requesting
          every image at once, which trips PubChem's rate limit (503s). */}
      <div className="card__imgwrap">
        {imageUrl && !failed ? (
          <img
            className="card__img"
            src={imageUrl}
            alt={`${name} structure`}
            loading="lazy"
            onError={handleError}
          />
        ) : (
          <img
            className="card__img card__img--placeholder"
            src={new URL("../assets/notfound.png", import.meta.url).href}
            alt="Structure not available"
          />
        )}
      </div>

      {/* Substance name */}
      <h2 className="card__name">{name}</h2>

      {/* Category badge, color-coded by category */}
      <span className="badge" style={badgeStyle(category)}>
        {category}
      </span>

      {/* Duration of effects */}
      <p className="card__meta">
        <strong>Duration:</strong> {duration}
      </p>

      {/* Brief description */}
      <p className="card__desc">{description}</p>
    </div>
  );
}

export default SubstanceCard;
