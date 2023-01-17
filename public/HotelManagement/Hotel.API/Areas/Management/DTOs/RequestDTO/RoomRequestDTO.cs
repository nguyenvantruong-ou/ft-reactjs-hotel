using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Hotel.API.Areas.Management.DTOs.RequestDTO
{
    public class RoomRequestDTO
    {
        [ValidateNever]
        public int Id { get; set; }
        public string RoomName { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? BedType { get; set; }
        public string Acreage { get; set; } = null!;
        [ValidateNever]
        public List<IFormFile> ListImage { get; set; }
        public bool Status { get; set; }
    }
}
