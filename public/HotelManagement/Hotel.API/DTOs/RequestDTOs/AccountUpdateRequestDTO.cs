using System.ComponentModel.DataAnnotations;

namespace Hotel.API.DTOs.RequestDTOs
{
    public class AccountUpdateRequestDTO : AccountRequestDTO
    {
        public AccountUpdateRequestDTO() { }
        public int AccountId { get; set; }
    }
}
