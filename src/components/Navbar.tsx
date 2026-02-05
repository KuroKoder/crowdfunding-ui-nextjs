import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">C</div>
          CrowdfundApp
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">
            Beranda
          </Link>
          <Link href="/campaigns" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            Jelajahi
          </Link>
          
          {/* Link Baru: Tambahkan Campaign */}
          <Link 
            href="/campaigns/create" 
            className="text-sm font-semibold text-blue-600 border border-blue-600 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm shadow-blue-50"
          >
            + Tambah Campaign
          </Link>
        </div>
      </div>
    </nav>
  );
}