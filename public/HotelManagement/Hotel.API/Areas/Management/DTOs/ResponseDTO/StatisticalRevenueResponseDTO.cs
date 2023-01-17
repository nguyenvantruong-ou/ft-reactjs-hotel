namespace Hotel.API.Areas.Management.DTOs.ResponseDTO
{
    public class StatisticalRevenueResponseDTO
    {
        public List<decimal> Rooms { get; set; }
        public List<decimal> Services { get; set; }
        public StatisticalRevenueResponseDTO(List<decimal> rooms, List<decimal> services)
        {
            Rooms = rooms;
            Services = services;
        }
    }
}
