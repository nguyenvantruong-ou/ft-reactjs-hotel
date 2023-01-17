namespace Hotel.API.DTOs.RequestDTOs
{
    public class UpdatePasswordRequestDTO
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
