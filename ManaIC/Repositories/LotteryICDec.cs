using ManaIC.Models;
using ManaIC.Repositories.Contracts;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ManaIC.Repositories
{
    public class LotteryICDac : IDataDac<LotteryIC>
    {
        public IMongoCollection<LotteryIC> Collection { get; }

        public LotteryICDac(DbConfig dbConfig)
        {
            var client = new MongoClient(dbConfig.MongoDbConnectionString);
            var database = client.GetDatabase(dbConfig.MongoDbName);
            Collection = database.GetCollection<LotteryIC>(nameof(LotteryIC));
        }
        public async Task<long> Count(Expression<Func<LotteryIC, bool>> expression) => await Collection.Find(expression).CountDocumentsAsync();

        public async Task Create(LotteryIC document) => await Collection.InsertOneAsync(document);

        public Task CreateMany(IEnumerable<LotteryIC> documents)
        {
            throw new NotImplementedException();
        }

        public Task DeleteMany(Expression<Func<LotteryIC, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task DeleteOne(Expression<Func<LotteryIC, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async Task<LotteryIC> Get(Expression<Func<LotteryIC, bool>> expression) => await Collection.Find(expression).FirstOrDefaultAsync();

        public async Task<IEnumerable<LotteryIC>> Gets(Expression<Func<LotteryIC, bool>> expression) => await Collection.Find(expression).ToListAsync();

        public Task<IEnumerable<LotteryIC>> Gets(Expression<Func<LotteryIC, bool>> expression, int skip, int limit)
        {
            throw new NotImplementedException();
        }

        public async Task Update(LotteryIC document) => await Collection.ReplaceOneAsync(it => it.id == document.id, document);
    }
}
