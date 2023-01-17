using Hotel.Domain.Rooms.Entities;

namespace Hotel.API.DTOs.ResponseDTOs
{
    public class RoomsHomeResponse
    {
        public RoomsHomeResponse()
        {
        }
        public RoomsHomeResponse(Room room)
        {
            RoomId = room.Id;
            RoomName = room.RoomName;
            Image = room.Images.ToList()[0].Link;
            Price = room.Price;
            TypeBed = room.BedType;
            Acreage = room.Acreage;
            Slug = room.Slug;
        }

        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public string TypeBed { get; set; }
        public string Acreage { get; set; }
        public string Slug { get; set; }
    }
}
