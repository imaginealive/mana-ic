using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManaIC.Models;
using ManaIC.Repositories.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManaIC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceAPIController : ControllerBase
    {
        private readonly DateTime FirstDate;
        private readonly DateTime SecondDate;
        private readonly DateTime ThirdDate;
        private readonly IDataDac<BookList> booklistDac;

        public ServiceAPIController(IDataDac<BookList> booklistDac)
        {
            this.booklistDac = booklistDac;
            FirstDate = new DateTime(2020, 3, 9);
            SecondDate = new DateTime(2020, 3, 10);
            ThirdDate = new DateTime(2020, 3, 11);
            //thailand time
            //var date = DateTime.UtcNow.AddHours(7);
        }

        // GET: api/ServiceAPI
        [HttpGet]
        public async Task<IEnumerable<BookList>> Gets()
        {
            var response = await booklistDac.Gets(it => !it.DeleteDate.HasValue);
            return response;
        }

        // GET: api/ServiceAPI/get?memberid=5
        [HttpGet("get")]
        public async Task<BookList> Get(string memberid)
        {
            var response = await booklistDac.Get(it => it.Id == memberid && !it.DeleteDate.HasValue);
            if (response == null) response = new BookList { Id = memberid };
            return response;
        }

        // POST: api/ServiceAPI
        [HttpPost()]
        public async Task Post(BookList request)
        {
            DateTime? dateTH = DateTime.UtcNow.AddHours(7);
            request.FirstDate = FirstDate == dateTH.Value.Date ? dateTH : null;
            request.SecondDate = SecondDate == dateTH.Value.Date ? dateTH : null;
            request.ThirdDate = ThirdDate == dateTH.Value.Date ? dateTH : null;
            var book = await booklistDac.Get(it => it.Id == request.Id);
            if (book == null) {
                request.CreateDate = DateTime.UtcNow;
                await booklistDac.Create(request);
            }
            else
                await booklistDac.Update(request);

        }

        // PUT: api/ServiceAPI/5
        [HttpPut("{id}")]
        public async Task Put(string id, BookList request)
        {
            request.Id = id;
            await booklistDac.Update(request);
        }

        // DELETE: api/ServiceAPI/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            var book = await booklistDac.Get(it => it.Id == id);
            book.DeleteDate = DateTime.UtcNow;
            await booklistDac.Update(book);
        }
    }
}
