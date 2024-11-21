'use client';

import { useEffect, useState } from 'react';
import { NFT } from '../types/nft';
import NFTCard from './NFTCard';

export default function NFTList() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNFTs();
  }, [page]);

  const fetchNFTs = async () => {
    try {
      const response = await fetch(`/api/nfts?page=${page}&limit=12`);
      const data = await response.json();
      
      if (data.length < 12) {
        setHasMore(false);
      }
      
      setNfts(prevNfts => page === 1 ? data : [...prevNfts, ...data]);
    } catch (error) {
      console.error('NFT verisi çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <NFTCard key={nft._id} nft={nft} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </div>
  );
}