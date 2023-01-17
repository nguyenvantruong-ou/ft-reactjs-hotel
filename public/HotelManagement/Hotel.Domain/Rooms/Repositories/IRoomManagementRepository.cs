using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Rooms.Repositories
{
    public interface IRoomManagementRepository : IRepository<Room>
    {
        Task<Room> GetRoomBySlugAsync(string Slug);
        Task<bool> IsExistSlug(string Slug);
        Task<int> GetRoomIdLatestAsync();
        Task<bool> IsExistNameAsync(string RoomName);
        Task<bool> IsExistNameByIdAsync(string RoomName, int Id);
        IQueryable<Room> GetRooms(string Name, int Sort);
    }
}
