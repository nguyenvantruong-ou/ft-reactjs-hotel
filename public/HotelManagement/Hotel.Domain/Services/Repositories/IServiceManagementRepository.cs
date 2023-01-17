using Hotel.Domain.Services.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Services.Repositories
{
    public interface IServiceManagementRepository : IRepository<Service>
    {
    }
}
