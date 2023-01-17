using Hotel.Domain.Accounts.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Domain.Feedbacks.Entities
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string? Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool? IsRead { get; set; }

        public virtual Account? Account { get; set; }
    }
}
