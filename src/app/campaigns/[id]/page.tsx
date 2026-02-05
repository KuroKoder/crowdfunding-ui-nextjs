import { apiFetch } from "@/lib/api";
import { mapCampaignApiToDomain } from "@/lib/mappers/campaign-mapper";
import { notFound } from "next/navigation";
import CampaignDetail from "@/components/CampaignDetail";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ id: string }>; // Sesuai standar Next.js 15
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  let campaign = null;

  try {
    const response = await apiFetch<any>(`/campaigns/${id}`);
    
    const rawData = response.data || response;

    campaign = mapCampaignApiToDomain(rawData);
    
  } catch (error) {
    console.error("Gagal memuat campaign:", error);
    return notFound();
  }

  if (!campaign || !campaign.id) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto py-10 px-6">
        <CampaignDetail campaign={campaign} />
      </main>
    </div>
  );
}