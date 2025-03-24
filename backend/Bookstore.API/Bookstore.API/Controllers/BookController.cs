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
            .Skip((pageNum -1) * pageSize)
            .Take(pageSize)
            .ToList();


            //var totalNumRecords = _BookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumRecords = totalItems
            };
            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var BookCategories = _BookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(BookCategories);
        }
    }
}
