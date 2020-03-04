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
        private readonly IDataDac<BookListModel> booklistDac;

        public ServiceAPIController(IDataDac<BookListModel> booklistDac)
        {
            this.booklistDac = booklistDac;
        }

        // GET: api/ServiceAPI
        [HttpGet]
        public async Task<IEnumerable<BookListModel>> Gets()
        {
            var response = await booklistDac.Gets(it => !it.DeleteDate.HasValue);
            return response;
        }

        // GET: api/ServiceAPI/5
        [HttpGet("{id}")]
        public async Task<BookListModel> Get(string id)
        {
            var response = await booklistDac.Get(it => it.Id == id && !it.DeleteDate.HasValue);
            return response;
        }

        // POST: api/ServiceAPI
        [HttpPost()]
        public async Task Post(BookListModel request)
        {
            request.Id = DateTime.UtcNow.Ticks.ToString();
            await booklistDac.Create(request);
        }

        // PUT: api/ServiceAPI/5
        [HttpPut("{id}")]
        public async Task Put(string id, BookListModel request)
        {
            request.Id = id;
            await booklistDac.Update(request);
        }

        // DELETE: api/ServiceAPI/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            var lottery = await booklistDac.Get(it => it.Id == id);
            lottery.DeleteDate = DateTime.UtcNow;
            await booklistDac.Update(lottery);
        }
    }
}
