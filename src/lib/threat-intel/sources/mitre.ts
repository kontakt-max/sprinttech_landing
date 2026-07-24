import { mitreTactics } from "@/data/mitreSubset";

export function getMitreSubset() {
  return {
    tactics: mitreTactics,
    attribution: {
      name: "MITRE ATT&CK",
      url: "https://attack.mitre.org/",
      note: "Uproszczony lokalny subset — nie pełny STIX/TAXII feed.",
    },
  };
}
