using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity> GetEntityByIDAsync(int id);
        IQueryable<TEntity> GetEntityByName(string name);
        Task AddEntityAsync(TEntity entity);
        Task UpdateEntityAsync(TEntity req);
        Task DeleteEntityAsync(int id);
    }
}
