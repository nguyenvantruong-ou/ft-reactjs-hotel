using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data
{
    public abstract class RepositoryBase<TEntity> where TEntity : class
    {
        protected DbSet<TEntity> DbSet { get; }
        public RepositoryBase(DbContext context) => DbSet = context.Set<TEntity>();
    }
}
