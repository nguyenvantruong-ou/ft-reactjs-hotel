namespace Hotel.API.Areas.Management.DTOs.ResponseDTO
{
    public class PageResponseDTO
    {
        public int PageMax { get; set; }
        public object Data { get; set; } = null!;
        
        public PageResponseDTO(int pageMax, object data)
        {
            PageMax = pageMax;
            Data = data;
        }
    }
}
