import { Campaign } from "@/types/campaign";

export function mapCampaignApiToDomain(api: any): Campaign {
  const current = api.currentAmount ?? 0;
  const target = api.targetAmount ?? 0;
  const progressFromApi = api.progressPercent ?? 0;

  const progress = target > 0 
    ? Math.round((current / target) * 100) 
    : 0;

  return {
    id: api.id,
    title: api.title,
    description: api.description,

    targetAmount: target,
    currentAmount: current,
    progressPercent: progressFromApi || progress,

    status: api.status || (progress >= 100 ? "CLOSED" : "OPEN"),
    validUntil: api.validUntil || api.valid_until,
    closedAt: api.closedAt || api.closed_at,
  };
}
