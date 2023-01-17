using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Accounts.Repositories;
using Microsoft.EntityFrameworkCore;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Accounts
{
    public class AccountRepository : RepositoryBase<Account>, IAccountRepository
    {
        public AccountRepository(HotelManagementContext context) : base(context)
        {

        }

        public async Task AccountActivatedAsync(string email)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Email.Equals(email));
            Acc.Status = true;
        }

        public async Task AddEntityAsync(Account entity)
        {
            DbSet.Add(entity);
        }

        public async Task DeleteEntityAsync(int id)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Id == id);
            Acc.Status = false;

        }

        public Task<Account> GetEntityByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Account> GetEntityByName(string name)
        {
            return from account in DbSet
                   where string.IsNullOrEmpty(name) || account.Email.Contains(name) 
                   select account;
        }

        public async Task<bool> IsCardIdExistAsync(string cardId)
        {
            return DbSet.FirstOrDefault(s => s.CardId == cardId) != null ? true : false;
        }

        public async Task<bool> IsEmailExistAsync(string email)
        {
            return DbSet.FirstOrDefault(s => s.Email == email) != null ? true : false;
        }

        public async Task<Account> SignInAsync(string email, string password)
        {
            var result = DbSet.Include(s=> s.Role).FirstOrDefault(s => s.Email.Equals(email) && s.Password.Equals(password) && s.Status == true);

            return result;
        }

        public async Task UpdateEntityAsync(Account req)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Id == req.Id);
            Acc.Email = req.Email;
            Acc.Password = req.Password;
            Acc.FirstName = req.FirstName;
            Acc.LastName = req.LastName;
            Acc.Role = req.Role;
            Acc.Gender = req.Gender;
            if (req.Avatar.Length > 0)
                Acc.Avatar = req.Avatar;
            Acc.CardId = req.CardId;
            Acc.PhoneNumber = req.PhoneNumber;
            Acc.Address = req.Address;
        }

        public async Task UpdatePasswordAsync(string email, string password)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Email.Equals(email));
            Acc.Password = password;
        }
    }
}
