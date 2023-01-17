namespace Hotel.API.DTOs.ResponseDTOs
{
    public class PagingResponseDTO
    {
        public int PageMax { get; set; }
        public object Data { get; set; } = null!;

        public PagingResponseDTO(int pageMax, object data)
        {
            PageMax = pageMax;
            Data = data;
        }
    }
}
