'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CreateNFTForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    currency: 'ETH',
    image: '',
    type: 'image'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/nfts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('NFT oluşturulamadı');
      }

      // Form başarılı ise formu temizle
      setFormData({
        title: '',
        price: '',
        currency: 'ETH',
        image: '',
        type: 'image'
      });
      setPreview('');
      alert('NFT başarıyla oluşturuldu!');
      
    } catch (error) {
      console.error('Hata:', error);
      alert('NFT oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Yeni NFT Oluştur</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Başlık</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Fiyat</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="ETH">ETH</option>
              <option value="MATIC">MATIC</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1">Görsel URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => {
              setFormData({...formData, image: e.target.value});
              setPreview(e.target.value);
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {preview && (
          <div className="relative h-48 rounded overflow-hidden">
            <Image
              src={preview}
              alt="NFT önizleme"
              fill
              className="object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Oluşturuluyor...' : 'NFT Oluştur'}
        </button>
      </div>
    </form>
  );
}