using Hotel.Domain.Accounts.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Rooms.Entities
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? RoomId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime? DateCreated { get; set; }
        public bool? Incognito { get; set; }
        public int? ParentId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Room? Room { get; set; }
    }
}
