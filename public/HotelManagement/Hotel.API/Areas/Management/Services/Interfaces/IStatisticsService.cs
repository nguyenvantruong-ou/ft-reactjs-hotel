using Hotel.API.Areas.Management.DTOs.ResponseDTO;

namespace Hotel.API.Areas.Management.Services.Interfaces
{
    public interface IStatisticsService
    {
        Task<StatisticalRevenueResponseDTO> StatiscalRevenueAsync(int year);
        Task<List<int>> StatisticalVisitorAsync();
        Task<List<StatisticalAmountPeopleResponseDTO>> StatisticalAmountCustomerAsync();
    }
}
