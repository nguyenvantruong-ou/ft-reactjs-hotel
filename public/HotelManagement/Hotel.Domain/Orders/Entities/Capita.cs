using System;
using System.Collections.Generic;

namespace Hotel.Domain.Orders.Entities
{
    public partial class Capita
    {
        public Capita()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? AmountOfPeople { get; set; }
        public double Value { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
