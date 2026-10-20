import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const image = product.images?.[0];

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image">
        {image
          ? <img src={image} alt={product.name} loading="lazy" />
          : <div className="image-placeholder">Dress photo</div>}
      </Link>
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link>
        <p className="price">LKR {Number(product.price).toLocaleString('en-LK')}</p>
        <button onClick={() => onAdd(product)} className="button button-small">Add to cart</button>
      </div>
    </article>
  );
}
