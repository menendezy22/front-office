/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
// eslint-disable-next-line import/order
import { useEffect, useState } from 'react';
import { getProduitInfoById, postProduits } from '../services/produits';
// eslint-disable-next-line import/no-unresolved
import { getConnectedUser } from '@src/pages/services/user';
import { useToast } from '@chakra-ui/react';

const ProduitPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the URL

  const [data, setData] = useState<any>([]); // Initialize with null
  const [error, setError] = useState<any>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch data when id is available
    if (id) {
      const fetchData = async () => {
        try {
          const res = await getProduitInfoById(id);
          if (res) {
            setData(res);
          }
        } catch (error) {
          console.error('Failed to fetch product data:', error);
        }
      };

      fetchData();
    }
  }, [id, refetch]);

  // Loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  const product = {
    name: 'nutribullet Original 600, Blender Électrique',
    description:
      'Hachoir, Blender pour Smoothie, Hachoir Blender Multifonction, Puissance 600 Watts, NB603DG, Gris Foncé',
    rating: 4.6,
    reviews: 2620,
    price: 65.0,
    originalPrice: 69.99,
    discount: 7,
    imageUrl: 'YOUR_IMAGE_URL_HERE',
    link: 'https://www.amazon.com/dp/B06XQ9GL8T',
  };
  console.log(data, 'ezzzzzz');

  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  // Quantity decrement function
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setError('');
    }
  };

  // Quantity increment function, check stock
  const incrementQuantity = () => {
    if (data.quantite > quantity) {
      setQuantity(quantity + 1);
      setError('');
    }
  };

  // Handle direct input for quantity
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= data.quantite) {
      setQuantity(value);
      setError('');
    } else {
      setError('La quantité saisie dépasse le stock disponible.');
    }
  };

  const [user, setUser] = useState<any>(null); // Initialize user state

  // Fetch connected user data
  const getConnected = async () => {
    const res = await getConnectedUser();
    if (res) {
      setUser(res);
    }
  };

  useEffect(() => {
    getConnected();
  }, []);

  console.log(user, 'gg');
  const toast = useToast();

  const addProduits = async () => {
    const dataToPass = {
      user_id: user.user._id,
      produit_id: id,
      quantite: quantity,
    };

    try {
      const response = await postProduits(dataToPass);
      if (response) {
        setRefetch(!refetch);
        toast({
          title: 'Commande réussie.',
          description: 'Votre commande a été passée avec succès.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erreur de commande.',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      console.log('error:', error);
    }

    console.log('dataToPass:', dataToPass);
  };

  return (
    <div className="flex justify-center max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imgUrl + data.photo}
        alt={product.name}
        className="w-full h-64 object-cover"
        style={{ width: '500px', height: '500px' }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">nom: {data.nom}</h2>
        <p className="text-sm text-gray-700"> quantite:{data.quantite}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">prix:{data.price}</span>
        </div>

        <div className="quantity-input flex items-center space-x-2">
          <button
            className=""
            style={{ fontSize: '20px', marginLeft: '10px' }}
            onClick={() => decrementQuantity()}>
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e: any) => handleChangeQuantity(e)}
            className="border rounded-md px-2 py-1 text-center w-16"
            style={{ border: '1px solid', width: '100px', height: '50px' }}
          />

          <button
            className="quantity-button bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full"
            onClick={() => incrementQuantity()}>
            +
          </button>
        </div>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}

        <br />
        <button
          style={{
            marginLeft: '20px',
            width: '150px',
            backgroundColor: '#BB8BD8',
            height: '50px',
            color: 'white',
            borderRadius: '7px',
          }}
          onClick={() => addProduits()}>
          {' '}
          achat produit
        </button>
      </div>
    </div>
  );
};

export default ProduitPage;
