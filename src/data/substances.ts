// Array of substance data including legal, prescription, research, and illegal substances.
// Each substance object contains an id, name, category, duration, and description.
// The PubChem CID lookup is stored separately in substanceCIDMap.
export const substances = [
  // LEGAL EVERYDAY

  {
    id: 1,
    name: "Caffeine",
    category: "Stimulant",
    duration: "3-6 hours",
    description: "The world's most widely used psychoactive stimulant."
  },
  {
    id: 2,
    name: "Nicotine",
    category: "Stimulant",
    duration: "1-2 hours",
    description: "A stimulant found in tobacco products."
  },
  {
    id: 3,
    name: "Alcohol",
    category: "Depressant",
    duration: "2-8 hours",
    description: "A widely consumed central nervous system depressant."
  },
  {
    id: 4,
    name: "CBD",
    category: "Cannabinoid",
    duration: "4-8 hours",
    description: "A non-intoxicating cannabinoid."
  },
  {
    id: 5,
    name: "Melatonin",
    category: "Sleep Aid",
    duration: "4-8 hours",
    description: "A hormone used to regulate sleep cycles."
  },

  // PRESCRIPTION MEDICATIONS

  {
    id: 6,
    name: "Fluoxetine",
    category: "SSRI",
    duration: "24+ hours",
    description: "An antidepressant marketed as Prozac."
  },
  {
    id: 7,
    name: "Sertraline",
    category: "SSRI",
    duration: "24+ hours",
    description: "An antidepressant marketed as Zoloft."
  },
  {
    id: 8,
    name: "Escitalopram",
    category: "SSRI",
    duration: "24+ hours",
    description: "An antidepressant marketed as Lexapro."
  },
  {
    id: 9,
    name: "Bupropion",
    category: "NDRI",
    duration: "12-24 hours",
    description: "An antidepressant with stimulant-like properties."
  },
  {
    id: 10,
    name: "Venlafaxine",
    category: "SNRI",
    duration: "12-24 hours",
    description: "An antidepressant used for anxiety and depression."
  },
  {
    id: 11,
    name: "Duloxetine",
    category: "SNRI",
    duration: "12-24 hours",
    description: "An antidepressant also used for chronic pain."
  },
  {
    id: 12,
    name: "Mirtazapine",
    category: "Antidepressant",
    duration: "24 hours",
    description: "An antidepressant often associated with sedation."
  },
  {
    id: 13,
    name: "Methylphenidate",
    category: "Stimulant",
    duration: "3-8 hours",
    description: "Commonly prescribed for ADHD."
  },
  {
    id: 14,
    name: "Amphetamine",
    category: "Stimulant",
    duration: "4-8 hours",
    description: "Used medically for ADHD and narcolepsy."
  },
  {
    id: 15,
    name: "Dexamphetamine",
    category: "Stimulant",
    duration: "4-8 hours",
    description: "A prescription stimulant used for ADHD."
  },
  {
    id: 16,
    name: "Modafinil",
    category: "Wakefulness Promoter",
    duration: "10-15 hours",
    description: "Promotes wakefulness and alertness."
  },
  {
    id: 17,
    name: "Armodafinil",
    category: "Wakefulness Promoter",
    duration: "12-15 hours",
    description: "A longer-lasting version of modafinil."
  },
  {
    id: 18,
    name: "Diazepam",
    category: "Benzodiazepine",
    duration: "6-12 hours",
    description: "Used for anxiety, seizures, and muscle spasms."
  },
  {
    id: 19,
    name: "Alprazolam",
    category: "Benzodiazepine",
    duration: "4-6 hours",
    description: "Commonly prescribed for anxiety disorders."
  },
  {
    id: 20,
    name: "Clonazepam",
    category: "Benzodiazepine",
    duration: "8-12 hours",
    description: "Used for anxiety and epilepsy."
  },
  {
    id: 21,
    name: "Lorazepam",
    category: "Benzodiazepine",
    duration: "6-8 hours",
    description: "A benzodiazepine used for anxiety."
  },
  {
    id: 22,
    name: "Temazepam",
    category: "Benzodiazepine",
    duration: "6-8 hours",
    description: "Often prescribed for insomnia."
  },
  {
    id: 23,
    name: "Zolpidem",
    category: "Sedative",
    duration: "6-8 hours",
    description: "A prescription sleep medication."
  },
  {
    id: 24,
    name: "Pregabalin",
    category: "Gabapentinoid",
    duration: "6-8 hours",
    description: "Used for neuropathic pain and anxiety."
  },
  {
    id: 25,
    name: "Gabapentin",
    category: "Gabapentinoid",
    duration: "6-8 hours",
    description: "Used for nerve pain and seizures."
  },
  {
    id: 26,
    name: "Codeine",
    category: "Opioid",
    duration: "4-6 hours",
    description: "A mild opioid used for pain relief."
  },
  {
    id: 27,
    name: "Morphine",
    category: "Opioid",
    duration: "4-6 hours",
    description: "A powerful opioid analgesic."
  },
  {
    id: 28,
    name: "Tramadol",
    category: "Opioid",
    duration: "6-8 hours",
    description: "A synthetic opioid pain medication."
  },
  {
    id: 29,
    name: "Oxycodone",
    category: "Opioid",
    duration: "4-6 hours",
    description: "A prescription opioid analgesic."
  },
  {
    id: 30,
    name: "Hydrocodone",
    category: "Opioid",
    duration: "4-6 hours",
    description: "An opioid used for moderate to severe pain."
  },
  {
    id: 31,
    name: "Buprenorphine",
    category: "Opioid",
    duration: "12-24 hours",
    description: "Used for opioid dependence treatment."
  },

  // RESEARCH CHEMICALS

  {
    id: 32,
    name: "2C-B",
    category: "Psychedelic",
    duration: "4-8 hours",
    description: "A psychedelic phenethylamine."
  },
  {
    id: 33,
    name: "2C-E",
    category: "Psychedelic",
    duration: "8-12 hours",
    description: "A potent psychedelic phenethylamine."
  },
  {
    id: 34,
    name: "4-HO-MET",
    category: "Psychedelic",
    duration: "4-6 hours",
    description: "A synthetic tryptamine psychedelic."
  },
  {
    id: 35,
    name: "4-AcO-DMT",
    category: "Psychedelic",
    duration: "4-8 hours",
    description: "A psychedelic prodrug related to psilocin."
  },
  {
    id: 36,
    name: "AL-LAD",
    category: "Psychedelic",
    duration: "6-10 hours",
    description: "A lysergamide psychedelic."
  },
  {
    id: 37,
    name: "ETH-LAD",
    category: "Psychedelic",
    duration: "8-12 hours",
    description: "A potent lysergamide psychedelic."
  },

  // ILLEGAL / RESTRICTED

  {
    id: 38,
    name: "Cannabis",
    category: "Cannabinoid",
    duration: "2-6 hours",
    description: "Contains THC and other cannabinoids."
  },
  {
    id: 39,
    name: "Psilocybin",
    category: "Psychedelic",
    duration: "4-6 hours",
    description: "The psychoactive compound in magic mushrooms."
  },
  {
    id: 40,
    name: "LSD",
    category: "Psychedelic",
    duration: "8-12 hours",
    description: "A classic serotonergic psychedelic."
  },
  {
    id: 41,
    name: "DMT",
    category: "Psychedelic",
    duration: "5-20 minutes",
    description: "A powerful short-acting psychedelic."
  },
  {
    id: 42,
    name: "Mescaline",
    category: "Psychedelic",
    duration: "10-14 hours",
    description: "Found naturally in peyote and San Pedro cacti."
  },
  {
    id: 43,
    name: "MDMA",
    category: "Empathogen",
    duration: "4-6 hours",
    description: "Known for empathy and sociability enhancement."
  },
  {
    id: 44,
    name: "Cocaine",
    category: "Stimulant",
    duration: "30-90 minutes",
    description: "A powerful stimulant derived from coca leaves."
  },
  {
    id: 45,
    name: "Crack Cocaine",
    category: "Stimulant",
    duration: "5-15 minutes",
    description: "A smokable form of cocaine."
  },
  {
    id: 46,
    name: "Methamphetamine",
    category: "Stimulant",
    duration: "8-24 hours",
    description: "A highly potent stimulant."
  },
  {
    id: 47,
    name: "Heroin",
    category: "Opioid",
    duration: "3-5 hours",
    description: "A semi-synthetic opioid derived from morphine."
  },
  {
    id: 48,
    name: "PCP",
    category: "Dissociative",
    duration: "4-8 hours",
    description: "A dissociative anesthetic."
  },
  {
    id: 49,
    name: "DXM",
    category: "Dissociative",
    duration: "4-8 hours",
    description: "A cough suppressant with dissociative effects at high doses."
  },
  {
    id: 50,
    name: "Salvia Divinorum",
    category: "Psychedelic",
    duration: "5-15 minutes",
    description: "A powerful short-acting hallucinogenic plant."
  }
];

// Map of substance IDs to PubChem CIDs. These CIDs are used to fetch molecular structure images.
export const substanceCIDMap: Record<number, number> = {
  1: 2519,
  2: 89594,
  3: 702,
  4: 644019,
  5: 896,
  6: 3386,
  7: 68617,
  8: 6918132,
  9: 2499,
  10: 992,
  11: 60835,
  12: 3696,
  13: 4034,
  14: 3007,
  15: 5826,
  16: 8582,
  17: 4505,
  18: 3018,
  19: 2118,
  20: 2800,
  21: 3958,
  22: 5393,
  23: 5731,
  24: 5489,
  25: 3446,
  26: 5284371,
  27: 5288826,
  28: 3127,
  29: 5284603,
  30: 5284596,
  31: 131003,
  32: 29102,
  33: 5337786,
  34: 10091558,
  35: 2786977,
  36: 6332976,
  37: 5359398,
  38: 16078,
  39: 10624,
  40: 5761,
  41: 6089,
  42: 4066,
  43: 43815,
  44: 446220,
  45: 446220,
  46: 10752,
  47: 5462328,
  48: 5284616,
  49: 5284553,
  50: 123140,
};