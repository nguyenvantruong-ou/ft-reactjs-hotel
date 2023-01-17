using Hotel.Domain.Orders.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Rooms.Entities
{
    public partial class Room
    {
        public Room()
        {
            Comments = new HashSet<Comment>();
            Images = new HashSet<Image>();
            OrderRooms = new HashSet<OrderRoom>();
        }

        public int Id { get; set; }
        public string Slug { get; set; } = null!;
        public string RoomName { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? BedType { get; set; }
        public string Acreage { get; set; } = null!;
        public bool? Status { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<OrderRoom> OrderRooms { get; set; }
    }
}
