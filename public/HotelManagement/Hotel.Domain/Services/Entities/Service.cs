using Hotel.Domain.Orders.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Services.Entities
{
    public partial class Service
    {
        public Service()
        {
            OrderServices = new HashSet<OrderService>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public bool? Status { get; set; }
        public string Image { get; set; }

        public virtual ICollection<OrderService> OrderServices { get; set; }
    }
}
