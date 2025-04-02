using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _BookContext;

        public BookController(BookDbContext context)=> _BookContext = context;

        [HttpGet]
        // these are the default values for the page size and page number, as well as parameters for the book categories
        public IActionResult Get(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
        {
            var query = _BookContext.Books.AsQueryable();
            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(p => bookCategories.Contains(p.Category));
            }
            var totalItems = query.Count();

            // split up the records based on the page size and page number
            var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .Select(b => new {
            b.BookId,
            b.Title,
            b.Author,
            b.Publisher,
            b.ISBN,
            b.Classification,
            b.Category,
            b.PageCount,
            b.Price
            })
            .ToList();

            var someObject = new
            {
                books = something,
                totalNumBooks = totalItems
            };
            return Ok(someObject);
        }

        // get the book categories specifically
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var BookCategories = _BookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(BookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _BookContext.Books.Add(newBook);
            _BookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{BookId}")]
        public IActionResult UpdateProject(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _BookContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _BookContext.Books.Update(existingBook);
            _BookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{BookId}")]
        public IActionResult DeleteBook(int BookId)
        {
            var book = _BookContext.Books.Find(BookId);

            if (book == null)
            {
                return NotFound(new { message = "Book Not Found" });
            }

            _BookContext.Books.Remove(book);
            _BookContext.SaveChanges();

            return NoContent();
        
        }
    }
}
