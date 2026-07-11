import { google } from "googleapis";
import type { LeadFormData } from "@/lib/validation/lead";
import { randomUUID } from "crypto";
import { integrations } from "@/lib/env.server";

interface GoogleSheetsConfig {
  serviceAccountEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
}

function getGoogleSheetsConfig(): GoogleSheetsConfig | null {
  const { configured, email, privateKey, spreadsheetId, sheetName } =
    integrations.googleSheets;

  if (!configured || !email || !privateKey || !spreadsheetId) return null;
  return { serviceAccountEmail: email, privateKey, spreadsheetId, sheetName };
}

export async function appendLeadToSheet(
  data: LeadFormData,
  source: string = "website"
): Promise<{ success: boolean; id: string; error?: string }> {
  const config = getGoogleSheetsConfig();
  const id = randomUUID();

  if (!config) {
    console.info("[lead] Google Sheets not configured, lead logged without PII", {
      id,
      source,
      interestArea: data.interestArea,
      industry: data.industry,
    });
    return { success: true, id };
  }

  try {
    const auth = new google.auth.JWT({
      email: config.serviceAccountEmail,
      key: config.privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      id,
      new Date().toISOString(),
      source,
      data.name,
      data.company,
      data.email,
      data.phone ?? "",
      data.industry,
      data.companySize,
      data.interestArea,
      data.regulatedBy.join(", "),
      data.message,
      data.consentContact ? "yes" : "no",
      data.consentPrivacy ? "yes" : "no",
      "New",
      "",
      "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${config.sheetName}!A:Q`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return { success: true, id };
  } catch (error) {
    console.error("[lead] Google Sheets error", { id, error: String(error) });
    return { success: false, id, error: "Nie udało się zapisać danych" };
  }
}
