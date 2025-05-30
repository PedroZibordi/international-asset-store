// src/app/assets/[id]/page.tsx

import { notFound } from 'next/navigation'; // Para exibir a página 404 do Next.js se o asset não for encontrado.
import Link from 'next/link'; // Para navegação.

// Define uma interface para o tipo de dado de um Asset.
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

// A página de detalhes também é assíncrona para buscar os dados.
// Ela recebe `params` contendo o ID do asset da URL.
export default async function AssetDetailPage({ params }: { params: { id: string } }) {
  const { id } = params; // Obtém o ID do asset da URL.

  let asset: Asset | null = null;
  let error: string | null = null;

  try {
    // Faz a requisição para a nossa API de busca de asset por ID.
    const res = await fetch(`http://localhost:3000/api/assets/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      // Se o asset não for encontrado (status 404), chama notFound() para exibir a página 404 do Next.js.
      if (res.status === 404) {
        notFound();
      }
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch asset details');
    }

    asset = await res.json();

  } catch (err: any) {
    console.error(`Error fetching asset with ID ${id}:`, err);
    error = err.message || 'An unknown error occurred while fetching asset details.';
  }

  // Se o asset não for encontrado (e não houve redirecionamento para 404 antes), ou se houver erro.
  if (!asset) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-400">Error Loading Asset</h1>
        {error && <p className="text-lg text-gray-400 mt-4">{error}</p>}
        <Link href="/assets" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          Back to All Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Link href="/assets" className="text-blue-400 hover:text-blue-300 transition duration-300 mb-8 inline-block">
        &larr; Back to All Assets
      </Link>

      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={asset.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={asset.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-400 mb-4">{asset.title}</h1>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{asset.description}</p>
            <p className="text-green-400 font-bold text-3xl mb-6">${asset.price.toFixed(2)}</p>

            <div className="text-gray-400 text-sm mb-6">
              <p className="mb-1"><strong>Category:</strong> <span className="text-gray-200">{asset.category}</span></p>
              <p className="mb-1"><strong>Seller:</strong> <span className="text-gray-200">{asset.seller?.name || asset.seller?.email || 'N/A'}</span></p>
              {asset.tags && asset.tags.length > 0 && (
                <p className="mb-1"><strong>Tags:</strong> <span className="text-gray-200">{asset.tags.join(', ')}</span></p>
              )}
              <p className="mb-1"><strong>Added:</strong> <span className="text-gray-200">{new Date(asset.createdAt).toLocaleDateString()}</span></p>
            </div>
          </div>

          {/* Botão de Compra (ainda não funcional, apenas UI) */}
          <button
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            // onClick={handlePurchase} // Futuramente: função para iniciar a compra
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}