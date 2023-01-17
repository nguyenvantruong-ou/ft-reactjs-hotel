using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Rooms.Repositories;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Rooms
{
    public class RoomManagementRepository : RepositoryBase<Room>, IRoomManagementRepository
    {
        public RoomManagementRepository(HotelManagementContext context) : base(context)
        {

        }

        public async Task AddEntityAsync(Room entity)
        {
            DbSet.Add(entity);
        }

        public async Task DeleteEntityAsync(int id)
        {
            var Room = DbSet.FirstOrDefault(s => s.Id == id);
            Room.Status = false;
        }

        public async Task<Room> GetEntityByIDAsync(int id)
        {
            return DbSet.FirstOrDefault(s => s.Id == id);
        }

        public IQueryable<Room> GetEntityByName(string name)
        {
            return from room in DbSet
                   where string.IsNullOrEmpty(name) || room.RoomName.Contains(name)
                   select room;
        }

        public async Task<int> GetRoomIdLatestAsync()
        {
            return (from room in DbSet
                    orderby room.Id descending 
                    select room.Id).FirstOrDefault();
        }

        public async Task<Room> GetRoomBySlugAsync(string slug)
        {
            return DbSet.FirstOrDefault(s => s.Slug.Equals(slug));
        }

        public async Task<bool> IsExistSlug(string slug)
        {
            return DbSet.FirstOrDefault(s => s.Slug.Equals(slug)) != null ? true : false;
        }

        public async Task UpdateEntityAsync(Room req)
        {
            var Room = DbSet.FirstOrDefault(s => s.Id == req.Id);
            Room.Slug = req.Slug;
            Room.RoomName = req.RoomName;
            Room.Price = req.Price;
            Room.Description = req.Description;
            Room.BedType = req.BedType;
            Room.Acreage = req.Acreage;
            Room.Status = req.Status;
        }

        public async Task<bool> IsExistNameAsync(string roomName)
        {
            return DbSet.FirstOrDefault(s => s.RoomName.Equals(roomName)) != null ? true : false;
        }

        public async Task<bool> IsExistNameByIdAsync(string roomName, int id)
        {
            return DbSet.FirstOrDefault(s => s.RoomName.Equals(roomName) && s.Id != id) != null ? true : false;
        }

        public IQueryable<Room> GetRooms(string name, int sort)
        {
            if (sort == 0) 
                return from room in DbSet
                      where string.IsNullOrEmpty(name) || room.RoomName.Contains(name)
                      select room;
            if (sort == -1)
                return from room in DbSet
                       where string.IsNullOrEmpty(name) || room.RoomName.Contains(name)
                       orderby room.Price descending
                       select room;
            return from room in DbSet
                   where string.IsNullOrEmpty(name) || room.RoomName.Contains(name)
                   orderby room.Price ascending
                   select room;
        }
    }
}
