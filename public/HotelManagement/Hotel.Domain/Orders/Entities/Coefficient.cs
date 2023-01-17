using System;
using System.Collections.Generic;

namespace Hotel.Domain.Orders.Entities
{
    public partial class Coefficient
    {
        public Coefficient()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public double Value { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
