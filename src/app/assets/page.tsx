// src/app/api/assets/page.tsx

// Importa o Link para navegação otimizada no Next.js.
import Link from 'next/link';
// Importa o notFound para exibir a página 404 se o asset não for encontrado.
import { notFound } from 'next/navigation';

// Define uma interface para o tipo de dado de um Asset, incluindo o seller.
interface Asset {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  fileUrl: string;
  category: string;
  tags: string[];
  sellerId: string;
  seller: {
    id: string;
    email: string;
    name: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

// O componente de página agora é assíncrono para permitir o fetch de dados.
export default async function AssetsPage() {
  let assets: Asset[] = [];
  let error: string | null = null;

  try {
    // Faz a requisição para a nossa API de listagem de assets.
    // É importante usar o caminho completo da URL (http://localhost:3000)
    // porque este fetch é feito no servidor Next.js.
    const res = await fetch('http://localhost:3001/api/assets', {
      cache: 'no-store' // Garante que os dados são sempre frescos (não usa cache do Next.js).
                            // Em produção, você pode considerar 'revalidate: 60' para revalidar a cada 60 segundos.
    });

    if (!res.ok) {
      // Se a resposta não for OK (ex: 404, 500), lança um erro.
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch assets');
    }

    assets = await res.json(); // Pega o JSON da resposta.

  } catch (err: any) {
    // Captura e armazena qualquer erro que ocorra durante a requisição.
    console.error('Error fetching assets for frontend:', err);
    error = err.message || 'An unknown error occurred while fetching assets.';
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-400">
        Explore Digital Assets
      </h1>

      {/* Exibição de erro, se houver */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg text-center mb-8">
          <p>{error}</p>
          <p className="text-sm mt-2">Certifique-se de que o servidor Next.js e o PostgreSQL estão rodando e configurados corretamente.</p>
          <p className="text-sm mt-2">Você também pode precisar adicionar alguns assets usando o Thunder Client (POST /api/assets).</p>
        </div>
      )}

      {/* Mensagem se não houver assets e não houver erro */}
      {!error && assets.length === 0 && (
        <div className="text-center text-gray-400 text-2xl mt-12">
          <p>No assets available yet. Be the first to add some!</p>
          <p className="text-lg mt-2">Add assets using your API client (e.g., Thunder Client) for now.</p>
        </div>
      )}

      {/* Grid de Assets */}
      {!error && assets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset) => (
            // Link para a página de detalhes do asset (que criaremos em breve).
            // Cada cartão de asset é um link clicável.
            <Link
              key={asset.id}
              href={`/assets/${asset.id}`} // Rota dinâmica para detalhes do asset.
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              <img
                src={asset.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
                alt={asset.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold mb-2 text-white truncate">{asset.title}</h2>
                <p className="text-blue-300 font-semibold mb-4 text-xl">${asset.price.toFixed(2)}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{asset.description}</p>
                <div className="text-gray-500 text-xs mt-auto">
                  <p>Category: <span className="font-medium text-gray-300">{asset.category}</span></p>
                  <p>Seller: <span className="font-medium text-gray-300">{asset.seller?.name || asset.seller?.email || 'N/A'}</span></p>
                  {asset.tags && asset.tags.length > 0 && (
                    <p>Tags: <span className="font-medium text-gray-300">{asset.tags.join(', ')}</span></p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}