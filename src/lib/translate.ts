import i18n from "../i18n";
import { descriptionPt } from "../data/substancesPt";

// Helpers for translating database-sourced values (categories, legal status,
// durations, routes, descriptions). These read the current language at call
// time; components that use them already re-render on language change via
// useTranslation, so the displayed values update correctly. English values
// (as stored in the DB) are the fallback.

function isPt() {
  return i18n.language.startsWith("pt");
}

const CATEGORY_PT: Record<string, string> = {
  Stimulant: "Estimulante",
  Depressant: "Depressor",
  Cannabinoid: "Canabinoide",
  "Sleep Aid": "Indutor do sono",
  SSRI: "ISRS",
  NDRI: "IRND",
  SNRI: "IRSN",
  Antidepressant: "Antidepressivo",
  "Wakefulness Promoter": "Promotor de vigília",
  Benzodiazepine: "Benzodiazepínico",
  Sedative: "Sedativo",
  Gabapentinoid: "Gabapentinoide",
  Opioid: "Opioide",
  Psychedelic: "Psicodélico",
  Empathogen: "Empatógeno",
  Dissociative: "Dissociativo",
  Antipsychotic: "Antipsicótico",
  Antihistamine: "Anti-histamínico",
};

const LEGAL_PT: Record<string, string> = {
  "Legal Everyday": "Legal / cotidiano",
  Prescription: "Prescrição",
  "Research Chemical": "Research chemical",
  "Illegal/Restricted": "Ilegal / restrito",
};

const ROUTE_PT: Record<string, string> = {
  oral: "oral",
  "oral (THC)": "oral (THC)",
  insufflated: "insuflado",
  smoked: "fumado",
  vaporized: "vaporizado",
  sublingual: "sublingual",
  inhaled: "inalado",
};

export function tCategory(name: string): string {
  return isPt() ? CATEGORY_PT[name] ?? name : name;
}

export function tLegal(name: string): string {
  return isPt() ? LEGAL_PT[name] ?? name : name;
}

export function tRoute(name: string): string {
  return isPt() ? ROUTE_PT[name] ?? name : name;
}

// Translate the time units inside a free-text duration like "5-20 minutes".
export function tDuration(d: string): string {
  if (!isPt()) return d;
  return d
    .replace(/hours?/gi, "horas")
    .replace(/minutes?/gi, "minutos");
}

export function tDescription(id: number, fallback: string): string {
  return isPt() ? descriptionPt[id] ?? fallback : fallback;
}
