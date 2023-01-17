using Hotel.Domain.Services.Entities;
using Hotel.Domain.Services.Repositories;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Services
{
    public class ServiceManagementRepository : RepositoryBase<Service>, IServiceManagementRepository
    {
        public ServiceManagementRepository(HotelManagementContext context) : base(context)
        {

        }

        public async Task AddEntityAsync(Service entity)
        {
            DbSet.Add(entity);
        }

        public async Task DeleteEntityAsync(int id)
        {
            var Service = DbSet.FirstOrDefault(s => s.Id == id);
            Service.Status = false;
        }

        public async Task<Service> GetEntityByIDAsync(int id)
        {
            return DbSet.FirstOrDefault(s => s.Id == id);
        }

        public IQueryable<Service> GetEntityByName(string name)
        {
            return from service in DbSet
                   select service;
        }

        public async Task UpdateEntityAsync(Service req)
        {
            var Service = DbSet.FirstOrDefault(s => s.Id == req.Id);
            Service.Name = req.Name;
            Service.Price = req.Price;
            if (req.Image != null)
                Service.Image = req.Image;
        }
    }
}
