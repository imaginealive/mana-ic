using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ManaIC.Repositories.Contracts
{
    public interface IDataDac<T>
    {
        IMongoCollection<T> Collection { get; }
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<IEnumerable<T>> Gets(Expression<Func<T, bool>> expression);
        Task<IEnumerable<T>> Gets(Expression<Func<T, bool>> expression, int skip, int limit);
        Task<long> Count(Expression<Func<T, bool>> expression);
        Task Create(T document);
        Task CreateMany(IEnumerable<T> documents);
        Task Update(T document);
        Task DeleteOne(Expression<Func<T, bool>> expression);
        Task DeleteMany(Expression<Func<T, bool>> expression);
    }
}
