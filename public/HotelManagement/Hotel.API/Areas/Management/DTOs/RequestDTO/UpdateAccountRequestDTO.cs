using System.ComponentModel.DataAnnotations;

namespace Hotel.API.Areas.Management.DTOs.RequestDTO
{
    public class UpdateAccountRequestDTO
    {
        public int Id { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }

        [MaxLength(12)]
        [MinLength(9)]
        public string CardId { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; } = null;
        public bool Status { get; set; }
        public Decimal? Salary { get; set; }
        public int? TypeStaff { get; set; }
        public bool ResetPw { get; set; }
    }
}
