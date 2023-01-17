using System.ComponentModel.DataAnnotations;

namespace Hotel.API.Areas.Management.DTOs.RequestDTO
{
    public class CreateAccountRequestDTO
    {
        [EmailAddress]
        public string Email { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        [MaxLength(12)]
        [MinLength(9)]
        public string CardId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Decimal? Salary { get; set; }
        public int? TypeStaff { get; set; }
    }
}
