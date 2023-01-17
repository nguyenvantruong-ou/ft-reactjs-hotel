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
    public class AccountManagementRepository : RepositoryBase<Account>, IAccountManagementRepository
    {
        public AccountManagementRepository(HotelManagementContext context) : base(context)
        {

        }

        public Task AddEntityAsync(Account entity)
        {
            throw new NotImplementedException();
        }

        public Task CreateAccountAsync(Account acc)
        { 
            DbSet.Add(acc);
            return Task.CompletedTask;
        }

        public  Task DeleteEntityAsync(int id)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Id == id);
            Acc.Status = false;
            return Task.CompletedTask ;
        }

        public Task<Account> GetEntityByIDAsync(int id)
        {
            var Acc =  DbSet.Include(s => s.Role).FirstOrDefault(s => s.Id == id);
            return Task.FromResult(Acc!);
        }

        public IQueryable<Account> GetEntityByName(string name)
        {
            return DbSet.Include(s => s.Role).Where(s => string.IsNullOrEmpty(name) || s.Email.Contains(name));
        }

        public Task<int> GetIdByEmailAsync(string email)
        {
            var Id = DbSet.FirstOrDefault(s => s.Email == email).Id;
            return Task.FromResult(Id!);
        }

        public async Task<int?> GetRoleAsync(string email)
        {
            return DbSet.FirstOrDefault(s => s.Email.Equals(email)).RoleId;
        }

        public Task<bool> IsCardIdExistAsync(int id, string cardId)
        {
            bool Result = DbSet.FirstOrDefault(s => s.CardId.Equals(cardId) && s.Id != id) == null ? true : false;
            return Task.FromResult(Result);
        }

        public Task<bool> IsEmailExistAsync(int id, string email)
        {
            bool Result = DbSet.FirstOrDefault(s => s.Email.Equals(email) && s.Id != id) == null ? true : false;
            return Task.FromResult(Result);
        }

        public async Task UpdateEntityAsync(Account req)
        {
            var Acc = DbSet.FirstOrDefault(s => s.Id == req.Id);
            Acc.Email = req.Email;
            Acc.FirstName = req.FirstName;
            Acc.LastName = req.LastName;
            Acc.Role = req.Role;
            Acc.Gender = req.Gender;
            Acc.CardId = req.CardId;
            Acc.PhoneNumber = req.PhoneNumber;
            Acc.Address = req.Address;
            Acc.Status = req.Status;
            if(req.Password != null)
                Acc.Password = req.Password;
        }
    }
}
