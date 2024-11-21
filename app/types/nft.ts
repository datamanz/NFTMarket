export interface NFT {
    _id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    type: 'image' | 'video';
    createdAt: Date;
  }
  
  export interface FilterOptions {
    type?: 'image' | 'video';
    priceRange?: {
      min: number;
      max: number;
    };
    sortBy?: 'price' | 'date';
    sortOrder?: 'asc' | 'desc';
    page: number;
    limit: number;
  }