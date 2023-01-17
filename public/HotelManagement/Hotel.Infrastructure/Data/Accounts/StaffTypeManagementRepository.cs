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
    public class StaffTypeManagementRepository : RepositoryBase<StaffType>, IStaffTypeManagementRepository
    {
        public StaffTypeManagementRepository(HotelManagementContext context) : base(context)
        {
        }

        public Task AddEntityAsync(StaffType entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteEntityAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<StaffType>> GetAllAsync()
        {
            return DbSet.Where(s => s.Status == true).ToList();
        }

        public Task<StaffType> GetEntityByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<StaffType> GetEntityByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEntityAsync(StaffType req)
        {
            throw new NotImplementedException();
        }
    }
}
