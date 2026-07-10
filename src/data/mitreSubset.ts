/** Uproszczony subset MITRE ATT&CK Enterprise — do wizualizacji procesu SOC/pentest. */

export interface MitreTactic {
  id: string;
  name: string;
  shortName: string;
  techniques: string[];
}

export const mitreTactics: MitreTactic[] = [
  { id: "TA0001", name: "Initial Access", shortName: "Initial Access", techniques: ["Phishing", "Valid Accounts", "Exploit Public-Facing App"] },
  { id: "TA0002", name: "Execution", shortName: "Execution", techniques: ["Command and Scripting", "User Execution"] },
  { id: "TA0003", name: "Persistence", shortName: "Persistence", techniques: ["Account Manipulation", "Scheduled Task"] },
  { id: "TA0004", name: "Privilege Escalation", shortName: "Priv Esc", techniques: ["Exploitation for Privilege Escalation"] },
  { id: "TA0005", name: "Defense Evasion", shortName: "Defense Evasion", techniques: ["Disable Security Tools", "Obfuscated Files"] },
  { id: "TA0006", name: "Credential Access", shortName: "Credential Access", techniques: ["Brute Force", "OS Credential Dumping"] },
  { id: "TA0007", name: "Discovery", shortName: "Discovery", techniques: ["Network Service Scanning", "Account Discovery"] },
  { id: "TA0008", name: "Lateral Movement", shortName: "Lateral Movement", techniques: ["Remote Services", "Pass the Hash"] },
  { id: "TA0009", name: "Collection", shortName: "Collection", techniques: ["Data from Local System"] },
  { id: "TA0010", name: "Exfiltration", shortName: "Exfiltration", techniques: ["Exfiltration Over C2 Channel"] },
  { id: "TA0011", name: "Command and Control", shortName: "C2", techniques: ["Application Layer Protocol"] },
  { id: "TA0040", name: "Impact", shortName: "Impact", techniques: ["Data Encrypted for Impact", "Service Stop"] },
];

export function getMitreTacticById(id: string): MitreTactic | undefined {
  return mitreTactics.find((t) => t.id === id);
}
