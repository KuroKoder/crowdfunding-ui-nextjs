import Link from "next/link";
import { Campaign } from "@/types/campaign";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progressWidth = Math.min(campaign.progressPercent, 100);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
            campaign.status === 'OPEN' 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {campaign.status}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            ID: #{campaign.id}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {campaign.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {campaign.description || "Tidak ada deskripsi untuk kampanye ini."}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Terkumpul</span>
              <span className="text-sm font-bold text-gray-900">
                {formatCurrency(campaign.currentAmount)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-blue-600 font-bold">{campaign.progressPercent}%</span>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-gray-400 italic">
            <span>Target: {formatCurrency(campaign.targetAmount)}</span>
          </div>
        </div>
      </div>

      {/* Bagian Tombol Aksi - Sekarang ada dua tombol */}
      <div className="p-5 pt-0 flex gap-2">
        <Link 
          href={`/campaigns/${campaign.id}`}
          className="flex-[2] text-center py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm shadow-blue-100"
        >
          Detail
        </Link>
        
        {/* Tombol Edit */}
        <Link 
          href={`/campaigns/${campaign.id}/edit`}
          className="flex-1 text-center py-2.5 bg-white text-gray-600 font-semibold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 flex items-center justify-center gap-1"
          title="Edit Campaign"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Link>
      </div>
    </div>
  );
}