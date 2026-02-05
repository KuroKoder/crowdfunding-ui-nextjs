"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Campaign } from "@/types/campaign";
import { mapCampaignError } from "@/lib/error-messages"; // Import helper-nya

export default function UpdateCampaignForm({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      target_amount: Number(formData.get("target_amount")),
      valid_until: formData.get("valid_until"),
      status: formData.get("status"),
    };

    try {
      await apiFetch(`/campaigns/${campaign.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      router.push(`/campaigns/${campaign.id}`);
      router.refresh();
    } catch (err: any) {
      // MENGGUNAKAN ERROR HANDLER DI SINI
      const message = mapCampaignError(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* ... Sisa input form tetap sama seperti sebelumnya ... */}
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Judul Campaign</label>
        <input
          name="title"
          type="text"
          defaultValue={campaign.title}
          required
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Status</label>
        <select 
          name="status" 
          defaultValue={campaign.status}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="OPEN">Buka (OPEN)</option>
          <option value="CLOSED">Tutup (CLOSED)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Deskripsi</label>
        <textarea
          name="description"
          defaultValue={campaign.description ?? ""}
          rows={4}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Target Dana (Rp)</label>
          <input
            name="target_amount"
            type="number"
            defaultValue={campaign.targetAmount}
            required
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Batas Waktu</label>
          <input
            name="valid_until"
            type="date"
            defaultValue={campaign.validUntil ? new Date(campaign.validUntil).toISOString().split('T')[0] : ""}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-4 border rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}