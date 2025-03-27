import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate the total price of the cart
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // Calculate the total number of items in the cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // cart summary button to show the total and take you to the cart page
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>${total.toFixed(2)}</strong>
      {/* Badge for the number of items */}
      {totalQuantity > 0 && (
        <span
        // BADGES! This is one of the extra bootstrap steps. It shows how many items are in the cart. 
          className="badge bg-danger ms-2"
          style={{
            fontSize: '12px',
            padding: '5px 8px',
            borderRadius: '50%',
          }}
        >
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartSummary;
