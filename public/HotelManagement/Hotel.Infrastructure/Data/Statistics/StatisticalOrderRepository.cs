using Hotel.Domain.Orders.Entities;
using Hotel.Domain.Statistics;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Statistics
{
    public class StatisticalOrderRepository : RepositoryBase<Order>, IStatisticalOrderRepository
    {
        public StatisticalOrderRepository(HotelManagementContext context) : base(context)
        {

        }

        public async Task<int> GetCapitaAsync(int capita)
        {
            return (from o in DbSet
                    where o.CapitaId == capita
                    select 0).Count();
        }

        public Task<int?> GetCountCustomerAsync(int year)
        {
            int? Result = (from o in DbSet
                          where ((DateTime)o.DateCreated).Year == year
                          select o).Sum(s => s.CapitaId);
            return Task.FromResult(Result!);
        }
    }
}
