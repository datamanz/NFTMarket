import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import NFT from '../../../models/NFT';
import { z } from 'zod';

// Input validasyonu için Zod şeması
const updateNFTSchema = z.object({
  title: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  currency: z.enum(['ETH', 'MATIC']).optional(),
  image: z.string().url().optional(),
  type: z.enum(['image', 'video']).optional()
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const nft = await NFT.findById(params.id);
    
    if (!nft) {
      return NextResponse.json(
        { error: 'NFT bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(nft);
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Input validasyonu
    const validationResult = updateNFTSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Geçersiz veri formatı', details: validationResult.error },
        { status: 400 }
      );
    }

    const updatedNFT = await NFT.findByIdAndUpdate(
      params.id,
      { ...validationResult.data },
      { new: true }
    );
    
    if (!updatedNFT) {
      return NextResponse.json(
        { error: 'NFT bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNFT);
  } catch (error) {
    console.error('Güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Güncelleme başarısız' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedNFT = await NFT.findByIdAndDelete(params.id);
    
    if (!deletedNFT) {
      return NextResponse.json(
        { error: 'NFT bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'NFT başarıyla silindi' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Silme işlemi başarısız' },
      { status: 500 }
    );
  }
}