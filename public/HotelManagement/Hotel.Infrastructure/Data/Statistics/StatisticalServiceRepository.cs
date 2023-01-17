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
    public class StatisticalServiceRepository : RepositoryBase<OrderService>, IStatisticalServiceRepository
    {
        public StatisticalServiceRepository(HotelManagementContext context) : base(context)
        {

        }
        public async Task<decimal> GetRevenueServiceAsync(int month, int year)
        {
            return (from r in DbSet
                    where ((DateTime)r.Order.DateCreated).Year == year && ((DateTime)r.Order.DateCreated).Month == month
                    select r).Sum(s => s.Price);
        }
    }
}
