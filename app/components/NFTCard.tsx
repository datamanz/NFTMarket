import Image from 'next/image';
import { NFT } from '../types/nft';

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={nft.image}
          alt={nft.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">
            {nft.price} {nft.currency}
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}