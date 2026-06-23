import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase, type Substance } from "../lib/supabase";
import { badgeStyle } from "../lib/categoryColors";

// SubstancePage component - displays detailed information for one substance,
// loaded from the Supabase `substances_view` view by id.
function SubstancePage() {
  // Get the substance ID from the route parameters.
  const { id } = useParams();
  const navigate = useNavigate();

  const [substance, setSubstance] = useState<Substance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the single substance whenever the route id changes.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("substances_view")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        setError(error.message);
        setSubstance(null);
      } else {
        setSubstance(data);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="state">Loading...</p>;
  }

  if (error) {
    return <p className="state state--error">Failed to load: {error}</p>;
  }

  // Display error message if substance is not found.
  if (!substance) {
    return (
      <div className="detail">
        <button className="back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1 className="detail__title">Substance not found</h1>
      </div>
    );
  }

  // Build the PubChem structure image URL from the CID, when available.
  const imageUrl = substance.pubchem_cid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${substance.pubchem_cid}/PNG?image_size=350x350`
    : null;

  return (
    <div className="detail">
      <button className="back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="detail__body">
        {/* Molecular structure */}
        <div className="detail__imgwrap">
          <img
            className="detail__img"
            src={imageUrl ?? new URL("../assets/notfound.png", import.meta.url).href}
            alt={`${substance.name} structure`}
          />
        </div>

        {/* Info column */}
        <div>
          <h1 className="detail__title">{substance.name}</h1>

          {/* Category + legal-status tags */}
          <div className="detail__tags">
            <span className="badge" style={badgeStyle(substance.category)}>
              {substance.category}
            </span>
            {substance.legal_status && (
              <span className="badge" style={badgeStyle(substance.legal_status)}>
                {substance.legal_status}
              </span>
            )}
          </div>

          <p className="detail__row">
            <strong>Duration:</strong> {substance.duration}
          </p>

          <p className="detail__desc">{substance.description}</p>
        </div>
      </div>
    </div>
  );
}

export default SubstancePage;
