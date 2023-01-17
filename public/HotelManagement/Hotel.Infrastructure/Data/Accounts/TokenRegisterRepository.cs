using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Accounts.Repositories;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Accounts
{
    public class TokenRegisterRepository : RepositoryBase<TokenRegister>, ITokenRegisterRepository
    {
        public TokenRegisterRepository(HotelManagementContext context) : base(context)
        {

        }

        public async Task AddEntityAsync(TokenRegister entity)
        {
            var Token = DbSet.FirstOrDefault(s => s.Email == entity.Email);
            if (Token == null)
                DbSet.Add(entity);
            else
            {
                Token.Token = entity.Token;
                Token.Status = true;
            }
        }

        public async Task DeleteAsync(string email)
        {
            var Token =  DbSet.FirstOrDefault(e => e.Email == email);
            Token.Status = false;
        }

        public Task DeleteEntityAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<TokenRegister> GetEntityByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TokenRegister> GetEntityByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<TokenRegister> GetTokenAsync(string email)
        {
            return DbSet.FirstOrDefault(s => s.Email.Equals(email));
        }

        public Task UpdateEntityAsync(TokenRegister req)
        {
            throw new NotImplementedException();
        }
    }
}
