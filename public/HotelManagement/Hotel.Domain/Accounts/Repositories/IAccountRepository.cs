using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.Repositories
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<bool> IsEmailExistAsync(string email);
        Task<bool> IsCardIdExistAsync(string cardId);
        Task AccountActivatedAsync(string email);
        Task<Account> SignInAsync(string email, string password);
        Task UpdatePasswordAsync(string email, string password);
    }
}
