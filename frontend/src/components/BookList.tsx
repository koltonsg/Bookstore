import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const navigate = useNavigate();
  // usestates for all the variables we will use
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  // this use effect sets the url parameters and json
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:4000/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumRecords);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  // this use effect is used to sort the books in the list
  useEffect(() => {
    const sorted = [...books].sort((a, b) => {
      if (a.title < b.title) return sortAscending ? -1 : 1;
      if (a.title > b.title) return sortAscending ? 1 : -1;
      return 0;
    });
    setSortedBooks(sorted);
  }, [books, sortAscending]);

  return (
    <>
      {/* button used to sort the titles */}
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort by Title {sortAscending ? '↑' : '↓'}
      </button>
      <br />
      <br />

      {/* cards for each book */}
      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Publisher:</strong> {b.publisher}
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
                navigate(
                  `/cart/${encodeURIComponent(b.title)}/${b.bookId}?price=${b.price}`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {/* previous button to go to the previous page */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* this makes it so that the number of page buttons are dynamic */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      {/* next button to go to the next page */}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />

      {/* Where the user can decide how many records per page to display */}
      <label>How Many results per page?</label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default BookList;
