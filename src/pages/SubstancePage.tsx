import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase, type Substance } from "../lib/supabase";
import { badgeStyle } from "../lib/categoryColors";
import { tCategory, tLegal, tDuration, tDescription } from "../lib/translate";
import MoleculeSVG from "../components/MoleculeSVG";
import DoseBar from "../components/DoseBar";

// SubstancePage component - displays detailed information for one substance,
// loaded from the Supabase `substances_view` view by id.
function SubstancePage() {
  const { t } = useTranslation();
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
    return <p className="state">{t("loading")}</p>;
  }

  if (error) {
    return <p className="state state--error">{t("detail_load_error", { error })}</p>;
  }

  // Display error message if substance is not found.
  if (!substance) {
    return (
      <div className="detail">
        <button className="back" onClick={() => navigate("/")}>
          ← {t("back")}
        </button>
        <h1 className="detail__title">{t("not_found")}</h1>
      </div>
    );
  }

  return (
    <div className="detail">
      <button className="back" onClick={() => navigate("/")}>
        ← {t("back")}
      </button>

      <div className="detail__body">
        {/* Molecular structure (pre-rendered SVG, lazy-loaded) */}
        <div className="detail__imgwrap">
          <MoleculeSVG
            id={substance.id}
            alt={t("structure_alt", { name: substance.name })}
            className="mol mol--detail"
            placeholderClassName="detail__img"
          />
        </div>

        {/* Info column */}
        <div>
          <h1 className="detail__title">{substance.name}</h1>

          {/* Category + legal-status tags */}
          <div className="detail__tags">
            <span className="badge" style={badgeStyle(substance.category)}>
              {tCategory(substance.category)}
            </span>
            {substance.legal_status && (
              <span className="badge" style={badgeStyle(substance.legal_status)}>
                {tLegal(substance.legal_status)}
              </span>
            )}
          </div>

          <p className="detail__row">
            <strong>{t("duration")}:</strong> {tDuration(substance.duration)}
          </p>

          <p className="detail__desc">
            {tDescription(substance.id, substance.description)}
          </p>

          {/* Dose spectrum (renders only when the substance has dose data) */}
          <DoseBar
            route={substance.dose_route}
            unit={substance.dose_unit}
            threshold={substance.dose_threshold}
            light={substance.dose_light}
            common={substance.dose_common}
            strong={substance.dose_strong}
            heavy={substance.dose_heavy}
          />
        </div>
      </div>
    </div>
  );
}

export default SubstancePage;
