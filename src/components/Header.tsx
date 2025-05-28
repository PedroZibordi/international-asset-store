// src/components/Header.tsx

// Importa o componente Link do Next.js para navegação otimizada entre páginas.
// Usar <Link> ao invés de <a> garante navegação mais rápida (client-side transitions).
import Link from 'next/link';

// Componente Header funcional.
export default function Header() {
  return (
    // Tag <header> semântica para o cabeçalho da página.
    // Tailwind CSS classes:
    // - bg-gray-800: Fundo cinza escuro.
    // - text-white: Texto branco.
    // - p-4: Preenchimento de 1rem (16px) em todas as direções.
    // - flex: Torna o container flexível.
    // - justify-between: Distribui o espaço para empurrar itens para as extremidades.
    // - items-center: Centraliza os itens verticalmente.
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo/Nome da Loja - Clicável, leva para a Home Page. */}
      {/* Link href="/": Define o destino do link para a Home Page. */}
      {/* text-2xl: Tamanho da fonte grande. */}
      {/* font-bold: Texto em negrito. */}
      <Link href="/" className="text-2xl font-bold">
        International Assets
      </Link>

      {/* Navegação Principal */}
      {/* flex: Container flexível para os links. */}
      {/* space-x-4: Adiciona espaçamento horizontal de 1rem (16px) entre os links. */}
      <nav className="flex space-x-4">
        {/* Link para a página de Assets (que criaremos em breve). */}
        {/* hover:text-blue-400: Muda a cor do texto para azul ao passar o mouse. */}
        {/* transition duration-300: Animação suave na mudança de cor. */}
        <Link href="/assets" className="hover:text-blue-400 transition duration-300">
          Assets
        </Link>
        {/* Link para a página de Login/Registro. */}
        <Link href="/login" className="hover:text-blue-400 transition duration-300">
          Login/Register
        </Link>
      </nav>
    </header>
  );
}