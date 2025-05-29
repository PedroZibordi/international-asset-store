// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server'; // Importa NextResponse para retornar respostas HTTP.
import bcrypt from 'bcryptjs'; // Biblioteca para hash de senhas.
import { prisma } from '@/lib/prisma'; // Importa a instância global do Prisma Client.

// POST /api/auth/register
// Rota para registrar um novo usuário.
export async function POST(request: Request) {
  try {
    // Analisa o corpo da requisição JSON para obter email e senha.
    const { email, password } = await request.json();

    // Verifica se email e senha foram fornecidos.
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 } // Bad Request
      );
    }

    // Verifica se um usuário com este email já existe.
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 } // Conflict
      );
    }

    // Gera um hash da senha.
    // O "salt" é uma string aleatória adicionada à senha antes do hash para segurança.
    // 10 é o custo de processamento (quanto maior, mais seguro, mas mais lento).
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados.
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Armazena a senha com hash.
      },
    });

    // Retorna uma resposta de sucesso com o ID e email do novo usuário.
    return NextResponse.json(
      { id: user.id, email: user.email, message: 'User registered successfully' },
      { status: 201 } // Created
    );
  } catch (error) {
    // Loga o erro para depuração (visível no terminal do servidor).
    console.error('Registration error:', error);
    // Retorna uma resposta de erro genérica.
    return NextResponse.json(
      { message: 'Something went wrong during registration' },
      { status: 500 } // Internal Server Error
    );
  }
}