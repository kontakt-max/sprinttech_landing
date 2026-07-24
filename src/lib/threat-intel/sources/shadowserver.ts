/** Shadowserver connector — disabled by default. No scraping, no raw indicators. */

export interface ShadowserverInfo {
  enabled: boolean;
  status: "disabled" | "not_configured";
  dashboardUrl: string;
  description: string;
}

export function getShadowserverInfo(): ShadowserverInfo {
  const enabled =
    process.env.SHADOWSERVER_INTEGRATION_ENABLED === "true" &&
    Boolean(process.env.SHADOWSERVER_API_KEY);

  return {
    enabled,
    status: enabled ? "not_configured" : "disabled",
    dashboardUrl: "https://www.shadowserver.org/what-we-do/network-reporting/",
    description:
      "Zewnętrzne publiczne dashboardy Shadowserver. Integracja API wyłączona domyślnie — brak raw IP/host indicators na stronie.",
  };
}
