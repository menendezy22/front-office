const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from 'axios';

export const getProduit = async () => {
  const produit = await axios.get(`${apiUrl}/produit/produit`);

  return produit.data.allProduits;
};

export const getProduitInfoById = async (id: any) => {
  const produit = await axios.get(`${apiUrl}/produit/produit/${id}`);

  return produit.data.produits;
};

export const postProduits = async data => {
  const res = await axios.post(`${apiUrl}/commande/commandes`, data);

  return res;
};
