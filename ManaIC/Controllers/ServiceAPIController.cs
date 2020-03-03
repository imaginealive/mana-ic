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
        private readonly IDataDac<LotteryIC> lotteryDac;

        public ServiceAPIController(IDataDac<LotteryIC> lotteryDac)
        {
            this.lotteryDac = lotteryDac;
        }

        // GET: api/ServiceAPI
        [HttpGet]
        public async Task<IEnumerable<LotteryIC>> Gets()
        {
            var response = await lotteryDac.Gets(it => !it.DeleteDate.HasValue);
            return response;
        }

        // GET: api/ServiceAPI/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<LotteryIC> Get(string id)
        {
            var response = await lotteryDac.Get(it => it.Id == id && !it.DeleteDate.HasValue);
            return response;
        }

        // POST: api/ServiceAPI
        [HttpPost()]
        public async Task Post(LotteryIC request)
        {
            request.Id = DateTime.UtcNow.Ticks.ToString();
            await lotteryDac.Create(request);
        }

        // PUT: api/ServiceAPI/5
        [HttpPut("{id}")]
        public async Task Put(string id, LotteryIC request)
        {
            request.Id = id;
            await lotteryDac.Update(request);
        }

        // DELETE: api/ServiceAPI/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            var lottery = await lotteryDac.Get(it => it.Id == id);
            lottery.DeleteDate = DateTime.UtcNow;
            await lotteryDac.Update(lottery);
        }
    }
}
