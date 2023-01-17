using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.Entities
{
    public class TokenRegister
    {
        public string Email { get; set; } = null!;
        public string? Token { get; set; }
        public bool? Status { get; set; }

        public TokenRegister(string Email, string Token)
        {
            this.Email = Email;
            this.Token = Token;
        }

        public virtual Account EmailNavigation { get; set; } = null!;
    }
}
