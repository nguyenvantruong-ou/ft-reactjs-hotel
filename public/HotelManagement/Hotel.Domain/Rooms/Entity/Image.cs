using System;
using System.Collections.Generic;

namespace Hotel.Domain.Rooms.Entity
{
    public partial class Image
    {
        public int Id { get; set; }
        public int? RoomId { get; set; }
        public string? Link { get; set; }
        public bool? Status { get; set; }

        public virtual Room? Room { get; set; }
    }
}
