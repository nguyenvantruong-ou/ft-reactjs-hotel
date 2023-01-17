using Hotel.API.DTOs.Constant;
using Hotel.API.DTOs.RequestDTOs;
using Hotel.API.DTOs.ResponseDTOs;
using Hotel.Domain.Accounts.Entities;
using Hotel.Domain.Accounts.Repositories;
using Hotel.Infrastructure.Data;
using Hotel.SharedKernel.Email;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using System.IdentityModel.Tokens.Jwt;
using Hotel.Domain;
using System.Net;
using Hotel.API.Utils;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Hotel.Domain.Accounts.DomainServices.Interfaces;
using Hotel.API.Utils.Interfaces;

namespace Hotel.API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountRepository _repo;
        private readonly ITokenRegisterRepository _repoToken;
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        private IConfiguration _configuration;
        private ISendCodeService _sendCode;
        private UploadImage _cloudinaryUtil;
        private IConvertToAccountService _service;

        public AccountController(IAccountRepository repo, 
                                ITokenRegisterRepository repoToken,
                                IUnitOfWork<HotelManagementContext> uow, 
                                IConfiguration configuration,
                                ISendCodeService sendCode,
                                IConvertToAccountService service,
                                UploadImage cloudinaryUtil)
        {
            _repo = repo;
            _repoToken = repoToken;
            _uow = uow;
            _configuration = configuration;
            _cloudinaryUtil = cloudinaryUtil;
            _sendCode = sendCode;
            _service = service;
        }

        [HttpPost("auth/sign-up")]
        public async Task<ActionResult> SignUpAsync([FromForm] AccountRequestDTO req)
        {
            try
            {
                if (await _repo.IsCardIdExistAsync(req.CardId))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.CardIdExist));
                if (await _repo.IsEmailExistAsync(req.Email))
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.EmailExist));

                // send mail
                int Code = await _sendCode.SendCodeAsync(_configuration, req.Email);

                Account Acc = new Account();
                req.Password = MD5Util.GetMD5(req.Password);
                Acc = _service.ConvertAccount(req.Email,req.Password, req.FirstName, req.LastName, req.Gender, 
                                                req.CardId, req.PhoneNumber, req.Address);
                // upload image
                if (req.File != null)
                    Acc.Avatar = _cloudinaryUtil.UploadToCloudinary(req.File);
                else
                    Acc.Avatar = _configuration["AvatarDefault"];
                Acc.RoleId = 3;
                Acc.Status = false;

                await _repo.AddEntityAsync(Acc);
                await _repoToken.AddEntityAsync(new TokenRegister(req.Email.Trim(), 
                                                                  JwtUtil.GetTokenRegister(_configuration, Code, req.Email)));
                await _uow.CompleteAsync();

                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, req.Email, Message.Email));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [HttpPost("auth/confirm")]
        public async Task<ActionResult> ConfirmAccountAsync([FromBody] ConfirmRequestDTO req)
        {
            try
            {
                var TokenRegister = await _repoToken.GetTokenAsync(req.Email);
                if (TokenRegister == null) 
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.CodeIncorrect));

                var Handler = new JwtSecurityTokenHandler();
                var TokenS = Handler.ReadToken(TokenRegister.Token) as JwtSecurityToken;

                int Code = int.Parse(TokenS.Claims.First(claim => claim.Type == ClaimTypesJwt.Code).Value);
                if(req.Code == Code)
                {
                    await _repo.AccountActivatedAsync(req.Email);
                    await _repoToken.DeleteAsync(req.Email);
                    await _uow.CompleteAsync();
                    return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.CodeCorrect)); 
                }
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.CodeIncorrect));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

 
        [HttpPost("auth/sign-in")]
        public async Task<ActionResult> SignIn([FromBody] LoginRequestDTO req )
        {
            try
            {
                var result = await _repo.SignInAsync(req.Email, MD5Util.GetMD5(req.Password));

                return Ok(result != null ? 
                        new CommonResponseDTO((int)HttpStatusCode.OK, 
                            new SignInResponseDTO(result.Id, result.Email, result.LastName +" " + result.FirstName, result.Avatar, result.Role.RoleName,
                                                  JwtUtil.GetToken(_configuration, result)), 
                        Message.Ok)
                    : new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Incorrect));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, e.Message));
            }
        }

        [HttpPost("auth/code")]
        public async Task<ActionResult> SendCode([FromBody] EmailRequestDTO req)
        {
            try
            {
                if (!(await _repo.IsEmailExistAsync(req.Email)) )
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.NotExist));
                // send mail
                int Code = await _sendCode.SendCodeAsync(_configuration, req.Email);
                await _repoToken.AddEntityAsync(new TokenRegister(req.Email,
                                                                  JwtUtil.GetTokenRegister(_configuration, Code, req.Email)));
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, req.Email, Message.Email));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, e.Message));
            }
        }

        [HttpPost("auth/password")]
        public async Task<ActionResult> SetNewPassword([FromBody] UpdatePasswordRequestDTO req)
        {
            try
            {
                var result = await _repo.SignInAsync(req.Email, MD5Util.GetMD5(req.OldPassword));
                if(result == null)
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.PasswordIncorrect));

                await _repo.UpdatePasswordAsync(req.Email, MD5Util.GetMD5(req.NewPassword));
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.SuccessPassword));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, e.Message));
            }
        }
    }
}

