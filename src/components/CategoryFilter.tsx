import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { tCategory } from "../lib/translate";

// Multi-select category filter: a button that opens a panel of checkboxes.
// Selecting none means "all categories".
type Props = {
  categories: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

function CategoryFilter({ categories, selected, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the panel on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(name: string) {
    onChange(
      selected.includes(name)
        ? selected.filter((c) => c !== name)
        : [...selected, name]
    );
  }

  const label =
    selected.length === 0
      ? t("all_categories")
      : t("n_selected", { count: selected.length });

  return (
    <div className="catfilter" ref={ref}>
      <button
        type="button"
        className="catfilter__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="catfilter__label">{label}</span>
        <span className="catfilter__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="catfilter__panel" role="listbox" aria-multiselectable="true">
          {selected.length > 0 && (
            <button
              type="button"
              className="catfilter__clear"
              onClick={() => onChange([])}
            >
              {t("clear")}
            </button>
          )}
          {categories.map((name) => (
            <label key={name} className="catfilter__item">
              <input
                type="checkbox"
                checked={selected.includes(name)}
                onChange={() => toggle(name)}
              />
              <span>{tCategory(name)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
