import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProduct } from '../api/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct(id).then(setProduct).catch(err => setError(err.message));
  }, [id]);

  if (error) return <p className="message">{error} <Link to="/shop">Back to shop</Link></p>;
  if (!product) return <p className="message">Loading product...</p>;

  const sizes = [...new Set((product.variants || []).map(v => v.size))];
  const colors = [...new Set((product.variants || []).map(v => v.color))];

  return (
    <section className="details-layout">
      <div className="details-image">
        {product.images?.[0]
          ? <img src={product.images[0]} alt={product.name} />
          : <div className="image-placeholder">Dress photo</div>}
      </div>
      <div className="details-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price large">LKR {Number(product.price).toLocaleString('en-LK')}</p>
        <p>{product.description}</p>
        {sizes.length > 0 && <>
          <label htmlFor="size">Size</label>
          <select id="size" value={size} onChange={e => setSize(e.target.value)}>
            <option value="">Choose a size</option>
            {sizes.map(value => <option key={value}>{value}</option>)}
          </select>
        </>}
        {colors.length > 0 && <>
          <label htmlFor="color">Colour</label>
          <select id="color" value={color} onChange={e => setColor(e.target.value)}>
            <option value="">Choose a colour</option>
            {colors.map(value => <option key={value}>{value}</option>)}
          </select>
        </>}
        <button
          className="button"
          onClick={() => {
            if ((sizes.length && !size) || (colors.length && !color)) {
              setError('Please choose an available size and colour.');
              return;
            }
            setError('');
            addToCart(product, { size, color });
          }}
        >Add to cart</button>
        <p className="subtle">Please confirm size and colour availability before checkout.</p>
      </div>
    </section>
  );
}
