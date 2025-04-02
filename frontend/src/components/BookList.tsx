import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksApi';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const navigate = useNavigate();
  // usestates for all the variables we will use
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        console.log('API Response:', data);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  // this use effect is used to sort the books in the list
  useEffect(() => {
    if (!books || books.length === 0) return; // No books to sort

    const sorted = [...books].sort((a, b) => {
      if (a.title < b.title) return sortAscending ? -1 : 1;
      if (a.title > b.title) return sortAscending ? 1 : -1;
      return 0;
    });
    setSortedBooks(sorted);
  }, [books, sortAscending]);
  // Determine which books to display
  const displayBooks = sortedBooks;

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort by Title {sortAscending ? '↑' : '↓'}
      </button>
      <button onClick={() => navigate('/admin')}>Go to Admin Page</button>
      <br />
      <br />

      {displayBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/addToCart/${b.title}/${b.bookId}/${b.price}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
