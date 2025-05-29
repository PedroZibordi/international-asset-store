// src/app/api/assets/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/assets/[id]
// Rota para buscar um asset específico pelo ID.
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Obtém o ID da URL.

    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!asset) {
      return NextResponse.json({ message: 'Asset not found' }, { status: 404 }); // Not Found
    }

    return NextResponse.json(asset, { status: 200 }); // OK
  } catch (error) {
    console.error('Error fetching asset by ID:', error);
    return NextResponse.json(
      { message: 'Something went wrong while fetching the asset' },
      { status: 500 } // Internal Server Error
    );
  }
}

// PUT /api/assets/[id]
// Rota para atualizar um asset existente.
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // ID do asset a ser atualizado.
    const { title, description, price, imageUrl, fileUrl, category, tags, sellerId } = await request.json();

    // Verifica se o asset existe antes de tentar atualizar.
    const existingAsset = await prisma.asset.findUnique({
      where: { id },
    });

    if (!existingAsset) {
      return NextResponse.json({ message: 'Asset not found' }, { status: 404 });
    }

    // Validação de dados de entrada.
    if (!title && !description && price === undefined && !imageUrl && !fileUrl && !category && !tags && !sellerId) {
        return NextResponse.json(
            { message: 'No fields provided for update' },
            { status: 400 }
        );
    }

    // Se sellerId for fornecido, verifica se o novo vendedor existe.
    if (sellerId) {
        const sellerExists = await prisma.user.findUnique({
            where: { id: sellerId },
        });
        if (!sellerExists) {
            return NextResponse.json(
                { message: 'New seller not found. Invalid sellerId.' },
                { status: 404 }
            );
        }
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: {
        title: title ?? existingAsset.title, // Use ?? para manter o valor antigo se o novo for undefined/null
        description: description ?? existingAsset.description,
        price: price !== undefined ? parseFloat(price) : existingAsset.price,
        imageUrl: imageUrl ?? existingAsset.imageUrl,
        fileUrl: fileUrl ?? existingAsset.fileUrl,
        category: category ?? existingAsset.category,
        tags: tags ?? existingAsset.tags,
        sellerId: sellerId ?? existingAsset.sellerId,
      },
    });

    return NextResponse.json(updatedAsset, { status: 200 }); // OK
  } catch (error) {
    console.error('Error updating asset:', error);
    return NextResponse.json(
      { message: 'Something went wrong while updating the asset' },
      { status: 500 } // Internal Server Error
    );
  }
}

// DELETE /api/assets/[id]
// Rota para deletar um asset.
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // ID do asset a ser deletado.

    const existingAsset = await prisma.asset.findUnique({
      where: { id },
    });

    if (!existingAsset) {
      return NextResponse.json({ message: 'Asset not found' }, { status: 404 });
    }

    await prisma.asset.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Asset deleted successfully' },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error('Error deleting asset:', error);
    return NextResponse.json(
      { message: 'Something went wrong while deleting the asset' },
      { status: 500 } // Internal Server Error
    );
  }
}