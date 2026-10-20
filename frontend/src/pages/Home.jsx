import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import Shop from './Shop.jsx';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR STYLE, YOUR STORY</p>
          <h1>Find the dress<br />that feels like you.</h1>
          <p>Discover styles for everyday moments and special occasions.</p>
          <Link className="button" to="/shop">Explore the collection</Link>
        </div>
        <div className="hero-art" aria-label="Fashion collection illustration">
          <span>New season</span>
          <div className="dress-illustration">✿</div>
        </div>
      </section>
      <section className="section-heading">
        <div>
          <p className="eyebrow">MADE FOR YOUR MOMENTS</p>
          <h2>Explore our dresses</h2>
        </div>
        <Link to="/shop" className="text-link">View all dresses →</Link>
      </section>
      <Shop compact onAdd={addToCart} />
    </>
  );
}
