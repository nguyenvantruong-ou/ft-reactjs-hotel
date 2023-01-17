using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.Areas.Management.DTOs.ResponseDTO;
using Hotel.Domain.Accounts.Entities;

namespace Hotel.API.Areas.Management.Services.Interfaces
{
    public interface IAccountManagementService
    {
        Task<List<AccountReadResponseDTO>> ReadAccountAsync(SearchRequestDTO req);
        Task<int> GetPageMaxAsync(SearchRequestDTO req);
        Task<AccountReadResponseDTO> GetAccountByIdAsync(int id);
        Account ConvertAccount(int id, string email, string firstName, string lastName,
                                int gender, string cardId, string phoneNumber, string address, bool status, bool resetPw);
        Task UpdateStaffAsync(int id, Decimal salary, int typeStaff);
        Task CreateAccountAsync(CreateAccountRequestDTO acc);
        Task CreateStaffAsync(int id, int typeStaff, Decimal salary);
        Task UpdateProfileAsync(UpdateProfileRequestDTO req);
    }
}
