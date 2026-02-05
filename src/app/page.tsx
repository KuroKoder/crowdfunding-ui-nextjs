import CampaignCard from '@/components/CampaignCard';
import Navbar from '@/components/Navbar'; // Komponen baru di bawah
import { apiFetch } from '@/lib/api';
import { Campaign } from '@/types/campaign';
import Link from 'next/link';

type CampaignListResponse = {
  data: Campaign[];
};

export default async function Page() {
  let campaigns: Campaign[] = [];

  try {
    const res = await apiFetch<CampaignListResponse>('/campaigns');
    campaigns = res.data
      .filter((c) => c.status === "OPEN")
      .slice(0, 6);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Bantu Sesama, <span className="text-blue-600">Mulai Dari Sini.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Platform crowdfunding transparan untuk membantu mereka yang membutuhkan. 
            Setiap rupiah yang Anda berikan sangat berarti bagi mereka.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/campaigns"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Donasi Sekarang
            </a>
            <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="campaigns" className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Kampanye Aktif
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Dukung kampanye yang sedang berjalan dan berdampak nyata
            </p>
          </div>

          <Link
            href="/campaigns"
            className="text-blue-600 font-semibold text-sm hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed">
            <p className="text-gray-500 mb-4">
              Belum ada kampanye aktif saat ini
            </p>
            <Link
              href="/campaigns"
              className="text-blue-600 font-semibold hover:underline"
            >
              Lihat Arsip Kampanye
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}