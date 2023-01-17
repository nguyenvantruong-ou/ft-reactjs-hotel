using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.DTOs.Constant;
using Hotel.API.DTOs.ResponseDTOs;
using Hotel.API.Utils.Interfaces;
using Hotel.Domain.Services.Entities;
using Hotel.Domain.Services.Repositories;
using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using System.Net;

namespace Hotel.API.Areas.Management.Controllers
{
    [Authorize(Roles = "ADMIN, STAFF")]
    public class ServiceManagementController : BaseController
    {
        private readonly IServiceManagementRepository _repo;
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        UploadImage _cloudinaryUtil;
        public ServiceManagementController( IServiceManagementRepository repo,
                                            IUnitOfWork<HotelManagementContext> uow,
                                            UploadImage cloudinaryUtil)
        {
            _repo = repo;
            _uow = uow;
            _cloudinaryUtil = cloudinaryUtil;
        }

        [HttpGet("services")]
        public async Task<ActionResult> ReadService()
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, _repo.GetEntityByName(null).ToList(), Message.Ok));
            } catch(Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [HttpGet("service/{id}")]
        public async Task<ActionResult> ReadServices(int id)
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,await _repo.GetEntityByIDAsync(id), Message.Ok));
            } catch(Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [HttpPost("service")]
        public async Task<ActionResult> CreateService([FromForm] ServiceRequestDTO Req)
        {
            try
            {
                Service Input = new Service();
                Input.Name = Req.Name;
                Input.Price = Req.Price;
                if(Req.Image != null)
                {
                    Input.Image = _cloudinaryUtil.UploadToCloudinary(Req.Image);
                }
                await _repo.AddEntityAsync(Input);
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok));
            } catch(Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [HttpPut("service")]
        public async Task<ActionResult> UpdateService([FromForm] ServiceRequestDTO Req)
        {
            try
            {
                Service Input = new Service();
                Input.Id = Req.Id;
                Input.Name = Req.Name;
                Input.Price = Req.Price;
                if (Req.Image != null)
                {
                    Input.Image = _cloudinaryUtil.UploadToCloudinary(Req.Image);
                }
                await _repo.UpdateEntityAsync(Input);
                await _uow.CompleteAsync();
                return Ok((new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok)));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [HttpDelete("service/{id}")]
        public async Task<ActionResult> DeleteService(int id)
        {
            try
            {
                await _repo.DeleteEntityAsync(id);
                await _uow.CompleteAsync();
                return Ok((new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok)));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }
    }
}
