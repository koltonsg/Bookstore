using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _BookContext;

        public BookController(BookDbContext context)=> _BookContext = context;

        [HttpGet("AllBooks")]
        public IEnumerable<Book> Get()
        {
            var something = _BookContext.Books
            .Take(5)
            .ToList();
            return something;
        }


    }
}
