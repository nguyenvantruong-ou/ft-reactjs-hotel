using Microsoft.EntityFrameworkCore;
using Hotel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
    {
        private readonly TContext _context;
        public UnitOfWork(TContext context) => _context  = context;

        public async Task CompleteAsync()
        {
            _context.SaveChanges();
        }
    }
}
 