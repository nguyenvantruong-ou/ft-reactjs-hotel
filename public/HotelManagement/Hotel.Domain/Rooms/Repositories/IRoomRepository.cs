using Hotel.Domain.Interfaces;
using Hotel.Domain.Rooms.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Rooms.Repositories
{
    public interface IRoomRepository : IRepository<Room>
    {
        Task<int> GetPageMaxAsync(string kw, int pageSize);
        IQueryable<Room> GetRooms(string name, int sort);
    }
}
