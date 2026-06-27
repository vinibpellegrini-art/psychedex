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
      n_selected_one: "{{count}} selected",
      n_selected_other: "{{count}} selected",
      clear: "Clear",
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
      medical_uses: "Treats (ICD-10)",
      medical_note:
        "Established / approved medical uses — these vary by country and are an educational reference, not exhaustive.",

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
      dose_threshold: "Threshold",
      dose_light: "Light",
      dose_common: "Common",
      dose_strong: "Strong",
      dose_heavy: "Heavy",

      // Launcher
      interactions: "Interactions",

      // Interaction notes (keyed by sorted class pair)
      ix_insufficient: "Not enough information to assess this combination.",
      ix_no_guidance:
        "No specific guidance for this combination — treat with caution.",
      ix_depressant_depressant:
        "Combining CNS depressants can dangerously suppress breathing and heart rate — a leading cause of overdose.",
      ix_depressant_dissociative:
        "Both depress the central nervous system; together they raise the risk of respiratory depression and blackout.",
      ix_depressant_stimulant:
        "Each can mask the other's effects, making it easy to overdose; they also place conflicting strain on the heart.",
      ix_depressant_empathogen:
        "Depressants can blunt the experience while adding sedation and dehydration risk.",
      ix_depressant_psychedelic:
        "Generally tolerable but can be disorienting; depressants may increase the chance of a confusing experience.",
      ix_cannabinoid_depressant:
        "Cannabis can intensify sedation, dizziness, and the risk of fainting.",
      ix_antipsychotic_depressant:
        "Additive sedation and a drop in blood pressure are likely.",
      ix_stimulant_stimulant:
        "Additive cardiovascular strain — high blood pressure, racing heart, overheating, and anxiety.",
      ix_empathogen_stimulant:
        "Stacking stimulants with MDMA increases the risk of overheating, dehydration, and heart strain.",
      ix_psychedelic_stimulant:
        "Stimulants can amplify anxiety and the physical load of a psychedelic.",
      ix_dissociative_stimulant:
        "Raised heart rate and blood pressure with unpredictable headspace.",
      ix_cannabinoid_stimulant:
        "Cannabis can sharpen stimulant anxiety and increase heart rate.",
      ix_antipsychotic_stimulant:
        "Antipsychotics may blunt stimulant effects; the combination can lower the seizure threshold.",
      ix_serotonergic_serotonergic:
        "Stacking serotonergic drugs raises the risk of serotonin syndrome.",
      ix_empathogen_serotonergic:
        "Antidepressants usually blunt MDMA's effects, and combining serotonergic drugs carries a serotonin-syndrome risk.",
      ix_psychedelic_serotonergic:
        "SSRIs/SNRIs typically reduce the effects of classic psychedelics rather than causing harm.",
      ix_serotonergic_stimulant:
        "Possible additive serotonergic and cardiovascular effects.",
      ix_depressant_serotonergic:
        "Generally manageable but can add sedation; watch for excessive drowsiness.",
      ix_psychedelic_psychedelic:
        "Strong, often unpredictable synergy; intensity and duration can stack.",
      ix_dissociative_psychedelic:
        "Powerful synergy that can become disorienting and hard to predict.",
      ix_empathogen_psychedelic:
        "A common but intense synergy ('candyflipping') with added cardiovascular load.",
      ix_cannabinoid_psychedelic:
        "Cannabis can strongly potentiate and destabilize a psychedelic experience.",
      ix_antipsychotic_psychedelic:
        "Antipsychotics generally blunt or 'cancel' classic psychedelics.",
      ix_dissociative_dissociative:
        "Additive dissociation and sedation; easy to lose track of redosing.",
      ix_dissociative_empathogen:
        "Synergistic but adds to cardiovascular and dehydration risk.",
      ix_cannabinoid_dissociative:
        "Cannabis can deepen dissociation and disorientation.",
      ix_empathogen_empathogen:
        "Redosing or stacking empathogens increases neurotoxicity and overheating risk.",
      ix_cannabinoid_empathogen:
        "Cannabis commonly intensifies MDMA but can increase anxiety and confusion.",
      ix_cannabinoid_cannabinoid:
        "Generally low risk; effects are mostly additive.",
    },
  },
  pt: {
    translation: {
      // Home
      search_placeholder: "Buscar substâncias...",
      all_categories: "Todas as categorias",
      n_selected_one: "{{count}} selecionada",
      n_selected_other: "{{count}} selecionadas",
      clear: "Limpar",
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
      medical_uses: "Trata (CID-10)",
      medical_note:
        "Usos médicos estabelecidos/aprovados — variam por país e são referência educativa, não exaustiva.",

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
      dose_threshold: "Limiar",
      dose_light: "Leve",
      dose_common: "Comum",
      dose_strong: "Forte",
      dose_heavy: "Pesado",

      // Launcher
      interactions: "Interações",

      // Interaction notes (keyed by sorted class pair)
      ix_insufficient: "Informação insuficiente para avaliar esta combinação.",
      ix_no_guidance:
        "Sem orientação específica para esta combinação — trate com cautela.",
      ix_depressant_depressant:
        "Combinar depressores do SNC pode suprimir perigosamente a respiração e os batimentos cardíacos — uma das principais causas de overdose.",
      ix_depressant_dissociative:
        "Ambos deprimem o sistema nervoso central; juntos, aumentam o risco de depressão respiratória e apagões.",
      ix_depressant_stimulant:
        "Cada um pode mascarar os efeitos do outro, facilitando a overdose; também sobrecarregam o coração de formas conflitantes.",
      ix_depressant_empathogen:
        "Depressores podem reduzir a experiência e ainda acrescentar sedação e risco de desidratação.",
      ix_depressant_psychedelic:
        "Geralmente tolerável, mas pode ser desorientador; depressores podem aumentar a chance de uma experiência confusa.",
      ix_cannabinoid_depressant:
        "A cannabis pode intensificar a sedação, a tontura e o risco de desmaio.",
      ix_antipsychotic_depressant:
        "Sedação aditiva e queda da pressão arterial são prováveis.",
      ix_stimulant_stimulant:
        "Sobrecarga cardiovascular aditiva — pressão alta, coração acelerado, superaquecimento e ansiedade.",
      ix_empathogen_stimulant:
        "Combinar estimulantes com MDMA aumenta o risco de superaquecimento, desidratação e sobrecarga cardíaca.",
      ix_psychedelic_stimulant:
        "Estimulantes podem amplificar a ansiedade e a carga física de um psicodélico.",
      ix_dissociative_stimulant:
        "Aumento da frequência cardíaca e da pressão, com estado mental imprevisível.",
      ix_cannabinoid_stimulant:
        "A cannabis pode acentuar a ansiedade dos estimulantes e aumentar a frequência cardíaca.",
      ix_antipsychotic_stimulant:
        "Antipsicóticos podem reduzir os efeitos dos estimulantes; a combinação pode diminuir o limiar convulsivo.",
      ix_serotonergic_serotonergic:
        "Combinar drogas serotonérgicas aumenta o risco de síndrome serotoninérgica.",
      ix_empathogen_serotonergic:
        "Antidepressivos geralmente reduzem os efeitos do MDMA, e combinar drogas serotonérgicas traz risco de síndrome serotoninérgica.",
      ix_psychedelic_serotonergic:
        "ISRS/IRSN geralmente reduzem os efeitos dos psicodélicos clássicos, em vez de causar dano.",
      ix_serotonergic_stimulant:
        "Possíveis efeitos serotonérgicos e cardiovasculares aditivos.",
      ix_depressant_serotonergic:
        "Geralmente controlável, mas pode somar sedação; atenção à sonolência excessiva.",
      ix_psychedelic_psychedelic:
        "Sinergia forte e muitas vezes imprevisível; intensidade e duração podem se somar.",
      ix_dissociative_psychedelic:
        "Sinergia poderosa que pode se tornar desorientadora e difícil de prever.",
      ix_empathogen_psychedelic:
        "Uma sinergia comum, porém intensa ('candyflipping'), com carga cardiovascular adicional.",
      ix_cannabinoid_psychedelic:
        "A cannabis pode potencializar fortemente e desestabilizar uma experiência psicodélica.",
      ix_antipsychotic_psychedelic:
        "Antipsicóticos geralmente reduzem ou 'cancelam' os psicodélicos clássicos.",
      ix_dissociative_dissociative:
        "Dissociação e sedação aditivas; é fácil perder o controle das redoses.",
      ix_dissociative_empathogen:
        "Sinérgico, mas aumenta o risco cardiovascular e de desidratação.",
      ix_cannabinoid_dissociative:
        "A cannabis pode aprofundar a dissociação e a desorientação.",
      ix_empathogen_empathogen:
        "Redosar ou combinar empatógenos aumenta o risco de neurotoxicidade e superaquecimento.",
      ix_cannabinoid_empathogen:
        "A cannabis costuma intensificar o MDMA, mas pode aumentar a ansiedade e a confusão.",
      ix_cannabinoid_cannabinoid:
        "Geralmente baixo risco; os efeitos são em sua maioria aditivos.",
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
