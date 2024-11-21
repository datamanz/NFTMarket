import Link from 'next/link';

export default function Navbar() {
    return (
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                NFT Market
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Cüzdan Bağla
              </button>
              <Link href="/create" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                NFT Oluştur
              </Link>
              <Link href="/manage" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                Yönet
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }