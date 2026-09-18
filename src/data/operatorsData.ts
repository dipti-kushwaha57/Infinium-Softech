export interface OperatorStat {
  raw: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  display: string;
}

export interface OperatorClient {
  name: string;
  mark: string;
  sector: string;
  tint: string;
}

export const OPERATOR_STATS: OperatorStat[] = [
  {
    raw: 24860,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Businesses live",
    display: "24,860",
  },
  {
    raw: 9,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Industries served",
    display: "9",
  },
  {
    raw: 94.2,
    decimals: 1,
    prefix: "",
    suffix: "%",
    label: "Retention",
    display: "94.2%",
  },
];

export const CLIENTS_ROW_A: OperatorClient[] = [
  { name: "Verve", mark: "VL", sector: "Logistics", tint: "#E8A21F" },
  { name: "Nimbus Foods", mark: "NF", sector: "Quick commerce", tint: "#1E9E5A" },
  { name: "Aethera Health", mark: "AH", sector: "Healthcare", tint: "#8B3FE8" },
  { name: "Monarch Schools", mark: "MS", sector: "Education", tint: "#2AA8C4" },
  { name: "Orbit Manufacturing", mark: "OM", sector: "Industrial", tint: "#1F31E8" },
];

export const CLIENTS_ROW_B: OperatorClient[] = [
  { name: "Northwind Services", mark: "NS", sector: "Home services", tint: "#4338CA" },
  { name: "Kalpa Retail", mark: "KR", sector: "Retail chain", tint: "#E0452F" },
  { name: "Suvidha Care", mark: "SC", sector: "Nursing agency", tint: "#8B3FE8" },
  { name: "Trailhead Transport", mark: "TT", sector: "Fleet operator", tint: "#E8A21F" },
  { name: "Meridian Kitchens", mark: "MK", sector: "Cloud kitchens", tint: "#0F8F87" },
];
