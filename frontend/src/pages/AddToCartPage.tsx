import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      cartBookId: Number(bookId),
      title: title || 'No book found',
      price: Number(price),
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
