import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Shop({ compact = false, onAdd }) {
  const cart = useCart();
  const add = onAdd || cart.addToCart;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchProducts({ ...(search ? { search } : {}), ...(category ? { category } : {}) })
      .then(data => {
        if (!cancelled) {
          setProducts(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, [search, category]);

  return (
    <section>
      {!compact && <div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h1>Shop dresses</h1></div></div>}
      <div className="shop-controls">
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search dresses..."
          aria-label="Search dresses"
        />
        <select value={category} onChange={event => setCategory(event.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          <option>Casual Wear</option>
          <option>Party Wear</option>
          <option>Office Wear</option>
          <option>Wedding Wear</option>
          <option>Traditional Wear</option>
          <option>Evening Wear</option>
        </select>
      </div>
      {status === 'loading' && <p className="message">Loading dresses...</p>}
      {status === 'error' && <p className="message">Could not connect to the product API. Start the backend and check your MongoDB connection.</p>}
      {status === 'ready' && products.length === 0 && <p className="message">No dresses found yet. Add products to your database to see them here.</p>}
      {status === 'ready' && (
        <div className="product-grid">
          {(compact ? products.slice(0, 4) : products).map(product =>
            <ProductCard key={product._id} product={product} onAdd={add} />
          )}
        </div>
      )}
    </section>
  );
}
