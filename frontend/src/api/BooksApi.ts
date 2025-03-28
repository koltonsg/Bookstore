import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `https://localhost:4000/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Books');
    }
    return await response.json();
  } catch (error) {
    console.error('error fetching books:', error);
    throw error;
  }
};
