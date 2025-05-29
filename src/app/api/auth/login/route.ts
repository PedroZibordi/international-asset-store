// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
// Para implementar autenticação real (sessões ou JWT), você precisaria de mais bibliotecas.
// Por enquanto, esta rota apenas verifica as credenciais.

// POST /api/auth/login
// Rota para autenticar um usuário.
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

    // Tenta encontrar o usuário pelo email.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário não for encontrado ou a senha não corresponder.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 } // Unauthorized
      );
    }

    // Se a autenticação for bem-sucedida.
    // Em um cenário real, você criaria uma sessão ou um token JWT aqui.
    return NextResponse.json(
      { id: user.id, email: user.email, message: 'Logged in successfully' },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Something went wrong during login' },
      { status: 500 } // Internal Server Error
    );
  }
}