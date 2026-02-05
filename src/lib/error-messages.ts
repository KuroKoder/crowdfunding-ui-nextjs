export function mapDonationError(err: any): string {
  const code = err?.error?.code;
  const details = err?.error?.details ?? {};

  switch (code) {
    case 'CAMPAIGN_CLOSED':
      return 'Campaign sudah ditutup.';

    case 'CAMPAIGN_EXPIRED':
      return 'Campaign sudah kedaluwarsa.';

    case 'DONATION_EXCEEDS_TARGET':
      return `Donasi melebihi target. Maksimal donasi tersisa: Rp.${details.maxAllowedDonation}`;
    case 'VALIDATION_ERROR':
        return 'Data donasi tidak valid. Silakan masukkan nilai diatas Rp 0.';

    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}

export function mapCampaignError(err: any): string {
  const code = err?.error?.code;
  const details = err?.error?.details ?? {};

  switch (code) {
    case 'TARGET_LESS_THAN_CURRENT':
      return `Target tidak boleh kurang dari dana terkumpul (Rp ${details.currentAmount.toLocaleString('id-ID')}).`;
    
    case 'VALIDATION_ERROR':
      // Jika ada detail validasi (seperti error status tadi), ambil pesan pertama
      if (details.status) return "Status yang dipilih tidak valid.";
      if (details.target_amount) return "Target dana harus berupa angka yang valid.";
      return 'Data tidak valid. Periksa kembali isian Anda.';

    case 'CAMPAIGN_NOT_FOUND':
      return 'Campaign tidak ditemukan.';

    default:
      return err?.error?.message || 'Terjadi kesalahan. Silakan coba lagi.';
  }
}