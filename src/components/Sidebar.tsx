import { useTranslation } from "react-i18next";
import { useCombos } from "../context/CombosContext";
import { badgeStyle } from "../lib/categoryColors";
import { tCategory } from "../lib/translate";
import {
  getInteraction,
  highestRisk,
  RISK_META,
  type RiskLevel,
} from "../lib/interactions";

// Left drawer that lists the substances selected for interaction checking and
// shows the pairwise interactions between them.
function Sidebar() {
  const { t } = useTranslation();
  const { items, remove, clear, open, setOpen } = useCombos();

  // Build every unordered pair of selected substances.
  const interactions = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      interactions.push({ a, b, ...getInteraction(a.category, b.category) });
    }
  }

  const overall: RiskLevel = highestRisk(interactions.map((x) => x.level));

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar__head">
        <h3 className="sidebar__title">{t("checker_title")}</h3>
        <button
          className="iconbtn"
          onClick={() => setOpen(false)}
          title={t("close")}
        >
          ✕
        </button>
      </div>

      {items.length === 0 ? (
        <p className="sidebar__empty">{t("checker_empty")}</p>
      ) : (
        <>
          {/* Overall risk banner (only meaningful with 2+ substances) */}
          {items.length >= 2 && (
            <div
              className="risk-banner"
              style={{
                color: RISK_META[overall].color,
                borderColor: `${RISK_META[overall].color}66`,
                background: `${RISK_META[overall].color}1a`,
              }}
            >
              {t("overall")}: {t(`risk_${overall}`)}
            </div>
          )}

          {/* Selected substances */}
          <div className="sidebar__list">
            {items.map((item) => (
              <div key={item.id} className="combo-item">
                <span className="combo-item__name">{item.name}</span>
                <span className="badge" style={badgeStyle(item.category)}>
                  {tCategory(item.category)}
                </span>
                <button
                  className="iconbtn iconbtn--sm"
                  onClick={() => remove(item.id)}
                  title={t("remove_item", { name: item.name })}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="clearbtn" onClick={clear}>
            {t("clear_all")}
          </button>

          {/* Pairwise interactions */}
          {items.length < 2 ? (
            <p className="sidebar__hint">{t("add_another")}</p>
          ) : (
            <div className="interactions">
              <h4 className="interactions__title">{t("combinations")}</h4>
              {interactions.map(({ a, b, level, noteKey }) => (
                <div key={`${a.id}-${b.id}`} className="interaction">
                  <div className="interaction__head">
                    <span className="interaction__pair">
                      {a.name} + {b.name}
                    </span>
                    <span
                      className="risk-pill"
                      style={{
                        color: RISK_META[level].color,
                        borderColor: `${RISK_META[level].color}66`,
                        background: `${RISK_META[level].color}1a`,
                      }}
                    >
                      {t(`risk_${level}`)}
                    </span>
                  </div>
                  <p className="interaction__note">{t(noteKey)}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <p className="sidebar__disclaimer">{t("checker_disclaimer")}</p>
    </aside>
  );
}

export default Sidebar;
