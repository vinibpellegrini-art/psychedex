import { useTranslation } from "react-i18next";

// Toggles the UI language between English and Portuguese. The choice is
// persisted to localStorage automatically by the language detector.
function LangSwitch() {
  const { i18n } = useTranslation();
  const isPt = i18n.language.startsWith("pt");
  const next = isPt ? "en" : "pt";

  return (
    <button
      className="langswitch"
      onClick={() => i18n.changeLanguage(next)}
      title={isPt ? "Switch to English" : "Mudar para Português"}
      aria-label="Toggle language"
    >
      {isPt ? "🇧🇷 PT" : "🇬🇧 EN"}
    </button>
  );
}

export default LangSwitch;
