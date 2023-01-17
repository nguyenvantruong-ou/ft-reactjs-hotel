using Hotel.Domain.Accounts.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Orders.Entities
{
    public partial class Order
    {
        public Order()
        {
            OrderRooms = new HashSet<OrderRoom>();
            OrderServices = new HashSet<OrderService>();
        }

        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? CoefficientId { get; set; }
        public int? CapitaId { get; set; }
        public bool? Status { get; set; }
        public bool? IsPay { get; set; }
        public DateTime? DateCreated { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Capita? Capita { get; set; }
        public virtual Coefficient? Coefficient { get; set; }
        public virtual ICollection<OrderRoom> OrderRooms { get; set; }
        public virtual ICollection<OrderService> OrderServices { get; set; }
    }
}
