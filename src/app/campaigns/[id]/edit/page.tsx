import { apiFetch } from "@/lib/api";
import { mapCampaignApiToDomain } from "@/lib/mappers/campaign-mapper";
import { notFound } from "next/navigation";
import UpdateCampaignForm from "@/components/UpdateCampaignForm";

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let campaign = null;
  try {
    const res = await apiFetch<any>(`/campaigns/${id}`);
    campaign = mapCampaignApiToDomain(res.data || res);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Edit Campaign</h1>
        <p className="text-gray-500 mt-2">Perbarui informasi campaign Anda.</p>
      </div>

      <UpdateCampaignForm campaign={campaign} />
    </div>
  );
}