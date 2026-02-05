import { apiFetch } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import { Campaign } from "@/types/campaign";
import { mapCampaignApiToDomain } from "@/lib/mappers/campaign-mapper";
import CampaignCard from "@/components/CampaignCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function CampaignListPage() {
  const res = await apiFetch<ApiListResponse<any>>("/campaigns");

  const campaigns: Campaign[] =
    res.data.map(mapCampaignApiToDomain);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Semua Kampanye
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Jelajahi seluruh kampanye yang tersedia dan pilih yang ingin Anda dukung.
          </p>
        </div>
      </section>

      {/* Campaign List */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        {campaigns.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed">
            <p className="text-gray-500">
              Belum ada kampanye tersedia.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:underline text-sm"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}
