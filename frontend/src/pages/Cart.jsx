import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!items.length) {
    return <section className="empty-state"><h1>Your cart is waiting</h1><p>Discover a dress you love and it will appear here.</p><Link className="button" to="/shop">Shop dresses</Link></section>;
  }

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">YOUR SELECTION</p><h1>Shopping cart</h1></div></div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <article className="cart-item" key={item.key}>
              {item.image ? <img src={item.image} alt={item.name} /> : <div className="cart-image-placeholder">Dress</div>}
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{[item.size, item.color].filter(Boolean).join(' · ') || 'Variant not selected'}</p>
                <p className="price">LKR {(item.price * item.quantity).toLocaleString('en-LK')}</p>
                <div className="quantity-control">
                  <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}>+</button>
                  <button className="remove-button" onClick={() => removeFromCart(item.key)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <div className="summary-line"><span>Subtotal</span><strong>LKR {total.toLocaleString('en-LK')}</strong></div>
          <p className="subtle">Delivery charges and discounts will be calculated at checkout.</p>
          <button className="button" disabled>Checkout (coming soon)</button>
          <p className="subtle">Checkout is a placeholder. No order or payment is processed yet.</p>
        </aside>
      </div>
    </section>
  );
}
