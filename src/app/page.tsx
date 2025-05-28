// src/app/page.tsx

// Importa o componente Image do Next.js. Este componente é essencial
// para otimizar imagens automaticamente (redimensionamento, lazy loading,
// formatos modernos como WebP), o que melhora muito a performance e o SEO.
import Image from 'next/image';

// Este é o componente React para a nossa Home Page.
// Em Next.js App Router, componentes de página são exportados como 'default'.
export default function Home() {
  return (
    // A tag <main> encapsula o conteúdo principal da página.
    // As classes em 'className' são do Tailwind CSS e controlam o layout e o estilo.
    // - flex: Transforma o elemento em um container flexível.
    // - min-h-screen: Garante que ocupe no mínimo 100% da altura da tela (viewport).
    // - flex-col: Organiza os itens internos em uma coluna (verticalmente).
    // - items-center: Centraliza os itens horizontalmente dentro do container flex.
    // - justify-center: Centraliza os itens verticalmente (útil para a seção Hero).
    // - p-8: Adiciona um preenchimento (padding) de 2rem (32px) em todas as direções.
    // - bg-gray-900: Define um fundo cinza muito escuro.
    // - text-white: Define a cor do texto como branco.
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-1000 text-white">

      {/* Seção Hero: A primeira e mais impactante seção da página, apresentando a proposta de valor. */}
      {/* text-center: Alinha o texto ao centro.
          py-20: Adiciona um preenchimento (padding) vertical de 5rem (80px) acima e abaixo. */}
      <section className="text-center py-20">
        {/* Título principal da loja. */}
        {/* text-5xl: Tamanho da fonte grande (48px).
            font-bold: Define o texto em negrito.
            mb-4: Adiciona uma margem inferior de 1rem (16px). */}
        <h1 className="text-5xl font-bold mb-4">
          Amazing Digital Assets for Your Projects
        </h1>

        {/* Descrição curta que complementa o título. */}
        {/* text-xl: Tamanho da fonte maior (20px).
            mb-8: Adiciona uma margem inferior de 2rem (32px). */}
        <p className="text-xl mb-8">
          Characters, environments, pixel arts & more. Bring your ideas to life!
        </p>

        {/* Botão de chamada para ação principal. */}
        {/* bg-blue-600: Define a cor de fundo do botão como azul.
            hover:bg-blue-700: Ao passar o mouse, a cor de fundo muda para um azul um pouco mais escuro.
            text-white font-bold: Texto branco e negrito.
            py-3 px-6: Preenchimento vertical e horizontal.
            rounded-lg: Cantos arredondados grandes.
            text-lg: Tamanho da fonte.
            transition duration-300: Adiciona uma transição suave para as mudanças de estilo (como o hover). */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
          Explore Assets
        </button>
      </section>

      {/* Seção de Assets em Destaque: Exibe alguns exemplos de produtos. */}
      {/* w-full: Ocupa 100% da largura disponível.
          max-w-4xl: Define uma largura máxima de 1024px, centralizando o conteúdo em telas grandes. */}
      <section className="py-20 w-full max-w-4xl">
        {/* Título para a seção de destaques. */}
        <h2 className="text-4xl font-bold text-center mb-12">Our Featured Assets</h2>
        {/* Grid para exibir os cards de assets.
            grid: Torna o elemento um container de grid.
            grid-cols-1: Em telas pequenas, exibe os itens em uma única coluna.
            md:grid-cols-3: Em telas médias (md breakpoint do Tailwind), exibe os itens em três colunas.
            gap-8: Adiciona um espaçamento de 2rem (32px) entre os itens do grid. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card de Asset 1: Este é um componente de card de exemplo. */}
          {/* bg-gray-800: Fundo cinza escuro para o card.
              p-6: Preenchimento interno.
              rounded-lg: Cantos arredondados.
              shadow-lg: Adiciona uma sombra grande para dar profundidade.
              text-center: Centraliza o texto dentro do card. */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            {/* O componente Image do Next.js. */}
            {/* src="/placeholder-asset.png": O caminho para a imagem. O Next.js busca da pasta 'public/'.
                alt="Asset Placeholder": Texto alternativo, crucial para acessibilidade (leitores de tela) e SEO.
                width={200} height={200}: Define o tamanho intrínseco da imagem (importante para evitar layout shifts).
                mx-auto: Centraliza a imagem horizontalmente (margin-left e margin-right auto).
                mb-4: Margem inferior.
                rounded-md: Cantos arredondados médios. */}
            <Image src="/placeholder-asset.png" alt="Asset Placeholder" width={200} height={200} className="mx-auto mb-4 rounded-md" />
            <h3 className="text-2xl font-semibold mb-2">Epic Character Pack</h3>
            <p className="text-gray-400 mb-4">A hero for your next adventure.</p>
            {/* Preço do asset em Dólar (USD). */}
            <span className="text-blue-400 text-lg font-bold">$19.99</span>
          </div>

          {/* Card de Asset 2 (estrutura repetida para exemplo) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Image src="/placeholder-asset.png" alt="Asset Placeholder" width={200} height={200} className="mx-auto mb-4 rounded-md" />
            <h3 className="text-2xl font-semibold mb-2">Mystical Environment Set</h3>
            <p className="text-gray-400 mb-4">Stunning backgrounds for games & illustrations.</p>
            <span className="text-blue-400 text-lg font-bold">$29.99</span>
          </div>

          {/* Card de Asset 3 (estrutura repetida para exemplo) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Image src="/placeholder-asset.png" alt="Asset Placeholder" width={200} height={200} className="mx-auto mb-4 rounded-md" />
            <h3 className="text-2xl font-semibold mb-2">UI Icon Bundle</h3>
            <p className="text-gray-400 mb-4">Vector icons for intuitive user interfaces.</p>
            <span className="text-blue-400 text-lg font-bold">$9.99</span>
          </div>
        </div>
      </section>

    </main>
  )
}