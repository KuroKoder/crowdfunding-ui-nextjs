import { Campaign } from "@/types/campaign";
import DonationForm from "@/components/DonationForm";
import DonationList from "@/components/DonationList";

export default function CampaignDetail({ campaign }: { campaign: Campaign | null }) {
  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-900">Campaign tidak ditemukan</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* KOLOM KIRI: INFO CAMPAIGN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {campaign.title}
            </h1>

            {/* Progress Bar Besar */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Terkumpul</p>
                  <p className="text-3xl font-black text-blue-600">
                    Rp {campaign.currentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Target</p>
                  <p className="text-xl font-bold text-gray-800">
                    Rp {campaign.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-inner"
                  style={{ width: `${Math.min(campaign.progressPercent, 100)}%` }}
                />
              </div>
              <p className="text-sm font-bold text-blue-600">{campaign.progressPercent}% Tercapai</p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold mb-4">Tentang Campaign</h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {campaign.description}
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: SIDEBAR AKSI */}
        <div className="space-y-6">
          {campaign.status === "OPEN" ? (
            <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-xl shadow-blue-50/50 ring-1 ring-blue-50">
              <DonationForm campaignId={campaign.id} />
            </div>
          ) : (
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 text-center">
              <p className="font-bold text-gray-500 italic">Campaign Ini Telah Ditutup</p>
            </div>
          )}

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <DonationList campaignId={campaign.id} />
          </div>
        </div>

      </div>
    </div>
  );
}