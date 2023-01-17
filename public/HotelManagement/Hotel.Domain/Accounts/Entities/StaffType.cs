using System;
using System.Collections.Generic;

namespace Hotel.Domain.Accounts.Entities
{
    public partial class StaffType
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public bool? Status { get; set; }
    }
}
