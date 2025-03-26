import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, cartBookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1)

  const handleAddToCart = () => {
    const newItem: CartItem = {
      cartBookId: Number(cartBookId),
      title: title || 'No book found',
      price: Number(price),
      quantity,
      subtotal: 0
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} to cart?</h2>
      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default AddToCartPage;
