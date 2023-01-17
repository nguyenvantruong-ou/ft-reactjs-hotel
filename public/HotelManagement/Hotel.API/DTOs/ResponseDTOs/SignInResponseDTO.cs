namespace Hotel.API.DTOs.ResponseDTOs
{
    public class SignInResponseDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }

        public SignInResponseDTO(int id, string email, string name, string avatar, string role, string token)
        {
            Id = id;
            Email = email;
            Name = name;
            Avatar = avatar;
            Role = role;
            Token = token;
        }
    }
}
