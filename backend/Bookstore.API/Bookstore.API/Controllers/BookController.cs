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
        public IActionResult Get(int pageSize = 10, int pageNum = 1)
        {
            // split up the records based on the page size and page number
            var something = _BookContext.Books
            .Skip((pageNum -1) * pageSize)
            .Take(pageSize)
            .ToList();

            var totalNumRecords = _BookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumRecords = totalNumRecords
            };
            return Ok(someObject);
        }


    }
}
