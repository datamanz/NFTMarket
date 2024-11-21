'use client';

import { useState } from 'react';
import { FilterOptions } from '../types/nft';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    type: undefined,
    priceRange: { min: 0, max: 0 },
    sortBy: undefined,
    sortOrder: undefined,
    page: 1,
    limit: 12
  });

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
      <div className="flex flex-wrap gap-4">
        <select className="p-2 rounded border">
          <option value="">Tüm Türler</option>
          <option value="image">Görsel</option>
          <option value="video">Video</option>
        </select>
        
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min Fiyat"
            className="p-2 rounded border w-24"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max Fiyat"
            className="p-2 rounded border w-24"
          />
        </div>
        
        <select className="p-2 rounded border">
          <option value="">Sıralama</option>
          <option value="price_asc">Fiyat (Artan)</option>
          <option value="price_desc">Fiyat (Azalan)</option>
          <option value="date_desc">En Yeni</option>
          <option value="date_asc">En Eski</option>
        </select>
      </div>
    </div>
  );
}