using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.Areas.Management.DTOs.ResponseDTO;
using Hotel.API.Areas.Management.Services.Interfaces;
using Hotel.API.DTOs.Constant;
using Hotel.API.DTOs.RequestDTOs;
using Hotel.API.DTOs.ResponseDTOs;
using Hotel.API.Utils;
using Hotel.API.Utils.Interfaces;
using Hotel.Domain.Accounts.DomainServices.Interfaces;
using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Accounts.Repositories;
using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace Hotel.API.Areas.Management.Controllers
{
    public class AccountManagementController : BaseController
    {
        private IAccountManagementRepository _repo;
        IAccountManagementService _service;
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        private IStaffManagementRepository _repoStaff;
        private UploadImage _cloudinaryUtil;
        private IStaffTypeManagementRepository _repoStaffType;

        public AccountManagementController(IAccountManagementRepository repo,
                                           IAccountManagementService service,
                                           IUnitOfWork<HotelManagementContext> uow,
                                           IStaffManagementRepository repoStaff,
                                           UploadImage cloudinaryUtil,
                                           IStaffTypeManagementRepository repoStaffType)
        {
            _repo = repo;
            _service = service;
            _uow = uow;
            _repoStaff = repoStaff;
            _cloudinaryUtil = cloudinaryUtil;
            _repoStaffType = repoStaffType;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("accounts")]
        public async Task<ActionResult> ReadAccounts([FromQuery] SearchRequestDTO req)
        {
            try
            {
                var results = await _service.ReadAccountAsync(req);
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, 
                    new PageResponseDTO(await _service.GetPageMaxAsync(req), results),
                    Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }
        [Authorize(Roles = "ADMIN, STAFF, USER")]
        [HttpGet("account/{id}")]
        public async Task<ActionResult> ReadAccount(int id)
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                    await _service.GetAccountByIdAsync(id),
                    Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }


        [Authorize(Roles = "ADMIN")]
        [HttpPost("account")]
        public async Task<ActionResult> CreateAccount([FromBody] CreateAccountRequestDTO req)
        {
            try
            {
                if (!await _repo.IsCardIdExistAsync(0, req.CardId))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.CardIdExist));
                if (!await _repo.IsEmailExistAsync(0, req.Email))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.EmailExist));
                await _service.CreateAccountAsync(req);
                await _uow.CompleteAsync();

                // staff
                if (req.Salary > 0)
                {
                    await _service.CreateStaffAsync(await _repo.GetIdByEmailAsync(req.Email), (int)req.TypeStaff, (decimal)req.Salary);
                    await _uow.CompleteAsync();
                }
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, null, Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("account")]
        public async Task<ActionResult> UpdateAccount([FromBody] UpdateAccountRequestDTO req)
        {
            try
            {
                if (!await _repo.IsCardIdExistAsync(req.Id, req.CardId))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.CardIdExist));
                if (!await _repo.IsEmailExistAsync(req.Id, req.Email))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.EmailExist));

                var Input = _service.ConvertAccount(req.Id, req.Email, req.FirstName, req.LastName, req.Gender, 
                                                    req.CardId, req.PhoneNumber, req.Address, req.Status, req.ResetPw);
                await _repo.UpdateEntityAsync(Input);

                // update staff
                if(req.Salary > 0)
                {
                    await _service.UpdateStaffAsync(req.Id, (Decimal)req.Salary, (int)req.TypeStaff);
                }

                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, null,Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpDelete("account/{id}")]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            try
            {
                await _repo.DeleteEntityAsync(id);
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }


        // profile
        [Authorize(Roles = "ADMIN, STAFF, USER")]
        [HttpPut("profile")]
        public async Task<ActionResult> UpdateProfile([FromForm] UpdateProfileRequestDTO req)
        {
            try
            {
                if (!await _repo.IsCardIdExistAsync(req.Id, req.CardId))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.CardIdExist));
                if (req.File != null)
                    req.Image = _cloudinaryUtil.UploadToCloudinary(req.File);

                await _service.UpdateProfileAsync(req);
                await _uow.CompleteAsync();

                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("staff-type")]
        public async Task<ActionResult> GetStaffType()
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                    await _repoStaffType.GetAllAsync(),
                    Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

    }
}
