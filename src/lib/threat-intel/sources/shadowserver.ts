/** Shadowserver connector — disabled by default. No scraping, no raw indicators. */
import { integrations } from "@/lib/env.server";

export interface ShadowserverInfo {
  enabled: boolean;
  status: "disabled" | "not_configured";
  dashboardUrl: string;
  description: string;
}

export function getShadowserverInfo(): ShadowserverInfo {
  const enabled = integrations.shadowserver.enabled;

  return {
    enabled,
    status: enabled ? "not_configured" : "disabled",
    dashboardUrl: "https://www.shadowserver.org/what-we-do/network-reporting/",
    description:
      "Zewnętrzne publiczne dashboardy Shadowserver. Integracja API wyłączona domyślnie — brak raw IP/host indicators na stronie.",
  };
}
