using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.Repositories
{
    public interface ITokenRegisterRepository : IRepository<TokenRegister>
    {
        Task DeleteAsync(string email);
        Task<TokenRegister> GetTokenAsync(string email);
    }
}
