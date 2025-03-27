import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import '../components/Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { Toast } from 'bootstrap';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div>
      <h2>Your cart</h2>

      {/* TOASTER! this is another bootstrap extra. it is a little popup to confirm something was removed from the cart */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="toast"
          className="toast align-items-center text-bg-danger border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      </div>

      <div className="items_list">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {/* This is the list of the items in your cart is displayed, along with their prices */}
            {cart.map((item: CartItem) => (
              <li key={item.bookId} className="cart-item">
                {item.title}: ${item.subtotal.toFixed(2)} ({item.quantity} x $
                {item.price.toFixed(2)})
                <button
                  onClick={() => {
                    removeFromCart(item.bookId);
                    setToastMessage(`Removed ${item.title} from cart!`);
                    const toastElement = document.getElementById('toast');
                    if (toastElement) {
                      const toast = new Toast(toastElement);
                      toast.show();
                    }
                  }}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* checkout or continue browsing button */}
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
