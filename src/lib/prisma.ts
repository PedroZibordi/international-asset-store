// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

//Declara uma variável global para o cliente Prisma.
//Isso é necessário para evistar que novas instâncias do PrismaCliente sejam criadas a cada "hot-reload" em desenvolvimento, o que pode causar muitos problemas com coneções de banco de dados.

declare global {
    //eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

//Cria uma úninica instâbcua do PrismaClient.
//Em produção, ele sempre cria uma nova instância.
// Em desenvolvimento, ele reutiliza a instância global se ela já existir.
export const prisma = 
global.prisma ||
new PrismaClient({
    log: ['query', 'error', 'warn'] // Opcional: loga queries, erros e warnings no console.
});

// Em ambiente de desenvolvimento, armazena a instância no objeto global
// para que ela seja reutilizada em hot-reloads.
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;