// Medical indications per substance, as ICD-10 codes. Educational reference of
// established / approved uses (these vary by country and are not exhaustive).
// Substances with no entry simply show no "Treats" section.

// ICD-10 code -> condition name (EN + PT). Codes are shared across substances.
export const conditions: Record<string, { en: string; pt: string }> = {
  "P28.4": { en: "Apnea of prematurity", pt: "Apneia da prematuridade" },
  "F17.2": { en: "Nicotine dependence", pt: "Dependência de nicotina" },
  G40: { en: "Epilepsy", pt: "Epilepsia" },
  G41: { en: "Status epilepticus", pt: "Estado de mal epiléptico" },
  "G47.0": { en: "Insomnia", pt: "Insônia" },
  "G47.2": {
    en: "Circadian rhythm sleep disorder",
    pt: "Transtorno do sono do ritmo circadiano",
  },
  "G47.4": { en: "Narcolepsy / cataplexy", pt: "Narcolepsia / cataplexia" },
  "G47.33": { en: "Obstructive sleep apnea", pt: "Apneia obstrutiva do sono" },
  G43: { en: "Migraine", pt: "Enxaqueca" },
  F32: { en: "Major depressive disorder", pt: "Transtorno depressivo maior" },
  F33: {
    en: "Treatment-resistant depression",
    pt: "Depressão resistente ao tratamento",
  },
  F42: {
    en: "Obsessive-compulsive disorder",
    pt: "Transtorno obsessivo-compulsivo",
  },
  "F41.0": { en: "Panic disorder", pt: "Transtorno de pânico" },
  "F41.1": {
    en: "Generalized anxiety disorder",
    pt: "Transtorno de ansiedade generalizada",
  },
  "F40.1": {
    en: "Social anxiety disorder",
    pt: "Transtorno de ansiedade social",
  },
  "F43.1": {
    en: "Post-traumatic stress disorder",
    pt: "Transtorno de estresse pós-traumático",
  },
  "F50.2": { en: "Bulimia nervosa", pt: "Bulimia nervosa" },
  F90: { en: "ADHD", pt: "TDAH" },
  "F10.23": { en: "Alcohol withdrawal", pt: "Abstinência alcoólica" },
  "F11.2": { en: "Opioid dependence", pt: "Dependência de opioides" },
  F20: { en: "Schizophrenia", pt: "Esquizofrenia" },
  F31: { en: "Bipolar disorder", pt: "Transtorno bipolar" },
  "M79.7": { en: "Fibromyalgia", pt: "Fibromialgia" },
  "M62.838": { en: "Muscle spasm", pt: "Espasmo muscular" },
  "B02.2": { en: "Postherpetic neuralgia", pt: "Neuralgia pós-herpética" },
  R52: { en: "Pain", pt: "Dor" },
  R05: { en: "Cough", pt: "Tosse" },
  E66: { en: "Obesity", pt: "Obesidade" },
  J30: { en: "Allergic rhinitis", pt: "Rinite alérgica" },
  L50: { en: "Urticaria", pt: "Urticária" },
  I95: { en: "Hypotension", pt: "Hipotensão" },
};

// substance id -> ICD-10 codes it is used to treat.
export const indications: Record<number, string[]> = {
  1: ["P28.4"], // Caffeine
  2: ["F17.2"], // Nicotine
  4: ["G40"], // CBD
  5: ["G47.0", "G47.2"], // Melatonin
  6: ["F32", "F42", "F41.0", "F50.2"], // Fluoxetine
  7: ["F32", "F42", "F43.1", "F41.0", "F40.1"], // Sertraline
  8: ["F32", "F41.1"], // Escitalopram
  9: ["F32", "F17.2"], // Bupropion
  10: ["F32", "F41.1", "F40.1", "F41.0"], // Venlafaxine
  11: ["F32", "F41.1", "M79.7"], // Duloxetine
  12: ["F32"], // Mirtazapine
  13: ["F90", "G47.4"], // Methylphenidate
  14: ["F90", "G47.4"], // Amphetamine
  15: ["F90", "G47.4"], // Dexamphetamine
  16: ["G47.4", "G47.33"], // Modafinil
  17: ["G47.4", "G47.33"], // Armodafinil
  18: ["F41.1", "G40", "M62.838", "F10.23"], // Diazepam
  19: ["F41.1", "F41.0"], // Alprazolam
  20: ["G40", "F41.0"], // Clonazepam
  21: ["F41.1", "G41"], // Lorazepam
  22: ["G47.0"], // Temazepam
  23: ["G47.0"], // Zolpidem
  24: ["B02.2", "M79.7", "F41.1", "G40"], // Pregabalin
  25: ["B02.2", "G40"], // Gabapentin
  26: ["R52", "R05"], // Codeine
  27: ["R52"], // Morphine
  28: ["R52"], // Tramadol
  29: ["R52"], // Oxycodone
  30: ["R52", "R05"], // Hydrocodone
  31: ["F11.2", "R52"], // Buprenorphine
  38: ["R52", "G40"], // Cannabis (medical)
  46: ["F90", "E66"], // Methamphetamine (Desoxyn)
  49: ["R05"], // DXM
  51: ["F33", "R52"], // Ketamine (esketamine for TRD; anesthesia/pain)
  52: ["R52"], // Nitrous Oxide (analgesia)
  53: ["R52"], // Fentanyl
  54: ["F11.2", "R52"], // Methadone
  59: ["F20", "F31", "F32"], // Quetiapine
  60: ["F32", "G47.0"], // Trazodone
  61: ["F32", "B02.2", "G43"], // Amitriptyline
  62: ["J30", "L50", "G47.0"], // Diphenhydramine
  63: ["I95", "J30"], // Ephedrine
  65: ["F41.1", "G47.0"], // Etizolam
  69: ["G47.4"], // GHB (sodium oxybate for narcolepsy/cataplexy)
};
