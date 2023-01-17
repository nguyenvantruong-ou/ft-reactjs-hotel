using System.ComponentModel.DataAnnotations;

namespace Hotel.API.DTOs.RequestDTOs
{
    public class ConfirmRequestDTO
    {
        [Required]
        public int Code { get; set; }
        public string Email { get; set; }
    }
}
