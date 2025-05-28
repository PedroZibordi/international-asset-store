// src/app/layout.tsx

// Importa as funções para carregar fontes do Google.
// 'Inter' é uma fonte sans-serif moderna e legível.
import { Inter } from "next/font/google";
// Importa o arquivo CSS global do Tailwind.
import "./globals.css";
// Importa o componente Header que criamos. O '@/' é um alias para a pasta 'src/'.
import Header from "@/components/Header";

// Configura a fonte Inter para ser usada no projeto.
const inter = Inter({ subsets: ["latin"] });

// Define os metadados da página (título que aparece na aba do navegador, descrição para SEO).
export const metadata = {
  title: "International Asset Store",
  description: "Discover and purchase amazing digital assets for your projects.",
};

// Componente de Layout principal.
// Ele envolve todas as suas páginas, fornecendo uma estrutura consistente.
// 'children' é uma prop especial que representa o conteúdo da página atual.
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    // Tag HTML principal. 'lang="en"' indica o idioma da página.
    // NOTA: Comentários dentro da tag <html> mas fora de <head> ou <body> causam erro de hidratação.
    // Por isso, os comentários de explicação estão agora DENTRO da tag <body> para evitar o problema.
    <html lang="en">
      {/* Tag <body>. Adiciona as classes do Tailwind CSS: */}
      {/* ${inter.className}: Aplica a fonte Inter configurada acima. */}
      {/* bg-gray-950: Define o fundo de todo o corpo da página como um cinza bem escuro (quase preto). */}
      {/* text-white: Define a cor padrão do texto como branco. */}
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {/* Renderiza o componente Header que será visível em todas as páginas. */}
        <Header />
        {/* A tag <main> envolverá o conteúdo específico de cada página.
            Isso garante que o conteúdo principal da página seja semanticamente correto. */}
        <main>
          {children} {/* Aqui é onde o conteúdo da sua página (ex: page.tsx) será renderizado. */}
        </main>
      </body>
    </html>
  );
}