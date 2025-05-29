// src/app/api/assets/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importa a instância global do Prisma Client.

// POST /api/assets
// Rota para criar um novo asset.
export async function POST(request: Request) {
  try {
    // Extrai os dados do corpo da requisição.
    // sellerId está hardcoded por enquanto, mas viria da sessão do usuário logado.
    const { title, description, price, imageUrl, fileUrl, category, tags, sellerId } = await request.json();

    // Validação básica: verificar se os campos essenciais estão presentes.
    if (!title || !description || price === undefined || !imageUrl || !fileUrl || !category || !sellerId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 } // Bad Request
      );
    }

    // Verifica se o sellerId corresponde a um usuário existente.
    const sellerExists = await prisma.user.findUnique({
      where: { id: sellerId },
    });

    if (!sellerExists) {
      return NextResponse.json(
        { message: 'Seller not found. Invalid sellerId.' },
        { status: 404 } // Not Found
      );
    }

    // Cria o novo asset no banco de dados.
    const asset = await prisma.asset.create({
      data: {
        title,
        description,
        price: parseFloat(price), // Garante que o preço é um número.
        imageUrl,
        fileUrl,
        category,
        tags: tags || [], // Garante que tags é um array, mesmo se não for fornecido.
        sellerId,
      },
    });

    // Retorna o asset criado.
    return NextResponse.json(asset, { status: 201 }); // Created
  } catch (error) {
    console.error('Error creating asset:', error);
    return NextResponse.json(
      { message: 'Something went wrong while creating the asset' },
      { status: 500 } // Internal Server Error
    );
  }
}

// GET /api/assets
// Rota para listar todos os assets.
export async function GET() {
  try {
    // Busca todos os assets no banco de dados.
    // Inclui as informações do vendedor (User) para cada asset.
    const assets = await prisma.asset.findMany({
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

    // Retorna a lista de assets.
    return NextResponse.json(assets, { status: 200 }); // OK
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { message: 'Something went wrong while fetching assets' },
      { status: 500 } // Internal Server Error
    );
  }
}