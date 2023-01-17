using Hotel.Domain.Services.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Orders.Entities
{
    public partial class OrderService
    {
        public int Id { get; set; }
        public int? ServiceId { get; set; }
        public int? OrderId { get; set; }
        public decimal Price { get; set; }
        public virtual Order? Order { get; set; }
        public virtual Service? Service { get; set; }
    }
}
