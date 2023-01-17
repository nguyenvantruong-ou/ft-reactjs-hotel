using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.Domain.Rooms.Entities;

namespace Hotel.API.Areas.Management.Services.Interfaces
{
    public interface IRoomManagementService
    {
        Task<List<string>> UploadImageAsync(List<IFormFile> ListFile);
        Task<Room> ConvertToRoomAsync(RoomRequestDTO Input);
        Task<string> CreateSlug(string Name);
    }
}
