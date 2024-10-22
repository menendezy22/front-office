// eslint-disable-next-line import/order
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/order
import { useRouter } from 'next/router';

import { getProduit } from './services/produits';

// Mock static data (similar to your mongoose schema structure)
const produitsData = [
  {
    nom: 'Apple iPhone 16 Pro (512 Go) - Titane Sable',
    photo: 'https://via.placeholder.com/300x400?text=iPhone+16+Pro',
    quantite: 67,
    price: 1099.99,
    rating: 4.5,
    sold: 50,
  },
  {
    nom: 'Apple iPhone 14 Plus (128 Go) - Lumière stellaire',
    photo: 'https://via.placeholder.com/300x400?text=iPhone+14+Plus',
    quantite: 2501,
    price: 999.99,
    rating: 4.5,
    sold: 2500,
  },
  {
    nom: 'Xiaomi Redmi 12 Noir 4GO + 128GO [Version Globale]',
    photo: 'https://via.placeholder.com/300x400?text=Xiaomi+Redmi+12',
    quantite: 1092,
    price: 98.75,
    rating: 4.2,
    sold: 1000,
  },
];

export default function Produits() {
  const [loading, setLoading] = useState<any>('');
  const [data, setData] = useState<any>([]);
  const getAllProduit = async () => {
    setLoading(true);
    const res = await getProduit();
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProduit();
  }, []);

  if (loading) {
    return <>loading ...</>;
  }

  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const handleCheck = (id: string) => {
    router.push(`/produits/${id}`);
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div
        className="flex flex-wrap justify-between gap-6"
        style={{ gap: '6', justifyContent: 'space-evenly' }}>
        {data.map((produit, index) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            key={index}
            onClick={() => handleCheck(produit._id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl w-64">
            {' '}
            <div className="w-64 h-64 flex justify-center items-center bg-gray-100">
              {' '}
              {/* Fixed width and height */}
              <img
                src={imgUrl + produit.photo}
                alt={produit.nom}
                className="w-64 h-64 object-cover"
                style={{
                  width: '200px',
                  height: '200px',
                }}
              />
            </div>
            {/* Content */}
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-1">{produit.nom}</h2>
              <div className="flex items-center mb-1">
                <span className="text-yellow-500">{'★'.repeat(Math.floor(produit.rating))}</span>
                <span className="text-gray-400">{'★'.repeat(5 - Math.floor(produit.rating))}</span>
                <span className="ml-2 text-xs text-gray-500">({produit.quantite} avis)</span>
              </div>
              <p className="text-xs text-gray-700 mb-1">Quantity: {produit.quantite}</p>
              <p className="text-md font-bold text-green-600 mb-2">{produit.price.toFixed(2)}€</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
