"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function CampaignForm() {
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
    };

    try {
      const response: any = await apiFetch("/campaigns", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // Jika berhasil, arahkan ke detail campaign yang baru dibuat
      router.push(`/campaigns/${response.data.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Gagal membuat campaign. Periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Judul Campaign</label>
        <input
          name="title"
          type="text"
          required
          placeholder="Contoh: Bantuan Sembako untuk Lansia"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Deskripsi Lengkap</label>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Ceritakan tentang tujuan campaign ini..."
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Target Dana (Rp)</label>
          <input
            name="target_amount"
            type="number"
            required
            placeholder="1000000"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Batas Waktu</label>
          <input
            name="valid_until"
            type="date"
            required
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
      >
        {loading ? "Sedang Memproses..." : "Terbitkan Campaign"}
      </button>
    </form>
  );
}