using Hotel.Domain.Orders.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Orders.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
    }
}
