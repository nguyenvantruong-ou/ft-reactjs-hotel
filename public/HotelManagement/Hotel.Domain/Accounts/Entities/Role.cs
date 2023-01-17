using System;
using System.Collections.Generic;

namespace Hotel.Domain.Accounts.Entities
{
    public partial class Role
    {
        public Role()
        {
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string? RoleName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
