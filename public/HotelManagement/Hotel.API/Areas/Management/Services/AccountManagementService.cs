using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.Areas.Management.DTOs.ResponseDTO;
using Hotel.API.Areas.Management.Services.Interfaces;
using Hotel.API.Utils;
using Hotel.Domain.Accounts.Constant;
using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Accounts.Repositories;

namespace Hotel.API.Areas.Management.Services
{
    public class AccountManagementService : IAccountManagementService
    {
        IAccountManagementRepository _repo;
        IStaffManagementRepository _repoStaff;
        public AccountManagementService(IAccountManagementRepository repo,
                                        IStaffManagementRepository repoStaff)
        {
            _repo = repo;
            _repoStaff = repoStaff; 
        }


        public async Task<AccountReadResponseDTO> GetAccountByIdAsync(int id)
        {
            var Acc = await _repo.GetEntityByIDAsync(id);
            AccountReadResponseDTO Result = new AccountReadResponseDTO();
            Result.Id = Acc.Id;
            Result.Email = Acc.Email;
            Result.FirstName = Acc.FirstName;
            Result.LastName = Acc.LastName;
            Result.Role = Acc.Role.RoleName;
            Result.Gender = Acc.Gender;
            Result.CardId = Acc.CardId;
            Result.PhoneNumber = Acc.PhoneNumber;
            Result.Address = Acc.Address;
            Result.Status = Acc.Status;
            Result.Avatar = Acc.Avatar;
            if (Acc.RoleId == 2)
            {
                var Staff = await _repoStaff.GetEntityByIDAsync(id);
                Result.Salary = Staff.Salary;
                Result.StatusStaff = Staff.StatusStaff;
                Result.TypeStaff = Staff.Type.Type;
            } 
            return Result;
        }

        public async Task<List<AccountReadResponseDTO>> ReadAccountAsync(SearchRequestDTO req)
        {
            var ListAccount = _repo.GetEntityByName(req.Kw).Skip(req.PageSize * (req.Page - 1)).Take(req.PageSize).ToList();
            List<AccountReadResponseDTO> Results = new List<AccountReadResponseDTO>();
            ListAccount.ForEach(async s =>
            {
                AccountReadResponseDTO r = new AccountReadResponseDTO();
                r.Id = s.Id;
                r.Email = s.Email;
                r.FirstName = s.FirstName;
                r.LastName = s.LastName;
                r.Role = s.Role.RoleName;
                r.Gender = s.Gender;
                r.CardId = s.CardId;
                r.PhoneNumber = s.PhoneNumber;
                r.Address = s.Address;
                r.Status = s.Status;
                r.DateCreated = s.DateCreated;
                Results.Add(r);
            });
            return Results;
        }
        public Account ConvertAccount(int id, string email, string firstName, string lastName,
                                int gender, string cardId, string phoneNumber, string address, bool status, bool resetPw)
        {
            var Acc = new Account();
            Acc.Id = id;
            Acc.Email = email;
            Acc.FirstName = firstName;
            Acc.LastName = lastName;
            Acc.Gender = GetGender(gender);
            Acc.CardId = cardId;
            Acc.PhoneNumber = phoneNumber;
            Acc.Address = address;
            Acc.Status = status;
            if (resetPw)
                Acc.Password = MD5Util.GetMD5("1");

            return Acc;
        }

        public string GetGender(int type)
        {
            if (type == 1)
                return Gender.Male;
            return type == 2 ? Gender.Female : Gender.Other;
        }

        public async Task UpdateStaffAsync(int id, decimal salary, int typeStaff)
        {
            var Staff = await _repoStaff.GetEntityByIDAsync(id);
            Staff.Salary = salary;
            Staff.TypeId = typeStaff;
        }

        public async Task CreateAccountAsync(CreateAccountRequestDTO acc)
        {
            Account Input = new Account();
            Input.Email = acc.Email;
            Input.FirstName = acc.FirstName;
            Input.LastName = acc.LastName;
            Input.CardId = acc.CardId;
            Input.PhoneNumber = acc.PhoneNumber;
            Input.Password = MD5Util.GetMD5("1");
            Input.Address = acc.Address;
            if (acc.Salary > 0)
                Input.RoleId = 2;
            else Input.RoleId = 3;
            await _repo.CreateAccountAsync(Input);
        }

        public async Task CreateStaffAsync(int id, int typeStaff, decimal salary)
        {
            Staff St = new Staff();
            St.Id = id;
            St.Salary = salary;
            St.TypeId =typeStaff;
            St.StatusStaff = 1;
            await _repoStaff.AddEntityAsync(St);
        }

        public async Task UpdateProfileAsync(UpdateProfileRequestDTO req)
        {
            var Pro = await _repo.GetEntityByIDAsync(req.Id);
            Pro.Gender = GetGender(req.Gender);
            Pro.CardId = req.CardId;
            Pro.PhoneNumber = req.PhoneNumber;
            Pro.Address = req.Address;
            if (req.Image != null)
                Pro.Avatar = req.Image;
        }

        public async Task<int> GetPageMaxAsync(SearchRequestDTO req)
        {
            int Count = _repo.GetEntityByName(req.Kw).ToList().Count;
            int Max = Count / req.PageSize;
            return  Count % req.PageSize == 0 ? Max : Max + 1;
        }
    }
}
