const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_URL}/products?${query.toString()}`);
  if (!response.ok) throw new Error('Could not load products.');
  return response.json();
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Could not load this product.');
  return response.json();
}
