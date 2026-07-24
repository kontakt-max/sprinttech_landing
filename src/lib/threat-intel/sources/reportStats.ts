import { reportStats } from "@/data/reportStats";
import type { ReportStatItem } from "../types";

export function getStaticReportStats(): ReportStatItem[] {
  return reportStats.map((s) => ({
    id: s.id,
    label: s.label,
    value: `${s.value}${s.unit ?? ""}`,
    sourceId: s.sourceId,
    context: s.description,
    sourceName: s.sourceTitle,
    sourceUrl: s.sourceUrl,
    publicationDate: s.publicationDate,
  }));
}
