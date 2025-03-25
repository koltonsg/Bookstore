import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  console.log(cart);
  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.cartBookId}>
                {item.title}: ${item.price.toFixed(2)}
                <button
                  onClick={() => {
                    console.log(item.cartBookId);
                    removeFromCart(item.cartBookId);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total</h3>

      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
