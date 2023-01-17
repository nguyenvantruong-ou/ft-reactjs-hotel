using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Rooms.Repositories
{
    public interface IImageManagementRepository : IRepository<Image>
    {
        Task AddListImageAsync(List<string> ListImage, int RoomId);
        Task DeleteListImageAsync(int RoomId);
        Task<List<Image>> GetImagesAsync(int roomId);
    }
}
