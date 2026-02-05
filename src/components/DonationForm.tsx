"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { mapDonationError } from "@/lib/error-messages";

export default function DonationForm({ campaignId }: { campaignId: number }) {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false); // State baru untuk sukses
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiFetch(`/campaigns/${campaignId}/donations`, {
        method: "POST",
        body: JSON.stringify({
          amount: Number(amount),
          donor_name: donorName.trim() || "Hamba Allah",
        }),
      });

      // Set sukses ke true
      setIsSuccess(true);
      
      // Reset form
      setAmount("");
      setDonorName("");

      // Berikan jeda 2 detik sebelum reload agar user sempat membaca pesan sukses
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (err: any) {
      const errorMessage = mapDonationError(err);
      setError(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  // Tampilan jika donasi berhasil
  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900">Terima Kasih!</h3>
        <p className="text-green-700 text-sm">
          Donasi Anda telah berhasil dikirim. Halaman akan diperbarui dalam sekejap...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="font-bold text-gray-900">Kirim Donasi</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Input Nama & Amount tetap seperti sebelumnya */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">Nama (Opsional)</label>
        <input
          type="text"
          placeholder="Hamba Allah"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase">Jumlah Donasi</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            placeholder="0"
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-2.5 font-bold outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={amount}
            onKeyDown={(e) => ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault()}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !amount}
        className="w-full bg-blue-600 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:bg-blue-700 disabled:opacity-50 active:scale-[0.98]"
      >
        {loading ? "Memproses..." : "Donasi Sekarang"}
      </button>
    </form>
  );
}