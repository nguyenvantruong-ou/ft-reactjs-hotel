using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.Repositories
{
    public interface IAccountManagementRepository : IRepository<Account>
    {
        Task<int?> GetRoleAsync(string email);
        Task CreateAccountAsync(Account acc);
        Task<bool> IsEmailExistAsync(int id, string email);
        Task<bool> IsCardIdExistAsync(int id, string cardId);
        Task<int> GetIdByEmailAsync(string email);
    }
}
