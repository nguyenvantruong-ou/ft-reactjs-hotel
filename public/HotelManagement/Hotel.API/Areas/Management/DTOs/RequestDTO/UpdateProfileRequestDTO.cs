using System.ComponentModel.DataAnnotations;

namespace Hotel.API.Areas.Management.DTOs.RequestDTO
{
    public class UpdateProfileRequestDTO
    {
        public int Id { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public int Gender { get; set; }
        [MaxLength(12)]
        [MinLength(9)]
        public string CardId { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; } = null;
        public IFormFile? File { get; set; }
        public string? Image { get; set; }

    }
}
