import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// UI-chrome translations. Substance data (names, descriptions, categories)
// comes from the database and is not translated here.
const resources = {
  en: {
    translation: {
      // Home
      search_placeholder: "Search substances...",
      all_categories: "All categories",
      count_all_one: "{{count}} substance",
      count_all_other: "{{count}} substances",
      count_filtered_one: "{{count}} substance matches your filters",
      count_filtered_other: "{{count}} substances match your filters",
      no_results: "No substances match your search.",
      load_error: "Failed to load substances: {{error}}",

      // Card / detail shared
      duration: "Duration",
      structure_alt: "{{name}} structure",
      structure_unavailable: "Structure not available",
      add_to_checker: "Add to interaction checker",
      remove_from_checker: "Remove from interaction checker",

      // Detail page
      back: "Back",
      loading: "Loading...",
      detail_load_error: "Failed to load: {{error}}",
      not_found: "Substance not found",

      // Interaction checker
      checker_title: "Interaction checker",
      close: "Close",
      checker_empty:
        "Tap the + button on a substance card to add it here and compare how they combine.",
      overall: "Overall",
      remove_item: "Remove {{name}}",
      clear_all: "Clear all",
      add_another: "Add another substance to compare.",
      combinations: "Combinations",
      checker_disclaimer:
        "Educational estimate based on drug class only — not medical advice and not substance-specific. Always consult reliable harm-reduction sources.",

      // Risk levels
      risk_dangerous: "Dangerous",
      risk_caution: "Caution",
      risk_low: "Low risk",
      risk_unknown: "Unknown",

      // Dose bar
      dosage: "Dosage",
      dose_note: "reference ranges — not a recommendation",

      // Launcher
      interactions: "Interactions",
    },
  },
  pt: {
    translation: {
      // Home
      search_placeholder: "Buscar substâncias...",
      all_categories: "Todas as categorias",
      count_all_one: "{{count}} substância",
      count_all_other: "{{count}} substâncias",
      count_filtered_one: "{{count}} substância corresponde aos filtros",
      count_filtered_other: "{{count}} substâncias correspondem aos filtros",
      no_results: "Nenhuma substância encontrada.",
      load_error: "Falha ao carregar substâncias: {{error}}",

      // Card / detail shared
      duration: "Duração",
      structure_alt: "Estrutura de {{name}}",
      structure_unavailable: "Estrutura indisponível",
      add_to_checker: "Adicionar ao verificador de interações",
      remove_from_checker: "Remover do verificador de interações",

      // Detail page
      back: "Voltar",
      loading: "Carregando...",
      detail_load_error: "Falha ao carregar: {{error}}",
      not_found: "Substância não encontrada",

      // Interaction checker
      checker_title: "Verificador de interações",
      close: "Fechar",
      checker_empty:
        "Toque no botão + em um card de substância para adicioná-la aqui e comparar como elas se combinam.",
      overall: "Geral",
      remove_item: "Remover {{name}}",
      clear_all: "Limpar tudo",
      add_another: "Adicione outra substância para comparar.",
      combinations: "Combinações",
      checker_disclaimer:
        "Estimativa educativa baseada apenas na classe da droga — não é aconselhamento médico nem específica da substância. Sempre consulte fontes confiáveis de redução de danos.",

      // Risk levels
      risk_dangerous: "Perigoso",
      risk_caution: "Cuidado",
      risk_low: "Baixo risco",
      risk_unknown: "Desconhecido",

      // Dose bar
      dosage: "Dosagem",
      dose_note: "faixas de referência — não é uma recomendação",

      // Launcher
      interactions: "Interações",
    },
  },
};

i18n
  .use(LanguageDetector) // detect from localStorage / browser
  .use(initReactI18next) // wire into React
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "pt"],
    interpolation: { escapeValue: false }, // React already escapes
  });

export default i18n;
