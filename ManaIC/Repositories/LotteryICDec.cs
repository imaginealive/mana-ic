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
    public class BookListDac : IDataDac<BookListModel>
    {
        public IMongoCollection<BookListModel> Collection { get; }

        public BookListDac(DbConfig dbConfig)
        {
            var client = new MongoClient(dbConfig.MongoDbConnectionString);
            var database = client.GetDatabase(dbConfig.MongoDbName);
            Collection = database.GetCollection<BookListModel>(nameof(BookListModel));
        }
        public async Task<long> Count(Expression<Func<BookListModel, bool>> expression) => await Collection.Find(expression).CountDocumentsAsync();

        public async Task Create(BookListModel document) => await Collection.InsertOneAsync(document);

        public Task CreateMany(IEnumerable<BookListModel> documents)
        {
            throw new NotImplementedException();
        }

        public Task DeleteMany(Expression<Func<BookListModel, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task DeleteOne(Expression<Func<BookListModel, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async Task<BookListModel> Get(Expression<Func<BookListModel, bool>> expression) => await Collection.Find(expression).FirstOrDefaultAsync();

        public async Task<IEnumerable<BookListModel>> Gets(Expression<Func<BookListModel, bool>> expression) => await Collection.Find(expression).ToListAsync();

        public Task<IEnumerable<BookListModel>> Gets(Expression<Func<BookListModel, bool>> expression, int skip, int limit)
        {
            throw new NotImplementedException();
        }

        public async Task Update(BookListModel document) => await Collection.ReplaceOneAsync(it => it.Id == document.Id, document);
    }
}
