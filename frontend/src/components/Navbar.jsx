import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link className="brand" to="/">Yash <span>Dress Point</span></Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop Dresses</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
      </nav>
    </header>
  );
}
