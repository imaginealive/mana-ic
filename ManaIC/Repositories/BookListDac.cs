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
    public class BookListDac : IDataDac<BookList>
    {
        public IMongoCollection<BookList> Collection { get; }

        public BookListDac(DbConfig dbConfig)
        {
            var client = new MongoClient(dbConfig.MongoDbConnectionString);
            var database = client.GetDatabase(dbConfig.MongoDbName);
            Collection = database.GetCollection<BookList>(nameof(BookList));
        }
        public async Task<long> Count(Expression<Func<BookList, bool>> expression) => await Collection.Find(expression).CountDocumentsAsync();

        public async Task Create(BookList document) => await Collection.InsertOneAsync(document);

        public Task CreateMany(IEnumerable<BookList> documents)
        {
            throw new NotImplementedException();
        }

        public Task DeleteMany(Expression<Func<BookList, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task DeleteOne(Expression<Func<BookList, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async Task<BookList> Get(Expression<Func<BookList, bool>> expression) => await Collection.Find(expression).FirstOrDefaultAsync();

        public async Task<IEnumerable<BookList>> Gets(Expression<Func<BookList, bool>> expression) => await Collection.Find(expression).ToListAsync();

        public Task<IEnumerable<BookList>> Gets(Expression<Func<BookList, bool>> expression, int skip, int limit)
        {
            throw new NotImplementedException();
        }

        public async Task Update(BookList document) => await Collection.ReplaceOneAsync(it => it.Id == document.Id, document);
    }
}
