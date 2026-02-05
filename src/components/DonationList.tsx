import { apiFetch } from "@/lib/api";

type Donation = {
  id: number;
  donorName: string;
  amount: number;
  createdAt: string;
};

export default async function DonationList({ campaignId }: { campaignId: number }) {
  const res = await apiFetch<any>(`/campaigns/${campaignId}/donations`);
  
  // Pastikan mapping field dari API (biasanya snake_case) ke camelCase
  const donations: Donation[] = res.data.map((d: any) => ({
    id: d.id,
    donorName: d.donor_name || d.donorName || "Hamba Allah",
    amount: d.amount,
    createdAt: d.created_at || d.createdAt,
  }));

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 flex justify-between">
        Donasi Terkumpul <span className="text-blue-600">({donations.length})</span>
      </h3>
      
      {donations.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4 italic">Belum ada donasi.</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {donations.map((d) => (
            <div key={d.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  {d.donorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm leading-none mb-1">{d.donorName}</p>
                  <p className="text-[10px] text-gray-400">{new Date(d.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <span className="font-bold text-gray-700 text-sm">Rp {d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}