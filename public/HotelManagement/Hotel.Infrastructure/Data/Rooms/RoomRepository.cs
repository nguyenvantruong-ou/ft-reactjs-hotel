using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Rooms.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Rooms
{
    public class RoomRepository : RepositoryBase<Room>, IRoomRepository
    {
        public RoomRepository(HotelManagementContext context) : base(context)
        {

        }

        public Task AddEntityAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteEntityAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Room> GetEntityByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Room> GetEntityByName(string name)
        {
            return DbSet.Where(s => (string.IsNullOrEmpty(name) || s.RoomName.Contains(name)) && s.Status == true);
        }

        public Task<int> GetPageMaxAsync(string kw, int pageSize)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Room> GetRooms(string name, int sort)
        {
            var rooms = DbSet.Include(s => s.Images);
            if (sort == 0)
                return from room in rooms
                       where (string.IsNullOrEmpty(name) || room.RoomName.Contains(name)) && room.Status == true
                       select room;
            if (sort == -1)
                return from room in rooms
                       where (string.IsNullOrEmpty(name) || room.RoomName.Contains(name)) && room.Status == true
                       orderby room.Price descending
                       select room;
            return from room in rooms
                   where (string.IsNullOrEmpty(name) || room.RoomName.Contains(name)) && room.Status == true
                   orderby room.Price ascending
                   select room;
        }

        public Task UpdateEntityAsync(Room req)
        {
            throw new NotImplementedException();
        }
    }
}
