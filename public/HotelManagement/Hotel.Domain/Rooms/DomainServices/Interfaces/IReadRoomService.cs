using Hotel.Domain.Rooms.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Rooms.DomainServices.Interfaces
{
    public interface IReadRoomService
    {
        Task<int> GetPageMaxAsync(string kw, int pageSize);
        Task<List<Room>> ReadRoomsAsync(string kw, int pageSize, int page, int sort);
    }
}
