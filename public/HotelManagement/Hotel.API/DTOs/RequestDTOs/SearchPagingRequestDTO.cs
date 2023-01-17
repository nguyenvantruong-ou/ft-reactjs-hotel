
namespace Hotel.API.DTOs.RequestDTOs
{
    public class SearchPagingRequestDTO
    {
        public string? Kw { get; set; }
        public int Sort { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
