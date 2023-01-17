using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace Hotel.API.DTOs.RequestDTOs
{
    public class AccountRequestDTO
    {
        public IFormFile? File { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }

        [MaxLength(12)]
        [MinLength(9)]
        public string CardId { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; } = null;

    }
}
