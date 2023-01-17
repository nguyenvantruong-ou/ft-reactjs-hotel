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
    public class StaffManagementRepository : RepositoryBase<Staff>, IStaffManagementRepository
    {
        public StaffManagementRepository(HotelManagementContext context) : base(context)
        {
        }

        public Task AddEntityAsync(Staff entity)
        {
            DbSet.Add(entity);
            return Task.CompletedTask;
        }

        public async Task DeleteEntityAsync(int id)
        {
            var St = DbSet.FirstOrDefault(s => s.Id == id);
            St.StatusStaff = 0;
        }

        public async Task<Staff> GetEntityByIDAsync(int id)
        {
            return DbSet.Include(s => s.Type).FirstOrDefault(s => s.Id == id);
        }

        public IQueryable<Staff> GetEntityByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEntityAsync(Staff req)
        {
            throw new NotImplementedException();
        }
    }
}
