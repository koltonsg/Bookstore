import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No book found',
      price: Number(price),
      quantity,
      subtotal: Number(price) * quantity,
    };

    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} to cart?</h2>

      {/* Allows the user to enter the quantity of books to add to the cart */}
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </label>
        {/* Calculates the subtotal  */}
        <p>Subtotal: ${(Number(price) * quantity).toFixed(2)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default AddToCartPage;
