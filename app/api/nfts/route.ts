import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import NFT from '../../models/NFT';
import type { FilterOptions } from '../../types/nft';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');

    // Filtreleme koşulları
    const filter: any = {};
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sıralama
    const sort: any = {};
    if (sortBy === 'price') {
      sort.price = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'date') {
      sort.createdAt = sortOrder === 'desc' ? -1 : 1;
    }

    const nfts = await NFT.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(nfts);
    
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Zorunlu alanların kontrolü
    if (!body.title || !body.price || !body.image || !body.type) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    const nft = await NFT.create({
      title: body.title,
      price: body.price,
      currency: body.currency || 'ETH',
      image: body.image,
      type: body.type
    });

    return NextResponse.json(nft, { status: 201 });
    
  } catch (error) {
    console.error('NFT oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'NFT oluşturulamadı' },
      { status: 500 }
    );
  }
}