import './App.css';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import AddToCartPage from './pages/AddToCartPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
    {/* Paths to navigate through the pages */}
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/addToCart/:title/:bookId/:price"
              element={<AddToCartPage />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
