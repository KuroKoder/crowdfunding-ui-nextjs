import CampaignForm from "@/components/CampaignForm";

export const metadata = {
  title: "Buat Campaign Baru | CrowdfundApp",
};

export default function CreateCampaignPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Buat Campaign</h1>
        <p className="text-gray-500 mt-2">
          Isi detail di bawah ini untuk mulai menggalang dana bagi mereka yang membutuhkan.
        </p>
      </div>

      <CampaignForm />
    </div>
  );
}