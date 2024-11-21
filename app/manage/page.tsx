'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { NFT } from '../types/nft';

export default function ManagePage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await fetch('/api/nfts');
      const data = await response.json();
      setNfts(data);
    } catch (error) {
      toast.error('NFT\'ler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu NFT\'yi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/nfts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      toast.success('NFT başarıyla silindi');
      setNfts(nfts.filter(nft => nft._id !== id));
    } catch (error) {
      toast.error('NFT silinirken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">NFT Yönetimi</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Görsel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {nfts.map((nft) => (
                  <tr key={nft._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-16 w-16">
                        <img src={nft.image} alt={nft.title} className="object-cover rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{nft.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nft.price} {nft.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => window.location.href = `/manage/edit/${nft._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(nft._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}